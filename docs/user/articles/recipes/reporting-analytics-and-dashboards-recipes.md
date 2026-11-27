---
lastUpdated: 2026-11-16T14:51:16Z
title: "Reporting, analytics and dashboards recipes"
description: "Prompts for turning staff questions into reliable iMIS reports, dashboards, exports, and leadership packs. The emphasis is on definitions, source clarity, and approved reusable assets."
sidebar:
  order: 7
---

Prompts for turning staff questions into reliable iMIS reports, dashboards, exports, and leadership packs. The emphasis is on definitions, source clarity, and approved reusable assets.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Turn a plain-English question into a reusable iMIS report

**Recipe R-07-01** · **Kind of request:** Review then change · **For:** Reporting team, Department leads

:::example
**Ask:** "Please answer this question from iMIS data: [plain-English question]. First tell me which records and fields you would use, what filters are needed, and any limitations. Then run a small sample check. Only create a saved iMIS report after I approve the design and name."
:::

**When to use it:** Use this when staff know the question but not the right iMIS query sources. It helps turn operational questions into governed, reusable reporting instead of one-off spreadsheet work.

**What AgentZ does:** AgentZ reviews likely iMIS reporting sources, proposes report logic in plain language, runs or samples where possible, and asks before creating a saved report. It should explain source limits and verify the created asset.

**Before you begin:** Write the business question, date range, filters, audience, and desired output format.

**Keep in mind:** Creating a saved query is a system change. Review the design, folder/name, and visibility before approval.

## Run and explain an existing saved report

**Recipe R-07-02** · **Kind of request:** Look up · **For:** Any staff team, Reporting team

:::example
**Ask:** "Please run or inspect the saved iMIS query/report [name or path]. Explain what it returns, what filters or prompts it uses, when it was last useful if visible, and summarise the results for [audience]. Do not change the saved report."
:::

**When to use it:** Use this when staff inherit a report, need a quick answer, or are unsure whether an existing saved iMIS query still answers their question. It saves time before building something new.

**What AgentZ does:** AgentZ finds the saved query/report, reads or runs it where permitted, and summarises the result and caveats. It should keep the report unchanged and flag broken paths or missing parameters.

**Before you begin:** Have the report name, folder path, or screenshot plus any prompt values ready.

**Keep in mind:** Old reports may use outdated assumptions. Ask AgentZ to explain the filters before relying on the numbers.

## Create a prompted report staff can reuse

**Recipe R-07-03** · **Kind of request:** Review then change · **For:** Reporting team, Operations team

:::example
**Ask:** "Please design a reusable report for [question] where staff can enter [runtime prompt, such as date range, event, member type, or programme]. Show the source, filters, prompt choices, sample output, and folder/name. Wait for approval before creating it."
:::

**When to use it:** Use this when the same question is asked repeatedly with a different event, date, member type, or programme. Runtime prompts reduce duplicate reports and make self-service safer.

**What AgentZ does:** AgentZ checks the reporting sources, designs the prompted report, explains how staff will choose values, and verifies sample behaviour before creating the saved asset after approval. It should document the prompt values, filters, and limitations in staff language.

**Before you begin:** Define the repeated question, prompt fields, output columns, and who will run it.

**Keep in mind:** Prompted reports need clear labels so staff do not enter the wrong value and misread the result.

## Build a metric page with chart and report detail

**Recipe R-07-04** · **Kind of request:** Multi-step plan · **For:** Reporting team, Digital team

:::example
**Ask:** "Please design a page for [metric] that shows a chart, headline number, supporting table, source explanation, and date range controls if appropriate. Use existing iMIS data where possible. Show the query and layout plan first, then create any report or page assets only after approval."
:::

**When to use it:** Use this when staff need a metric visible in a portal, staff area, or leadership page. A good metric page pairs the number with the source and drill-down detail.

**What AgentZ does:** AgentZ reviews the data, prepares the report and display approach, and builds the content/page handoff. It can create supported report or content assets after confirmation and should verify rendering where possible.

**Before you begin:** Have the metric definition, audience, date range, desired chart type, and page location ready.

**Keep in mind:** Charts can mislead if the source or exclusions are vague. Make the metric definition visible.

## Prepare a formal report brief backed by iMIS data

**Recipe R-07-05** · **Kind of request:** Guided handoff · **For:** Reporting team, Finance team

:::example
**Ask:** "Please prepare a formal report brief for [report purpose]. Identify the iMIS data source, filters, columns, grouping, totals, prompts, and sample rows. If this needs a formal report builder or a native iMIS reporting area, give the staff handoff in plain language and include the verified source query."
:::

**When to use it:** Use this when the output needs formal layout, grouping, totals, or distribution beyond a simple saved query. Staff need a clear bridge between the business request and the report builder.

**What AgentZ does:** AgentZ checks and proves the iMIS source data, designs the report specification, and identifies what can be done in ordinary iMIS reporting versus a formal report builder. It should not claim the finished report has been published unless staff have completed that native reporting step.

**Before you begin:** Have report audience, required totals, grouping, date prompts, and delivery format ready.

**Keep in mind:** Formal report layout may require a specialist reporting area. AgentZ can prepare the evidence and specification, then hand off.

## Assemble a staff operations dashboard

**Recipe R-07-06** · **Kind of request:** Multi-step plan · **For:** Operations team, Leadership team

:::example
**Ask:** "Please design a staff operations dashboard for [team or process]. Include KPI tiles, exception lists, recent activity, links to the underlying records, and a short explanation of each metric. Start with a design and source plan; create dashboard assets only after I approve."
:::

**When to use it:** Use this when a team needs a daily or weekly command centre instead of several separate reports. Good dashboards make exceptions visible and help staff decide what to do next.

**What AgentZ does:** AgentZ identifies the relevant iMIS sources, proposes KPI definitions, designs the layout, and builds supported query/content assets after approval. It should verify that the dashboard renders and that each tile has a clear source.

**Before you begin:** Name the team, decisions the dashboard should support, KPIs, date ranges, and page location.

**Keep in mind:** Dashboard creation combines reporting and content changes. Review both the numbers and the page experience.

## Prepare a board KPI pack from several teams

**Recipe R-07-07** · **Kind of request:** Multi-step plan · **For:** Leadership team, Reporting team

:::example
**Ask:** "Please prepare a board KPI pack for [period]. Cover membership, renewals, events, income, fundraising, certification, engagement, and any agreed strategic measures. For each KPI, show source, definition, trend, caveat, and a plain-English interpretation. Do not create or publish anything until the metric definitions are approved."
:::

**When to use it:** Use this before board, committee, or senior leadership meetings. Leaders need consistent definitions and commentary, not a spreadsheet of disconnected numbers.

**What AgentZ does:** AgentZ gathers cross-domain data, proposes metric definitions, and drafts an evidence-backed pack structure. It should call out missing or unreliable sources and create reusable reporting assets only after agreement.

**Before you begin:** Have the reporting period, strategic measures, comparison period, and audience expectations ready.

**Keep in mind:** Board metrics should be stable over time. Agree definitions before comparing trends.

## Export a reviewed cohort for another system or mailing

**Recipe R-07-08** · **Kind of request:** Review then change · **For:** Reporting team, Communications team

:::example
**Ask:** "Please build a cohort for [purpose] using [criteria]. Show the inclusion and exclusion rules, counts, sample records, required columns, communication preferences, and data-quality warnings. Wait for approval before creating a saved query or export file."
:::

**When to use it:** Use this before uploading to a mailing platform, event platform, analytics system, or partner service. Staff need the right people and fields, with opt-outs, duplicates, and unnecessary personal data handled before export.

**What AgentZ does:** AgentZ checks the cohort rules against iMIS data, tests sample results, checks exclusions and useful columns, and prepares the export route after approval. It should make privacy, consent, and minimum-data assumptions visible.

**Before you begin:** Define the purpose, criteria, fields, destination system, and consent rules.

**Keep in mind:** Exports move data outside the immediate iMIS workflow. Review privacy, opt-outs, and minimum necessary fields.

## Combine membership, giving, and event attendance in one report

**Recipe R-07-09** · **Kind of request:** Multi-step plan · **For:** Leadership team, Membership team, Fundraising team

:::example
**Ask:** "Please design a cross-domain report showing [target cohort] with membership status, recent giving, event attendance, engagement indicators, and key contact details. Explain how records will be matched, what counts as recent, and where data may be missing. Show sample results before creating anything saved."
:::

**When to use it:** Use this when teams need a richer relationship view, such as engaged non-donors, donors who are not members, or members with event but no giving history. Cross-domain reports are valuable but easy to misread.

**What AgentZ does:** AgentZ reviews the relevant sources, proposes match logic, runs a sample, and explains limitations. It can create a saved report after approval and should include definitions for every included signal.

**Before you begin:** Define the cohort, date windows, included signals, and intended use of the list.

**Keep in mind:** Cross-domain matching can expose duplicates and missing data. Review samples before acting on the full report.
