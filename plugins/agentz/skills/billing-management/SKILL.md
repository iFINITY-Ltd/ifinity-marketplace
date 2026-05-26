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
- **InvoiceSummary**: An invoice sent to a member for dues, events, products, etc.
- **PaymentSummary**: A payment received against an invoice
- **InvoicePayment**: Links a specific payment to a specific invoice (for posting payments)
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

### Set Up Auto-Pay
1. Verify member has an active subscription: `imis_billing_summary` partyId={id}
2. Create instruction: `imis_manage_autopay` action="create" with subscription details
3. Confirm setup
4. Note: The actual payment method (credit card, bank account) must be entered by the member through the iMIS website — CC details CANNOT be submitted via API.

### Modify Auto-Pay
- Update instruction: `imis_manage_autopay` action="update" instructionId={id}
- Deactivate: `imis_manage_autopay` action="deactivate" instructionId={id}

### View Scheduled Payments
```
imis_scheduled_payments partyId={id}
```
Shows both general scheduled payments and pledge-specific schedules.

### Troubleshoot Auto-Pay Failures
See the detailed decision tree in the troubleshoot-member skill. Quick summary:
1. `imis_autopay_summary` — is auto-pay configured?
2. Check AutoPayAccount — is the payment method expired?
3. `imis_gateway_accounts` — is the gateway active?
4. `imis_scheduled_payments` — are payments stuck in queue?
5. Common fixes: reactivate instruction, advise member to update payment method

---

## Payment Posting

### Post a Cash/Check Payment to an Invoice

For recording a payment received by cash, check, or ACH against an outstanding invoice.

1. **Find the invoice**: `imis_billing_summary` partyId={id} — identify the outstanding InvoiceSummary
   - Note the InvoiceNumber and Balance
2. **Verify the amount**: Confirm the payment amount with the user
3. **Create the payment**: `imis_entity_create` entityType="InvoicePayment" with JSON data:
   ```json
   {
     "InvoiceNumber": "INV-12345",
     "Amount": 150.00,
     "PaymentMethodCode": "CHECK"
   }
   ```
   - Valid payment methods: CASH, CHECK, ACH — NOT credit card (PCI compliance)
4. **Verify**: Re-check `imis_billing_summary` partyId={id} to confirm the invoice balance decreased
5. **Log**: `imis_log_activity` partyId={id} subject="Payment posted: {amount} to invoice {invoiceNumber}"

**IMPORTANT**: Credit card payments CANNOT be processed via the API. Members must pay by card through the iMIS website or staff site.

**NOTE**: InvoicePayment supports `create` only — you cannot list or retrieve payment records through this entity. Use PaymentSummary to verify payments.

---

## Invoice Management

### View Outstanding Invoices
```
imis_billing_summary partyId={id}
```
Shows all subscriptions, invoices, and payments for the member.

For more detail: `imis_entity_list` InvoiceSummary with filter `BillToPartyId={id}`

### Invoice Details
- InvoiceNumber, InvoiceDate, Description
- BillToParty (who owes)
- Balance (outstanding amount)
- FinancialEntity (which book/entity)

---

## Refund / Credit Processing

**API Limitation**: Direct refunds and credit notes CANNOT be processed via the iMIS REST API.

When a refund is requested:
1. **Document the request**: `imis_log_activity` partyId={id} subject="Refund requested: {amount} — {reason}" interactionType="Note"
2. **Check the original payment**: `imis_entity_list` PaymentSummary with PartyId filter — find the payment to be refunded
3. **Provide information for manual processing**:
   - Payment reference/ID
   - Original amount
   - Reason for refund
   - Invoice number affected
4. **Escalation**: Refunds must be processed through the iMIS staff site:
   - Credit memos: Commerce > Adjusting and reversing order invoices
   - Payment reversals: Must be done by finance staff
5. **Follow up**: After the refund is processed in iMIS, verify with `imis_billing_summary`

---

## Financial Diagnostics

### "Why was this member charged the wrong amount?"

1. `imis_billing_summary` partyId={id} — check Subscription ItemId and recent invoices
2. `imis_entity_list` ItemPrice with filter `ItemId={subscription_item_id}` — see pricing tiers
3. `imis_entity_get` Party/{id} — check CustomerType (member type controls pricing tier)
4. Compare expected price for their member type vs actual invoice amount

**Common causes:**
- Wrong member type → billing at wrong rate
- Pricing changed but existing subscription hasn't renewed yet
- Prorated amount for mid-cycle change (this is correct behaviour)
- Chapter/section surcharges adding to total (check for additional Subscriptions)
- Multiple overlapping subscriptions

### "This member has an outstanding balance — what's owed?"

1. `imis_billing_summary` partyId={id} — comprehensive view
2. `imis_entity_list` InvoiceSummary with filter `BillToPartyId={id}` — all invoices with balances
3. Present:
   - Invoice Number | Date | Description | Amount | Balance
   - Total outstanding
   - Oldest unpaid invoice (aging)

---

## Statement / Receipt Generation

**Formal PDFs**: Printed statements and official receipts must be generated through the iMIS staff site or SSRS reports.

**Data view via API**: Compile the information for review:

1. `imis_billing_summary` partyId={id} — subscriptions, invoices, payments
2. For detailed statement data:
   - `imis_entity_list` InvoiceSummary with BillToPartyId filter — all invoices
   - `imis_entity_list` PaymentSummary with PartyId filter — all payments
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

## Step 4: Present Findings

- **Auto-pay status**: Active/inactive, what it covers, payment methods on file
- **Billing status**: Outstanding balance, overdue invoices, subscription status
- **Upcoming**: Next scheduled payments, next billing dates
- **Issues**: Expired payment methods, failed payments, wrong amounts
- **Actions taken**: Payments posted, auto-pay changes made
- **Escalation**: Items requiring iMIS staff site (refunds, CC updates, invoice adjustments)
