# Connectors

The AgentZ plugin comes with three connectors: one for your iMIS site, and two that search ASI's iMIS documentation.

## iMIS (agentz)

The main connector. It reads and changes records in your iMIS site, as you.

- **Records:** most kinds of record in iMIS, across membership, events, fundraising, billing, content, certification, communications and more
- **What it does:** finding, reading, creating, updating and deleting records, running queries, and building dashboards and website content
- **Sign-in:** the AgentZ app signs it in to iMIS; there is nothing to set up in Claude

## iMIS Help Documentation (imis-docs)

Search across the articles on ASI's official iMIS help site (documentation.advsol.com/imis, which replaced help.imis.com in 2026). Covers product features, configuration, and step-by-step guidance for tasks across RiSE, finance, settings, community, membership, marketing, events, reports, fundraising, commerce, and more.

- **Sign-in:** none, because the pages are public
- **When Claude uses it:** to explain how to set something up in iMIS, to look up how a feature behaves, or to guide you through steps AgentZ cannot do for you

## iMIS Developer Documentation (imis-docs-dev)

Search across ASI's iMIS developer documentation at developer.imis.com: the iMIS API reference and the developer guides.

- **Sign-in:** none, because the pages are public
- **When Claude uses it:** to check exactly how the iMIS API behaves and what each field holds

## Using Additional Connectors

You can connect other services beside the AgentZ plugin. Ones association teams often use with it:

| Category | Use with iMIS for... | Examples |
|----------|---------------------|----------|
| Email | Member communications and campaigns | Microsoft 365 |
| Cloud storage | Storing exported reports and documents | Microsoft 365, Dropbox |
| Project tracking | Tracking implementation and operational tasks | Jira, Asana, Linear |
| Team chat | Notifying staff of member changes or task outcomes | Slack, Microsoft Teams |

To add a connector in Claude Code:
```bash
claude mcp add --transport http --scope user your-server-name https://your-server.com/mcp
```
