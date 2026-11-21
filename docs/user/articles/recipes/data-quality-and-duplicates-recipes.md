---
lastUpdated: 2026-11-16T14:51:16Z
title: "Data quality and duplicates recipes"
description: "Prompts for duplicate review, irreversible merges, post-merge QA, data quality sweeps, and pre-import checks. They are deliberately cautious because cleanup can permanently affect member history."
sidebar:
  order: 10
---

Prompts for duplicate review, irreversible merges, post-merge QA, data quality sweeps, and pre-import checks. They are deliberately cautious because cleanup can permanently affect member history.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Triage the duplicate-candidate backlog

**Recipe R-10-01** · **Kind of request:** Look up · **For:** Data quality team, Membership team

:::example
**Ask:** "Please review the current duplicate-candidate backlog. Group likely people duplicates, likely organisation duplicates, low-confidence matches, and records needing more evidence. Show counts, examples, risk level, and recommended review order. Do not merge anything."
:::

**When to use it:** Use this before a cleanup sprint, import, renewal campaign, or portal launch. Data-quality staff need to know the size and shape of the duplicate problem before working case by case.

**What AgentZ does:** AgentZ reads duplicate candidate evidence and organises it into a manageable triage plan. It should keep this read-only and flag which pairs need human review.

**Before you begin:** Set the scope if needed: people, organisations, recent imports, members, donors, or event attendees.

**Keep in mind:** Duplicate candidates are not merge decisions. Review each pair before acting.

## Review one possible duplicate pair

**Recipe R-10-02** · **Kind of request:** Look up · **For:** Data quality team, Member services

:::example
**Ask:** "Please compare [record A] and [record B] as possible duplicates. Show names, emails, addresses, membership, invoices/payments, gifts, events, groups, communications, login/access, and any conflicting values. Recommend merge, do not merge, or needs more evidence, but do not merge anything."
:::

**When to use it:** Use this before any person or organisation merge. Staff need to know not just whether names match, but what would be lost, duplicated, or confused.

**What AgentZ does:** AgentZ reads both records across key iMIS areas and presents a survivor/duplicate recommendation with evidence and cautions. It should remain read-only until an explicit merge recipe is run.

**Before you begin:** Have both record IDs or enough identifying information for each record.

**Keep in mind:** If either record has finance, gifts, credentials, or conflicting identity evidence, escalate before merging.

## Merge two duplicate person records after explicit approval

**Recipe R-10-03** · **Kind of request:** Review then change · **For:** Data quality lead, Membership manager

:::example
**Ask:** "Please prepare a person-record merge for [duplicate record] into [survivor record]. First repeat the evidence, survivor choice, fields that differ, finance/gifts/events/groups/login risks, and exact irreversible effect. Give me the required confirmation wording and do not merge until I provide it."
:::

**When to use it:** Use this only after staff have reviewed a duplicate pair and agreed which person record survives. Merge is irreversible in practice and affects many connected records.

**What AgentZ does:** AgentZ checks the two records again, previews the merge implications, asks for exact confirmation, performs the merge only after that confirmation where supported, and reads back survivor evidence after completion.

**Before you begin:** Have the two record IDs, chosen survivor, review approval, and reason for merge.

**Keep in mind:** Merges are destructive and cannot be treated as routine cleanup. If the evidence is not clear, stop.

## Merge two duplicate organisation records after explicit approval

**Recipe R-10-04** · **Kind of request:** Review then change · **For:** Data quality lead, Membership manager

:::example
**Ask:** "Please prepare an organisation-record merge for [duplicate organisation] into [survivor organisation]. Compare names, addresses, contacts, memberships, invoices, orders, events, advertising, and relationships. Show the irreversible effect and required confirmation wording. Do not merge until I approve exactly."
:::

**When to use it:** Use this only when data-quality staff and the responsible business owner have confirmed that two organisation records are truly the same organisation. Organisation merges can affect linked people, billing accounts, memberships, advertising orders, event history, and commercial relationships.

**What AgentZ does:** AgentZ compares the organisation records and connected evidence, previews the survivor choice, requires exact confirmation, and verifies the survivor after an approved merge where supported.

**Before you begin:** Have both organisation IDs, survivor decision, and approval from the data owner.

**Keep in mind:** Organisation merges can affect staff reports and finance history. Escalate if the records represent related but distinct organisations.

## Audit key records after a merge

**Recipe R-10-05** · **Kind of request:** Look up · **For:** Data quality team, Membership team

:::example
**Ask:** "Please audit [survivor record] after the merge completed. Check membership, contact details, invoices/payments, gifts, events, groups, communications, login/access, duplicates, and recent activity. Tell me what looks correct, what needs staff repair, and what evidence you cannot verify."
:::

**When to use it:** Use this immediately after a person or organisation merge. Staff need reassurance that the survivor record still has the key history and that no obvious follow-up was missed.

**What AgentZ does:** AgentZ reads the survivor across major domains and compares against the expected merge outcome where possible. It should produce a post-merge checklist, not another merge action.

**Before you begin:** Have the survivor ID and, ideally, the duplicate ID or merge notes.

**Keep in mind:** Some merge effects may not be visible instantly in every report or cache. Recheck critical areas before closing the case.

## Find missing or poor-quality contact data

**Recipe R-10-06** · **Kind of request:** Multi-step plan · **For:** Data quality team, Membership team

:::example
**Ask:** "Please find contact records in [scope] with missing or poor-quality data: no email, invalid-looking email, missing address, blank required fields, bad postcodes, missing consent, or inconsistent member status. Group by issue type, priority, and likely owner. Do not update records yet."
:::

**When to use it:** Use this before renewals, campaigns, imports, portal launch, or data-cleanup days. Staff need a focused list of fixable data problems rather than vague data-quality anxiety.

**What AgentZ does:** AgentZ reviews contact and member data against the chosen quality rules, groups exceptions, and suggests a repair workflow. It should prepare lists for review and only update records through separate confirmed actions.

**Before you begin:** Define the scope, required fields, quality rules, and whether to include non-members.

**Keep in mind:** Some missing data is legitimate. Review business context before mass updates.

## Check a file or cohort for duplicates before import

**Recipe R-10-07** · **Kind of request:** Multi-step plan · **For:** Data quality team, Imports team

:::example
**Ask:** "Before we import [file/cohort], please compare the incoming people or organisations with existing iMIS records. Flag exact matches, likely matches, missing identifiers, bad emails or addresses, and records needing manual decision. Give me an import-ready exception list and do not create records."
:::

**When to use it:** Use this before bringing in event lists, applicants, prospects, donations, or migration data. Preventing duplicates before import is cheaper than merging them later.

**What AgentZ does:** AgentZ compares incoming identifiers and contact details with existing iMIS evidence, then groups records by import action: safe, likely duplicate, needs review, or invalid. It should not create records during the pre-check.

**Before you begin:** Have the incoming file or cohort, matching rules, and import owner ready.

**Keep in mind:** Name/email matches are not always enough. Review high-value or ambiguous records manually.
