---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Queries and reports"
description: "What AgentZ can do with IQA queries and Reporting Services reports in iMIS: running, building and changing them, and who can run what it creates."
describes: [src/tools/reporting/**, src/services/reporting/**]
sidebar:
  order: 9
---

AgentZ runs your saved IQA queries, builds new ones from a plain description of the list or report you want, and creates formatted reports from them. A new query is open to staff only unless you choose who else may run it.

## IQA queries

AgentZ finds and runs your saved IQA queries, and builds or changes queries for you from a plain description of the list or report you want.

**What AgentZ does:**

- AgentZ finds a saved query by what it is for, and runs it to return its rows.
- AgentZ saves the rows of a query as a spreadsheet (CSV) file on your computer, checks that the saved file is exactly what it built and that its row count matches the query's total, and tells you where it is.
- AgentZ builds a new IQA query with the columns, filters, sorting, joined sources, prompts, totals and calculated columns you describe, and checks that it runs before reporting it done.
- AgentZ changes an existing query in place, so that every page, iPart and automation that uses it keeps working.
- AgentZ builds trend queries grouped by day, month or year, including financial years, and filters relative to today, such as members who joined in the last 30 days.
- AgentZ builds a single event registration export with one row per registration, with the programmes and the answers to registration questions in their own columns.
- AgentZ sets who may run each query it creates: staff only by default, or anyone signed in to your website, a named group or everyone. To limit a query to members, choose a group that holds only members.
- AgentZ sends a query's results by email on a schedule or when the data changes, and sets up alerts based on a query, as tasks in **Process Automation**.
- AgentZ copies a query, and imports or exports a query as an iMIS export file.
- AgentZ moves a query to another folder, keeping it the same query, so pages and automations that use it keep working, and tells you which pages you named still point at its old place.
- AgentZ removes the folder it made for a query when you delete that query, in the same approval, once the query is gone and if nothing else is in the folder. A folder someone else made, or one AgentZ made before it kept a record of making it, stays, and AgentZ tells you why.
- AgentZ never includes card payment details, sign-in details or the system's security keys in a query it builds or runs. A saved query that shows such a column, such as the iMIS queries that list invoices due for automatic payment, runs without that column, and the results say so. A saved query that uses such details in any other way is not run; you can run it in iMIS itself.

**Needs your approval:**

- Before AgentZ creates, copies, changes, moves or deletes a query, it shows you a preview of the query and who will be able to run it, and asks you to approve it.
- If a query would show personal details to anyone outside your staff, such as people signed in to your website or the public, AgentZ tells you what it would show and to whom, and asks you to approve that first.
- Before AgentZ changes whether other systems and websites may run a query, it asks you to approve the change.
- Before AgentZ creates or changes a scheduled email or alert, it shows you who will receive it, what it sends and when, and asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot confirm how a query behaves when someone opens it in **IQA**; check it there.
- AgentZ cannot tell you when a member first logged in, or how many times they have logged in, because iMIS keeps only the most recent login.
- AgentZ cannot tell which order an answer to an event question belongs to when a person registered more than once for the same event; it repeats the answers for each of their registrations.

## Formatted reports

AgentZ creates formatted Reporting Services reports from a query or from several sets of data, puts them on a page, and checks that they display and export.

**What AgentZ does:**

- AgentZ creates a formatted report from a description of its layout, including headings, grouping, totals, page breaks, charts, your logo and brand colours, and branded invoice layouts.
- AgentZ builds the query behind the report at the same time, or uses a query you already have.
- AgentZ puts the report on an existing or new page with the **Report Display** or **SSRS Report** iPart, including its toolbar, prompts and **PDF** and **Excel** export buttons.
- AgentZ copies an existing report, and removes a report that no page uses any more.
- AgentZ tries exporting a report to PDF or Excel and checks that a real file comes back. If you ask, it saves that file on your computer when the report has an export link on your iMIS site; a report that exports only through its viewer's button is exported from the page instead.
- AgentZ runs staff-only reports in the iMIS browser and checks what they show.
- AgentZ shows you what a change to the report format settings would do, without making it.

**Needs your approval:**

- Before AgentZ creates, replaces or deletes a report or any of its parts, it shows you a preview of what it will write and asks you to approve it.
- When AgentZ builds a report, your approval covers putting it on a page, publishing that page and adding it to your website navigation, if you ask for those. Publishing a report page on its own later does not need your approval, so AgentZ checks with you who should see a report that holds data that is not public before it goes on a members' or public page.

**What AgentZ does not do:**

- AgentZ cannot schedule reports or set up report subscriptions and email delivery.
- AgentZ cannot change the report format settings; change them on the staff site at **Settings > RiSE > Report formats**.
- AgentZ does not report a new report as displaying correctly until it has published the report's page and checked it.
- AgentZ does not delete the query behind a report when it removes the report, because queries are shared; remove the query separately.

## Examples

:::example
**Ask:** "Build me an IQA query of active members grouped by chapter, with a count for each chapter."

You see the query's design and who will be able to run it, and approve it. AgentZ saves the query, runs it and shows you the first rows.
:::

:::example
**Ask:** "Make a PDF report of last month's event income by event, with our logo, and put it on the Finance reports page."

You see a preview of the report, the query behind it and the page it goes on, and approve it. AgentZ builds them, places the report on the page and checks that a PDF export comes back.
:::

:::faq
**Will a query AgentZ makes show personal details to the public?** No, not unless you approve it. If a query would show personal details to anyone outside your staff, AgentZ tells you what it would show and to whom, and asks first.

**Some rows of my new query have a blank column. Will AgentZ tell me?** Yes. When a column is blank in most of the rows the query's first run returns, AgentZ says which column and how many rows, so you can check it reads the field you meant. For example, an organisation's name is not in a person's **Full Name**.

**My query returns no rows. What do I do?** See [Query and report troubleshooting](/docs/troubleshooting/query-and-report-troubleshooting/).
:::
