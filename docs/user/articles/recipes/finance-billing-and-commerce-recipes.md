---
lastUpdated: 2026-11-16T14:51:16Z
title: "Finance, billing and commerce recipes"
description: "Prompts for invoices, payments, refunds, AutoPay, scheduled payments, disputes, aged debt, and product setup. Finance-sensitive actions are framed as evidence, approval, and readback."
sidebar:
  order: 6
---

Prompts for invoices, payments, refunds, AutoPay, scheduled payments, disputes, aged debt, and product setup. Finance-sensitive actions are framed as evidence, approval, and readback.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Take a staff-assisted payment on an open invoice

**Recipe R-06-01** · **Kind of request:** Guided handoff · **For:** Finance team, Member services

:::example
**Ask:** "Please help me take payment for [member/customer] invoice [invoice number]. Show the invoice, balance due, payer, related order or membership/event, payment options, and any credits or disputes. Prepare the payment step for [cash/cheque/card] and stop before recording or processing it."
:::

**When to use it:** Use this when staff are helping a member or organisation pay an outstanding invoice. Finance needs to confirm the right invoice and amount before money is recorded.

**What AgentZ does:** AgentZ reads the invoice, balance, customer, and related order context, then prepares the payment route. It should separate cash/cheque recording from secure card processing and wait for approval or native payment completion.

**Before you begin:** Have the invoice number, payer, payment method, amount received, and finance policy ready.

**Keep in mind:** Do not enter card details into AgentZ. Use the approved payment gateway or iMIS payment surface.

## Prepare a secure card payment for an invoice

**Recipe R-06-02** · **Kind of request:** Guided handoff · **For:** Finance team, Member services

:::example
**Ask:** "[Member/customer] wants to pay invoice [invoice number] by card. Please confirm the balance, payer, invoice purpose, and whether the secure card-payment route is available. Guide me to the approved payment step and then help verify the payment result. Do not collect card details in the prompt."
:::

**When to use it:** Use this when a member is on the phone or staff are supporting online payment. The job is to use the secure route while keeping the iMIS balance accurate.

**What AgentZ does:** AgentZ checks the invoice and payment-readiness evidence, guides staff to the hosted or approved card flow, and reads back payment or balance evidence after completion where available.

**Before you begin:** Have the invoice number, payer identity, amount, and approved card-processing route ready.

**Keep in mind:** Card data must stay in the secure payment surface. AgentZ should not store or repeat card numbers.

## Prepare a refund or credit for an overpayment or returned order

**Recipe R-06-03** · **Kind of request:** Review then change · **For:** Finance team, Member services

:::example
**Ask:** "Please review [order/invoice/payment] for a possible refund or credit of [amount]. Show the original charge, payments, balance, related membership/event/product, cancellation or refund policy, and accounting-period concerns. Recommend the safest handling and stop before changing finance records."
:::

**When to use it:** Use this when someone overpays, cancels, returns a product, or disputes a charge. Finance needs to know whether the right answer is refund, credit, write-off, or no change.

**What AgentZ does:** AgentZ checks the order, invoice, payment, and related member/event/product context, then lays out the financial options and risks in plain language. It should require finance approval before any refund, credit, write-off, or adjustment step, and it should leave a clear note of what still needs staff-site handling.

**Before you begin:** Have the order or invoice reference, requested amount, reason, and policy instruction ready.

**Keep in mind:** Refunds and credits affect accounting and member trust. Confirm the treatment in finance before acting.

## Set up or troubleshoot AutoPay for a member

**Recipe R-06-04** · **Kind of request:** Guided handoff · **For:** Finance team, Membership team

:::example
**Ask:** "Please review AutoPay for [member name/ID]. Show whether they have an active payment schedule, linked invoices or membership billing, next collection date, recent failures, payment method posture, and any missing setup. If a setup or correction is needed, prepare the steps and stop for approval."
:::

**When to use it:** Use this when a member wants recurring payment, says payment should have been automatic, or finance needs to correct a schedule. Staff need the schedule, invoice, and failure evidence in one view.

**What AgentZ does:** AgentZ reads payment schedule, invoice, member, and recent transaction evidence, then explains whether AutoPay is active, paused, incomplete, or failing. It should guide setup or correction through approved payment processes.

**Before you begin:** Have the member, intended billing item, collection timing, and payment method policy ready.

**Keep in mind:** Recurring payment setup is sensitive. Do not enter bank or card details into AgentZ.

## Diagnose why an AutoPay collection did not run as expected

**Recipe R-06-05** · **Kind of request:** Look up · **For:** Finance team

:::example
**Ask:** "Please investigate why AutoPay did not collect for [member/cohort/run/date]. Check schedules, due invoices, payment method posture, failed attempts, exclusions, balances, and any task or processor clues. Give me the likely reason and who needs staff follow-up. Do not retry collections yet."
:::

**When to use it:** Use this after a missed recurring-payment run or member complaint. Finance needs to know whether the problem is schedule, invoice, payment method, processor, or expectation.

**What AgentZ does:** AgentZ gathers AutoPay, invoice, schedule, and failure evidence and groups cases by likely cause. It should recommend follow-up and avoid retrying or changing payments without a separate approval step.

**Before you begin:** Have the member, collection date, run name, or affected cohort ready.

**Keep in mind:** A failed collection can have several causes. Do not promise payment was or was not attempted until evidence supports it.

## Review upcoming scheduled payments

**Recipe R-06-06** · **Kind of request:** Multi-step plan · **For:** Finance team, Membership team

:::example
**Ask:** "Please review scheduled payments due between [start date] and [end date]. Group by membership billing, event, donation, or other reason; show expected amount, due date, payment posture, and accounts needing staff attention. Flag high-risk failures before the collection date."
:::

**When to use it:** Use this before a collection run or finance planning meeting. Staff want to spot expired methods, missing invoices, unusual amounts, and vulnerable members before problems become support tickets.

**What AgentZ does:** AgentZ reads scheduled payment and related account context, groups upcoming collections, and highlights exceptions. It should produce an action list rather than changing schedules automatically.

**Before you begin:** Set the date range, payment type, and whether to include inactive or suspended accounts.

**Keep in mind:** Scheduled payment data can change quickly. Run the review close to the collection date for operational decisions.

## Investigate a billing dispute with evidence

**Recipe R-06-07** · **Kind of request:** Look up · **For:** Finance team, Member services

:::example
**Ask:** "[Member/customer] disputes [charge/invoice/payment]. Please reconstruct what was charged, when, why, what was paid, what remains open, and which membership, event, product, or donation caused it. Include invoice/order/payment references and a plain-English explanation for staff."
:::

**When to use it:** Use this when someone says they were charged incorrectly, paid already, or does not recognise an invoice. Staff need a defensible explanation before refunding, correcting, or replying.

**What AgentZ does:** AgentZ checks invoice, order, payment, balance, and related membership/event/product evidence, then links the charge back to the operational reason staff can explain. It should separate confirmed facts, likely explanation, and recommended next action while keeping the task read-only.

**Before you begin:** Have the person, invoice/order/payment reference, amount, and complaint text ready.

**Keep in mind:** If the evidence points to a correction, run that as a separate finance-approved action.

## Prepare an outstanding-balance or aged-debt report

**Recipe R-06-08** · **Kind of request:** Multi-step plan · **For:** Finance team, Leadership team

:::example
**Ask:** "Please prepare an outstanding-balance report as of [date]. Group balances by age, customer type, membership/event/product source, responsible team, and high-value accounts. Exclude or flag disputed, cancelled, or written-off items. Show the rules and sample rows before creating any reusable report."
:::

**When to use it:** Use this before finance meetings, debt-chasing work, or year-end review. Finance needs to distinguish collectible balances from noise, disputes, or old setup issues.

**What AgentZ does:** AgentZ reviews invoice and balance data, proposes ageing buckets and exclusions, and prepares a report staff can reuse. It should show the counting logic before creating a report or dashboard.

**Before you begin:** Have the as-of date, ageing buckets, minimum balance, and exclusions ready.

**Keep in mind:** Aged debt depends on finance policy. Review write-offs, cancellations, and disputed balances before action.

## Add a product with member and non-member pricing

**Recipe R-06-09** · **Kind of request:** Guided handoff · **For:** Finance team, Commerce administrator

:::example
**Ask:** "Please help set up [product/item name] with [member price] and [non-member price], available from [date]. First review similar items, categories, tax/VAT posture, income account or finance coding, visibility, and fulfilment notes. Prepare the product setup checklist and stop before creating or updating the item."
:::

**When to use it:** Use this when selling merchandise, digital resources, event extras, or paid services through iMIS. Commerce setup must line up with finance, tax, and member pricing rules.

**What AgentZ does:** AgentZ reviews existing item patterns and pricing evidence, then prepares a setup plan with fields staff need to confirm. Where product creation is native or finance-controlled, it gives a handoff checklist.

**Before you begin:** Have product name, description, prices, availability, tax/VAT treatment, income coding, and visibility rules.

**Keep in mind:** Incorrect product setup can affect accounting and member experience. Review with finance before launch.
