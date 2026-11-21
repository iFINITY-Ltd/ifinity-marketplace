---
lastUpdated: 2026-11-16T14:51:16Z
title: "Membership lifecycle recipes"
description: "Prompts for member service teams handling joining, renewal, lapse, access, groups, and member-360 investigation. The language is intentionally staff-facing: identify the person, gather evidence, preview the action, then confirm."
sidebar:
  order: 1
---

Prompts for member service teams handling joining, renewal, lapse, access, groups, and member-360 investigation. The language is intentionally staff-facing: identify the person, gather evidence, preview the action, then confirm.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Understand a member before deciding what to do next

**Recipe R-01-01** · **Kind of request:** Look up · **For:** Membership team, Member services

:::example
**Ask:** "Please give me the full iMIS picture for [member name or ID] before I change anything. I need their membership status, paid-through date, open invoices, recent payments, group or committee roles, event registrations, recent communications, login/access clues, and any duplicate warnings. Finish with the likely reason for their current situation and the safest next step for staff."
:::

**When to use it:** Use this when a member calls, emails, or appears in a report and the team needs the complete context before taking action. Association staff often lose time moving between profile, billing, events, groups, and communications screens; this prompt asks for a joined-up service view first.

**What AgentZ does:** AgentZ searches for the right contact, reads the main iMIS evidence around that person, and separates facts from recommendations. It should show what it found, flag gaps or conflicts, and avoid changing the record unless you ask for a follow-up action.

**Before you begin:** Have the member name, ID, or email address ready, plus the question you are trying to answer.

**Keep in mind:** This is an evidence-gathering prompt. If the next step is a renewal, refund, merge, email, or access change, ask AgentZ to prepare that as a separate reviewed action.

## Onboard a new individual member from enquiry to active subscription

**Recipe R-01-02** · **Kind of request:** Review then change · **For:** Membership team, Member services

:::example
**Ask:** "Please help me onboard [person name/email] as a new [member category]. First check whether they already exist in iMIS or look like a duplicate. Then show me the profile details, membership option, expected price, chapter or group access, and welcome steps you would use. Do not create or update anything until I approve the exact plan."
:::

**When to use it:** Use this when an enquiry has become a member application or a staff member is entering a join manually. The membership team wants the person set up once, in the right category, without creating duplicates or missing welcome access.

**What AgentZ does:** AgentZ searches for existing contact records, checks possible duplicate matches, reviews the membership option and related access, and prepares the steps for staff approval. After approval it can help carry out supported membership setup and give a checklist for anything that still needs iMIS Staff.

**Before you begin:** Have the person details, membership category, start date, billing choice, and any chapter or committee context ready.

**Keep in mind:** New-member setup affects billing, access, and reporting. Review the proposed record, price, and start date before confirming changes.

## Renew a member manually and confirm the new paid-through date

**Recipe R-01-03** · **Kind of request:** Review then change · **For:** Membership team, Finance team

:::example
**Ask:** "Please review [member name or ID] for a manual renewal of [membership/subscription] for [term]. Show me their current status, paid-through date, renewal price, open balances, recent payments, and any reason this renewal should not proceed. If everything is clear, prepare the renewal and show the new paid-through date before I confirm."
:::

**When to use it:** Use this for phone renewals, exception renewals, or cases where a payment or invoice does not clearly match the member status. Staff need confidence that renewing will not duplicate a charge or hide an outstanding balance.

**What AgentZ does:** AgentZ reads the member, subscription, invoice, and payment context, then explains the current state and the renewal effect. It should pause before creating or changing renewal records and read the result back after any approved update.

**Before you begin:** Have the member identifier, renewal term, payment status, and any exception note ready.

**Keep in mind:** If payment is still outstanding, separate the renewal decision from the payment collection step so finance can approve the handling.

## Change a member grade and preview the billing impact

**Recipe R-01-04** · **Kind of request:** Review then change · **For:** Membership team, Finance team

:::example
**Ask:** "[Member name or ID] wants to move from [current grade] to [new grade] on [effective date]. Please check their current membership, open invoices, payments, eligibility clues, and the price difference. Give me a before-and-after summary and stop before changing the grade or billing."
:::

**When to use it:** Use this when a member moves between student, associate, full, retired, corporate, or other grades. Grade changes often affect price, benefits, renewal timing, and reporting, so staff need the impact before making the change.

**What AgentZ does:** AgentZ reads the member record, current subscription context, balances, and available pricing evidence. It prepares a clear comparison and identifies whether the change can be completed directly or needs finance or membership-manager approval.

**Before you begin:** Have the current grade, target grade, effective date, and reason for the change ready.

**Keep in mind:** Local iMIS rules can make grade pricing and pro-rating different by organisation. Treat the preview as the decision aid and confirm the final charge in iMIS before committing.

## Reinstate a lapsed member and restore access

**Recipe R-01-05** · **Kind of request:** Review then change · **For:** Membership team, Member services

:::example
**Ask:** "Please review [member name or ID] for reinstatement. Show me why they lapsed, their last paid-through date, outstanding invoices, recent activity, portal/login status, chapter or group access, and any renewal price or reinstatement fee. Prepare the safest reinstatement plan and wait for approval before changing anything."
:::

**When to use it:** Use this when a former member wants to rejoin or says they have lost access after a lapse. The team needs to distinguish a simple renewal from a reinstatement with debts, lost group access, or login issues.

**What AgentZ does:** AgentZ gathers membership, billing, group, login, and activity evidence, then explains what must be restored and what should be left alone. It can support confirmed reinstatement steps where available and provide a staff checklist for access verification.

**Before you begin:** Have the member identifier, intended reinstatement date, and any payment or access complaint ready.

**Keep in mind:** Do not restore benefits simply because the person asks. Check balances, eligibility, and policy exceptions first.

## Cancel or non-renew a member with a clear leaving checklist

**Recipe R-01-06** · **Kind of request:** Review then change · **For:** Membership team, Finance team

:::example
**Ask:** "Please prepare a cancellation or non-renewal checklist for [member name or ID], effective [date]. Check membership status, paid-through date, open invoices, scheduled payments, groups or committees, event registrations, certification links, communications, and portal access. Show me what will remain, what needs staff action, and stop before changing records."
:::

**When to use it:** Use this when a member resigns, is not renewing, or should be cancelled under policy. Leaving touches more than the subscription, and staff need to avoid accidental access, billing, or governance loose ends.

**What AgentZ does:** AgentZ reviews the member across the connected iMIS areas and turns the findings into an ordered checklist. It should separate records that can be changed after confirmation from items that require policy, finance, or native iMIS review.

**Before you begin:** Have the member identifier, reason, effective date, and refund or balance policy ready.

**Keep in mind:** Cancellations can affect audit history and future reporting. Keep a human-approved reason and do not delete the person record.

## Add a member to a committee or working group

**Recipe R-01-07** · **Kind of request:** Review then change · **For:** Membership team, Governance team

:::example
**Ask:** "Please review adding [member name or ID] to [committee/group] as [role] from [start date] to [end date if known]. Check that the member is active, whether they are already in the group, any current roles, and any obvious eligibility concerns. Show me the proposed group change before you make it."
:::

**When to use it:** Use this when governance, volunteering, chapters, or special-interest groups need membership maintained accurately. Staff want the person listed correctly without duplicate roles or expired appointments hanging around.

**What AgentZ does:** AgentZ confirms the contact, checks current group participation, reviews relevant membership status, and prepares the group membership change. It should show the before-and-after state and read it back after approval.

**Before you begin:** Have the group name, role, start date, end date, and approval source ready.

**Keep in mind:** Group membership may drive access, voting, mailings, or public listings. Confirm the role and dates carefully.

## Help a member regain portal access

**Recipe R-01-08** · **Kind of request:** Guided handoff · **For:** Member services, Support team

:::example
**Ask:** "[Member name/email] cannot access the member portal. Please check their contact match, membership status, primary email, login account clues, security or access groups, and recent changes that might explain the problem. Tell me what staff can fix in iMIS and what message I should send the member next."
:::

**When to use it:** Use this when a member cannot log in, cannot see member content, or says their renewal did not restore access. The support job is to identify whether the issue is status, email, permissions, or credentials before resetting anything.

**What AgentZ does:** AgentZ reads the member and access-related evidence it can see, flags mismatches, and suggests the next staff action. Where account creation or credential reset needs native iMIS or identity-provider handling, it produces a clear handoff instead of pretending it completed it.

**Before you begin:** Have the member email, reported error, and the page or benefit they expected to access ready.

**Keep in mind:** Do not share passwords or ask the member for sensitive credentials. AgentZ should work from iMIS evidence and staff-approved reset paths.

## Investigate an unusual member account before touching anything

**Recipe R-01-09** · **Kind of request:** Look up · **For:** Membership team, Support team

:::example
**Ask:** "Please investigate why [member name or ID] looks unusual. Do not change anything. Pull together membership, billing, events, groups, communications, giving, certification, login/access, duplicates, and recent activity. Tell me the most likely explanation, what evidence supports it, and what action should be reviewed by a human."
:::

**When to use it:** Use this for messy member-service cases: odd statuses, contradictory invoices, missing access, unexpected benefits, or a colleague saying something just looks wrong. Staff need a diagnosis before they choose an action.

**What AgentZ does:** AgentZ builds a compact cross-area member view and points out conflicts or missing evidence. It should recommend the next safe step and make clear where it is uncertain.

**Before you begin:** Have the member identifier and a short description of what seems wrong.

**Keep in mind:** This is deliberately read-only. If the diagnosis points to a payment, renewal, merge, or access change, run that as a separate confirmed recipe.

## Find non-members who already engage and may be ready to join

**Recipe R-01-10** · **Kind of request:** Multi-step plan · **For:** Membership team, Growth team

:::example
**Ask:** "Please find people who are not current members but have recently paid, donated, attended events, downloaded resources, or interacted with us. Segment them by strongest join signal, show the evidence behind each group, exclude obvious current members or duplicates, and suggest a practical follow-up message for each segment."
:::

**When to use it:** Use this when the association wants membership growth from people already showing commitment. These prospects are more useful than a cold list because they have existing evidence of interest.

**What AgentZ does:** AgentZ searches across membership, finance, events, giving, and engagement evidence to build a prospect list. It should explain the inclusion rules, flag duplicates or missing contact details, and prepare segments for review before export or outreach.

**Before you begin:** Set the lookback period, target audience, exclusions, and whether staff want a list, a report, or an outreach plan.

**Keep in mind:** Check consent, communication preferences, and data-protection rules before contacting prospects.
