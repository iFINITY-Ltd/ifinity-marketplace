---
lastUpdated: 2026-11-19T12:55:56Z
title: "How work is shown and approved"
description: "How your AI app shows you what AgentZ found, previews a change and asks you to approve it, and how AgentZ checks each change in iMIS."
sidebar:
  order: 6
---

AgentZ keeps three things apart: what it found, what it would change, and what it has changed. Before most changes it shows you a :term[preview] in your :term[AI app] and waits for you to :term[approve] it. After a change it reads the result back from your :term[iMIS site] and tells you what iMIS now holds.

## Reading needs no approval

Finding, listing, checking and reporting change nothing in iMIS, so AgentZ does them without asking. Your AI app says when an answer is only a reading of iMIS as it is now, and where it was read from: your iMIS site, your team's records in AgentZ, or a website AgentZ looked at.

## How a change is approved

Do the following to approve a change:

1. Ask for the change in your AI app, for example "Register Jane Smith for the Annual Conference."
2. Read the preview. It says what will change, in which record, and anything it affects, such as a charge, an email that will be sent, or who will be able to see a page or query.
3. Approve it in the conversation, for example by replying "Yes, go ahead", or say what to change. If you say no, nothing is written.
4. Read the result. AgentZ makes the change, reads it back from iMIS, and your AI app tells you the outcome.

Your AI app asks you in its own words. In Cowork in the Claude desktop app, a preview may appear as a board with buttons; in other AI apps it is text in the conversation.

:::important
A preview is for that change only. For many kinds of change, such as pages, queries and emails, AgentZ also checks the record again just before it writes: if it changed after the preview, for example because a colleague edited it, AgentZ stops and shows you a new preview. Not every kind of change is checked this way, so before you approve a change to a record your colleagues may be working on, ask AgentZ to read it again.
:::

## What needs your approval

What needs approval is decided for each kind of work, and listed under **Needs your approval** on each page of [What AgentZ can do in iMIS](/docs/capabilities/). In general:

- **Money:** every payment, refund, reversal and automatic payment run, with the amounts and records shown first.
- **Card payments:** you or the payer enter card details in iMIS's secure Pay Central form; AgentZ never takes a card payment by itself.
- **Removing or replacing:** removing a contact, an event, a query or a menu item, recycling a page, replacing a page's content, a layout or a file, and any deletion that does not go to the iMIS recycle bin.
- **Merges:** merging two contacts or organisations, which is permanent.
- **Imports:** creating, posting, retrying or rolling back an import.
- **Things people outside your staff will see or receive:** emails and alerts before they are sent, and pages or queries that would show personal details to members or the public.
- **Settings:** changes to iMIS settings, security and access.

Some routine changes to your websites are made without asking first: creating a page, changing a page's name or settings, adding an iPart to a page, placing a form on a page, uploading a new image or file, building pages such as checkout and donation pages, adding a menu item, and publishing or launching pages. For each one, AgentZ checks that nobody changed the page or menu meanwhile, reads the result back and lists every change it made.

## How AgentZ checks a change

AgentZ reports a change as done only when it has read the record back from iMIS and found what it wrote. It gives every change one of these outcomes, which your AI app passes on to you:

- **Change verified:** written and read back as you asked.
- **Change verified, with a note:** written and read back, with something to know, such as a name iMIS stored in its own capitals, or a query that ran but found no rows.
- **Change needs verification:** iMIS accepted the change, and AgentZ has not yet been able to read the final result back.
- **Job started:** a :term[background job] is running. Follow it in the AgentZ app.
- **Refused before sending:** nothing was sent to iMIS, and the reason is given.
- **Question for you:** AgentZ needs your answer before it can go on, such as which currency an event's prices are in. Nothing was changed.
- **Not connected to iMIS:** AgentZ could not reach iMIS, so nothing was sent. It says what to do, such as reopening the AgentZ app.
- **Could not complete:** the request failed, and the reason is given in iMIS's own words where iMIS answered.

Reading a page or a setting is never shown as a change waiting for your approval.

## Approvals in the AgentZ app

Changes in iMIS are approved in your AI app, not in the AgentZ app. The AgentZ app asks you itself in two cases:

- **Opening a page as a visitor.** When an agent wants to see a page of your website as a visitor would, the sidebar asks with **Allow** and **Not now**.
- **The iMIS browser is in use.** When you have taken over the iMIS browser, or another agent is using it, an agent waits rather than taking it from you.

When an agent waits for you to answer **Allow** or **Not now** in the AgentZ app, its step in the activity ends "it needs your approval". See [Activity and approvals](/docs/app/activity-and-approvals/).

## Approving your AI app's use of AgentZ

Separately from AgentZ's own approvals, your AI app may ask whether it may use one of AgentZ's :term[tools]{to="tool"}, or run AgentZ at all. That is your AI app's permission setting, not a change in iMIS. Allowing a tool does not approve any change: AgentZ still shows you a preview before a change that needs approval.

:::faq
**Can AgentZ change something I have not approved?** Yes, for routine website changes such as creating a page, adding an iPart or a form to a page, uploading an image, adding a menu item and publishing, which it checks and reports. Everything that needs approval is shown to you first and waits for your answer.

**Does approving a tool in my AI app approve every change?** No. It lets your AI app use AgentZ. Each change that needs approval still has its own preview.

**Can AgentZ do something my iMIS permissions do not allow?** No. Every step runs as you. If iMIS refuses you, it refuses AgentZ.

**Can I undo a change?** Yes, for some changes. A preview says when a change cannot be undone, such as removing a contact. For website content, AgentZ takes a backup before it changes an existing page, and can restore it. Ask your AI app before you approve.

**Can I see later what was changed?** Yes. The AgentZ app's **All activity** lists every step each agent took and its result, and **All activity > History** lists finished work. See [Activity and approvals](/docs/app/activity-and-approvals/).
:::
