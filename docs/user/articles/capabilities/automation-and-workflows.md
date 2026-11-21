---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Automation and workflows"
description: "What AgentZ can do with Process Automation tasks and the older workflow queue in iMIS."
describes: [src/tools/automation/**, src/tools/workflow/**, src/services/automation/**, src/services/workflow/**]
sidebar:
  order: 13
---

AgentZ creates and runs **Process Automation** tasks, reads their logs to explain what happened, and shows you what is waiting in the older workflow queue of iMIS.

## Process Automation

AgentZ creates **Process Automation** tasks, runs them, and reads their logs to explain what happened.

**What AgentZ does:**

- AgentZ creates, changes and deletes **Process Automation** tasks that run on a schedule, when data changes or on request, and that send an email, run a built-in iMIS job or run a stored procedure.
- AgentZ creates new tasks switched off, so that nothing runs until you choose, and tests them without running them.
- AgentZ tells you exactly who an email task will send to before it saves the task.
- AgentZ runs a task on request.
- AgentZ pauses a task and resumes it later, including tasks made in iMIS. Before resuming an email task, it tells you who the task will email.
- AgentZ adds "(built with AgentZ)" to the end of the description of every task it creates or changes, so you can see which tasks it made.
- AgentZ lists tasks that have a trigger switched on but do not run, because the task itself is switched off. It says which ones its records show it made, and switches on only the tasks you name.
- AgentZ reads task logs and explains why a task failed.
- AgentZ tells you when a task ran but found nothing to do, so you can tell that apart from a task that did not run at all.

**Needs your approval:**

- Before AgentZ creates, changes, deletes or runs a task, changes a schedule, or runs any automation that changes records, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot retry a failed task yet; do that in iMIS.
- AgentZ cannot pause a task until a date and then resume it by itself. A paused task stays paused until you ask AgentZ to resume it.
- AgentZ does not pause or resume the system tasks that iMIS runs itself.
- AgentZ does not show the older workflow queue with **Process Automation** tasks; it shows that queue separately.
- AgentZ does not report an automation as having achieved its purpose until it has checked the records the automation changes.

## The workflow queue

AgentZ shows you the tasks and work items waiting in the older workflow queue of iMIS.

**What AgentZ does:**

- AgentZ lists workflow tasks, pending work items and participants.
- AgentZ prepares the steps for clearing a stuck task or work item, which you then carry out in iMIS.
- AgentZ checks whether the query it needs to read the queue lets other systems read it, and only if it does not, offers to switch that setting on or to build an equivalent query.

**Needs your approval:**

- Before AgentZ lets other systems read a query, it shows you which query and asks you to approve it.
- You make changes to the queue yourself in iMIS; AgentZ does not change the queue.

**What AgentZ does not do:**

- AgentZ cannot complete, reassign, requeue, unlock or delete tasks and work items; do those in the staff **Tasks** screen.
- AgentZ cannot create or edit workflows; build new automation with **Process Automation**.

## Examples

:::example
**Ask:** "Set up a task that emails members a reminder 30 days before their membership ends. Show me who it would send to first."

AgentZ shows you exactly who the task would email, and you approve it. AgentZ creates the task switched off and tests it without running it. Nothing is sent on the task's schedule until you ask AgentZ to switch it on.
:::

:::example
**Ask:** "Why did the nightly renewal task fail last night?"

You see the task's log and what went wrong, read from iMIS.
:::

:::faq
**Will a new task start sending emails straight away?** No. AgentZ creates new tasks switched off, so the task does not run on its schedule until you ask AgentZ to switch it on.

**Is a switched-off task safe to run as a test?** No. If you ask AgentZ to run a task now, it shows you who the task will email and asks you to approve the run. Once you approve, the task sends its emails, even while it is switched off.
:::
