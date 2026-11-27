---
title: "Latest Plugin Release: November 2026 (0.7.50)"
description: "Subscription renewals that move the Paid Through date, advertising order changes that keep the rest of the order, new queries in Claude for Windows, and clearer answers when a page is refused or a detail is missing."
sidebar:
  order: 70069754
lastUpdated: 2026-11-27T20:46:58Z
---

This release makes renewing a subscription move its Paid Through date, and makes advertising order changes keep the rest of the order. Building a new query works in Claude for Windows straight after an update, and AgentZ says more plainly when a page is refused or a request leaves out a detail.

## Renewals move the Paid Through date

Renewing a subscription through AgentZ now moves its Paid Through date.

### Key features

- **Starts where the term ends** – a renewal starts where the current term ends, unless you give another start.
- **Never moves back** – a renewal never moves the Paid Through date back.
- **Checked afterwards** – AgentZ reads back the Paid Through date iMIS stored.
- **Confirm after the preview** – renewing, updating, cancelling and reinstating a subscription each show a preview, and you confirm the change after it.

### Key use cases

- A member pays for another year and their Paid Through date has to move on.

### How it works

Ask, for example "Renew Jane Smith's membership for another year". AgentZ shows the new Paid Through date, waits for your approval, then renews and reads the date back.

## Advertising order changes keep the rest of the order

When AgentZ changes an advertising order, it changes only what you asked for.

### Key features

- **The rest stays** – every other part of the order stays as it was.
- **New price shown** – when you change the order's rate card, size, discounts or surcharges, AgentZ works out the new price and shows it in the preview.
- **Checked afterwards** – AgentZ checks the price after the change.

### Key use cases

- An advertiser moves from a half page to a full page.

### How it works

Ask, for example "Change order 1042 to a full page". AgentZ shows the new price and waits for your approval.

## Additional enhancements

- Building a new query works in Claude for Windows and Cowork the first time after AgentZ is updated.
- Reading a single relationship or group member works.
- A very large error page from iMIS no longer stops AgentZ until it is started again.
- When AgentZ checks a page as a member or a signed-out visitor and the site refuses the page to that person, AgentZ says they are not allowed to see it and points to the page's **Access** settings. It no longer says the site is unavailable and to try again.
- When a request leaves out a detail AgentZ needs, such as which form to look at, AgentZ says it stopped before sending anything to iMIS.
