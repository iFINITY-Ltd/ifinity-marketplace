---
name: process-automation
description: >-
  Author, run, and monitor iMIS Process Automation tasks and triage the legacy
  workflow queue. This skill should be used when the user says "scheduled task",
  "process automation", "automated alert", "run this nightly", "task definition",
  "automation failed", "task log", "workflow queue", "stuck workflow", "pending
  work items", "renewal reminder automation", or when creating, executing, or
  diagnosing iMIS automation. Sending a one-off communication belongs to
  communications-management; import batch posting belongs to bulk-operations.
argument-hint: "[task-name-or-action]"
---

# Process Automation & Workflow Queue

Two distinct iMIS surfaces, two tool families — do not mix them:

- **Process Automation** (modern, supported): scheduled tasks and alerts. Owned by `imis_task_automation_design` (author), `imis_task_automation_setup` (record-level CRUD), `imis_task_automation_execution` (run), and `imis_task_automation_profile` (read/diagnose).
- **Workflow QUEUE** (legacy Process Manager): system-process work items you can view and triage but not mutate over the API. Owned by `imis_workflow_runtime`.

## Author an Automation (declarative)

```
imis_task_automation_design action="preview_create" designObject={ name, enabled?: false, trigger: {kind: "scheduled"|"dataChange"|"onDemand", ...}, source?: {queryDocumentVersionKey, name?}, action: {kind: "email"|"storedProcedure"|"systemJob", ...} }
→ imis_task_automation_design action="create" designObject={same} confirmationText="{exact text from preview}"
```
- The design goes in `designObject`; trigger and action are selected by `kind`. New tasks default to `enabled: false` — nothing auto-fires until it is deliberately enabled. `enabled: true` switches on both the task's own **Enabled** box and its trigger's: iMIS runs a scheduled task only when both are on.
- An email action names who receives it in `recipients`; it is never inferred from the query:
  - "Email our membership team a list of members who lapsed last week" → `recipients: {kind: "fixed", addresses: ["<the team's address>"]}`, `source` = the lapsed query (the condition), and a template addressed to the team that lists the query's rows. Build that template with `imis_communication_setup action="scaffold_communication_template"` (`to` = the team, `senderContactId` = the iMIS ID of the staff contact it is sent as, `listQuery` = the query and its columns), then `preview_create`/`create` with `entity="Communication"`; its `DocumentId` is the `communicationTemplateId`.
  - "Email each lapsed member" → `recipients: {kind: "queryRows"}` with a template whose To is `{#party.Email}`. If the template also copies every email to a fixed address (Cc/Bcc), that address must be named in `recipients.alsoTo`, and only when the person asked for it.
  - iMIS sends one copy per row of a template's own recipient query (its first data source). A fixed send is refused when that query is not one contact, because the team would get a copy per row; a template scaffolded with `senderContactId` has one contact as its recipient, so the team gets one email listing every row.
  - The preview's `recipientStatement` says who receives it and how many. Tell the person that sentence before creating; the confirmation text names the audience. A template that sends to anyone else is refused.
- Find an existing email template with `imis_communication_setup action="list_communication_templates"` and read who it sends to with `communication_template_packet`.
- A data-change trigger with no column filter and no source query fires on every change of every row: narrow it with `columns` (update events), or set `firesOnEveryChange: true` only when the person wants that.
- `action="prove"` validates the design end-to-end (create disabled → read back → delete) without ever running it, and is itself gated: `confirmationText="PROVE PROCESS AUTOMATION TASK <name>"`, followed for an email action by ` EMAILING <audience>` worded as in the `preview_create` confirmation (without its ` VIA ...` part).
- Built-in system jobs (e.g. refreshing dynamic groups, engagement scores) are selected by job name in the design; email actions reference a communication template.

## Pause and Resume a Task (gated)

```
imis_task_automation_design action="preview_pause" id={TaskDefinitionId}
→ imis_task_automation_design action="pause" id={same} confirmationText="{exact text from preview}"
imis_task_automation_design action="preview_resume" id={TaskDefinitionId} triggerIds?=[...]
→ imis_task_automation_design action="resume" id={same} triggerIds?={same} confirmationText="{exact text from preview}"
```
- Works for any task, including one built in iMIS: only the task's **Enabled** box and its triggers' change, and the rest of the task is sent back exactly as stored.
- Tell the person `beforeStatement` and `plannedStatement` from the preview. For resume, also tell them `recipientStatement` (who its emails will reach): the confirmation names that audience, so a task or template edited since the preview is refused.
- Resume switches on every trigger unless `triggerIds` names some. `undo` is the call that puts the task back exactly; when no single call can (the task's boxes were mixed), it says `exact: false` and gives the earlier state.
- `already_paused` / `already_running` means nothing was written. iMIS system tasks are refused. If the pause preview has `resumeWarning` (a receipt or content-workflow job emails a template), tell the person before pausing: AgentZ cannot switch that task back on, so resuming it is done in iMIS.
- "Pause over Christmas and resume in January" is two requests: pause now, and resume when the person asks in January. AgentZ cannot resume on a date by itself; say so. A paused task still runs if someone runs it with `run_task_request`.

## Tasks That Never Ran (switched-off repair)

```
imis_task_automation_design action="repair_candidates"
→ for each task the person names: imis_task_automation_design {candidate's nextCall}   # preview_resume with taskOnly:true
→ imis_task_automation_design action="resume" id={same} taskOnly=true confirmationText="{exact text from preview}"
```
- Before AgentZ set the task's own **Enabled** box, tasks it built switched on had their trigger on but never ran. `repair_candidates` lists every non-system task in that state that was last updated after 2 June 2026. It writes nothing.
- The list cannot tell AgentZ's tasks from tasks someone switched off on purpose: say so. `agentzRecord: "found"` means this computer's AgentZ records hold AgentZ's write to the task, in a session that worked only on this iMIS site; `found_site_unconfirmed` means the write's session also worked on other sites, so it may have been another site's copy; `not_found` does not rule AgentZ out (another computer, or older work). `markedBuiltWithAgentz` is true when the description carries "(built with AgentZ)".
- Show the person the list and ask which tasks to switch on. Switch on only the ids they name, one at a time, through the candidate's `nextCall` (`taskOnly`: it switches on only the task's own box and leaves every trigger as it is at the preview), telling them the preview's `recipientStatement`. Never switch on the whole list or a task they did not name.
- Every task AgentZ creates or updates now ends its description with "(built with AgentZ)".

## Run a Task (gated)

```
imis_task_automation_execution action="plan_task_request" taskDefinitionId={id}
→ imis_task_automation_execution action="run_task_request" taskDefinitionId={id} confirmationText="{exact text from plan}"
```
A run sends the task's emails even when its trigger is disabled: tell the person the plan's `recipientStatement` (who each email reaches, and how many) before running; the run confirmation names that audience. `imis_task_automation_profile action="task_run_plan"` states the same without running. A task whose email audience cannot be stated (its recipient data source or template does not resolve) is not planned or run: the plan returns `blocked_email_audience_unresolved`; fix the task's recipients first. Tell the person the run's `runStatement`. A new log row is the task's newest run, which may be its own schedule rather than this request. When no log row has appeared yet, or the log could not be read, the run is not proven: read the logs again later (`imis_task_automation_profile action="diagnostics_health" taskDefinitionId={id}`), and never report that the task found nothing to do. A completed run is NOT proof the downstream business effect happened — verify the affected records (the sent communications, the refreshed group, the updated parties) through their owning tools.

## Monitor and Diagnose

```
imis_task_automation_profile action="inventory"          # what automations exist, enabled state
imis_task_automation_profile action="diagnostics_health" # recent failures across task logs
imis_task_automation_profile action="diagnostics_failure_packet" ...  # evidence packet for one failure
```
- With `taskDefinitionId`, `summary.latestRun` and `summary.runs` say what each run did: `found_nothing_to_do` (it ran and its condition gave its actions nothing: not a failure, and not a run that never happened), `did_its_work`, `failed`, `still_running` or `unclassified`. Use the run's `statement` when telling the person.

## Triage the Legacy Workflow Queue

```
imis_workflow_runtime action="surface"                     # queue model + available queries
imis_workflow_runtime action="list" kind="tasks"|"work_items"|"participants"
imis_workflow_runtime action="plan_manage" ...             # native-handoff plan for a queue fix
```
- Queue reads go through REST-enabled IQA queries. On a refusal (`query_not_rest_enabled`, or `query_not_found_or_not_rest_enabled`), read first: `imis_iqa_reporting` `action="get_rest_access"` for that query. Only if it reports False, switch it on with `action="preview_set_rest_access"` (`queryPath`, `allowRestAccess=true`), ask the person, then `set_rest_access` with the exact confirmation; or provision a REST-enabled equivalent with `imis_iqd_query`. If it reports True, change nothing: the cause is the query's own access, a missing query, or what the result's `diagnosis` names.
- Queue MUTATIONS (complete/reassign/requeue/unlock/delete) are not possible over the API: `plan_manage` returns a step-by-step native staff-UI handoff instead. After the human performs it, re-read the queue before claiming the state changed.
- Do not author automation here — creation lives in Process Automation above. The legacy engine has no create surface.

## Boundaries

- Retrying a failed task, and pausing until a date, are native handoffs: plan them, don't fake them. Pause and resume themselves are above.
- Task logs are execution evidence, not a process-definition inventory; list definitions through `imis_task_automation_profile action="inventory"`.
- Queue row counts are identity-scoped: a differently-permissioned staff session may see more rows than the API connection does — say so when reporting counts.
