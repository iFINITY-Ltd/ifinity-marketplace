---
lastUpdated: 2026-11-16T14:51:16Z
title: "Process automation recipes"
description: "Prompts for scheduled reminders, on-demand tasks, failed automations, workflow queues, triggered emails, and publish handoffs. They treat automation as a governed process, not a black box."
sidebar:
  order: 13
---

Prompts for scheduled reminders, on-demand tasks, failed automations, workflow queues, triggered emails, and publish handoffs. They treat automation as a governed process, not a black box.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Design a scheduled renewal reminder task

**Recipe R-13-01** · **Kind of request:** Guided handoff · **For:** Membership team, Communications team

:::example
**Ask:** "Please design a scheduled renewal reminder for [member group/renewal cycle]. Define who should be included, exclusions, timing, template, test recipient, approval step, and success checks. Show the automation plan and do not create or enable the task until approved."
:::

**When to use it:** Use this when recurring reminders are taking too much manual effort or are inconsistent. Staff need the audience, timing, and message governed before automation begins.

**What AgentZ does:** AgentZ turns the renewal process into audience rules, schedule, template needs, and test steps. It should identify native automation setup or supported task creation paths and keep sends behind approval.

**Before you begin:** Have renewal rules, date schedule, audience, template, exclusions, and owner approval ready.

**Keep in mind:** Automated reminders can annoy or confuse members if exclusions are wrong. Test with a small safe group first.

## Run an existing on-demand task after confirmation

**Recipe R-13-02** · **Kind of request:** Review then change · **For:** Operations team, System administrator

:::example
**Ask:** "Please prepare to run task [task name]. Show what it is for, last run status, expected audience or records, parameters, risks, and what output or logs we should check. Give me the exact confirmation step and do not run it until I approve."
:::

**When to use it:** Use this when staff need to run an existing task but want to understand its effect first. On-demand tasks can send, update, or process records, so evidence matters.

**What AgentZ does:** AgentZ reads task setup and recent log evidence, previews the run, requires confirmation, then checks logs and results after an approved run where supported.

**Before you begin:** Have the task name, desired parameters, reason for run, and owner approval ready.

**Keep in mind:** Never run a task you cannot explain. If the task purpose is unclear, stop at investigation.

## Diagnose a failed automation task

**Recipe R-13-03** · **Kind of request:** Look up · **For:** Operations team, Support team

:::example
**Ask:** "Please investigate failed task [task name/run/date]. Show status, log messages, affected records, likely cause, whether anything partially completed, and the safest remediation steps. Do not retry or change the task yet."
:::

**When to use it:** Use this when scheduled jobs, reminders, imports, or data-change automations fail. Staff need to know whether it is safe to rerun or whether records need cleanup first.

**What AgentZ does:** AgentZ reads task setup and logs, groups errors into likely causes, and identifies completed versus failed work where visible. It should recommend retry, configuration fix, data repair, or escalation.

**Before you begin:** Have the task name, run date, error message if any, and expected result ready.

**Keep in mind:** A failed task may have partially acted. Check impact before rerunning.

## Triage stuck workflow queue items

**Recipe R-13-04** · **Kind of request:** Look up · **For:** Operations team, System administrator

:::example
**Ask:** "Please review the workflow queue for stuck, failed, or old items. Group by workflow/process, age, owner, error reason if visible, and likely next action. Show examples and do not approve, reject, delete, or reroute anything yet."
:::

**When to use it:** Use this when staff suspect approvals or background workflows are stalled. The queue needs prioritisation before anyone clicks through records one by one.

**What AgentZ does:** AgentZ reads queue or workflow evidence and turns it into a triage list. It should keep the work read-only and identify which items need native staff action.

**Before you begin:** Set scope such as workflow name, date range, owner, or process area.

**Keep in mind:** Workflow queue items can represent real approvals. Do not clear or reroute without process-owner approval.

## Plan an email triggered by a new certification registration

**Recipe R-13-05** · **Kind of request:** Guided handoff · **For:** CPD administrator, Communications team

:::example
**Ask:** "Please design an automation that emails [recipient/team/member] when a new registration is created for [certification programme]. Define the trigger, audience, template, data fields, exclusions, test case, and approval path. Show the plan before creating or enabling anything."
:::

**When to use it:** Use this when staff repeatedly send manual follow-ups after programme enrolment or certification registration. Automation should make the handoff reliable without sending the wrong message.

**What AgentZ does:** AgentZ maps the certification event to a trigger, template, and test plan, then identifies supported setup or native automation steps. It should keep the task disabled until reviewed and tested.

**Before you begin:** Have the programme, trigger condition, message purpose, recipients, and owner approval ready.

**Keep in mind:** Triggered emails need careful testing so they do not send repeatedly or to the wrong audience.

## Compare workflow queue and automation task inventory

**Recipe R-13-06** · **Kind of request:** Look up · **For:** System administrator, Operations lead

:::example
**Ask:** "Please compare current workflow queue posture with process automation task inventory. Show active tasks, failed or old runs, stuck workflow items, unclear ownership, duplicate processes, and areas needing cleanup. Give me a governance report and do not change anything."
:::

**When to use it:** Use this when operations want to understand process health, not just one failed job. It helps identify old automations, unsupported workflows, and ownership gaps.

**What AgentZ does:** AgentZ reads task and workflow evidence side by side, groups issues by process owner and risk, and recommends cleanup order. It should keep the work read-only.

**Before you begin:** Have the process area or full-system scope and the owner of automation governance ready.

**Keep in mind:** Old workflows may still be important. Confirm with process owners before disabling or changing anything.

## Create a handoff after a content workflow completes

**Recipe R-13-07** · **Kind of request:** Guided handoff · **For:** Digital team, Content owner

:::example
**Ask:** "A content workflow for [page/content item] is ready for final action. Please summarise approval status, page location, publish status, navigation or redirect needs, owner sign-off, and browser verification steps. Give me the publish handoff and do not publish until the owner confirms."
:::

**When to use it:** Use this when content staff have moved a page or resource through review and someone needs a clean launch handoff. It prevents approved content from becoming live without route, navigation, and owner checks.

**What AgentZ does:** AgentZ reads content/workflow/page evidence, builds the final handoff, and identifies what remains before publish. It should keep publish actions behind explicit owner confirmation.

**Before you begin:** Have the content item, expected page/URL, owner, and launch date ready.

**Keep in mind:** Workflow approval and public launch are different states. Verify both.
