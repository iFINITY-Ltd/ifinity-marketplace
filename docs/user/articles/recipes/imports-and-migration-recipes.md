---
lastUpdated: 2026-11-16T14:51:16Z
title: "Imports and migration recipes"
description: "Prompts for import discovery, mapping review, batch status, posting, failure diagnosis, batch setup, and migration readiness. The recipes keep high-volume changes behind validation and approval."
sidebar:
  order: 11
---

Prompts for import discovery, mapping review, batch status, posting, failure diagnosis, batch setup, and migration readiness. The recipes keep high-volume changes behind validation and approval.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Review import types and recent import batches

**Recipe R-11-01** · **Kind of request:** Look up · **For:** Imports team, System administrator

:::example
**Ask:** "Please show the import file types and recent import batches available in iMIS. Summarise what each appears to be for, recent status, owner clues, error posture, and which import paths look safe to reuse or need review. Do not create or post any imports."
:::

**When to use it:** Use this when staff inherit imports, plan a new load, or need to know what has recently been run. It prevents starting from the wrong import type or repeating a failed pattern.

**What AgentZ does:** AgentZ reads import setup and batch evidence, summarises recent activity, and flags risky or unclear import paths. It should keep the task read-only.

**Before you begin:** Know the data area you care about, such as contacts, event registrations, gifts, or custom data.

**Keep in mind:** An import type existing does not prove it matches the new file. Review mapping before use.

## Check status and log for an import batch

**Recipe R-11-02** · **Kind of request:** Look up · **For:** Imports team, Support team

:::example
**Ask:** "Please check import batch [batch name/ID]. Show status, record counts, successful rows, failed rows, warnings, log messages, affected records if visible, and the next action staff should take. Do not retry or post anything."
:::

**When to use it:** Use this when an import is running, failed, partially succeeded, or staff need to explain what happened. The import owner needs a readable log summary.

**What AgentZ does:** AgentZ reads the import batch and log evidence, turns errors into a triage list, and identifies whether the batch needs correction, retry, or manual cleanup.

**Before you begin:** Have the batch name/ID and the expected file purpose ready.

**Keep in mind:** Import logs can be technical. Ask AgentZ to translate them, but review sample failed rows before rerunning.

## Review an import mapping before using it

**Recipe R-11-03** · **Kind of request:** Look up · **For:** Imports team, System administrator

:::example
**Ask:** "Please inspect import mapping [file type/name]. Explain which fields it expects, what iMIS records it updates or creates, required values, lookup fields, duplicate-match behaviour if visible, and risks for the new file. Do not change the mapping."
:::

**When to use it:** Use this before reusing an existing import definition. Staff need to know whether the file layout and business purpose still match the mapping.

**What AgentZ does:** AgentZ reads the import mapping/setup evidence and translates it into a staff checklist. It should flag required columns, lookup dependencies, and likely failure points.

**Before you begin:** Have the import type name and the new file columns or sample available.

**Keep in mind:** Mappings can be fragile. Do not assume a past import type is safe for a different file source.

## Post an existing import batch after final review

**Recipe R-11-04** · **Kind of request:** Review then change · **For:** Imports team, Data owner

:::example
**Ask:** "Please prepare to post import batch [batch name/ID]. First show file purpose, mapping, record counts, validation status, warnings, sample rows, duplicate risks, and exactly what records will be created or updated. Give me the confirmation wording and do not post until I approve."
:::

**When to use it:** Use this only when a batch is prepared and staff are ready to load it into iMIS. Posting can create or update many records, so the final checkpoint matters.

**What AgentZ does:** AgentZ reviews the batch evidence, previews impact, requires explicit confirmation where supported, posts only after approval, and reads back status/log evidence afterward.

**Before you begin:** Have the batch ID, data owner approval, validation results, and rollback or cleanup plan ready.

**Keep in mind:** Imports are high impact. Do not post if counts, mapping, or duplicate handling are unclear.

## Diagnose a failed or partial import

**Recipe R-11-05** · **Kind of request:** Multi-step plan · **For:** Imports team, Data quality team

:::example
**Ask:** "Please diagnose failed or partial import [batch name/ID]. Group errors by cause, show examples, identify records that succeeded, records needing correction, duplicate or lookup problems, and whether a rerun would be safe. Give me a remediation plan before any retry."
:::

**When to use it:** Use this after a failed import or when counts do not match expectations. Staff need to know what happened and how to fix the data without making duplicates worse.

**What AgentZ does:** AgentZ reads the batch, log, mapping, and affected-record evidence, then groups errors into practical repair tasks. It should recommend whether to correct file data, mapping, lookups, or existing records before retrying.

**Before you begin:** Have the batch ID, original file, expected counts, and business owner ready.

**Keep in mind:** A partial success means some records may already exist. Never rerun blindly.

## Prepare a new import batch record

**Recipe R-11-06** · **Kind of request:** Review then change · **For:** Imports team

:::example
**Ask:** "Please prepare a new import batch for [purpose/file] using [import type]. Check the mapping, required columns, file readiness, owner, expected counts, duplicate rules, and validation plan. Show me the batch setup before creating it."
:::

**When to use it:** Use this when staff have a file ready but want the batch staged carefully before validation or posting. It makes the import process explicit and reviewable.

**What AgentZ does:** AgentZ checks the selected import type and file expectations, prepares the batch metadata, and asks before creating supported batch records. It should stop well before posting.

**Before you begin:** Have the import file, import type, owner, purpose, and expected counts ready.

**Keep in mind:** Creating a batch is not the same as loading data. Validate and review before posting.

## Assess website and content posture before migration

**Recipe R-11-07** · **Kind of request:** Look up · **For:** Digital team, Migration team

:::example
**Ask:** "Please assess the current iMIS website/content posture before migration. Show sites, key page sections, navigation, forms, queries, custom panels, broken or stale routes, and migration risks. Give me a practical migration-readiness report and do not change anything."
:::

**When to use it:** Use this before a RiSE cleanup, portal redesign, or migration-in project. Migration teams need a map of live content and dependencies before moving or replacing anything.

**What AgentZ does:** AgentZ reads site/content/navigation/form evidence and checks routes where possible, then turns findings into a readiness and risk report. It should keep the work read-only and identify owner decisions.

**Before you begin:** Have the site or section scope, migration goal, and launch timeline ready.

**Keep in mind:** Migration readiness includes content ownership and member permissions, not just page counts.
