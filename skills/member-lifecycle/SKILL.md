---
name: member-lifecycle
description: >-
  Create, onboard, renew, reinstate, cancel, resign, or non-renew iMIS
  members. Use when the user says "onboard member", "create a member",
  "new member", "renew membership", "reinstate member", "upgrade membership",
  "downgrade membership", "cancel membership", "resign", "non-renew",
  "membership lifecycle", or asks to change a member's subscription state.
  Use this skill for intentional, healthy lifecycle changes; when the member
  reports a problem or symptom, diagnose with troubleshoot-member first and
  return here only for the deliberate state change.
argument-hint: "[member-name-or-id] [action: onboard|renew|reinstate|cancel|non-renew]"
---

# Member Lifecycle

Use this skill for member creation and subscription lifecycle changes. Prefer
read-only discovery first, ask for confirmation before writes, and leave a clear
activity/audit trail.

**Party discovery tools**: `imis_party_search_compact` returns compact routing fields (IDs, names) for cohort work without dumping full contact payloads — use it before any multi-party workflow. `imis_organization_360` returns one normalized contract for an organization (profile, roster, relationships, finance, groups, data quality). `imis_prospect_opportunities` finds non-members already spending money (subscriptions/invoices/payments) who have not joined — the conversion-opportunity scan. `imis_party_profile` creates a person contact (`preview_create_contact`/`create_contact`), removes one (`preview_remove_contact`/`remove_contact`, see Remove A Contact below) and owns Party reference data and adjunct records (address formats/purposes, prefixes/suffixes, salutations, statuses, notes, images).

## Onboard A New Member

1. Gather first name, last name, email, organisation, and intended membership type.
2. Check duplicates:
   - `imis_find_member` with the email address, then with the full name. A name is tried exactly first (every first/last split, the whole text as a surname), then as name beginnings, then as part of the display name; `matchedBy` says which step matched, so confirm the person when it is not `exact`. A zero result is not proof the person is absent: try the email, a Party ID, or a shorter part of the name.
3. If no duplicate should be used, create the person with `imis_party_profile action="preview_create_contact" contact={firstName, lastName, email?}`, then `action="create_contact"` with the same `contact` and the exact `confirmationText`. The preview lists `possibleDuplicates` (contacts with the same name or email; not a full duplicate check, which is `imis_duplicate_resolution`); the create reads the contact back and returns its `partyId`. iMIS capitalises every word of a name ("de la Cruz" is stored "De La Cruz"): the create then reads "Change verified, with a note" and its `caveats` say what was stored; tell the person. Any other difference is a mismatch. It sets name and primary email only: address, member type, groups and login go through their own tools. Create an organisation with `imis_entity action=create` and `$type` `InstitutionData`. Link a person to their organisation with `imis_party_relationships`.
4. Add the membership subscription with `imis_manage_subscription operation="create"` (set `partyId`, `itemId` (the dues item, e.g. REG), `billSubscription`; run `mode=preview` first, then `mode=submit` with the exact `confirmationText`).
5. Ask whether to add chapters, committees, or groups, then use `imis_group_membership action="add_member"` (run `action="preview_add_member"` first). See Groups below for which groups take members by hand.
6. Send a welcome email only after the user confirms the content.
7. Verify with `imis_find_member` and `imis_billing_summary`.

Summarise the PartyId, membership item, billing dates, group assignments, and whether a welcome email was sent.

To set up a dues structure or membership plan (dues items, member types, billing cycle, prices) rather than one member, use `imis_item_catalog_setup action="preview_membership_plan"` then `action="apply_membership_plan"` with the exact `confirmationText`, and remove one with `preview_remove_membership_plan` / `remove_membership_plan` and the `planRecord` apply returned. iMIS has no one-off joining fee item (every cycle item bills at every renewal), so the plan refuses one and names the native route; commerce-operations owns the details.

## Remove A Contact

"Delete this contact" or "remove the test contact" goes through `imis_party_profile`, never a raw `imis_entity` delete (that route is closed for Party, Person and Organization and names this one).

1. `imis_party_profile action="preview_remove_contact" partyId=...` reads the contact and lists everything `attached`: orders, invoices, payments, gifts, memberships and subscriptions, event registrations, a sign-in account, relationships, logged interactions, group memberships, notes and custom panel rows.
2. `refused_contact_has_history`: the contact has orders, invoices, payments, gifts, memberships, registrations or a sign-in account. iMIS keeps that history and its own staff site has no contact delete, so AgentZ will not hard-delete it. Offer the person the `retireOptions` the preview returns, with their steps: set the status to Marked for deletion (left out of most searches), erase the personal data (the Contact erasure task, approved by a system administrator), or merge the contact into the record that should keep the history (`imis_duplicate_resolution`).
3. `refused_remove_attached_first`: remove the relationships (`imis_party_relationships`), logged interactions (`imis_contact_activity preview_delete_interaction`) or panel rows (`imis_panel_records`) it names, then preview again.
4. `removal_ready`: tell the person what will be removed (the contact, its notes, its group memberships) and that it is a hard delete with no recycle bin. Only when they agree in chat, call `action="remove_contact"` with the same `partyId` and the exact `confirmationText`. The confirmation binds the contact and its attachments as read, so a change since the preview needs a new preview.
5. Report the result only from its readback: `removed_verified_not_found` means the contact and each note read back as not found. `removed_partial_residue` lists what was left and the call that removes it.

Organisations are not removed this way; retire them in iMIS.

## Groups

- Find a group with `imis_group_membership action="list_groups" paramsObject={"Name":"contains:<part of name>"}`. iMIS matches a plain `Name` exactly; use `contains:` or `startsWith:` for part of a name. `list_group_classes` and `list_members` take `paramsObject` the same way.
- Members can be added, changed or removed by hand only in groups whose class is not read-only (committees, chapters and organisation rosters on stock tenants). Groups of a read-only class, such as dynamic (IQA) and purchased-product groups, are filled by iMIS: every member preview refuses them with `blocked_group_read_only` before issuing a confirmation. Change the underlying query or product instead.
- Creating a group: `preview_create_group groupDesignObject={kind, name, ...}`. Where iMIS cannot create groups over REST, the preview returns `blocked_rest_group_create_unavailable` and names the native screen (Community > Committees > Add committee, or Membership > Chapters); create it there, then find it with `list_groups` and add members here. Kind `simple` resolves only to a simple class that is not read-only, and refuses when the tenant has none.

## Log An Interaction

Resolve `interactionTypeCode` and `interactionActionCode` with `imis_contact_activity action="list_type_actions"`, run `action="preview_log" partyId=... description=...` with those codes, then `action="log"` with the exact `confirmationText`. `preview_log` runs iMIS validation and gives no confirmation for a note iMIS would refuse; when the tenant has no interaction type/action set up, its `nextStep` says how to create one pair (`catalog_preview_create`/`catalog_create`). Remove a logged note with `preview_delete_interaction contactInteractionId=...` then `delete_interaction`, which reads back its absence.

## Renew, Upgrade, Downgrade, Or Reinstate

1. Find the member with `imis_find_member`.
2. Read billing state with `imis_billing_summary`.
3. Identify current subscription ItemId, PaidThrough date, outstanding invoices, and payment history.
4. For upgrades or downgrades, list candidate membership products before changing anything.
5. Use `imis_manage_subscription operation="renew"` for renewal (run `mode=preview` then `mode=submit` with `confirmationText`). Use `operation="update"` only to correct `PaidThrough`; a tier change is create-new + cancel-old, not an in-place update.
6. For reinstatement, check the lapse duration and whether groups or access were removed.
7. Re-add groups only after confirmation.
8. Log the interaction with `imis_contact_activity` (`preview_log`, then `log` with the exact `confirmationText`; see Log An Interaction).

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
- `imis_manage_subscription operation="cancel"` for immediate cancellation (`mode=preview` then `mode=submit` with `confirmationText`).
- `imis_manage_subscription operation="update"` for non-renewal/end-of-term handling when supported by the client's policy (`mode=preview` then `mode=submit` with `confirmationText`).
- `imis_manage_autopay action="cancel_instruction"` for active auto-pay instructions (run `action="preview_cancel_instruction"` first); use `action="cancel_account"` to stop the whole auto-pay account.
- `imis_group_membership action="remove_member"` for confirmed group removals (run `action="preview_remove_member"` first).
- `imis_contact_activity` for the final interaction (`preview_log`, then `log` with the exact `confirmationText`; see Log An Interaction).

Summarise the effective date, subscriptions changed, groups removed or retained, auto-pay action, outstanding balance status, and logged activity.
