---
title: "Plugin Release: November 2026 (0.7.48)"
description: "Book event sessions for someone already registered, and delete, restore or purge a business object from the Business Object Designer in the background."
sidebar:
  order: 70085317
lastUpdated: 2026-11-17T00:19:53Z
---

This release lets you book event sessions for someone who is already registered, and lets the AgentZ app delete, restore or purge a business object in the background, so a site with many queries no longer stops the delete.

## Book sessions for someone already registered

You can now ask AgentZ to book sessions for someone who is already registered for an event. AgentZ books them on iMIS's own registration screen, in the AgentZ app.

### Key features

- **Everything before you approve** – AgentZ shows each session, its price and the places left, and the total.
- **Paid later** – the total is added to the person's account to pay later. AgentZ never takes a payment or sends an email.
- **Purchase order numbers** – where your site asks for a purchase order number to pay later, AgentZ asks you for it.
- **Done means done** – the booking is reported as done only once iMIS shows the sessions on the registration.

### Key use cases

- A delegate asks to add a workshop or a dinner to the registration they already have.
- You are adding sessions for several people who registered before the sessions were set up.

### How it works

Ask in your AI app, for example "Book Jane Smith onto the Tuesday workshop and the conference dinner". AgentZ shows the sessions, prices and total, waits for your approval, then books them in the AgentZ app and reads the registration back.

## Business objects deleted, restored or purged in the background

When you ask AgentZ to delete, restore or purge a business object made in the **Business Object Designer**, the step now runs in the background in the AgentZ app, and your AI app tells you when it has finished.

### Key features

- **No stop before it starts** – a site with many queries no longer makes the delete stop before it starts.
- **You stay in charge** – taking over the iMIS browser stops the step at once.
- **Nothing changed on an older app** – if your AgentZ app is too old to run this, AgentZ asks you to update it and changes nothing.

### How it works

Ask in your AI app, for example "Delete the Room Setup business object". AgentZ shows what will be removed and what still uses it, waits for your approval, then the AgentZ app does the work in the background and your AI app tells you the outcome.
