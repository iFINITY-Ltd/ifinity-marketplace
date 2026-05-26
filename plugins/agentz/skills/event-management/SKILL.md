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
  "create a session", or when working with events, conferences, or meetings.
argument-hint: "[event-id-or-name] [action: register|cancel|create|capacity|waitlist|transfer|attendance|revenue|bulk-register|list|details|sessions]"
---

# Event Management — Full Lifecycle

Manage the complete event lifecycle in iMIS: creation, registration, capacity, waitlists, transfers, attendance tracking, and revenue reporting.

## Step 1: Find the Event

If an event ID is provided in $ARGUMENTS, use `imis_entity_get` Event/{id}.
Otherwise, search with `imis_entity_list` Event or `imis_search` Event to find matching events.

Show: EventId, Name, Status (A=Active, C=Cancelled, X=Closed), Start/End dates, Location, Capacity.

For an overview of all events: `imis_entity_list` EventSummary.

---

## Actions

### Create a New Event

Set up a new event in iMIS.

1. **Gather details** from the user:
   - Name (required)
   - EventId / code (required — typically short uppercase, e.g., "CONF2025")
   - Start and End dates
   - Location / venue
   - Capacity (max attendees)
   - Status: "A" (Active) for immediately open, or draft
   - Description
   - Category (check available: `imis_entity_list` EventCategory)

2. **Create the event**: `imis_entity_create` entityType="Event" with JSON data containing:
   ```json
   {
     "EventId": "CONF2025",
     "Name": "Annual Conference 2025",
     "StartDate": "2025-09-15",
     "EndDate": "2025-09-17",
     "Location": "Convention Centre",
     "Capacity": 500,
     "Status": "A",
     "Description": "Our flagship annual event"
   }
   ```

3. **Set up pricing** (optional): Create ItemPrice records for the event
   - `imis_entity_create` ItemPrice with ItemId={eventId} and pricing tiers

4. **Create sessions/functions** (optional): EventFunction entities for breakout sessions
   - Note: EventFunction cannot be listed globally; access by specific ID after creation

5. **Verify**: `imis_entity_get` Event/{newId} to confirm creation

---

### Register an Attendee

1. **Find the contact**: `imis_find_member` with name, email, or ID
2. **Check capacity first**: `imis_entity_get` Event/{eventId} — read Capacity field, then `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}` — count active registrations. If at capacity, offer waitlist (see Waitlist Handling below).
3. **Check for existing registration**: `imis_entity_get` EventRegistration/{EventId}~{PartyId}
   - If already registered, inform the user (don't create a duplicate)
4. **Register**: `imis_register_for_event` eventId={eventId} partyId={partyId} functionIds={optional session IDs}
5. **Confirm**: Verify registration was created successfully
6. **Report**: Show remaining capacity after registration

---

### Cancel a Registration

1. **Find the registration**: `imis_entity_get` EventRegistration/{EventId}~{PartyId}
2. **Confirm**: Show registration details to the user and ask to confirm cancellation
3. **Cancel**: `imis_entity_update` entityType="EventRegistration" id="{EventId}~{PartyId}" with data setting the registration status to cancelled
4. **Log**: `imis_log_activity` partyId={partyId} subject="Event registration cancelled for {eventName}" interactionType="Note"
5. **Check waitlist**: If there are waitlisted registrations for this event, offer to promote the next person in line (see Waitlist Handling)
6. **Financial note**: If the member has already paid, advise that refunds must be processed through iMIS staff site (cannot refund via API)

---

### Check Capacity / Spots Remaining

1. **Get event**: `imis_entity_get` Event/{eventId} — read Capacity field
2. **Count registrations**: `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}` — count active (non-cancelled) registrations. The `totalCount` from the response gives the count.
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
3. Register with a waitlist status: `imis_register_for_event` (creates the registration), then `imis_entity_update` EventRegistration to set status to waitlisted if needed
4. Log: `imis_log_activity` noting the waitlist entry
5. Tell the user their position (count of existing waitlisted registrations + 1)

**Promoting from waitlist (when a spot opens):**
1. List waitlisted registrations: `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}` — filter for waitlisted status
2. Identify the next person (earliest registration date)
3. Update their registration: `imis_entity_update` EventRegistration to change status to confirmed
4. Notify: `imis_send_email` to the member that their spot has been confirmed
5. Log: `imis_log_activity` for both the promoted member and the event

---

### Transfer Registration Between Events

Move a person's registration from one event to another.

1. **Find current registration**: `imis_entity_get` EventRegistration/{OldEventId}~{PartyId}
2. **Check new event**: `imis_entity_get` Event/{NewEventId} — verify it exists, is active, and has capacity
3. **Cancel old**: `imis_entity_update` EventRegistration id="{OldEventId}~{PartyId}" with cancelled status
4. **Register for new**: `imis_register_for_event` eventId={NewEventId} partyId={PartyId}
5. **Log**: `imis_log_activity` partyId={PartyId} subject="Registration transferred from {oldEvent} to {newEvent}" interactionType="Note"
6. **Financial note**: If pricing differs between events, advise on invoice adjustments (handled in iMIS staff site)

---

### Post-Event Attendance Tracking

Record who actually attended after the event has occurred.

1. **List registrations**: `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}` — get all registrants
2. **Check attendance records**: `imis_entity_list` LegacyEventFunctionAttendance with appropriate event filters
3. **Update attendance**: For each attendee, use `imis_entity_update` LegacyEventFunctionAttendance to mark attended/absent
4. **Summarize**:
   - Total registered: X
   - Attended: Y
   - No-shows: Z
   - Attendance rate: Y/X as percentage
5. **Log**: `imis_log_activity` for the event summary

Note: LegacyEventFunctionAttendance supports update and delete but check what fields are available for your iMIS instance.

---

### Event Revenue / Financial Report

Analyse the financial performance of an event.

1. **Event details**: `imis_entity_get` Event/{eventId} — name, dates, capacity
2. **Pricing**: `imis_entity_list` ItemPrice with filter `ItemId={eventId}` — registration fee tiers
3. **Registrations**: `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}` — count by type
4. **Invoices**: `imis_entity_list` InvoiceSummary — filter by event-related items to get billed amounts
5. **Payments**: Cross-reference with PaymentSummary for collected revenue
6. **Alternative**: Use `imis_query` with a revenue-focused IQA query if one exists (check `imis_document_browse` path `$/Common/Queries/Events/`)

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
3. **For each person**:
   a. Find or verify: `imis_find_member` with their name/email/ID
   b. Check existing: `imis_entity_get` EventRegistration/{EventId}~{PartyId} (skip if already registered)
   c. Check capacity: Verify spots remaining
   d. Register: `imis_register_for_event` eventId={eventId} partyId={partyId}
4. **Present summary table**:
   - Name | Status (Registered / Already Registered / Failed / Waitlisted)
   - Total successful registrations
   - Remaining capacity after all registrations

---

### List Registrations

Use `imis_entity_list` EventRegistrationSummary with filter `EventId={eventId}`.

Present a table of registrants:
- Name, Party ID, Registration Date, Status, Sessions/Functions

Note: EventRegistration and EventRegistrationSummary REQUIRE the `EventId` filter — they cannot be listed globally.

---

### Event Details

Use `imis_entity_get` Event/{id} for comprehensive details:
- Name, description, dates (start/end), location
- Status: A (Active), C (Cancelled), X (Closed)
- Capacity and current registration count
- Pricing: `imis_entity_list` ItemPrice with filter `ItemId={eventId}`

---

### Sessions / Functions

EventFunction entities represent sessions, tracks, or breakout rooms within an event.

- EventFunction **cannot be listed globally** — you must know the specific function ID
- If the user has a function ID: `imis_entity_get` EventFunction/{id}
- For an overview of what sessions exist: check the event detail or use IQA queries
- To create a session: `imis_entity_create` entityType="EventFunction" with event and function details

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
