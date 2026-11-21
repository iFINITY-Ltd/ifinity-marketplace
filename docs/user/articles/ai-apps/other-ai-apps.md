---
lastUpdated: 2026-11-16T14:51:16Z
title: "Using AgentZ in Codex and other AI apps"
description: "Starting work in iMIS from Codex and the other AI apps AgentZ works with, and what differs between them."
sidebar:
  order: 3
---

AgentZ works with {{fact:app-ai-apps}}. In every one of them you work the same way: you ask in plain words, the AI app takes AgentZ's steps in your iMIS site, and the AgentZ app shows each step. What differs is how each app starts AgentZ and how it asks your permission.

:::tip
Add AgentZ to the AI app first. Each app's steps are on its card in the AgentZ app's **Settings > AI apps** tab, and in [Connecting your AI app](/docs/getting-started/connecting-your-ai-app/).
:::

## Before you begin

- **The AgentZ app open and signed in**, with your iMIS site connected.
- **The AI app's card showing Up to date** on **Settings > AI apps**. A card that shows **Turn on the bridge** needs the **Desktop Apps Bridge** switched on before the AI app can start AgentZ.
- **A new session in the AI app** after AgentZ is added or updated. An AI app that is already open keeps the plugin it started with.

## Starting work

Do the following to start work in iMIS from any of these AI apps:

1. Open the AI app and start a new conversation or session.
2. Type what you want done in iMIS, starting with "Use AgentZ".

   > Use AgentZ to find contacts who share an email address with another contact. Don't merge anything.

3. When the AI app asks whether it may use one of AgentZ's tools, or run AgentZ, allow it.
4. Watch the AgentZ app. Its sidebar shows your :term[agent] by name, and **All activity** names the AI app it came from.

The AI app answers as text and tables. Before most changes in iMIS it shows you a preview and asks you in the conversation. See [How work is shown and approved](/docs/ai-apps/approvals/).

## What differs between AI apps

| AI app | What to know when you use AgentZ in it |
|---|---|
| **Codex** | Works in a terminal and in the ChatGPT app. It needs the AgentZ plugin and the **Desktop Apps Bridge**. Codex may search for the AgentZ tool it needs before it uses it, so it can take a moment longer on the first step of a session |
| **OpenCode** | Works in its terminal app and its desktop app. It may show only a few of AgentZ's tools at first and look up the others as it needs them |
| **GitHub Copilot** | Works in a terminal, in VS Code and in the Copilot app. Copilot starts AgentZ only while you are signed in to Copilot |
| **Cursor** | Uses the AgentZ plugin that Claude Code installed on this computer. Install AgentZ in Claude Code to use it in Cursor |
| **Grok Build** | Uses its own copy of AgentZ or the one Claude Code installed. On Windows it needs the **Desktop Apps Bridge** |
| **Devin** | Works in the Devin command line and the Devin app, while you are signed in to Devin |
| **Hermes Agent** | Has no plugins. It reaches AgentZ through the **Desktop Apps Bridge** alone, so it has AgentZ's steps in iMIS but not the plugin's guidance for each kind of work. Name the work clearly in your request |

:::note
Codex, OpenCode, GitHub Copilot, Grok Build and Devin are updated by AgentZ itself when **Keep the AgentZ plugin up to date automatically** is on. See [Updating AgentZ](/docs/app/updating-agentz/).
:::

:::faq
**Does AgentZ do the same things in every AI app?** Yes. Every AI app takes the same steps in iMIS, with the same previews, approvals and checks. How each app shows results and asks for permission is its own.

**Which AI app should I use?** The one your organisation already uses and pays for. AgentZ does not provide the AI app or its subscription. Cowork in the Claude desktop app shows results, previews and choices as boards in the conversation; see [Using AgentZ in the Claude desktop app and Cowork](/docs/ai-apps/claude-desktop-app/).

**The AI app says it cannot find AgentZ. What do I do?** Check the app's card on **Settings > AI apps**, close the AI app completely and open it again, then see [AI app connection troubleshooting](/docs/troubleshooting/ai-app-connection-troubleshooting/).
:::
