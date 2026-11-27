---
lastUpdated: 2026-11-27T13:51:37Z
title: "Communications"
description: "What AgentZ can do with email templates, communications and notifications in iMIS, and how it checks before anything is sent."
describes: [src/tools/communications/**, src/services/communications/**]
sidebar:
  order: 6
---

AgentZ creates email templates, shows you who a communication will go to and how it will look, and sends it once you approve the exact audience and content.

## Templates, sends and notifications

AgentZ creates email templates, shows you who will receive a communication and what they will see, and sends it once you approve it.

**What AgentZ does:**

- AgentZ finds, creates and removes email communication templates, including ones that list the results of a query in a table.
- AgentZ shows you who a communication will go to and how it will look, without sending it, and points out merge fields that will not fill in.
- AgentZ sends a communication to up to 500 recipients once you approve the exact audience and content, and checks that iMIS logged each send.
- AgentZ shows a contact's communication preferences and the communications they have received.
- AgentZ sets up notification sets, messages and communication types.
- AgentZ changes a saved email template in place, such as its subject, wording, sender or recipients. Every task that sends the template uses the new version from its next run, and AgentZ names those tasks before you approve.

**Needs your approval:**

- Before every email send, AgentZ shows you a preview of the audience and the content and asks you to approve them. If either changes before the send, AgentZ stops and asks you to approve them again.
- Before AgentZ creates, changes or removes a template, notification set, message or communication type, or changes a recipient list or someone's communication preferences, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot tell you that an email reached someone's inbox, or was opened or clicked; it confirms only that iMIS logged the send.
- AgentZ does not leave out contacts who have opted out; check the audience before you approve a send.
- AgentZ cannot send directly to more than 500 recipients in one go. For a larger mailing, it builds an automation task that is switched off, tells you who it will email, and runs it once when you approve.
- AgentZ cannot rename an email template or move it to another folder; it makes a new template instead.
- AgentZ cannot use the iMIS audience builder or show delivery analytics yet.

## Examples

:::example
**Ask:** "Draft a reminder email to members whose membership ends this month, and show me who it would go to and how it looks. Don't send it."

You see the list of recipients and the email as each will see it, with any merge field that will not fill in pointed out. Nothing is sent.
:::

:::example
**Ask:** "Send it."

You see the final audience and content as a preview, and approve it. AgentZ sends the email through iMIS and checks that iMIS logged each send.
:::

:::faq
**Can AgentZ send an email without asking?** No. Every send is shown to you first. If the audience or the content changes after you approve it, AgentZ stops and asks again.
:::
