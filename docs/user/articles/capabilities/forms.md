---
lastUpdated: 2026-11-27T13:51:37Z
title: "Forms"
description: "What AgentZ can do with iMIS forms: building and changing them in Form Builder, putting them on pages, testing them, and checking they are ready to launch."
describes: [src/tools/forms/**, src/services/forms/**]
sidebar:
  order: 10
---

AgentZ builds iMIS forms from a description of the fields, choices and rules you want, puts them on pages and tests them as the people who will use them.

## Building, testing and launching forms

AgentZ builds and changes iMIS forms, puts them on pages, tests them as different kinds of visitor, and checks whether they are ready to launch.

**What AgentZ does:**

- AgentZ creates and changes forms in **Form Builder** from a description of the fields, choices and rules you want.
- AgentZ adds plain questions, such as a rating or a comment, with a place to store the answers.
- AgentZ follows one rule for what works and what is safe when a form needs approval, creates an account, touches member type or membership, or runs a step after submission. It tells you which combinations iMIS cannot do, and why in iMIS's own words, and which routes do work. For a membership application it offers you each route: two forms with staff setting the member type, a step that sets the member type when staff approve (not yet proven), or **Join Now** with a separate approval form. A step that changes someone's member type or membership always waits for staff approval: AgentZ will not attach one to a form that saves without approval.
- AgentZ builds a file upload that saves to a record with many rows: set up so that each submission adds a row with its file, such as a qualification with its certificate, or so that it attaches a file to one row that already exists. Whether a test submission lands in the right row is checked separately, as for any form. iMIS does not allow a file upload inside a reusable multi-row layout, so the upload goes on its own form.
- AgentZ puts a form on a page, and finds which pages a form appears on.
- AgentZ tests a form as a signed-out visitor, as a member, or as a staff member acting on someone's behalf, including file uploads, and checks where iMIS saved the answers.
- AgentZ sets up what happens after someone submits a form, such as updating their record.
- AgentZ manages form groups, reusable multi-row layouts, the **Health Check**, and submissions waiting for approval.
- AgentZ moves forms to another iMIS site.
- AgentZ deactivates and deletes draft forms that have no submissions.
- AgentZ tells you whether a form is ready to launch, covering its pages, saved answers, notifications, approvals, security and reporting.

**Needs your approval:**

- Before AgentZ creates, changes, converts, moves or deletes forms, form groups or multi-row layouts, restores an earlier version of a form, or approves, rejects or returns submissions or adds reviewer notes, it asks you to approve it.
- Before AgentZ sets what happens when someone submits a form, or makes test submissions that change data or send emails, it asks you to approve it.
- AgentZ does not ask you to approve putting a form on a page; it checks first that the form can be shown there, then reads the page back.
- Before AgentZ clears the **Health Check** log, it exports the log for you to review and asks you to approve clearing it once the faults are repaired. Clearing the log removes its history; it does not fix any form.

**What AgentZ does not do:**

- AgentZ cannot solve or get around a CAPTCHA.
- AgentZ cannot delete a form that has submissions or appears on a page.
- AgentZ cannot bring across custom database code from older forms; it rebuilds the steps it supports and tells you which steps need a custom iPart or other work.
- AgentZ cannot recreate form settings or controls that it cannot reproduce exactly, such as inline lists of radio buttons or hidden fields; it tells you the alternatives.

## Examples

:::example
**Ask:** "Build a contact update form for members, with their address, phone and email, that updates their record when they submit it. Put it on the member portal's My details page."

You see a preview of the form and what happens when someone submits it, and approve it. AgentZ builds the form, places it on the page, and tests it as a member, showing you where iMIS saved the answers.
:::

:::example
**Ask:** "Is the volunteer application form ready to launch?"

You see a readiness check covering the form's pages, saved answers, notifications, approvals, security and reporting.
:::

:::faq
**Can AgentZ fill in a form that has a CAPTCHA?** No. AgentZ never solves or gets around a CAPTCHA.
:::
