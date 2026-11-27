---
title: "Plugin Release: November 2026 (0.7.46)"
description: "AgentZ removes and restores business objects made in iMIS's designer, updates properly in Claude on Windows, and brings its help pages with each release."
sidebar:
  order: 70085792
lastUpdated: 2026-11-16T17:18:24Z
---

This release lets AgentZ remove a business object made in the **Business Object Designer**, and restore it until it is purged. It also lets Claude on Windows update AgentZ again, and brings AgentZ's help pages with every release.

## Remove and restore business objects made in the designer

AgentZ can now remove a business object made in the **Business Object Designer**, once nothing uses it, in two steps you approve.

### Key features

- **Two steps, each approved** – first AgentZ moves the object to the **Recycle Bin**, then it purges it for good.
- **Restore until purged** – until it is purged, AgentZ can restore the object from the **Recycle Bin** with your approval, and it works again.
- **Nothing in use is removed** – AgentZ first tells you which panels, forms, queries and special prices use the object, and removes nothing while something does.
- **The name is free straight away** – after a purge, iMIS still recognises the name for a while, but the object holds no data and nothing can use it. You can give a new business object the same name straight away.

### How it works

Ask in your AI app, for example "Remove the AZ Joining Fee business object". AgentZ checks what uses it, shows you what it will do, and waits for your approval before each step. It reads the result back after each one. This needs the AgentZ app connected to your iMIS site. AgentZ cannot undo a purge.

## Additional enhancements

- **Updating AgentZ in Claude on Windows** – Claude on Windows could not update its own copy of AgentZ while AgentZ was running. From this release on, it can.
- **Mid-year joiners, one answer** – the membership plan preview now gives one answer for each dues item: what a member who joins part-way through the year pays. When your site prorates, it reads your **Billing time** from **Settings > Membership**. If the AgentZ app isn't connected, it gives the answer for each **Billing time**.
- **Help pages with each release** – AgentZ's help pages, with what it can do in each part of iMIS and worked examples, now come with each release of the plugin.
