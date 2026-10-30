---
name: event-management
description: >-
  Manage iMIS events — create events, register attendees, cancel or transfer
  registrations, check capacity, handle waitlists, track attendance, and
  report on event revenue. This skill should be used when the user says
  "register someone for an event", "cancel registration", "create an event",
  "check capacity", "waitlist", "transfer registration", "event attendance",
  "event revenue", "bulk register", "who's registered", "event details",
  "list attendees", "check registration", "how many spots left",
  "create a session", "registration questions", "dietary needs",
  "question responses", "event page layout", "event showcase",
  "member price", "free event", "delete an event", or when working with
  events, conferences, or meetings.
argument-hint: "[event-id-or-name] [action: register|cancel|create|prices|remove|capacity|waitlist|transfer|attendance|revenue|bulk-register|list|details|sessions]"
---

# Event Management — Full Lifecycle

Manage the complete event lifecycle in iMIS: creation, pricing, registration questions, registration, capacity, waitlists, transfers, attendance tracking, revenue reporting, and removal.

Boundary: event-management reads event totals only. For revenue/attendance analytics run an existing IQA through run-query or design one in iqa-query-design; for invoice, refund, or payment work use billing-management.

For a reusable export with one row per event registration plus all program titles and all question responses, use `iqa-query-design` and the `eventRegistrationTextFolding` recipe from `imis_iqd_query action="capabilities"`. This is a supported IQD shape. Do not split it into three exports, fail on duplicate registration rows, or route it to multi-dataset SSRS only because a bare calculated `SELECT` once failed. Programs stay order-specific. Responses are event-participant data and repeat on matching duplicate rows with `ResponseScope=event-participant`.

## Canonical event tools

Route **writes** through the **guarded** event tools — they enforce preview → confirm → readback and carry proof packets:

- `imis_manage_event_setup` — read, create, clone, update and remove events (`action=status`; `preview_create_from_design` → `create_from_design`, `preview_clone` → `clone`, `preview_update` → `update`, `preview_remove` → `remove`). `status` shows the event graph: registration options, program items, their item ids, both price rows (Standard and Member) and the stored registration questions.
- `imis_manage_event_registration` — reads: `action=status` (one registration), `list_registrants` (the event roster), `reconcile`, `find_registration_ids`. Three actions have a REST write: `action=preview_register` → `register`, `preview_cancel` → `cancel`, and `preview_check_in` → `check_in` (each `preview_*` returns a `confirmationText` you pass to the matching write). Three actions are **preview/planning only** with no REST submit — `preview_transfer`, `preview_change_registration`, `preview_waitlist_promotion` — because their native cart/Complete-Registration legs are not exposed over REST; complete the plan in the native Staff UI.
- `imis_manage_event_resources` — event resources and resource types.
- `imis_event_360` — consolidated read of one event (`action=contract`, the default: functions, registration options, add-on fees), `action=list_upcoming` (events in a date window with capacity, registrant counts and spots left), and `action=question_responses` (answers to the event's registration questions).

`imis_register_for_event` is the **lightweight guarded** registration tool (`action=preview` → `action=submit` with the returned `confirmationText`); `imis_manage_event_registration` is the fuller lifecycle surface (roster/cancel/transfer/check-in/waitlist). Every confirmation text is bound to the previewed change and the records as read (event, option prices, registration, attendance row); if they change before the write, the write is refused — preview again. Don't use `imis_entity action=create/update` for event writes that a tool above covers. Raw `imis_entity` lists of `EventRegistration` and `EventRegistrationSummary` need **both** `EventId` and `PartyId`; they cannot list an event's roster — use `list_registrants`.

---

## Step 1: Find the Event

If an event ID is provided in $ARGUMENTS, use `imis_entity action=get entityType="Event" id={id}`.
Otherwise, search with `imis_entity action=list` Event or `imis_search` Event to find matching events, or `imis_event_360 action=list_upcoming` (optional `fromDate`/`toDate`/`status`) for events in a date window.

Show: EventId, Name, Status, Start/End dates, Location, Capacity. A newly created event defaults to Status 'P'; read the current status back via `imis_event_360` and change it with `imis_manage_event_setup action=preview_update` → `update` (A Active, P Pending, F Frozen; cancelling or closing is not a status edit — see Remove an Event).

For an overview of all events: `imis_entity action=list` EventSummary.

---

## Actions

### Create a New Event

Set up a new event in iMIS.

1. **Gather details** from the user:
   - Name (required)
   - EventId / code (required — typically short uppercase, e.g., "CONF2025")
   - Start and End dates
   - Location / venue (address)
   - Capacity (max attendees)
   - Description
   - Registration options (what people book) and program items (sessions), each with a price
   - Category (check available: `imis_entity action=list` EventCategory; pass as `categoryId`)

2. **Create the event** (guarded): `imis_manage_event_setup action=preview_create_from_design` with the event design (returns a `confirmationText`), then `imis_manage_event_setup action=create_from_design` passing that exact text. No template is needed: registration options and program items are created from scratch. Pass the design as `eventDesignJson`:
   ```json
   eventDesignJson='{
     "eventCode": "CONF2025",
     "name": "Annual Conference 2025",
     "startDateTime": "2025-09-15T09:00:00",
     "endDateTime": "2025-09-17T17:00:00",
     "location": {
       "addressLines": ["Convention Centre", "1 Exhibition Way"],
       "city": "Manchester",
       "postalCode": "M1 1AA",
       "countryCode": "GB"
     },
     "capacity": 500,
     "description": "Our flagship annual event",
     "registrationType": "FeeRegistrationRequired",
     "registrationOptions": [{ "eventFunctionCode": "REG", "name": "Full conference" }],
     "programItems": [{ "eventFunctionCode": "WS1", "name": "Workshop 1", "capacity": 30 }],
     "itemPrices": [
       { "eventFunctionId": "REG", "amount": 295, "memberAmount": 195 },
       { "eventFunctionId": "WS1", "amount": 0 }
     ]
   }'
   ```
   The venue goes in `location.addressLines`: up to 3 lines of at most 50 characters each. iMIS derives the location name from the address, so there is no `location.name`. A key the design does not support is refused by name before anything is written; read the refusal and correct the key.

   To change an existing event, pass only the fields to change as `setupPatchJson` to `action=preview_update` → `update`. Update actions do not read `eventDesignJson`, and a patch that names no change is refused.
   - Identify new options and program items by `eventFunctionCode` only (bare code, no `/`); iMIS assigns `[eventCode]/[code]` and mints each backing Item and price row. A new node carrying an `eventFunctionId` is refused before any write.
   - `registrationType` is one of Planning, RegistrationNotRequired, RegistrationRequired, FeeRegistrationRequired (use FeeRegistrationRequired for paid options); a design with no registration options is coerced to RegistrationNotRequired. `templateState`, `defaultProgramItemDisplayMode` and `waitlistPermissions` are also enums: an unknown value is refused with the valid values named — use one of those.
   - `location` is `{addressLines, city, stateProvince, postalCode, countryCode}` (countryCode is a Country list code such as GB, or the country name).
   - A design with `registrationOptions` and `programItems` creates a registration-capable event from scratch; no template is needed.
   - The schema of `eventDesignJson` in the tool lists every supported event-level field (registration dates, cutoffs, flags, `timeZoneId`, `imageVirtualPath`, `cancellationFee`, `questions`).
   - If the preview warns that items for this event code still answer, an event with that code was removed recently; choose a fresh code.
   - To copy an existing event instead, use `action=preview_clone` → `clone` (`templateEventId`, `newEventCode` of 10 characters or fewer, `newEventName`). A REST clone carries no registration questions; set them afterwards.

3. **Pricing**: set in the same design with `itemPrices` (see Event Prices below), or later with `preview_update` → `update`.

4. **Add sessions/options later** (optional): `imis_manage_event_setup action=preview_update eventId={id} setupPatchJson='{"programItems":[{"eventFunctionCode":"WS2","name":"Workshop 2"}]}'` → `update`. A code with no existing match is added; an existing `eventFunctionId` (or matching bare code) is edited.

5. **Verify**: the write reads the event graph back; `imis_manage_event_setup action=status eventId={newId}` or `imis_event_360 eventId={newId}` to review it. Readback proves the REST Event graph, not that the public event page or checkout renders it.

---

### Event Prices (member, non-member, free)

Price registration options and program items through `imis_manage_event_setup` — `itemPrices` in the design, or in `setupPatchJson` for `preview_update` → `update`:

```json
setupPatchJson='{"itemPrices":[{"eventFunctionId":"CONF2025/REG","amount":295,"memberAmount":195}]}'
```

- `amount` is the default (non-member) price on the Standard price sheet; `memberAmount` is the Members price on the Member price sheet, on the **same** option or program item. One option carries both prices — do not create a second "member" option. Either field may be sent alone.
- `memberAmount` applies to registration options and program items, not the cancellation fee.
- **Free**: `amount: 0` (or `memberAmount: 0`) stores a defined zero (`IsAmountDefined: true`), so the item is free. In iMIS, `{Amount: 0}` without `IsAmountDefined` is an *undefined* price, which the event page shows as "Pricing is undefined" — if `status` shows an undefined price, set it again here.
- **Verify the charge**: `imis_manage_event_setup action=status eventId={id} pricePartyId={partyId}` reads both price rows and that party's `PartyItemPrice` — check a member resolves to the Members price and a non-member to the default.
- **Currency**: an iMIS tenant holds one currency, and every price is stored in it (this may be USD on a UK tenant). Previews name it (`currency`, and each `plannedPrices` / `priceUpdates` row's `display`, such as `USD 40.00`); show the person the currency before they confirm, because "40" may mean another currency to them.
- **Time zone**: `timeZoneId` is a Windows time zone id (`GMT Standard Time` for UK time). A plain place or zone ("UK time", "London", "New York") is translated, and the preview's `timeZone` note shows what is stored; tell the person and confirm. Unknown text is refused with the common choices.

---

### Remove an Event

1. **Preview**: `imis_manage_event_setup action=preview_remove eventId={id}` — shows the planned steps, any active registrations, and under `linked` every record the event leaves behind, since DeleteEvent removes only the event and its options:
   - the registration-question form (a separate Forms record), with its answer count (it is removed only when AgentZ made it for this event, nobody answered it and no other event uses it);
   - rows kept for the event in business objects whose parent is Event (panel rows);
   - content pages fixed to the event (found among pages saved in the last `pageScanDays` days, default 30 — iMIS has no index of pages by event; `pages.complete` and `pages.note` say how far the search got);
   - the event's display layout pages.
   - No active registration: CancelEvent (if still open), then DeleteEvent, then the panel rows and the question form AgentZ made for the event (only when nobody answered it), each deleted after the event reads back as absent.
   - Active registrations: CancelEvent only — it cancels those registrations and reverses their accounting, and every linked record stays. Run `preview_remove` → `remove` again afterwards to delete the event.
2. **Show the person `linked` before confirming**, then `action=remove eventId={id} confirmationText="{exact text}"`. The result reads back the event's absence (or its cancelled status) and each removed linked record's absence (`linkedRemoval`, `verification.verified`). `residue` names what stays — pages, layouts, an answered or shared question form, a business object that could not be read — each with the route that removes it; when anything is left the result reads verified with a caveat (`mutationPhase: verified_with_caveat`, `caveats` naming each record), so tell the person what stays rather than saying the event is fully gone. Pages last saved before the `pageScanDays` window are never read, so on a tenant with older pages the result carries that caveat too; a larger `pageScanDays` (up to 365) looks further back. A page is recycled with `imis_document action=delete`; an answered form stays with its answers.
3. Both steps are irreversible: iMIS never reactivates a cancelled event. Confirm with the user first, and tell them the cancelled registration orders remain in iMIS (there is no REST delete for orders).

---

### Register an Attendee

1. **Find the contact**: `imis_find_member` with name, email, or ID. If the person is not in iMIS and the user wants them added, create them (guarded): `imis_party_profile action=preview_create_contact contact={"firstName":"…","lastName":"…","email":"…"}` → `action=create_contact` with the same contact and the exact `confirmationText`. The preview lists `possibleDuplicates` (same name or email) — check them with the user first; the create reads the contact back and returns its `partyId`.
2. **Check capacity first** (see Check Capacity below). If at capacity, offer waitlist (see Waitlist Handling below).
3. **Check for existing registration**: `imis_manage_event_registration action=status eventId={eventId} partyId={partyId}`
   - If already registered, inform the user (the register preview also blocks a second active registration)
4. **Register** (guarded): either `imis_register_for_event action=preview` → `action=submit` with the returned `confirmationText`, or the fuller `imis_manage_event_registration action=preview_register` → `register`. eventId={eventId} partyId={partyId}, plus `registrationOptionFunctionId` when the event has more than one option.
   - **Tell the person the charge**: the preview's `charge` names the option, the price sheet this registrant gets (Member or Standard) and the amount in the tenant's currency (`display`, e.g. `USD 60.00`). RegisterEvent raises an unpaid invoice for it straight away.
   - **Ask the registration questions**: the preview lists every question the registrant is asked (`questions.asked`: text, type, choices, required). A required question without an answer refuses the registration and names the question. Ask the person, then preview again with `questionAnswers` (`{"Dietary needs": "Vegan"}`, keyed by question text or `propertyId`). The answers are stored as a FormResponse once the registration reads back (`proof.answersReadbackVerified`); on `partial_write`, follow `recovery` and do not register again.
   - **Sessions (program items) cannot be added over REST**: iMIS RegisterEvent ignores a session `functionId`, so a register request naming one is refused before anything is written. Register for the option, then add the session on the native event page while working on behalf of the registrant (`imis_manage_event_registration action=preview_change_registration addFunctionId=…` returns that route).
5. **Confirm**: the submit reads the registration back; report its status (including whether a waitlist request actually waitlisted)
6. **Report**: Show remaining capacity after registration

---

### Cancel a Registration

1. **Find the registration**: `imis_manage_event_registration action=status eventId={eventId} partyId={partyId}`
2. **Confirm**: Show registration details to the user and ask to confirm cancellation
3. **Cancel** (guarded): `imis_manage_event_registration action=preview_cancel` eventId={eventId} partyId={partyId} (returns `confirmationText`), then `action=cancel` with that exact text
4. **Log a contact interaction** (gated): `imis_contact_activity action=preview_log partyId={partyId} description="Event registration cancelled for {eventName}"` (optionally `details=...` and an `interactionTypeCode` resolved via `action=list_types`), then `action=log` with the returned exact `confirmationText`.
5. **Check waitlist**: If there are waitlisted registrations for this event, offer to promote the next person in line (see Waitlist Handling)
6. **No payment for a cancelled place**: after a cancel the Invoice row can still read its old balance for a while; when the registration's order rows owe nothing the readback marks it `paymentSuggested: false` and offers no payment next action. Never take a payment for a cancelled registration; a cancellation fee still owed is suggested for no more than the order rows owe. If `financial.paymentReconciliation` is present, several invoices are open and iMIS does not say which one the debt is on: check `imis_billing_summary` before taking any payment.
7. **Financial note**: If the member has already paid, process the refund/reversal with the gated tools (`imis_payment_adjustments` reverse, `imis_refund_returned_order_payment`, or `imis_return_order_invoice`); only a credit memo with no tool lane needs the iMIS staff site

---

### Check Capacity / Spots Remaining

Quick answer: `imis_event_360 action=list_upcoming` returns each event's capacity (null when no limit is set), the registrant and cancellation counts iMIS keeps, and spots left. For an exact count:

1. **Get event**: `imis_entity action=get entityType="Event" id={eventId}` (or `imis_event_360 eventId={eventId}`) — read Capacity
2. **Count registrations**: `imis_manage_event_registration action=list_registrants eventId={eventId}` — `totalCount` is every registration on the event; `counts` (by status, Registered and Canceled, plus `waitlisted`) cover only the rows returned, as `countsCover` says. When `complete` is false, raise `maxRegistrants` (up to 250); for a larger event count active registrations with an Event Registrants IQA via `imis_query` instead.
3. **Calculate**: Remaining = Capacity - Active Registrations
4. **Present**:
   - Total capacity: X
   - Currently registered: Y
   - Spots remaining: Z
   - Status: "Open" / "Nearly full" (< 10%) / "Full" / "Waitlist active"

---

### Waitlist Handling

When an event is at capacity:

**Adding to waitlist:**
1. Inform the user the event is full
2. Offer to add the person to the waitlist
3. Register to the waitlist: `imis_register_for_event action=preview waitlist=true` → `action=submit` with the returned `confirmationText`
4. Log a contact interaction (gated): `imis_contact_activity action=preview_log partyId={partyId} description="Added to waitlist for {eventName}"` → `action=log` with the returned exact `confirmationText`
5. Tell the user their position (count of existing waitlisted registrations + 1, from a complete roster as in step 1 below)

**Promoting from waitlist (when a spot opens):**
1. List waitlisted registrations: `imis_manage_event_registration action=list_registrants eventId={eventId} maxRegistrants=250` — rows with `waitlisted: true`. Rows are not in date order, so use them only when `complete` is true. If it is false, the roster is a subset: read the queue from a completeness-checked Event Registrants IQA via `imis_query`, or from the native event waitlist, instead.
2. Identify the next person: the earliest `orderDate` among every waitlisted registration
3. Plan the promotion: `imis_manage_event_registration action=preview_waitlist_promotion` eventId={eventId} partyId={partyId} — this is preview/planning only (no REST submit); complete the promotion in the native Staff UI
4. Notify: `imis_communication_message_submit` to the member that their spot has been confirmed
5. Log a contact interaction (gated) for the promoted member: `imis_contact_activity action=preview_log partyId={partyId} description="Promoted from waitlist for {eventName}"` → `action=log` with the returned exact `confirmationText`

---

### Transfer / Substitute a Registration

`imis_manage_event_registration action=preview_transfer` **plans** a same-event attendee substitution — moving one event's registration from `sourcePartyId` to `targetPartyId` (e.g. a colleague attending in place of the original registrant). It is **preview/planning only**: there is no `transfer` submit action, because the native cart / Complete Registration legs are not exposed over REST. The plan must be completed in the native Staff UI. It does not move a registration between two different events.

**Same-event substitution:**

1. **Find current registration**: `imis_manage_event_registration action=status eventId={EventId} partyId={sourcePartyId}`
2. **Plan the substitution**: `imis_manage_event_registration action=preview_transfer` eventId={EventId} sourcePartyId={sourcePartyId} targetPartyId={targetPartyId} — returns the planned swap.
3. **Complete it natively**: apply the planned substitution in the iMIS Staff UI; there is no REST submit for transfer.

**Moving someone to a different event** is a cross-event operation, not a transfer: run a guarded `preview_cancel` → `cancel` on the old event, then a guarded `preview_register` → `register` on the new one.

**Then, for either case:**
1. **Log a contact interaction** (gated): `imis_contact_activity action=preview_log partyId={PartyId} description="Registration substituted/moved for {eventName}"` → `action=log` with the returned exact `confirmationText`.
2. **Financial note**: If pricing differs between events, advise on invoice adjustments (handled in iMIS staff site)

---

### Post-Event Attendance Tracking

Record who actually attended after the event has occurred.

1. **List registrations**: `imis_manage_event_registration action=list_registrants eventId={eventId} maxRegistrants=250` (add `includeNames=true` only when names are needed). Use the rows for attendance and the totals below only when `complete` is true; for a larger event, list registrants with a completeness-checked Event Registrants IQA via `imis_query` instead.
2. **Check attendance records**: `imis_entity action=list` LegacyEventFunctionAttendance with appropriate event filters
3. **Update attendance**: For each attendee, use `imis_manage_event_registration action=preview_check_in` then `action=check_in` with the exact returned `confirmationText`; supply the attendance row/function and `creditUnitsEarned` required by the event
4. **Summarize**:
   - Total registered: X
   - Attended: Y
   - No-shows: Z
   - Attendance rate: Y/X as percentage
5. **Log a contact interaction** (gated): `imis_contact_activity action=preview_log partyId={partyId} description="Event attendance recorded for {eventName}"` → `action=log` with the returned exact `confirmationText`

Note: Read LegacyEventFunctionAttendance directly when needed, but keep attendance writes in the guarded check-in owner so row resolution and readback are verified.

---

### Event Revenue / Financial Report

Analyse the financial performance of an event.

1. **Event details**: `imis_entity action=get entityType="Event" id={eventId}` — name, dates, capacity
2. **Pricing**: `imis_manage_event_setup action=status eventId={eventId}` — each option and program item with its default and Members price
3. **Registrations**: `imis_manage_event_registration action=list_registrants eventId={eventId} maxRegistrants=250` — counts by status, and each registration's `totalCharges` and `balance`; totals from these rows are event totals only when `complete` is true (otherwise use a revenue IQA, step 6); `action=reconcile eventId={eventId}` links registrations to their event invoices. For a breakdown by registration option, run an Event Registrants IQA via `imis_query` (or the `EventRegistrantsReport`)
4. **Invoices**: `imis_entity action=list` InvoiceSummary — filter by event-related items to get billed amounts
5. **Payments**: Cross-reference with PaymentSummary for collected revenue
6. **Alternative**: Use `imis_query` with a revenue-focused IQA query if one exists (check `imis_document action=browse` path `$/Common/Queries/Events/`)

**Present**:
- Total registrations and breakdown by type (early bird, regular, VIP, etc.)
- Expected revenue (registrations x price per tier)
- Invoiced amount (from InvoiceSummary)
- Collected amount (from PaymentSummary)
- Outstanding balance (invoiced - collected)
- Revenue per registrant
- Capacity utilisation percentage

---

### Bulk Registration for Multiple People

Register several people for the same event at once.

1. **Confirm event**: Verify the event ID and that it has sufficient capacity
2. **Get the list**: Ask the user for the list of people (names, emails, or IDs)
3. **Read the roster once**: `imis_manage_event_registration action=list_registrants eventId={eventId} maxRegistrants=250` — the party ids already registered
4. **For each person**:
   a. Find or verify: `imis_find_member` with their name/email/ID
   b. Check existing: skip anyone on the roster with status Registered. When the roster's `complete` is false, a person missing from it may still be registered: check them with `imis_manage_event_registration action=status eventId={eventId} partyId={partyId}` (the register preview also blocks a second active registration)
   c. Check capacity: Verify spots remaining
   d. Register: `imis_register_for_event action=preview` then `action=submit` with the returned `confirmationText`, eventId={eventId} partyId={partyId}
5. **Present summary table**:
   - Name | Status (Registered / Already Registered / Failed / Waitlisted)
   - Total successful registrations
   - Remaining capacity after all registrations

---

### List Registrations

`imis_manage_event_registration action=list_registrants eventId={eventId}` answers "who's registered?": one compact row per registration (`eventRegistrationId`, `partyId`, `status`, `waitlisted`, `orderNumber`, `orderDate`, `totalCharges`, `balance`) and `counts` by status. Names and companies are personal data and appear only with `includeNames=true`. Default 50 rows (`maxRegistrants` up to 250), not in date order. `totalCount` is every registration on the event; `complete` says whether every one was returned, and `countsCover` what `counts` cover. Never present a subset as the whole roster: say how many of `totalCount` are shown, or use an Event Registrants IQA for a larger event.

Present a table of registrants:
- Name (when requested), Party ID, Registration Date, Status, Balance

Sessions per registrant and richer columns come from an Event Registrants IQA via `imis_query` (or the `EventRegistrantsReport`). `imis_entity` lists of `EventRegistration`/`EventRegistrationSummary` need both EventId and PartyId, so they read one person's registration, not a roster.

---

### Event Details

Use `imis_entity action=get entityType="Event" id={id}` for the full event record:
- Name, description, dates (start/end), location
- Status (a newly created event defaults to 'P'; read back via `imis_event_360`, change via `imis_manage_event_setup action=preview_update` → `update`)
- Capacity and current registration count (`imis_manage_event_registration action=list_registrants`: `totalCount`, with counts by status when `complete` is true)
- Pricing and registration questions: `imis_manage_event_setup action=status eventId={id}`

---

### Sessions / Functions

EventFunction entities represent sessions, tracks, or breakout rooms within an event.

- Read the functions from their parent event — `imis_event_360 eventId={id}` (functions section), or the `Functions` collection on the Event read via `imis_entity action=get entityType="Event" id={id}`. There is no useful global EventFunction list, and you should not read EventFunction rows directly by id.
- Create sessions with `programItems` (and bookable options with `registrationOptions`) in the design, from scratch; add more to an existing event with `preview_update` → `update` (see Create a New Event).
- Registering a person into a session is native only (see Register an Attendee).

---

### Registration Questions (dietary needs, access requirements, custom data at registration)

Questions are part of the event setup. Put `questions` in the `eventDesignJson` of `preview_create_from_design` → `create_from_design`, or in the `setupPatchJson` of `preview_update` → `update`:

```json
"questions": {
  "event": [
    { "text": "Would you like a printed programme?", "answerType": "yesNo" }
  ],
  "functions": {
    "REG": [
      { "text": "Dietary needs", "answerType": "dropdown", "required": true, "options": ["None", "Vegetarian", "Vegan"] },
      { "text": "Access requirements", "answerType": "multilineText" }
    ]
  }
}
```

- `answerType` is one of `yesNo`, `integer`, `decimal`, `text`, `multilineText`, `dropdown`; `options` is for `dropdown` only.
- `event` questions show to every registrant; `functions.<CODE>` questions show with that registration option or program item (a bare function code on the event, or one added in the same patch).
- Each section you list is that section's whole question list; a section you leave out is unchanged. A question keeps its stored answers while its text is unchanged.
- Questions are shown unless `hidden: true`. When every question in a section is hidden, registrants see no questions there, and the preview warns.
- To take a question away once it has answers, or on a copied or templated event, hide it: the preview refuses the removal and returns `suggestedQuestions`, the same change with that question kept hidden.
- The preview's `questions` lists every question in each section with its type, choices and required flag, and `formRecord` says that a Forms record (FormDefinition) will be created or updated to hold them. Event removal lists that record and removes it when nobody answered it.
- Gates: run `action=preview_update` (or `preview_create_from_design`), show the person the planned `questions` change and any `warnings` or `suggestedQuestions`, then call `action=update` (or `create_from_design`) with the exact `confirmationText`. Report success only when `outcome` is `verified` and `verification.questionsMatched` is true. On `partial_write`, follow `recovery`: rerunning the same patch reuses the question form already written.
- Read the stored questions with `imis_manage_event_setup action=status eventId={id}` (`questions`, each with its `propertyId`).
- Read the answers with `imis_event_360 action=question_responses eventId={id}`: per question how many answered and the count per answer, and each registrant's answers by party id. Add `partyId` for one registrant, and `includeNames=true` only when names are asked for.

---

### Showcase Layout (which page staff and the public see)

Set `showcaseLayout` in the design (`create_from_design`) or in a setup patch (`preview_update` → `update`):

```json
"showcaseLayout": { "staff": "console", "public": { "contentPath": "@/Shared_Content/Events/Our_Event_Page" } }
```

- `"console"`: the event console (staff dashboard / public event detail page).
- `"simple"`: the native simple event page for that view.
- `{ "contentPath": "@/..." }`: a published content page. A missing, non-content or draft-only page is refused before anything is written.
- A view you leave out keeps what it has. A view never set reads as `systemDefault` in `status` and shows the console page. iMIS cannot blank a view once it is set, so to go back to the default page, set `"console"`.
- Gates: run `action=preview_update` (or `preview_create_from_design`), show the person the planned `showcaseLayout` change, then call `action=update` (or `create_from_design`) with the exact `confirmationText`. Report success only when `outcome` is `verified` and `verification.showcaseLayoutMatched` is true. The readback proves which page iMIS stores for each view, not how that page renders.
- Read both views with `imis_manage_event_setup action=status eventId={id}` (`showcaseLayout`).

---

### Add a Panel to Every Event

To add a panel to events, so that every event shows extra data (a custom Event business object with its panel), use `imis_page_iparts action=extend_event_console`. It extends the one event console iMIS shows every event through. `imis_page_builder recipe=event` builds a standalone event microsite page instead, which Events > Find events and the standard event links never open.

- **Audience:** choose with the person. `staff` is the staff event console that Events > Find events opens; `public` is one website's public event page (name it with `publicWebsite`); or `both`.
- **Inputs:** pass the Event-parent `panelDefinitionIds` and a Published, non-system `consoleFolder` for the copies. For a multi-instance Event object, create its panel with `imis_panel_definition designObject.isMultipleInstance: true`, so every row is listed.
- **Preview:** the first call previews every copy, tab, shortcut and placement, and the reach. Events whose own Event Showcase Layout pins another page, such as Simple_Event_Dashboard or Simple_Event_Display, never show the panel; tell the person which.
- **Write:** repeat with the exact `confirmationText`. The write runs as a job in AgentZ v0.7.37 or later and returns a `jobId`. Follow it with `event_console_status`, read `event_console_result`, stop it with `cancel_event_console`, and continue an interrupted extend with `resume_event_console`. Status and result calls only read and never move the iMIS browser, so polling every few seconds is safe; a job step that found the browser busy until its deadline did not run, and its result says `timed_out`, naming the holder. Status gives the step as "step n of N" and the real time the job has run; a queued job names the other AgentZ job on this iMIS it waits behind (`waitingFor`: its kind, who started it, when), or says it is starting. Relay that, not "waiting for another job" on its own. The result states its outcome in `mutationPhase` (`verified`, or `submitted` with `verification.shortcutsNotYetLive` naming a shortcut iMIS has saved but not yet made live, or `verification.notYetPublished` naming a page iMIS is still publishing). A restore with nothing of AgentZ's left writes nothing and says `nothing_to_restore`. A public restore that deletes the website's own EventDetail AgentZ created reads verified when the address falls back to the All Sites EventDetail (`deleted_falls_back_live_verified`). An extend whose panel is already in place and Published writes nothing and says `already_in_place`.
- **Still publishing:** the shortcut moves only once every copy reads Published. If iMIS is still deploying a copy (Publish Pending) after about 15 minutes, the job stops as interrupted with `interruption.reason` `publish_pending`: the copies were published, nothing was undone and the stock console still shows. Tell the person, and resume it later with `resume_event_console`. Never restore it as a failure.
- **Outcome unknown:** if a copy's publish was sent, its step timed out, and iMIS could not be read afterwards (for example 503), the job stops as interrupted with `interruption.reason` `publish_outcome_unknown`. The copy may already be published. Do not publish it again or restore it for this. Tell the person, wait until iMIS answers, then resume with `resume_event_console`: the resume reads each copy first and never publishes one that reads Published or Publish Pending.
- **Verify:** audit `/Staff/EventDashboard?EventKey=<event code>` (or the website's `/EventDetail?EventKey=<event code>`) with `imis_rendered_page_audit` and the rows' text as `expectedText`.
- **Signed out:** signed-out display of an Event panel on a public page is unverified.
- **Remove:** `restore_event_console` (preview, then confirm, with the same `audience`) puts the stock pages back and recycles AgentZ's unedited copies.

---

## Step 2: Summarize

Present results clearly:
- Event details with dates, location, and status
- Registration confirmation or action taken
- Capacity: X of Y spots filled (Z remaining)
- Waitlist status if applicable
- Financial impact if applicable (amount invoiced)
- Any issues encountered (full event, duplicate registration, API limitations)
- Next steps or follow-up actions needed
