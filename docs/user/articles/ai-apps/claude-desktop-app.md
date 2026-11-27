---
lastUpdated: 2026-11-16T14:51:17Z
title: "Using AgentZ in the Claude desktop app and Cowork"
description: "Starting work in iMIS from Cowork, the Code tab and Chat in the Claude desktop app, and what you see there while AgentZ works."
sidebar:
  order: 1
---

In the Claude desktop app you can use AgentZ from **Cowork**, from the **Code** tab and from **Chat**. Cowork is the usual place for day-to-day iMIS work: you ask in plain words, and Claude shows results, previews and choices in the conversation.

:::tip
Add AgentZ to the Claude desktop app first. See [Connecting your AI app](/docs/getting-started/connecting-your-ai-app/).
:::

## Before you begin

- **The AgentZ app open and signed in**, with your iMIS site connected. If it is closed, Claude cannot reach iMIS through AgentZ.
- **The AgentZ plugin added to the Claude desktop app.** On the AgentZ app's **Settings > AI apps** tab, the **Claude desktop app** card shows **Up to date**. If it shows **Reopen to finish updating**, quit Claude completely and open it again.
- **For Chat only, the Desktop Apps Bridge.** Cowork and the Code tab use the plugin by itself. To use AgentZ in Chat, turn on **Desktop Apps Bridge** on the **Claude desktop app** card as well. See [AI apps settings](/docs/app/ai-apps-settings/).

## Starting work in Cowork

Do the following to start work in iMIS from Cowork:

1. In the Claude desktop app, open **Cowork** and start a new task.
2. Type what you want done in iMIS, in your own words, and send it. Saying "Use AgentZ" at the start helps Claude choose AgentZ straight away.

   > Use AgentZ to show me the full picture for Jane Smith before I change anything.

3. If Claude asks whether it may use one of AgentZ's tools, allow it. Claude asks this the first time it uses each tool, unless you choose to always allow it.
4. Watch the AgentZ app while Claude works. Its sidebar shows your :term[agent] by name, **Working**, and a card for each piece of work.

Claude answers in the conversation. Where an answer is a list, a comparison, an audit or a choice, Cowork shows it as a board inside the conversation, with summary cards, the evidence behind each line, and buttons for the next things you are likely to ask.

## When Claude asks you to approve a change

Before AgentZ makes most changes in iMIS, Claude shows you a preview of what will change and asks you in the conversation. Reply to approve it, or say what to change. AgentZ then makes the change and reads it back from iMIS, and Claude tells you what iMIS now holds. See [How work is shown and approved](/docs/ai-apps/approvals/).

## Using the Code tab and Chat

- **The Code tab** uses the same copy of the AgentZ plugin as Cowork. Use it when you also want Claude to work with files on your computer, such as a spreadsheet you want imported.
- **Chat** reaches AgentZ through the Desktop Apps Bridge. It shows AgentZ's result views when the bridge is on.

In the AgentZ app's activity, work from the Claude desktop app is labelled with the copy of the plugin it ran from, such as **Cowork**, whichever conversation it came from.

:::important
The Claude desktop app keeps the AgentZ plugin it started with. After AgentZ is updated, quit Claude completely and open it again before you carry on. See [Updating AgentZ](/docs/app/updating-agentz/).
:::

## Carrying on earlier work

When you start a new task about work that you or your team began earlier, Claude is told about that earlier work and can carry on from it. In the AgentZ app, **All activity > History** lists finished work. **Continue in Claude** copies a summary of a finished task, which you paste into a new conversation to carry on. See [Activity and approvals](/docs/app/activity-and-approvals/).

:::faq
**Do I need to restart Claude after I connect iMIS?** No. Once the AgentZ app is signed in to your iMIS site, AgentZ works in the next request.

**Claude answered without using AgentZ. What do I do?** Ask again, starting with "Use AgentZ". If it still does not use AgentZ, check that the **Claude desktop app** card in the AgentZ app shows **Up to date**, then see [AI app connection troubleshooting](/docs/troubleshooting/ai-app-connection-troubleshooting/).

**Can I use AgentZ in Cowork and Claude Code at the same time?** Yes. Each conversation is its own agent in the AgentZ app. Agents take turns in the iMIS browser when a step needs iMIS's own screens.

**Can I stop Claude part way through?** Yes. Stop it in Claude, or click **Stop** on the agent in the AgentZ app. What AgentZ has already changed in iMIS stays changed. See [Stopping and resuming agent work](/docs/app/stopping-and-resuming-agent-work/).
:::
