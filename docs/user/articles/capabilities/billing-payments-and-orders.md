---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Billing, payments and orders"
description: "What AgentZ can do with membership dues, products, invoices, payments, subscriptions, automatic payments and orders in iMIS."
describes: [src/tools/billing/**, src/tools/commerce/**, src/services/billing/**, src/services/commerce/**]
sidebar:
  order: 2
---

AgentZ looks after the money side of iMIS: dues and products, invoices and payments, subscriptions and automatic payments. Every change that moves money is shown to you first, with the amounts and the records involved.

## Billing and finance

AgentZ sets up membership dues and products, looks after invoices, payments, subscriptions and automatic payments, and reads your finance settings.

**What AgentZ does:**

- AgentZ sets up a membership dues structure in one step, with dues items, member types, a billing cycle, and member and non-member prices for early, regular and late payment, reads every price back from iMIS, and removes the structure again while nothing uses it. Its preview shows how each dues item is prorated, your site's prorating schedules, and, from your site's **Prorating** setting, whether a member who joins part-way through the term pays the full price.
- AgentZ creates, changes and deletes prorating schedules. It changes a schedule's description and monthly rates on its own form, and deletes a schedule only when no billing product uses it.
- AgentZ reads billing summaries, invoices, payments, subscriptions, automatic payments, payment methods, tax and VAT settings, and Direct Debit status.
- AgentZ shows an automatic payment's schedule, amounts, dates and status, and the payment method as iMIS shows it, such as "Visa ending 1111". Card and bank account details are not included; staff see those in iMIS itself.
- AgentZ tells you what your **Settings > Finance > General** values are, such as your default currency and the first month of your financial year, and lists your payment methods and payment method sets.
- AgentZ creates, changes and removes finance settings such as GL accounts, price sheets, tax schedules, payment methods and payment terms, and starts a GL export.
- AgentZ sets up products, prices and billing cycles in the item catalogue, and shows you every other price that changes along with the one you asked for.
- AgentZ tells you what a contact would pay for a product, as iMIS works it out with member prices and special prices applied, today or on a date you choose.
- AgentZ sets up a one-off joining fee the way iMIS does it: a **Miscellaneous** billing product priced 0 on the billing cycle members join through, with special pricing that charges the fee only to new joiners. The AgentZ app must be connected when AgentZ makes the fee's price source. When it removes the plan, it leaves the fee's price source in place, because another plan with the same fee may use it.
- AgentZ creates bill-me orders, and creates, renews, cancels, reinstates or changes the owner of subscriptions.
- AgentZ takes a cash payment against an open invoice, or a card payment through the secure Pay Central payment form.
- AgentZ reverses a payment, returns a paid order and refunds a credited invoice.
- AgentZ unapplies a payment that was put on the wrong invoice: the invoice is owed again and the money stays with the payer as an **Open Credit**. It shows you each invoice and amount, and iMIS's own warning, before it asks.
- AgentZ sets up, changes and cancels automatic payments, and runs the automatic payment collection.
- AgentZ manages a contact's shopping cart, including removing a single item. Before it deletes a cart, it shows every cart of that contact that iMIS may delete along with it, and afterwards checks which ones are gone. iMIS does not empty another person's carts when AgentZ asks, so AgentZ says so and shows what is still in them.

**Needs your approval:**

- Before any payment, refund, reversal, return, subscription change or automatic payment run, AgentZ shows you a preview of the amounts and records involved and asks you to approve it.
- Before AgentZ changes finance, product, order, billing or automatic payment settings, or starts a GL export, it asks you to approve it.
- Before AgentZ creates or reprices an order or changes a shopping cart, it asks you to approve it.
- Before AgentZ sends an order, event confirmation or tribute notification, it asks you to approve it.
- Your approval covers exactly what the preview showed. If the records, amounts or details change before you approve, AgentZ asks you again instead of going ahead.

**What AgentZ does not do:**

- AgentZ cannot handle card details itself; you or the payer enter card details in the secure Pay Central form.
- AgentZ cannot price items in more than one currency, because an iMIS site has a single currency.
- AgentZ cannot use standard prorating for dues items; it sets either no prorating or special prorating with a schedule your site already has.
- AgentZ cannot make a joining fee that charges a lapsed member who rejoins: the fee it sets up charges only someone with no **Paid Through** date.
- AgentZ cannot run billing, so after it sets up a joining fee, bill one new joiner and one renewal and check the fee is charged once.
- AgentZ cannot create Direct Debit mandates, post batches, or run finance processes that iMIS offers only on its own screens; do those in iMIS.
- AgentZ cannot show that a GL export's files or your reconciliation are complete; check them in iMIS and your finance system.
- AgentZ cannot issue general refunds or credits outside the supported return and refund steps.
- AgentZ cannot yet apply an **Open Credit** to an invoice, so it cannot finish moving a payment to another invoice or contact; after AgentZ unapplies the payment, apply the credit in iMIS with **Pay Invoice** > **Apply other credit**.
- AgentZ does not report an automatic payment as collected until iMIS shows the payment applied to the invoice.
- AgentZ cannot change your **Settings > Finance > General** values yet.

## Examples

:::example
**Ask:** "Which members have open invoices more than 60 days old? Show the amount and the invoice number for each, and don't change anything."

You see the list with amounts and invoice numbers, read from iMIS, and a total.
:::

:::example
**Ask:** "Record a cash payment of £120 against invoice 4521."

You see a preview of the payment and the invoice it pays, and approve it. AgentZ records the payment and reads it back from iMIS.
:::

:::example
**Ask:** "Plan a new membership type with annual dues of £10. What does someone joining in July pay?"

You see the plan before anything is created, with every amount in your site's currency (its **Default currency code** on **Settings > Finance > General**), for example "USD 10.00". If your site has never set its currency there, the plan says so and shows the amounts without one. It names the member price and the non-member price, says when the non-member price is the member price because you gave none, and answers what a member who joins in July pays.
:::

:::note
A card payment goes through iMIS's secure Pay Central payment form, where you or the payer enter the card details. AgentZ never handles card details itself.
:::

:::faq
**Does AgentZ move money without asking?** No. Every payment, refund, reversal and automatic payment run is shown to you as a preview first, and made only once you approve it.

**Can AgentZ change our finance settings?** Yes, once you approve each change. See the **Needs your approval** list above.
:::
