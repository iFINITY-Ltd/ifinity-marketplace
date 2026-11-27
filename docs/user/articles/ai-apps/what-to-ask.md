---
lastUpdated: 2026-11-20T14:27:14-05:00
title: "Asking AgentZ to do iMIS work"
description: "How to ask for work in iMIS so that AgentZ gets it right first time, with example requests for each kind of work."
sidebar:
  order: 5
---

You ask AgentZ for work the way you would ask a colleague who knows iMIS well: say what you want, which records it is about, and whether anything may change. This article gives good requests for each kind of work. For ready-made requests for common jobs, see [Recipes](/docs/recipes/).

:::tip
If this is your first request, start with [Making your first request](/docs/getting-started/making-your-first-request/).
:::

## Before you begin

- **The AgentZ app open and signed in** to the iMIS site you want to work in. If you work with more than one iMIS site, check which one the AgentZ app is connected to, because every request goes to that one.
- **The names, IDs or codes you know**, such as a member's ID, an event code or the path of a query. They let AgentZ find the right record without asking you.

## Making a good request

- **Say "Use AgentZ"** at the start of a conversation, so your AI app knows to work in iMIS.
- **Name the record exactly.** "Jane Smith, ID 12345" finds one person; "Jane" may find many.
- **Say whether anything may change.** Add "Don't change anything" when you want a review. When you want a change, say so: AgentZ still shows you a preview first where approval is needed.
- **Say what the answer is for.** "for the board pack" or "so I can call them back" tells AgentZ what to put first.
- **Ask one piece of work at a time**, or ask for a plan first when the work has several parts.
- **Ask how AgentZ checked.** "How do you know?" makes it show the evidence behind an answer.

## Requests by kind of work

### Looking something up

AgentZ reads iMIS and answers. Nothing changes.

:::example
**Ask:** "Use AgentZ to show me the full picture for member 12345: their membership, open invoices, recent payments, groups, event registrations and recent communications."

You see one summary of the member, with each part taken from iMIS and anything missing or inconsistent pointed out.
:::

Other requests of this kind: "Who's registered for the Annual Conference?", "Which members are due to renew in the next 30 days?", "Why can't this member see member-only content?".

### Reviewing, then changing

AgentZ gathers the facts, proposes a change, and waits for your approval before it makes it.

:::example
**Ask:** "Jane Smith wants to cancel her place at the Annual Conference. Check her registration, what she paid and our cancellation fee, then show me what the cancellation would do before you change anything."

You see the registration, the payment and the fee, then a preview of the cancellation and any refund. Nothing changes until you approve it. See [How work is shown and approved](/docs/ai-apps/approvals/).
:::

### Building something in iMIS

AgentZ builds queries, pages, dashboards, forms, panels and themes from a plain description, and checks they work.

:::example
**Ask:** "Build me an IQA query of active members grouped by chapter, with a count for each chapter. Save it in our reports folder."

You see the query's design and who will be able to run it, and approve it before it is saved. AgentZ then runs the query and shows you the first rows.
:::

Other requests of this kind: "Create a new events landing page using our design set", "Design a member dashboard showing upcoming renewals", "Build a contact update form for members".

### Work that needs iMIS's own screens

Some work can only be done in iMIS's own screens. AgentZ either does it there in the :term[iMIS browser], where you can watch, or tells you exactly what to do yourself. The pages of [What AgentZ can do in iMIS](/docs/capabilities/) list what it cannot do yet.

:::example
**Ask:** "Publish the new events landing page and check it shows on the public site."

AgentZ publishes the page through iMIS's own publish step in the iMIS browser, then checks whether iMIS shows it as **Published** and how the page looks to a visitor.
:::

### Bigger pieces of work

For work with several parts, such as launching a conference or moving content from an old website, ask for a plan first. AgentZ lists the steps, what each needs from you and where it will ask for approval, then works through them with you.

:::example
**Ask:** "We're opening registration for the Annual Conference next week. Make a plan to check it's ready, list anything that must be fixed first, and don't change anything yet."
:::

The [Recipes](/docs/recipes/) include journeys that combine several requests, such as taking a new member from enquiry to welcome.

## Asking about iMIS itself

AgentZ can also search the iMIS help site (documentation.advsol.com/imis) for you, which is useful for work you do yourself in iMIS. Ask, for example, "How do I set up a new membership type in iMIS? Use the iMIS help." See [The AgentZ plugin](/docs/ai-apps/plugin/#the-imis-help-your-ai-app-can-search).

:::faq
**Do I need to use special words?** No. Plain words work best. Use the names you see in iMIS, such as the names of your member types, events and groups.

**What if AgentZ misunderstands me?** Say what is wrong and ask again. Because most changes wait for your approval, a misunderstanding shows up in the preview, before anything changes.

**Can I ask for something AgentZ cannot do?** Yes. AgentZ tells you it cannot do it yet, and how to do it in iMIS instead.

**Can I carry on tomorrow?** Yes. Start a new conversation and say what you were doing; AgentZ is told about your earlier work on the same task. You can also use **Continue in Claude** in the AgentZ app's **All activity > History**. See [Activity and approvals](/docs/app/activity-and-approvals/).
:::
