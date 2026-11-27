---
lastUpdated: 2026-11-16T14:55:01Z
title: "Working with your AI app"
description: "How you use AgentZ from your AI app: what the AgentZ plugin adds, how you ask for work in iMIS, and how changes are shown to you and approved."
sidebar:
  label: "Overview"
  order: 0
---

You do work in iMIS with AgentZ by asking your :term[AI app] in plain words. The :term[AgentZ plugin] in your AI app gives it the steps it can take in your :term[iMIS site], and the :term[AgentZ app] on your computer signs those steps in to iMIS as you and shows each one as it happens. AgentZ works with {{fact:app-ai-apps}}.

:::tip
Set up AgentZ first. See [Connecting your AI app](/docs/getting-started/connecting-your-ai-app/) and [Checking your setup](/docs/getting-started/checking-your-setup/).
:::

## How the parts fit

| Part | Where it is | What it does when you ask for something |
|---|---|---|
| Your AI app | On your computer, signed in to its own account | Understands your request, decides which steps to take, and shows you the answer, any preview and any question |
| The AgentZ plugin | Inside your AI app | Gives the AI app the steps it can take in iMIS, and what it needs to know about iMIS to take them well |
| The AgentZ app | On your computer, open while you work | Signs the AgentZ plugin in to your iMIS site as you, opens iMIS's own screens in the :term[iMIS browser] when a step needs them, and lists every :term[agent] and :term[step] |
| Your iMIS site | Online, at your organisation's address | Holds your records. Every step runs with your own iMIS permissions |

:::example
**Ask:** "Use AgentZ to show me which members are due to renew in the next 30 days."

Your AI app asks AgentZ to find the members, and the AgentZ app's sidebar shows your agent **Working**. The answer comes back in the conversation as a list, with how AgentZ found it. Nothing in iMIS changes, because the request only reads.
:::

For good requests, see [Asking AgentZ to do iMIS work](/docs/ai-apps/what-to-ask/). For what AgentZ can and cannot do in each part of iMIS, see [What AgentZ can do in iMIS](/docs/capabilities/). For ready-made requests, see [Recipes](/docs/recipes/).

:::faq
**Do I need to type my iMIS password into my AI app?** No. You sign in to iMIS once, in the AgentZ app. Your AI app never receives your iMIS username or password. See [The connection to your AI app](/docs/security/ai-app-connection/).

**Can AgentZ do more in iMIS than I can?** No. Every step runs as you, with your own iMIS permissions. If iMIS would refuse you, it refuses AgentZ.

**Does the AgentZ app have to be open?** Yes. Your AI app works in iMIS through the AgentZ app, so keep it open while you work.

**Can I use AgentZ in more than one AI app?** Yes. Add it to each one. The AgentZ app's activity shows which AI app each agent came from.
:::
