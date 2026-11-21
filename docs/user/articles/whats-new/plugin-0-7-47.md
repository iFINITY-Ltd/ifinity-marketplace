---
title: "Plugin Release: November 2026 (0.7.47)"
description: "Business objects with calculated fields are built or refused, menu items follow their pages, removals take what AgentZ made, and AgentZ tells you plainly when iMIS stops accepting its access."
sidebar:
  order: 70085526
lastUpdated: 2026-11-16T20:20:16Z
---

This release makes business objects with calculated fields dependable, keeps menu items in step with the pages they open, tidies up after removals, and makes AgentZ say plainly when iMIS stops accepting its access.

## Business objects with calculated fields, built or refused

Before you approve a business object built in the **Business Object Designer**, AgentZ now tells you in plain words what it will show, field by field, including each calculation.

### Key features

- **Nothing broken is built** – a calculated field AgentZ cannot build is refused before anything is made.
- **iMIS's own words** – when iMIS cannot publish an object, you see iMIS's own error.
- **Checked by its rows** – AgentZ says an object works only once its rows can be read.
- **A way out** – an object whose publish failed is described as saved but never published, with what uses it and how to remove it.

### How it works

Ask in your AI app, for example "Add a business object that shows a joining fee of 1 for members and 0 for everyone else". AgentZ shows the plan in plain words, waits for your approval, builds it in the designer and reads the rows back.

## Menu items follow their pages

When you ask AgentZ to add a published page to a menu, the menu item is published too, so the link works straight away.

### Key features

- **The right reason** – if a page's address shows "not found" because the menu item or the page isn't published, AgentZ says which one.
- **Removing a page** – the menu items that link to it are removed in the same approval. Any menu item that also opens another page is left in place.
- **Deleting a query** – the empty folder AgentZ made for it is removed too.

## Additional enhancements

- **When iMIS stops accepting AgentZ's access** – iMIS can end AgentZ's access part-way through the hour, for example after a settings change. AgentZ now notices, says so plainly, and tells you what to do: until your AgentZ app is updated, reopening AgentZ gets new access straight away. **Am I connected?** no longer says connected in that state, and its card shows the AgentZ plugin, AgentZ app and iMIS versions.
- **Settings changes** – a change that the settings page shows as saved is reported as done, with a note when a separate check could not be completed.
