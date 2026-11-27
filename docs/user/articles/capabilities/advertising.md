---
lastUpdated: 2026-11-27T13:51:37Z
title: "Advertising"
description: "What AgentZ can do with publication advertising in iMIS: media assets, inventory, rate cards and media orders."
describes: [src/tools/advertising/**, src/services/advertising/**]
sidebar:
  order: 15
---

AgentZ sets up publication advertising, manages media orders and their creative files, and posts orders to billing.

## Advertising and media orders

AgentZ sets up advertising, manages media orders and creative files, and posts orders to billing.

**What AgentZ does:**

- AgentZ sets up media assets, inventory, ad sizes, rate cards, sales representatives and territories.
- AgentZ creates, changes and removes media orders and their adjustments, and checks the available inventory.
- AgentZ works out an order's new price when you change its rate card, its size or its adjustments, and shows it to you before it changes anything.
- AgentZ uploads creative and proof files, and attaches signed documents.
- AgentZ posts a media order, which creates a bill-me invoice, and unposts it again, or gives you the steps to do it in iMIS and checks afterwards.

**Needs your approval:**

- Before AgentZ changes advertising setup, creates, changes or removes media orders, uploads creative files or attaches signed documents, it asks you to approve it.
- Before AgentZ posts an order, which creates a real invoice, or unposts one, it shows you a preview of the plan and asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot hold inventory on its own; space is held only through the iMIS order process.
- AgentZ cannot show that a posted order is paid; check that in billing.
- AgentZ does not remove the invoice when it unposts an order; the invoice stays in place.

## Examples

:::example
**Ask:** "What advertising space is still free in the spring issue of the magazine?"

You see the available inventory for that issue, read from iMIS.
:::

:::example
**Ask:** "Create a media order for a half-page advert in the spring issue for Acme Ltd, and post it to billing."

You see a preview of the order and approve it. AgentZ creates and posts it, which creates a bill-me invoice, and reads the order back.
:::

:::example
**Ask:** "Which unposted orders are on the wrong rate card for the advertiser's membership?"

You see each order with its advertiser, their membership, the rate card it uses, the one it should use, and its price before and after. You approve the changes you want, and AgentZ moves each order to the right rate card at the new price and reads the order back.
:::

:::faq
**Does posting an order mean it is paid?** No. Posting creates the invoice. Ask AgentZ whether the invoice is paid.
:::

:::faq
**When AgentZ changes an order, does it change anything I did not ask for?** No. AgentZ changes only what you asked for, and the rest of the order stays as it was. If the order has changed since you saw the preview, AgentZ changes nothing, and you approve a new preview first.
:::

:::faq
**Does AgentZ work out the new price when I change an order's rate card?** Yes. AgentZ keeps the order's ad size, colour and frequency, takes the new rate card's price for them, and applies the order's discounts and surcharges. The preview shows the new price before anything changes. When you add, change or remove a discount or surcharge on an order, iMIS works out the new price, and AgentZ checks it.
:::
