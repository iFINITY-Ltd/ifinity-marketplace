---
name: billing-management
description: >-
  Manage billing, payments, auto-pay, and financial operations in iMIS. This
  skill should be used when the user says "auto-pay", "recurring payment",
  "scheduled payment", "automatic billing", "payment schedule",
  "why wasn't their payment taken", "set up auto-pay", "deactivate auto-pay",
  "payment failed", "billing automation", "post a payment", "apply payment",
  "invoice", "refund", "credit", "wrong amount", "statement", "receipt",
  "outstanding balance", "overdue", or when troubleshooting billing or
  payment issues.
argument-hint: "[member-name-or-id] [action: auto-pay|payment|invoice|refund|statement]"
---

# Billing & Payment Management

Manage billing operations in iMIS: auto-pay, payment posting, scheduled payments, invoices, and financial troubleshooting.

## Key Concepts

- **Subscription**: The billing product linking a member to their dues (PaidThrough date = membership status)
- **InvoiceSummary**: An invoice sent to a member for dues, events, or products. Read invoices through `imis_invoice_billing_records` rather than raw entity lists.
- **PaymentSummary**: A payment received against an invoice
- **InvoicePayment**: Closed to direct writes — no create/list/get through this entity. Post invoice payments via `imis_pay_open_invoice` and verify via `imis_billing_summary`/PaymentSummary scoped by `PayorParty.PartyId`.
- **imis_invoice_billing_records**: The invoice read tool (InvoiceSummary and related billing records); use it instead of raw `imis_entity action=list` on InvoiceSummary.
- **AutoPayAccount**: The payment method on file (credit card, bank account)
- **AutoPayInstruction**: Rules for what gets paid automatically
- **ScheduledPayment**: Future-dated payments queued for processing
- **PartyPledgeScheduledPayment**: Pledge-specific payment schedules

---

## Auto-Pay Operations

### Check Auto-Pay Status
```
imis_autopay_summary partyId={id}
```
Returns accounts (payment methods), instructions (what gets paid), and scheduled payments in one call.

Every AutoPay and payment-method read shows the schedule, amounts, dates, status, references and the payment method summary iMIS shows (such as "Visa ending 1111"), and never card, bank account or token details; each result says so in `paymentDetails`. When the person asks for card or bank details, say they are not available through AgentZ and that staff can see them in iMIS itself.

### Set Up Auto-Pay
1. Verify member has an active subscription: `imis_billing_summary` partyId={id}
2. Create instruction (gated): `imis_manage_autopay` action="preview_create_instruction" → action="create_instruction" confirmationText="{exact text from preview}"
3. Confirm setup
4. Note: The actual payment method (credit card, bank account) must be entered by the member through the iMIS website — CC details CANNOT be submitted via API.

### Modify Auto-Pay
- Update instruction (gated): `imis_manage_autopay` action="preview_update_instruction" instructionId={id} → action="update_instruction" confirmationText="{exact text from preview}"
- Cancel/deactivate instruction (gated): `imis_manage_autopay` action="preview_cancel_instruction" instructionId={id} → action="cancel_instruction" confirmationText="{exact text from preview}" (or preview_delete_instruction → delete_instruction)
- The cancel confirmations (account and instruction) and every `imis_process_autopay_collection` run are tokens bound to this tenant, the record or collection state the preview read and the inputs: if the instruction changed, or the due/pending invoices moved (a run moves them itself), the submit is refused with nothing sent; preview again rather than retrying. The collection preview says what that covers in plain words (`invoiceSelection`): AgentZ checks the query and the list of invoices due when you approve; iMIS's own task chooses the invoices when it runs.

### View Scheduled Payments
```
imis_scheduled_payments action=list
```
Tenant-wide list — there is no party filter; correlate rows to the member client-side, or use `imis_billing_summary partyId={id}` for the party-scoped view. Shows both general scheduled payments and pledge-specific schedules.

### Troubleshoot Auto-Pay Failures
billing-management configures/repairs auto-pay and posts payments; use troubleshoot-member for a member-reported complaint that needs the full decision tree. See the detailed decision tree in the troubleshoot-member skill. Quick summary:
1. `imis_autopay_summary` — is auto-pay configured?
2. Check AutoPayAccount — is the payment method expired?
3. `imis_gateway_accounts` — is the gateway active?
4. `imis_scheduled_payments` — are payments stuck in queue?
5. Common fixes: reactivate instruction, advise member to update payment method

---

## Payment Posting

### Post a Cash/Check Payment to an Invoice

For recording a payment received by cash or check against an outstanding invoice.

1. **Find the invoice**: `imis_billing_summary` partyId={id} — identify the outstanding InvoiceSummary
   - Note the InvoiceNumber and Balance
2. **Verify the amount**: Confirm the payment amount with the user
3. **Post the payment** (gated; the only invoice-payment route): `imis_pay_open_invoice` action="preview" with the invoice/amount → `imis_pay_open_invoice` action="submit" confirmationText="{exact text from preview}"
   - **paymentRoute=cash** posts a cash or check payment (optional `referenceNumber` ≤9 chars, e.g. a check number)
   - **paymentRoute=paycentral_card** posts a card payment using a fresh `DataVaultPaymentIntentId`
   - There is no ACH route and no `PaymentMethodCode`.
   - The confirmation is a token bound to this tenant, the invoice balance as read at preview, the amount and the reference you supplied. If the balance moved, the amount changed, the day changed (the token binds the posting day), or the token was already used, submit is refused and nothing is posted: preview again. The same token rule applies to `imis_pay_pledge_installment`, `imis_create_billme_order`, `imis_payment_adjustments` reverse, `imis_return_order_invoice` and `imis_refund_returned_order_payment`.
4. **Verify**: Re-check `imis_billing_summary` partyId={id} to confirm the invoice balance decreased
5. **Log** (gated): `imis_contact_activity` action="preview_log" partyId={id} description="Payment posted: {amount} to invoice {invoiceNumber}" → action="log" confirmationText="{exact text from preview}" (set `interactionTypeCode` only after `action=list_types`)

**IMPORTANT**: Card payments require a fresh `DataVaultPaymentIntentId` (paymentRoute=paycentral_card); raw card details CANNOT be submitted via the API.

**NOTE**: InvoicePayment is closed — no create/list/get through this entity. Post via `imis_pay_open_invoice`, then verify via `imis_billing_summary` or PaymentSummary scoped by `PayorParty.PartyId`.

---

## Invoice Management

### View Outstanding Invoices
```
imis_billing_summary partyId={id}
```
Shows all subscriptions, invoices, and payments for the member.

For more detail: `imis_invoice_billing_records action=list entity=InvoiceSummary paramsObject={"BillToPartyId":"{id}"}`

### Invoice Details
- InvoiceNumber, InvoiceDate, Description
- BillToParty (who owes)
- Balance (outstanding amount)
- FinancialEntity (which book/entity)

---

## Refund / Credit Processing

**Available refund/reversal tools** (each gated preview→execute): most refunds and reversals CAN be processed via MCP tools. Only a credit memo with no tool lane needs the staff site.

When a refund is requested:
1. **Document the request** (gated): `imis_contact_activity` action="preview_log" partyId={id} description="Refund requested: {amount} — {reason}" → action="log" confirmationText="{exact text from preview}" (set `interactionTypeCode` only after `action=list_types`)
2. **Check the original payment**: `imis_entity action=list` entityType="PaymentSummary" filter="PayorParty.PartyId={id}" — find the payment to be refunded (prefer `imis_billing_summary` partyId={id})
3. **Process the refund/reversal** with the appropriate tool:
   - **imis_refund_returned_order_payment** — refund a payment on a returned order
   - **imis_payment_adjustments** action="preview_reverse" → action="reverse" confirmationText="{exact}" — reverse a payment
   - **imis_return_order_invoice** — return an order invoice
4. **Escalation**: Only a credit memo with no tool lane needs the iMIS staff site (Commerce > Adjusting and reversing order invoices).

### A payment on the wrong invoice, or on a duplicate contact

Moving a payment is **unapply, then apply credit** (iMIS help: "Transferring a payment"). Never reverse it: a reversal is for money that was never received.

1. **Unapply** (gated): `imis_payment_adjustments` action="preview_unapply" paymentId={id} → show the person `reopens` (each invoice and what it will owe), `resultingOpenCredit` and `adjustmentWarning` → action="unapply" with the exact confirmationText. iMIS unapplies the whole payment; the money becomes an **Open Credit** invoice for the payer (read back in `readback.openCredit`). The adjustment date defaults to today (midnight), the same in preview and submit; pass `adjustmentDate` to both if you set one.
2. **Apply the credit** in iMIS: on the target invoice, **Pay Invoice** > **Apply** (the payer's own credit) or **Apply other credit** (another contact's), then **Submit Order**. AgentZ has no action for this step yet; give the person the payment, the Open Credit invoice number and the target invoice.
3. **Read back** with `imis_billing_summary` for both contacts.

Do not try to move a payment by changing its payer with update_payment: it is refused.
5. **Follow up**: After the refund is processed, verify with `imis_billing_summary`

---

## Financial Diagnostics

### "Why was this member charged the wrong amount?"

1. `imis_billing_summary` partyId={id} — check Subscription ItemId and recent invoices
2. `imis_item_catalog_profile action="resolve_party_item_price" partyId={id} itemId={subscription_item_id}` — the price iMIS resolves for this member; `imis_entity action=list` entityType="ItemPrice" filter="ItemId={subscription_item_id}" shows the price rows
3. `imis_entity action=get` entityType="Party" id={id} — check CustomerType (member type controls pricing tier)
4. Compare expected price for their member type vs actual invoice amount

**Common causes:**
- Wrong member type → billing at wrong rate
- Pricing changed but existing subscription hasn't renewed yet
- Prorated amount for mid-cycle change (this is correct behaviour)
- Chapter/section surcharges adding to total (check for additional Subscriptions)
- Multiple overlapping subscriptions

### "This member has an outstanding balance — what's owed?"

1. `imis_billing_summary` partyId={id} — full billing view
2. `imis_invoice_billing_records action=list entity=InvoiceSummary paramsObject={"BillToPartyId":"{id}"}` — all invoices with balances
3. Present:
   - Invoice Number | Date | Description | Amount | Balance
   - Total outstanding
   - Oldest unpaid invoice (aging)

---

## Statement / Receipt Generation

**Formal PDFs**: AgentZ runs the tenant's statement or receipt report itself: find it with `imis_ssrs_reporting action=profile`, then `action=run_staff_report` runs it in the signed-in AgentZ companion and checks the rendered output and its PDF/Excel export controls. A report the tenant does not have yet is built with `imis_ssrs_reporting action=author_report`: the `invoice` layout preset is one branded invoice; a statement across several invoices is a `tabular` layout with a balance total. A downloaded PDF file is proved only when `action=verify_export_route` returns `downloadedArtifact` evidence.

**Data view via API**: Compile the information for review:

1. `imis_billing_summary` partyId={id} — subscriptions, invoices, payments
2. For detailed statement data:
   - `imis_invoice_billing_records action=list entity=InvoiceSummary paramsObject={"BillToPartyId":"{id}"}` — all invoices
   - `imis_entity action=list` entityType="PaymentSummary" filter="PayorParty.PartyId={id}" — all payments
3. Present as a formatted statement:
   ```
   Member: {name} (ID: {partyId})
   Statement Period: {start} to {end}

   INVOICES:
   Date       | Invoice#  | Description        | Amount   | Balance
   2025-01-15 | INV-1234  | Annual Membership   | $250.00  | $0.00
   2025-03-01 | INV-1235  | Conference Reg       | $150.00  | $150.00

   PAYMENTS:
   Date       | Reference | Method  | Amount
   2025-01-20 | PAY-5678  | Check   | $250.00

   BALANCE DUE: $150.00
   ```

---

## Presenting Billing Findings

- **Auto-pay status**: Active/inactive, what it covers, payment methods on file
- **Billing status**: Outstanding balance, overdue invoices, subscription status
- **Upcoming**: Next scheduled payments, next billing dates
- **Issues**: Expired payment methods, failed payments, wrong amounts
- **Actions taken**: Payments posted, auto-pay changes made
- **Escalation**: Items with no MCP tool lane — CC/payment-method updates (member-entered, PCI) and credit memos with no adjustment/reversal lane. Most refunds and reversals use the gated tools above (`imis_payment_adjustments` / `imis_refund_returned_order_payment` / `imis_return_order_invoice`).

## Dues and Price Set-up

Configuring what dues cost is catalogue work (see commerce-operations):
- A dues structure (dues items, member types, a billing cycle, tiered prices): `imis_item_catalog_setup action="preview_membership_plan" membershipPlanObject={...}` → `action="apply_membership_plan"` with the exact `confirmationText`; one confirmation, every record read back. The preview names each dues item's income and deferred income GL accounts (a blank one is a warning: revenue would post with no GL account) and what the cycle inherits from `copyFrom` (notice templates, AutoPay option, member type changes; `billingCycle.inherited.<group>: "clear"` drops one). The preview also shows each dues item's prorating and the site's prorate schedules as current values, and apply's `priceReadback` reads every asked price back from the record that holds it. iMIS bills every cycle item at every renewal, so a one-off joining fee goes in `joiningFee`: a Miscellaneous billing item priced 0 on the plan's cycle, with a special price per member type read from an Expression Builder property the plan makes, which is the fee for a contact with no Paid Through date and 0 otherwise (commerce-operations has the steps). AgentZ cannot run billing: ask staff to test one join and one renewal. Undo a plan with `preview_remove_membership_plan` → `remove_membership_plan` and apply's `planRecord`; it refuses while contacts, subscriptions, invoices, price sheets or other cycles use what it would delete.
- A single price row: `imis_item_catalog_setup` `entity="ItemPrice"` or `"PriceSheetProductPrice"` with `preview_update` → `update` (a create for a row that already exists is refused; use `preview_update`). The preview lists `everyChange`, including linked prices iMIS moves.
- A dues item's id is its code; a billing cycle's id is its Name. LegacyBillingItem prorating keeps `ProrateRule` 0 (None) or 2 (Custom, by ProrateSchedule); 1 is refused because iMIS stores it as 0.
- **£0 is a defined zero**: a free or complimentary price is stored with `IsAmountDefined: true`; `{Amount: 0}` without it is an *undefined* price. `imis_item_catalog_setup` and `imis_manage_subscription` (`billedAmount: 0` for a complimentary dues line) send the defined zero for 0.

## Related Configuration Tools

- `imis_accounting_configuration_profile action=payment_methods` — read-only: enumerate configured payment methods and payment method sets (`view` all, methods or sets; `methodId` for one method, `setId` for one set, `financialEntityId` to filter methods) before a checkout or auto-pay flow. It does not prove a gateway will accept a method (`imis_gateway_checkout_readiness` does) and does not edit methods (`imis_accounting_configuration_setup` does). `imis_payment_methods` is retired: it still answers for one release and names this call.
- `imis_accounting_configuration_profile action=financial_settings` — read Settings › Finance › General (module default entities, default currency, fiscal year, prepayments and partial payments, refund method, batch mode) and every financial entity with its default flag and taxation method. AgentZ cannot change Finance General yet.
- `imis_group_membership action=read_membership_settings` — read Settings › Membership (accounting method, prorating and the other dues options iMIS stores); `readPage=true` reads the page itself, including Billing time and Paid thru date update.
- `imis_group_membership action=preview_update_membership_settings membershipSettings={...}` → `update_membership_settings` with the exact `confirmationText` — change Settings › Membership on the page (billing interval, accounting method, billing time, paid-through rule, prorating, start date control, grace period, early renewal, chapter roster switches). The preview says each change in the page's words; the write reads the page and the stored values back. Settings are site-wide: say so to the person before asking for approval.
- Prorate schedules: `imis_invoice_billing_records entity=ProrateSchedule` — `list`, `get` (read through the list filtered by its id), `preview_create`/`create` (12 months; iMIS assigns `PR\<Name>\12`), `preview_update`/`update` (`payloadObject` { Description?, Rates: 12 numbers }) on the schedule's own form, and `preview_delete`/`delete` on Membership > Prorating schedules (refused while a billing product uses it); both run through the AgentZ browser because REST cannot update or delete a schedule.
- `imis_automatic_payment_settings` — read/preview/save the tenant-wide automatic-payment settings that allow recurring donations and auto-renewing memberships; saving requires the preview's token (bound to the current switches and the target) and the connected companion; `proof.nativeStaffSaveCompleted` is the native Save step's own answer, and a Save step that did not save is reported as not done even when the readback matches.
