---
lastUpdated: 2026-11-20T14:27:14-05:00
title: "The AgentZ plugin"
description: "What the AgentZ plugin adds to your AI app, the iMIS help it can search, how it signs in to iMIS, and how it stays up to date."
describes: [src/services/companion/connection-explanation.ts, skills/hub-connection/**, .claude-plugin/plugin.json]
sidebar:
  order: 4
---

The :term[AgentZ plugin] is the part of AgentZ that runs inside your :term[AI app]. It gives the AI app the steps it can take in your :term[iMIS site], and what it needs to know about iMIS to take them well. The newest version is {{fact:plugin-version}}.

:::tip
To add the plugin to an AI app, see [Connecting your AI app](/docs/getting-started/connecting-your-ai-app/).
:::

## What the plugin adds to your AI app

- **Steps in iMIS.** Each kind of step, such as finding a contact, registering someone for an event or building a query, is one of AgentZ's :term[tools]{to="tool"}, which is the word your AI app uses when it asks your permission. What the steps cover is in [What AgentZ can do in iMIS](/docs/capabilities/).
- **Guidance for each kind of work.** For membership, events, fundraising, reporting, websites, forms, configuration and the other areas of iMIS, the plugin tells your AI app how iMIS works, which step to use, what to check first and how to confirm the result. Your AI app uses it by itself when your request fits.
- **Commands and specialists, in Claude Code.** Guided commands that start with `agentz:`, and specialists for one kind of work each. See [Using AgentZ in Claude Code](/docs/ai-apps/claude-code/).
- **iMIS help search.** Two connectors that search the iMIS help site and the iMIS developer site (see below).

## The iMIS help your AI app can search

The plugin comes with two connectors that search copies of the public iMIS documentation, kept by iFINITY's documentation search service. They need no sign-in, and they never see your iMIS site.

| Connector | What it searches | When your AI app uses it |
|---|---|---|
| **iMIS Help** | The articles on the iMIS help site (documentation.advsol.com/imis) | To explain how a feature works, or to guide you through something you do in iMIS's own screens |
| **iMIS Developer Documentation** | The iMIS API reference and developer guides on the iMIS developer site (developer.imis.com) | To check exactly how iMIS behaves and what each field holds |

:::example
**Ask:** "How do I set up Gift Aid in iMIS? Use the iMIS help."

Your AI app searches the iMIS help site's articles and answers with the steps, naming the article it used. Nothing in your iMIS site is read or changed.
:::

## How the plugin signs in to iMIS

The plugin never asks you for an iMIS username or password, and there is nothing to set up in your AI app. You sign in to your iMIS site in the :term[AgentZ app], which gives the plugin a short-lived :term[iMIS access token] and a new one before it ends. The plugin works with your own iMIS permissions, so it can do only what you can do in iMIS.

The plugin runs on your computer, inside your AI app, and works through the AgentZ app on the same computer. That is why the AgentZ app must be open while you use AgentZ. For how the plugin connects to the AgentZ app and what it receives, see [The connection to your AI app](/docs/security/ai-app-connection/) and [Everything runs as you](/docs/security/runs-as-you/).

## How the plugin stays up to date

iFINITY publishes each new version of the plugin in the iFINITY marketplace. When **Keep the AgentZ plugin up to date automatically** is on, the AgentZ app updates the plugin in most AI apps by itself; the Claude desktop app updates its own copy when **Sync automatically** is on for the iFINITY marketplace (in Claude's **Plugins**, **Add > Manage marketplaces**, then the marketplace's **…** menu). An AI app that is already open keeps the version it started with until you close it and open it again. See [Updating AgentZ](/docs/app/updating-agentz/), and [What's new](/docs/whats-new/) for what changed in each release.

:::faq
**Does the plugin keep my iMIS data?** Yes, but only copies it makes to protect your work. It reads and changes records in your iMIS site as each step needs. Before it changes some kinds of record, such as content pages, queries and forms, it keeps a copy on your computer so that the earlier version can be put back; [Contacts and organisations](/docs/capabilities/contacts-and-organisations/) says how long, under **Finding and reading any record**. Other changes, such as a change to an event, leave no copy, so check the preview before you approve them. The iMIS access token is kept in memory only, while your AI app is open.

**Can I use the plugin without the AgentZ app?** No. The plugin signs in to iMIS through the AgentZ app, so the AgentZ app must be open and signed in.

**Why does my AI app show the plugin as "agentz" or "Agentz"?** That is how some AI apps show the plugin's name. It is the AgentZ plugin. Codex shows it as "iFINITY AgentZ".

**Do the help connectors send my iMIS data anywhere?** No. They send only the words your AI app searches for to iFINITY's documentation search service, and they never read your iMIS site.
:::
