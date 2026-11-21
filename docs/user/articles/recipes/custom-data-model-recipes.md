---
lastUpdated: 2026-11-16T14:51:16Z
title: "Custom data model recipes"
description: "Prompts for custom fields, panels, lookups, tags, reporting sources, and custom-data governance. They translate system-administration work into clear owner decisions and testing steps."
sidebar:
  order: 12
---

Prompts for custom fields, panels, lookups, tags, reporting sources, and custom-data governance. They translate system-administration work into clear owner decisions and testing steps.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Plan a new custom data area for contacts

**Recipe R-12-01** · **Kind of request:** Guided handoff · **For:** System administrator, Membership team

:::example
**Ask:** "Please help design a new custom data area for [purpose] on contact records. Include fields, data types, required values, privacy/access needs, reporting needs, form or panel use, and sample records. Show the design and iMIS setup handoff before creating anything."
:::

**When to use it:** Use this when the organisation needs to track something iMIS does not store well out of the box, such as preferences, accreditations, local eligibility, or operational flags. Good design prevents hard-to-report custom data later.

**What AgentZ does:** AgentZ turns the business need into a custom data design, checks existing fields or sources to avoid duplication, and prepares the setup plan. It should involve native iMIS review for schema-level changes.

**Before you begin:** Have the business purpose, fields, owners, reporting needs, and privacy concerns ready.

**Keep in mind:** Custom data becomes part of the operating model. Do not create fields without naming, ownership, and reporting agreement.

## Design a staff panel over custom data

**Recipe R-12-02** · **Kind of request:** Guided handoff · **For:** System administrator, Operations team

:::example
**Ask:** "Please design a staff panel for [custom data area]. Group fields into a usable layout, set labels and help text, identify required fields, visibility, edit permissions, and validation concerns. Show the panel design and test plan before any setup changes."
:::

**When to use it:** Use this when custom fields exist but staff need a sane screen to view or maintain them. The panel should support the job, not just mirror database fields.

**What AgentZ does:** AgentZ reviews the custom data source and proposes a staff-friendly panel layout with labels and validation notes. It should hand off native panel-designer steps where needed.

**Before you begin:** Have the custom data source, target users, field list, and editing rules ready.

**Keep in mind:** Panel layouts should make important fields easy to understand and reduce bad data entry.

## Place a custom panel on a profile or portal page

**Recipe R-12-03** · **Kind of request:** Guided handoff · **For:** Digital team, System administrator

:::example
**Ask:** "Please plan placing [panel/custom data view] on [staff profile/member portal page]. Check the page, audience, read/edit permissions, field behaviour, save/writeback expectations, and testing steps. Give me the placement handoff before any page change."
:::

**When to use it:** Use this when custom data needs to be visible or editable from a staff or member page. The risk is wrong visibility or failed writeback.

**What AgentZ does:** AgentZ reviews panel and page evidence, prepares placement and testing instructions, and identifies native iMIS steps. It should verify route/page behaviour after approved placement where possible.

**Before you begin:** Have panel name, target page, audience, edit permissions, and test record ready.

**Keep in mind:** Custom panels can expose sensitive fields. Confirm permissions before launch.

## Read or update one contact custom-data row

**Recipe R-12-04** · **Kind of request:** Review then change · **For:** Membership team, System administrator

:::example
**Ask:** "Please review custom data [area/field] for [contact name/ID]. Show current values, last-known context if visible, required fields, and the exact change requested: [change]. Stop before updating, then read back the row after approval."
:::

**When to use it:** Use this when a staff member needs to correct a custom field or confirm what is currently recorded. It keeps a small custom-data edit from becoming a blind update.

**What AgentZ does:** AgentZ finds the contact and custom data row, shows current values and validation concerns, then prepares the requested update. It should require approval and read back the updated value.

**Before you begin:** Have the contact, custom data area, exact field/value change, and reason ready.

**Keep in mind:** Custom fields may drive reports, access, or workflows. Confirm the requested value is from the approved list where applicable.

## Add a value to a dropdown or lookup list

**Recipe R-12-05** · **Kind of request:** Review then change · **For:** System administrator, Process owner

:::example
**Ask:** "Please prepare adding [new value] to lookup list [list name] for [purpose]. Check existing values, spelling, duplicates, sort order, where the list is used, and whether old reports/forms will be affected. Show the change plan before adding it."
:::

**When to use it:** Use this when a team needs a new dropdown option for forms, panels, reports, or operational categorisation. Lookup values should be consistent because they become reporting categories.

**What AgentZ does:** AgentZ reads the lookup list and related usage clues, checks for duplicates or naming conflicts, and prepares the new value for approval. It should read back the list after an approved change.

**Before you begin:** Have the lookup list name, new value, description, owner approval, and effective date if needed.

**Keep in mind:** Do not add near-duplicate values. Clean naming matters for reporting.

## Plan a new user-defined field

**Recipe R-12-06** · **Kind of request:** Guided handoff · **For:** System administrator, Department owner

:::example
**Ask:** "Please help plan a new field for [business purpose]. Check whether an existing field, custom panel, tag, or lookup already covers it. Recommend field name, label, type, allowed values, owner, reporting use, and where staff will maintain it. Do not create it until the design is approved."
:::

**When to use it:** Use this when a department asks for a new field. Staff often need help choosing whether the answer should be a field, lookup, panel, tag, or report-only value.

**What AgentZ does:** AgentZ reviews existing customisation evidence and proposes the lightest suitable design. It should prepare setup instructions and avoid creating fields without approval.

**Before you begin:** Have the business question, users, expected values, reporting need, and data owner ready.

**Keep in mind:** Every new field creates maintenance responsibility. Confirm who owns data quality before setup.

## Make an existing custom view available for reporting

**Recipe R-12-07** · **Kind of request:** Guided handoff · **For:** System administrator, Reporting team

:::example
**Ask:** "Please review whether [existing view/source] can be made available for iMIS reporting. Explain what it contains, key fields, joins or identifiers, security concerns, sample rows, and the setup handoff needed. Do not publish it to reporting until approved."
:::

**When to use it:** Use this when valuable custom data exists but staff cannot easily query it. Reporting teams need the source exposed safely and named clearly.

**What AgentZ does:** AgentZ checks the source and reporting needs, prepares a custom-data/reporting handoff, and flags security or matching issues. It should not overclaim that the source is usable until a sample report check works.

**Before you begin:** Have the source/view name, reporting question, audience, and security owner ready.

**Keep in mind:** Making data reportable can expose sensitive fields. Review permissions and sample output.

## Create a tag or category vocabulary for content lists

**Recipe R-12-08** · **Kind of request:** Review then change · **For:** Digital team, Content owner

:::example
**Ask:** "Please design a tag/category set for [content/resource area]. Review existing tags, proposed labels, where they will appear, reporting or filtering needs, and governance rules. Show the vocabulary and examples before adding values or updating content."
:::

**When to use it:** Use this when resources, articles, events, or documents need consistent filtering. Tags are useful only if staff agree the vocabulary and use it consistently.

**What AgentZ does:** AgentZ reviews existing tag/category evidence, proposes a clean controlled list, and prepares updates after approval. It should flag duplicates and vague labels.

**Before you begin:** Have the content area, target users, proposed categories, and owner ready.

**Keep in mind:** Too many tags make filtering worse. Keep the vocabulary small and governed.

## Audit and extend the custom data model safely

**Recipe R-12-09** · **Kind of request:** Multi-step plan · **For:** System administrator, Leadership team

:::example
**Ask:** "Please audit our custom data model for [area/process]. Inventory custom fields, panels, lookups, tags, reports, and pages using them. Identify duplicates, unused items, unclear ownership, and the safest way to add [new requirement]. Show the plan before any changes."
:::

**When to use it:** Use this before extending a mature iMIS site where custom fields have accumulated over time. Staff need to avoid adding yet another field when an existing source should be cleaned up or reused.

**What AgentZ does:** AgentZ builds an inventory across customisation surfaces, identifies overlap and risk, and proposes a governed change plan. It should keep actual schema or setup changes behind explicit approval and native review where needed.

**Before you begin:** Have the process scope, proposed new requirement, and owners for data, reporting, and website impact.

**Keep in mind:** Custom-data cleanup is both technical and organisational. Agree ownership before setup or cleanup work begins.
