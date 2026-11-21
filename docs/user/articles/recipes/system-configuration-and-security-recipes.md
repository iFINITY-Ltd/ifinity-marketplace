---
lastUpdated: 2026-11-16T14:51:16Z
title: "System configuration and security recipes"
description: "Prompts for tenant orientation, data discovery, user access, core setup, authority groups, source pre-flight, and unusual record types. They are designed for careful discovery before configuration changes."
sidebar:
  order: 14
---

Prompts for tenant orientation, data discovery, user access, core setup, authority groups, source pre-flight, and unusual record types. They are designed for careful discovery before configuration changes.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Map a new iMIS tenant before serious work starts

**Recipe R-14-01** · **Kind of request:** Look up · **For:** System administrator, Project lead

:::example
**Ask:** "Please orient me to this iMIS tenant. Show connection status, major modules visible, key data areas, site/content posture, reporting surface, payment or event capabilities, and anything missing that would affect AgentZ work. Keep it high level and do not change anything."
:::

**When to use it:** Use this at the start of onboarding, a new support case, or a consultant engagement. Staff need to know what this iMIS instance appears to contain before promising a workflow.

**What AgentZ does:** AgentZ checks connection and available iMIS surfaces, summarises module and capability evidence, and flags gaps or permission limits. It should not perform setup changes during orientation.

**Before you begin:** Make sure the desktop app is signed in as the intended iMIS user.

**Keep in mind:** This maps what the signed-in user can see. Another user with different permissions may have a different view.

## Discover available data for one work area

**Recipe R-14-02** · **Kind of request:** Look up · **For:** System administrator, Reporting team

:::example
**Ask:** "Please discover what iMIS data is available for [area, such as events, billing, certification, forms, or custom panels]. Summarise useful records, key fields, relationships, likely reporting sources, and any permission or setup gaps. Do not create queries or change configuration yet."
:::

**When to use it:** Use this before building a report, form, dashboard, or integration. Staff need a readable map of available data before design decisions.

**What AgentZ does:** AgentZ checks available records and setup details for the chosen area, then translates the findings into report/process planning language. It should recommend purpose-built workflows where they exist.

**Before you begin:** Name the work area and the question or process you are trying to support.

**Keep in mind:** Data discovery does not prove a workflow can safely write changes. Treat it as a planning step.

## Audit a staff user security profile

**Recipe R-14-03** · **Kind of request:** Look up · **For:** System administrator, Support lead

:::example
**Ask:** "Please review access for staff user [name/email]. Show their visible iMIS profile, roles or groups, permission clues, login/access posture, and any mismatch that may explain what they can or cannot do. Do not change roles or credentials."
:::

**When to use it:** Use this when a staff user cannot access a screen, report, or function, or before changing permissions. The administrator needs evidence before adding roles.

**What AgentZ does:** AgentZ reads user/access evidence available to the signed-in account and explains likely permission causes. It should keep the task read-only and hand off native security changes for approval.

**Before you begin:** Have the staff user, the action they cannot perform, and any error message ready.

**Keep in mind:** Security is permission-sensitive. AgentZ can only see what the current signed-in user is allowed to see.

## Plan a new staff user setup

**Recipe R-14-04** · **Kind of request:** Guided handoff · **For:** System administrator, Operations lead

:::example
**Ask:** "Please prepare setup for new staff user [name/email/role]. Identify the iMIS roles, groups, content access, reports, and login steps they likely need based on [job duties]. Show the setup checklist and approval points before creating credentials or assigning roles."
:::

**When to use it:** Use this when onboarding a staff member or contractor. The goal is least-privilege access that supports their job without copying another user blindly.

**What AgentZ does:** AgentZ compares job duties with visible roles, groups, pages, and reports, then builds an access checklist. It should leave credential creation and role assignment behind native/admin approval where required.

**Before you begin:** Have the person details, job duties, manager approval, and start date ready.

**Keep in mind:** Do not give broad admin access as a shortcut. Start from the role the person actually needs.

## Review core system setup for a process area

**Recipe R-14-05** · **Kind of request:** Look up · **For:** System administrator, Consultant

:::example
**Ask:** "Please review core setup for [process area]. Include relevant customer/member types, settings, lookup values, localisation, finance or tax posture if relevant, and data-source availability. Summarise what looks ready, missing, or risky. Do not change settings."
:::

**When to use it:** Use this before configuring or troubleshooting membership, billing, events, fundraising, or portal work. Staff need to know whether the base setup supports the process.

**What AgentZ does:** AgentZ reads relevant setup and metadata evidence, turns it into a readiness summary, and identifies configuration gaps. It should stay read-only unless a separate approved configuration task follows.

**Before you begin:** Name the process area and the issue or project you are preparing for.

**Keep in mind:** System setup can affect multiple teams. Validate proposed changes with process owners before editing.

## Review content authority groups

**Recipe R-14-06** · **Kind of request:** Look up · **For:** System administrator, Digital team

:::example
**Ask:** "Please review content authority groups for [site/section]. Show groups, likely purpose, pages or content they affect if visible, users or roles where available, and risks such as old groups or over-broad access. Do not change security."
:::

**When to use it:** Use this when portal permissions, staff content editing, or members-only pages need review. Digital teams need to know who can see or manage content.

**What AgentZ does:** AgentZ reads authority group and content evidence, explains the apparent access model, and highlights cleanup or verification needs. It should keep security changes behind native administrator approval.

**Before you begin:** Have the site, section, page, or group name scope ready.

**Keep in mind:** Security evidence can be incomplete depending on permissions. Verify sensitive access with an administrator.

## Pre-flight the data source for a query or panel

**Recipe R-14-07** · **Kind of request:** Look up · **For:** Reporting team, System administrator

:::example
**Ask:** "Before we build [query/panel/report], please review the proposed data source [source/view/table if known]. Show what records it contains, useful fields, identifiers, sample rows, security concerns, and whether there is a better supported source. Do not build the asset yet."
:::

**When to use it:** Use this when reporting staff or system administrators are not sure whether a proposed source is the right basis for a report, panel, or dashboard. It avoids building on a source that has the wrong records, weak identifiers, missing permissions, or confusing field meanings.

**What AgentZ does:** AgentZ checks the source, sample records, and identifiers, then compares them with safer reporting or panel paths that are available in iMIS. It should recommend the safest source and explain limitations before build work starts.

**Before you begin:** Have the desired output and any candidate source name ready.

**Keep in mind:** A source that can be read is not automatically the right reporting source. Check identifiers and security.

## Handle an unusual iMIS record type safely

**Recipe R-14-08** · **Kind of request:** Guided handoff · **For:** System administrator, Consultant

:::example
**Ask:** "I need help with an unusual iMIS record type: [entity/source/process]. Please first explain what AgentZ can safely read, whether a purpose-built workflow exists, what the risks are, and what evidence you need. Do not create, update, delete, or execute anything unless we agree a bounded plan."
:::

**When to use it:** Use this when the request falls outside everyday membership, events, finance, reports, or content workflows. It is for cautious discovery, not improvising changes in production.

**What AgentZ does:** AgentZ checks whether the work has a supported purpose-built path, then performs bounded read-only discovery if appropriate. It should propose a safe plan and refuse or hand off risky raw changes without approval.

**Before you begin:** Have the record type, business purpose, and why a normal workflow does not cover it.

**Keep in mind:** Advanced system work can bypass helpful guardrails. Prefer purpose-built workflows and native administrator review.
