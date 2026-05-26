---
name: member-lifecycle
description: >-
  Create, onboard, renew, reinstate, cancel, resign, or non-renew iMIS
  members. Use when the user says "onboard member", "create a member",
  "new member", "renew membership", "reinstate member", "upgrade membership",
  "downgrade membership", "cancel membership", "resign", "non-renew",
  "membership lifecycle", or asks to change a member's subscription state.
argument-hint: "[member-name-or-id] [action: onboard|renew|reinstate|cancel|non-renew]"
---

# Member Lifecycle

Use this skill for member creation and subscription lifecycle changes. Prefer
read-only discovery first, ask for confirmation before writes, and leave a clear
activity/audit trail.

## Onboard A New Member

1. Gather first name, last name, email, organisation, and intended membership type.
2. Check duplicates:
   - `imis_find_member` with the email address.
   - `imis_search` on Party with first and last name.
3. If no duplicate should be used, create the Party with `imis_entity_create`.
4. Add the membership subscription with `imis_manage_subscription action="create"`.
5. Ask whether to add chapters, committees, or groups, then use `imis_manage_group_member action="add"`.
6. Send a welcome email only after the user confirms the content.
7. Verify with `imis_find_member` and `imis_billing_summary`.

Summarise the PartyId, membership item, billing dates, group assignments, and whether a welcome email was sent.

## Renew, Upgrade, Downgrade, Or Reinstate

1. Find the member with `imis_find_member`.
2. Read billing state with `imis_billing_summary`.
3. Identify current subscription ItemId, PaidThrough date, outstanding invoices, and payment history.
4. For upgrades or downgrades, list candidate membership products before changing anything.
5. Use `imis_manage_subscription action="update"` for renewal, tier change, or PaidThrough correction.
6. For reinstatement, check the lapse duration and whether groups or access were removed.
7. Re-add groups only after confirmation.
8. Log the change with `imis_log_activity`.

If payment allocation, write-off, or card/bank collection is needed, explain that staff-site or payment-gateway handling may be required.

## Cancel, Resign, Or Non-Renew

Before any cancellation write, present the member identity, current membership, PaidThrough date, outstanding balance, group memberships, and auto-pay state.

Ask for confirmation on:
- immediate cancellation vs end-of-term non-renewal
- outstanding balance handling
- group removals
- auto-pay deactivation
- cancellation reason

Use:
- `imis_manage_subscription action="cancel"` for immediate cancellation.
- `imis_manage_subscription action="update"` for non-renewal/end-of-term handling when supported by the client's policy.
- `imis_manage_autopay action="deactivate"` for active auto-pay instructions, after confirmation.
- `imis_manage_group_member action="remove"` for confirmed group removals.
- `imis_log_activity` for the final note.

Summarise the effective date, subscriptions changed, groups removed or retained, auto-pay action, outstanding balance status, and logged activity.
