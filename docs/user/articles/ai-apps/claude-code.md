---
lastUpdated: 2026-11-17T01:18:51Z
title: "Using AgentZ in Claude Code"
description: "Starting work in iMIS from Claude Code in a terminal or an editor, with AgentZ's commands and specialists."
describes: [commands/**, agents/**]
sidebar:
  order: 2
---

Claude Code is Claude in a terminal window or in an editor such as VS Code. Use it when your iMIS work sits beside files on your computer, such as an import spreadsheet, a theme you are building, or a report you want saved as a file.

:::tip
Add AgentZ to Claude Code first: on the AgentZ app's **Settings > AI apps** tab, click **Install Plugin** on the **Claude Code (command line)** card. See [Connecting your AI app](/docs/getting-started/connecting-your-ai-app/).
:::

## Before you begin

- **The AgentZ app open and signed in**, with your iMIS site connected.
- **The AgentZ plugin installed in Claude Code.** The **Claude Code (command line)** card shows **Up to date**.
- **A new Claude Code session** after AgentZ is installed or updated. A session that was already open keeps the plugin it started with. Start a new one, or type `/reload-plugins` in the open one.

## Starting work in Claude Code

Do the following to start work in iMIS from Claude Code:

1. Open a terminal window (Terminal on a Mac, PowerShell on Windows) and type `claude`, or open Claude Code in your editor.
2. Type what you want done in iMIS, in your own words.

   > Use AgentZ to list the events starting in the next 60 days, with how many people are registered for each.

3. When Claude Code asks whether it may use one of AgentZ's tools, allow it. You can allow it once, or tell Claude Code not to ask again for that tool.
4. Watch the AgentZ app while Claude Code works. Its sidebar shows your :term[agent] by name and a card for each piece of work.

Claude Code answers in the terminal, as text and tables. Before most changes in iMIS it shows you a preview and asks you. See [How work is shown and approved](/docs/ai-apps/approvals/).

## AgentZ's commands

AgentZ adds its own commands to Claude Code. Type `/` to see them: each AgentZ command starts with `agentz:`. A command starts a guided piece of work, such as renewing a membership or publishing content, and asks you for what it needs.

To check that AgentZ is connected, type `/agentz:setup`. It checks the connection to your iMIS site and, if something is missing, says the one thing to do in the AgentZ app.

## AgentZ's specialists

AgentZ also adds specialists to Claude Code, each for one kind of work, such as membership, events, fundraising, reporting and configuration. Claude Code hands work to a specialist by itself when it fits. You can also ask for one by name, for example "Use the AgentZ events specialist to check this conference is ready to open."

## Working with files on your computer

Because Claude Code works in a folder on your computer, you can combine files and iMIS in one request:

:::example
**Ask:** "Read new-members.csv in this folder and use AgentZ to check which of these people are already contacts in iMIS. Don't change anything yet."

Claude Code reads the file, asks AgentZ to look up each person, and lists who already exists, who looks like a possible duplicate, and who is new. Nothing in iMIS changes until you ask for the next step.
:::

:::faq
**Is Claude Code the same as the Code tab in the Claude desktop app?** No. The Code tab uses the Claude desktop app's own copy of AgentZ, on the **Claude desktop app** card. The **Claude Code (command line)** card is for the `claude` command, in a terminal or an editor.

**Do Cursor and Grok Build use this copy too?** Yes. Installing AgentZ in Claude Code gives them AgentZ as well. See [Using AgentZ in Codex and other AI apps](/docs/ai-apps/other-ai-apps/).

**Claude Code says AgentZ is not connected. What do I do?** Type `/agentz:setup` and do what it says. Usually the AgentZ app is closed or not signed in to iMIS. See [AI app connection troubleshooting](/docs/troubleshooting/ai-app-connection-troubleshooting/).
:::
