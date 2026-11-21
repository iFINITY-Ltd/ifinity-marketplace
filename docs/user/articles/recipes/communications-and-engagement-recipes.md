---
lastUpdated: 2026-11-16T14:51:16Z
title: "Communications and engagement recipes"
description: "Prompts for communication history, templates, notification readiness, campaigns, and next-action messaging. Drafts, previews, and readiness checks stay separate from live sends."
sidebar:
  order: 5
---

Prompts for communication history, templates, notification readiness, campaigns, and next-action messaging. Drafts, previews, and readiness checks stay separate from live sends.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Review communications setup before making changes

**Recipe R-05-01** · **Kind of request:** Look up · **For:** Communications team, System administrator

:::example
**Ask:** "Please inspect the communications setup for [area/campaign/template]. Show templates, notification sets, recent sends or tests, source codes if relevant, audience clues, and anything that looks incomplete. I want a readiness summary only; do not update templates or send messages."
:::

**When to use it:** Use this before touching email templates, notification rules, or campaigns. Communications staff need to know what already exists so they do not edit the wrong template or duplicate an old campaign.

**What AgentZ does:** AgentZ reads the available communication, campaign, and template evidence and summarises it in staff language. It should make clear what it can prove and what needs native iMIS or email-platform review.

**Before you begin:** Have the template, campaign, notification name, or business process you want reviewed.

**Keep in mind:** A discovered template does not mean messages are currently sending. Ask for delivery or notification checks separately if needed.

## Draft and preview a templated email for one test recipient

**Recipe R-05-02** · **Kind of request:** Guided handoff · **For:** Communications team, Membership team

:::example
**Ask:** "Please draft a [message type] email for [test recipient] about [topic]. Use the organisation tone, include the right merge-field placeholders, and check the recipient context so the wording is appropriate. Show me the subject, preview text, body, and any merge or audience warnings. Do not send it."
:::

**When to use it:** Use this when communications want a real message draft grounded in iMIS context, such as renewal, event, donation, CPD, or welcome messaging. The first safe step is a single-recipient preview.

**What AgentZ does:** AgentZ reviews the recipient context, drafts the message, and flags merge-field, audience, or tone risks. It should stop at preview unless a separate approved send workflow is used.

**Before you begin:** Have the message purpose, test recipient, desired call to action, and any required wording ready.

**Keep in mind:** Drafting is not sending. Review tone, legal copy, and merge fields before approving any live communication.

## Review a member communication history

**Recipe R-05-03** · **Kind of request:** Look up · **For:** Member services, Communications team

:::example
**Ask:** "Please review communication history for [member name/ID] about [topic or date range]. Show recent emails, notices, campaign touches, receipts or acknowledgements if relevant, delivery clues, and any gaps that explain why they may not have received something. Do not resend anything yet."
:::

**When to use it:** Use this when a member says they did not receive a renewal, receipt, event confirmation, or important notice. Staff need evidence before resending or changing preferences.

**What AgentZ does:** AgentZ reads communication history and related member context, then explains what appears to have been sent, missed, or unclear. It should suggest a next action without sending messages automatically.

**Before you begin:** Have the member identifier, expected message, and approximate date ready.

**Keep in mind:** Communication history may not include external email-provider details. Be clear about what iMIS proves and what needs another system check.

## Create a branded email scaffold for a new template

**Recipe R-05-04** · **Kind of request:** Guided handoff · **For:** Communications team, Digital team

:::example
**Ask:** "Please create a branded email scaffold for [message type] using our AgentZ design system. Include subject ideas, preview text, header, body sections, call-to-action, footer notes, and merge-field placeholders for [audience]. Show the design and copy for review; do not update iMIS yet."
:::

**When to use it:** Use this when a team needs a new template that feels consistent with the organisation brand. It helps communications start from a usable draft instead of a blank editor.

**What AgentZ does:** AgentZ uses the organisation's brand settings and communication context to draft a structured email scaffold. It should provide copy and layout guidance, then hand off to a reviewed template update step if staff approve.

**Before you begin:** Have the message purpose, audience, call to action, required links, and brand requirements ready.

**Keep in mind:** Design scaffolds still need testing in the real email environment. Review mobile rendering, links, and merge fields before sending.

## Update an email template after review

**Recipe R-05-05** · **Kind of request:** Review then change · **For:** Communications team, System administrator

:::example
**Ask:** "Please prepare an update to [template name]. First show me the current template summary, where it is used, and any recent send or notification clues. Then apply this approved copy/design [paste or describe change] only after I confirm. Read back the updated template summary after the change."
:::

**When to use it:** Use this when a renewal, event, receipt, or notification template needs an approved wording or design change. Staff need to avoid editing the wrong reusable template.

**What AgentZ does:** AgentZ reads the current template and usage context, presents the proposed change, and waits for confirmation before updating where supported. It should verify the server-side readback after the change.

**Before you begin:** Have the exact template name, approved copy, links, merge fields, and reviewer approval ready.

**Keep in mind:** Template changes can affect future automated messages. Confirm where the template is used before updating it.

## Check whether an automated notification is ready

**Recipe R-05-06** · **Kind of request:** Look up · **For:** Communications team, System administrator

:::example
**Ask:** "Please check readiness for [notification/process name]. Show trigger purpose, linked template, audience or recipient rule, recent activity if visible, missing setup, and what staff should test before enabling or trusting it. Do not send or enable anything."
:::

**When to use it:** Use this before relying on automated renewal notices, receipts, application emails, event confirmations, or task notifications. Staff need to know whether the chain is actually configured.

**What AgentZ does:** AgentZ checks the notification-related records it can access and turns them into a readiness checklist. It should not claim a notification is sending unless there is evidence of trigger, template, audience, and recent behaviour.

**Before you begin:** Have the notification name, business process, or template involved.

**Keep in mind:** Automation can be partly outside visible iMIS records. Run a controlled test before relying on it.

## Prepare campaign, appeal, and source-code tracking for outreach

**Recipe R-05-07** · **Kind of request:** Review then change · **For:** Communications team, Fundraising team

:::example
**Ask:** "We are planning [outreach campaign]. Please review existing campaigns, appeals, source codes, and audience segments. Propose the cleanest tracking setup for [channels/audiences], explain how responses or gifts will be attributed, and wait for approval before creating records."
:::

**When to use it:** Use this when communications and fundraising teams need shared tracking before messages go out. Good setup prevents later disputes about which channel or audience drove engagement.

**What AgentZ does:** AgentZ checks for existing campaign structures, finds naming conflicts, and proposes source codes and audience tracking that staff can understand. It can create supported setup records after approval.

**Before you begin:** Have campaign name, dates, audiences, channels, goals, and reporting needs.

**Keep in mind:** Tracking setup should be final before the first send or donation link is used.

## Audit renewal or acknowledgement next actions

**Recipe R-05-08** · **Kind of request:** Multi-step plan · **For:** Communications team, Membership team, Fundraising team

:::example
**Ask:** "Please audit next-action communications for [renewals/acknowledgements] during [date range]. Find people who appear to need a reminder, thank-you, receipt, or staff follow-up; separate them by reason; exclude people who should not be contacted; and draft the next message for each segment without sending."
:::

**When to use it:** Use this when teams suspect reminders, thank-yous, or acknowledgements are falling through gaps. It turns communications into an action list based on membership, gift, or finance evidence.

**What AgentZ does:** AgentZ reviews the relevant operational records with communication history and preferences, then groups people by next action. It should produce drafts or handoffs for review and stop before any send.

**Before you begin:** Choose the process, date range, exclusions, and who will approve messages.

**Keep in mind:** Do not send operational messages without checking preferences, recent sends, and sensitive statuses.
