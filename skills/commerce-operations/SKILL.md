---
name: commerce-operations
description: >-
  iMIS commerce and order operations — product/item catalog, pricing, carts,
  orders, checkout readiness, and collection runs. This skill should be used
  when the user says "product", "item catalog", "price sheet", "shopping cart",
  "order", "checkout", "can members buy", "set up a product", "order history",
  "run the autopay collection", "recurring donation checkout", or when working
  with what the tenant sells and how orders flow. Invoice/billing-cycle
  questions belong to billing-management; one-off gift processing belongs to
  fundraising; event registration purchases belong to event-management.
argument-hint: "[item-code-or-action]"
---

# Commerce & Order Operations

What the tenant sells (items, prices), how it is bought (cart, checkout), and what happened (orders). Read with the profile tools first; every write is preview → exact confirmation → readback.

## Item Catalog

### Read (always start here)
```
imis_item_catalog_profile action="inventory"                 # items, item classes, price sheets, billing items
imis_item_catalog_profile action="resolve_party_item_price" partyId={id} itemId={id}   # optional effectiveDate=YYYY-MM-DD
```
`resolve_party_item_price` answers "what would THIS member pay for THIS item" using the tenant's own pricing resolution (GET PartyItemPrice; `selectedPrice` is what iMIS charges, special price rules included) — use it instead of guessing from price-sheet rows.

### Write (gated)
```
imis_item_catalog_setup action="preview_create" entity="Item"|"ProductItem"|"ItemPrice"|"ItemClass"|... payloadObject={...}
→ imis_item_catalog_setup action="create" entity={same} payloadObject={same} confirmationText="{exact text from preview}"
```
Covers items, product items, item sets/classes, prices, price-sheet groups/product prices, and legacy billing/product records. After a price change, re-resolve a representative party's price to prove the change is being consumed, not just stored.

- **Create vs update**: a create for a record that already exists (an ItemPrice row, or a composite `~Name|CustomerTypeCode` PriceSheetProductPrice row) is refused at preview with nothing sent — use `action=preview_update` with the id the refusal names.
- **ItemPrice**: ids are `<ItemId>:<PriceSheetId>:<UomId>:<CurrencyCode>`; list with `paramsObject={"ItemId":"…"}` (optionally `PriceSheetId`). ItemPrice supports create and update only — no delete.
- **Linked prices**: every price preview lists `everyChange` — the record's own prices plus each linked price iMIS will move. Setting an event item's default (Standard) price rewrites its NM PriceSheetProductPrice row's regular price (`ItemPrice2`); writing an event item's NM row *may or may not* move the default. The confirmation binds the linked prices as read, and the write returns `linkedChangeReadback`, marking a possible change "(changed)" or "(unchanged)". iMIS can serve a cached read of a linked price for a couple of minutes — read again before reporting a mismatch.
- **Event prices**: set an event's default and member prices with `imis_manage_event_setup` `itemPrices` (`amount`, `memberAmount`) — see event-management.
- **Free (£0) prices**: in iMIS a defined zero carries `IsAmountDefined: true`; `{Amount: 0}` without it is stored as an *undefined* price (shown as "Pricing is undefined"). This tool adds `IsAmountDefined: true` to a zero amount and says so in the preview.

### Membership dues structure
For dues items, member types, a billing cycle and tiered prices in one step:
```
imis_item_catalog_setup action="preview_membership_plan" membershipPlanObject={ duesItems: [...], memberTypes: [...], billingCycle: { name, copyFrom, memberTypes, duesItems }, prices: [{ item, customerType, regular, early?, late? }] }
→ imis_item_catalog_setup action="apply_membership_plan" membershipPlanObject={same} confirmationText="{exact text from preview}"
```
One preview and one confirmation cover every record; the plan only creates, and every record is read back. If a record fails, apply stops and returns a `planRecord` of what it created. The tool's `membershipPlanObject` schema gives the full shape.
- **Joining fee.** iMIS has no one-off or join-only billing item: every item a billing cycle bills, and each member type's primary fee, bills again at every renewal. So a dues item named like a joining fee (join, initiation, entrance, one-off) is refused unless it has `billsEveryRenewal: true`, and the fee goes in `joiningFee` instead, built the iMIS way:
  1. **Ask the fee and who counts as a new joiner.** The plan's price source charges the fee to a contact whose Paid Through date is empty (iMIS's own definition of a new customer) and 0 to everyone else, judged when the bill is produced. So a lapsed member who rejoins has a Paid Through date and is not charged; tell the person. Charging rejoiners is not available in the plan.
  2. **The plan.** `joiningFee: { code, name, amount, incomeAccount?, deferredIncomeAccount? }`, with `billingCycle`. The plan makes (or reuses) the price source, a Miscellaneous billing item priced 0 on the cycle, and a special price rule for each of the cycle's member types; all in the one preview and confirmation, each read back. It needs the AgentZ browser: without it the apply is refused before anything is written. A first apply may end `joining_fee_price_source_pending` (the price source is made and nothing else): tell the person the plan is waiting on iMIS, then preview and apply the same plan again later.
  3. **Tell the person what to check.** The preview's `joiningFee.notProven` says it: the plan bills nothing, so they should bill one new joiner and one renewal and check the fee appears once. If a contact qualifies for several special prices, iMIS charges the lowest.
  4. **Removal.** `remove_membership_plan` removes the fee item and its rule with the rest of the plan. Never reuse a joining fee code. The price source is kept (listed in `kept`, since another plan with the same fee may use it); to remove it, ask the person, then use the call `kept[].toRemoveIt` gives.
- **Prorating.** The preview's `prorating` block shows current values: each dues item's rule in plain words and the site's prorate schedules with each month's multiplier. A `scheduleId` the site does not have is refused. The preview also reads the site's Prorating choice and Start date control (`prorating.siteSettings`) and, when the site prorates, Billing time on Settings › Membership in the AgentZ browser. Each item's `joinerPays` is one answer to what a member who joins part-way through the year pays (full price on an anniversary site or under Do not prorate; the months left, or the item's schedule rate, on an annual site): give the person that answer as given. Every amount is in the site's currency (`currency`, its **Default currency code** on Settings › Finance › General), for example "USD 10.00". When the site never saved one, the preview returns `currencyNotSaved: true`, the amounts say "(no site currency set)" and `inPlainWords` ends by saying so and where it is set; tell the person that, and never name a currency for them. When it could not be read, the amounts say "(currency not read)". The preview's `inPlainWords` restates the whole plan, one line per record, with every price each record sets (a dues item's member and non-member price: an unasked non-member price is the member price, and says so) and the mid-year answer; show it to the person before they approve. If Billing time could not be read, `joinerPays` says both answers and `siteSettings.readBillingTimeWith` names the read that settles it (`imis_group_membership action=read_membership_settings readPage=true`). Leave a dues item's `prorate` out unless the person asked for one: iMIS's default is no prorate rule of its own, which matters only under Special prorating. The plan never changes these site-wide settings; change them as a separate approved step with `preview_update_membership_settings` / `update_membership_settings`. The plan does not create prorate schedules: create one with `imis_invoice_billing_records action=preview_create entity=ProrateSchedule` (12 months only; it is read back through the filtered list). Change its description or monthly rates later with `preview_update` / `update` (on its own form through the AgentZ browser); delete it with `preview_delete` / `delete` (refused while a billing product uses it).
- **Billing cycle to copy.** A missing or unknown `copyFrom` is refused with one sentence on why (iMIS bills renewals through billing cycles, and the new cycle is a copy of one the site uses) and the closest cycles that bill dues; tell the person that sentence and offer those cycles rather than listing every cycle.
- **Prices.** apply's `priceReadback` reads each asked price back from the dues item (member, non-member) or the price-sheet row (early, regular, late); the plan is verified only when each matches. A dues item's Standard and Member item price rows hold no price in iMIS and read back as "no price".
- **GL accounts.** The preview's `glAccounts` names each dues item's income and deferred income GL account and its source (this plan, the template item, or blank); a blank account is a warning. Pass `incomeAccount` / `deferredIncomeAccount`, or a `templates.duesItem` that has them.
- **Copied cycle.** The preview's `inheritedFromCopy` lists the notice templates (by name), AutoPay option and member type changes the cycle takes from `copyFrom`. Ask the person; set `billingCycle.inherited.<notificationTemplates|autoPay|memberTypeChanges>` to `"clear"` for any they do not want.
- **Removing a plan.** Keep apply's `planRecord`. `action="preview_remove_membership_plan" membershipPlanRecord={planRecord}` → `action="remove_membership_plan"` with the exact `confirmationText` deletes price rows, cycle, member types, then dues items, each read back not found, and reads every record again at the end. It refuses the whole removal, naming what is involved, if a record no longer carries the identity it was created with, or a member type or dues item is in use (checked again right before each of those is deleted) (contacts, subscriptions and invoices, other price-sheet rows, member types or cycles).
- A dues item's id is its code (`DUES/3YEAR` reads back as `3YEAR`); only chapter items read back as `CHAPT/<code>`. A billing cycle's id is its Name.
- LegacyBillingItem `ProrateRule.ProrateRule`: 0 (None) and 2 (Custom, prorated by the named ProrateSchedule) are kept; 1 (StandardMonthly) is refused because iMIS stores it as 0. In a plan, use `prorate: { rule: "none" | "custom", scheduleId? }`.
- LegacyBillingItem `PriceRulesExist` ("Use special pricing") is never returned by iMIS, and the item's special price rules apply only while it is true. An update keeps it on when the item's price rows hold special price rules (shown in `unreturnedMembers`) and refuses `PriceRulesExist: false` then; to stop special pricing, remove the rules first. Check the effect with `imis_item_catalog_profile action=resolve_party_item_price`.

## Commerce System Settings

```
imis_commerce_system_setup action="inventory"    # read commerce-wide settings
imis_commerce_system_setup action="preview_update" ... → action="update" ... confirmationText=...
```
Tenant-wide commerce configuration. Change settings only with explicit user intent — they affect every purchase path.

## Carts and Checkout

```
imis_cart_operations action="get"|"list"                     # read cart state
imis_cart_operations action="preview_update"|"preview_remove_line"|"preview_submit"|"preview_clear" → gated mutation with confirmationText
imis_gateway_checkout_readiness ...                          # is a real checkout possible on this tenant?
```
Cart, order and ItemSale confirmations are the shared preview token: it binds this tenant, the cart as read at preview (for `clear`, the named user's carts; for `create_order`, whether the order number already reads back; for an ItemSale send, the recipient's communication log) and the exact payload. Send it unchanged; if anything changed, the write is refused with nothing sent, so run the preview again. `create` requires the cart's `UserId` and binds that owner's carts, so a confirmation creates one cart and the same text sent again is refused; an inline `submit` must name a stored cart's `CartId` (create the cart, then submit it). `delete` names every cart of the cart's owner (`cartsThatMayBeRemoved`: on iMIS 20.3.235 a Cart DELETE also removed the owner's other cart), binds them all and reads each back (`otherCartsRemoved`, `otherCartsKept`). A cart that names no owner in the Cart listing or when read by id (an abandoned anonymous basket) is not counted as anyone's: create, delete and clear leave it out of the bound set and say how many they left out (`ownerlessCartsLeftOut`); a cart that cannot be read still refuses. Clearing another user's carts is not supported by the Cart CLEAR route on 20.3.235 (it reads back as `clear_readback_mismatch`). `clear` requires `userId`: the user's carts are listed completely and read back afterwards (`cleared`, `clear_readback_mismatch` when a cart still holds lines, invoices or payments, `clear_submitted_unverified` when they cannot be read). An ItemSale send must name its recipient (`CommunicationRequest.PartyId`; a send without one, or whose recipient's log holds more than 500 rows, is refused) and reports `sent_logged` only when exactly one new CommunicationLogRecipient row appears for the recipient during the send (iMIS's row does not name the request).

`imis_cart_operations` is the LOW-LEVEL cart primitive — avoid it for standard flows that have purpose-built guarded tools (`imis_create_billme_order`, event registration, donation lanes); submit/clear are irreversible and require downstream order/payment readback before claiming completion. `imis_gateway_checkout_readiness` reports whether gateway accounts, payment methods, and settings line up for live checkout — run it BEFORE building any purchase flow so a broken gateway is found before the user-facing failure. Building the checkout PAGE belongs to rise-website-design (`imis_page_builder recipe=cartCheckout`).

## Orders

```
imis_order_processing_records action="inventory"|"list"|"get"    # order records
imis_invoice_billing_records action="get_invoice_order" orderNumber={n}  # full order packet by number
imis_order_processing_records action="preview_order_create" → gated create with confirmationText
```
Read an order packet as evidence; order pricing updates (`preview_order_update_pricing`) and returns/refunds are separately gated lanes (`imis_return_order_invoice`, `imis_refund_returned_order_payment` — see billing-management for the money-movement side). For a "bill me" order, prefer the purpose-built `imis_create_billme_order`.

## Recurring/Scheduled Collection Lanes

```
imis_recurring_donation_checkout action="prepare" ...   # build a HOSTED checkout handoff (no money moves here)
imis_recurring_donation_checkout action="verify" partyId={id}   # verify a completed hosted submission
imis_submit_paycentral_gift ...                          # gated: submit a gift through the hosted payment lane
imis_process_autopay_collection action="preview_process_recurring_donations" → action="process_recurring_donations" confirmationText=...   # gated collection pass (send-due-invoices / retrieve-processed legs have their own preview actions)
```
- `imis_recurring_donation_checkout` does NOT move money itself: `prepare` hands the payer off to a hosted checkout page, `verify` confirms a completed submission afterward — treat it as a handoff, not a charge.
- The gated collection/gift lanes (`imis_process_autopay_collection`, `imis_submit_paycentral_gift`) DO move real money. Always: preview/plan first, show the user what will be charged, require the exact confirmation, then read back the resulting payment/order records. A submitted payment is proven by its readback record, never by the submit response alone.

## Boundaries

- Never construct or log full card/bank details; hosted payment lanes exist so raw instruments stay out of the conversation.
- Catalog readback proves the record exists, not that public/member pricing pages display it — verify the rendered commerce surface for storefront claims.
- Autopay ENROLLMENT and schedule questions belong to billing-management (`imis_manage_autopay`, `imis_scheduled_payments`); this skill owns catalog, carts, orders, and collection runs.
