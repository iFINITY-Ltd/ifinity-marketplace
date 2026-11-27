---
lastUpdated: 2026-11-16T14:51:16Z
title: "Events and conferences recipes"
description: "Prompts for event setup, registration operations, attendance, waitlists, cancellations, payments, logistics, and dashboards. Each recipe keeps roster changes, finance effects, and attendee communications visible."
sidebar:
  order: 2
---

Prompts for event setup, registration operations, attendance, waitlists, cancellations, payments, logistics, and dashboards. Each recipe keeps roster changes, finance effects, and attendee communications visible.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Check event readiness before registration opens

**Recipe R-02-01** · **Kind of request:** Look up · **For:** Events team, Conference operations

:::example
**Ask:** "Please review [event name or code] before we open registration. Check capacity, prices, registration options, dates, sessions, waitlist posture, finance links, confirmation communications, and anything that looks incomplete or inconsistent. Give me a plain-English readiness list with must-fix items first and do not change the event."
:::

**When to use it:** Use this before launching a conference, webinar, course, or meeting. The events team needs confidence that members can register, pay, receive the right confirmation, and appear on staff rosters without last-minute surprises.

**What AgentZ does:** AgentZ reads the event setup and related iMIS records it can reach, then turns the evidence into a launch checklist. It should highlight missing or unusual setup, explain the operational risk, and leave any native iMIS edits for a confirmed follow-up.

**Before you begin:** Have the event name or code and the intended launch date ready.

**Keep in mind:** AgentZ can review and report the setup. It should not promise that every website layout, tax rule, payment gateway, or email template is live until those surfaces have been checked.

## Run the registration desk during a live event

**Recipe R-02-02** · **Kind of request:** Review then change · **For:** Events team, Front desk staff

:::example
**Ask:** "We are running [event name] today. Please help the registration desk check [attendee name/email]. Show their registration status, payment status, badge or session notes, and whether they can be checked in or need staff review. If they are a walk-in, prepare the registration options and price before anything is added."
:::

**When to use it:** Use this at a conference desk, webinar support desk, or training check-in. Staff need fast answers without risking duplicate registrations or letting unpaid attendees through by mistake.

**What AgentZ does:** AgentZ finds the attendee, reads their registration and balance context, and gives a clear desk decision. For walk-ins or check-in changes it should show the proposed action and wait for staff confirmation.

**Before you begin:** Have the event name, attendee name or email, and any on-the-day policy for unpaid or walk-in attendees ready.

**Keep in mind:** Live-event work is time sensitive but still affects finance and attendance records. Confirm the exact person before changing a registration.

## Handle a waitlist request and explain the next step

**Recipe R-02-03** · **Kind of request:** Review then change · **For:** Events team, Member services

:::example
**Ask:** "[Person name/email] wants to attend [event name], but capacity may be full. Please check availability, existing registration, waitlist position if any, payment rules, and communication history. Tell me whether to register, waitlist, or advise them differently, and stop before changing their status."
:::

**When to use it:** Use this when an event is close to capacity or a member asks where they stand. Events staff need a fair, explainable answer that matches the current roster and waitlist.

**What AgentZ does:** AgentZ checks the event capacity, registration record, and waitlist evidence, then presents the current position and options. It can prepare a registration or waitlist change after approval and suggest a message to the attendee.

**Before you begin:** Have the event name, person details, and any priority or member-only policy ready.

**Keep in mind:** Capacity and waitlist rules are sensitive. Do not promise a place until the registration record is confirmed.

## Check in an attendee and note CPD attendance

**Recipe R-02-04** · **Kind of request:** Review then change · **For:** Events team, CPD administrator

:::example
**Ask:** "Please check [attendee name/email] into [event or session] and prepare the attendance evidence needed for CPD credit. First confirm their registration, payment/eligibility, session attendance requirement, and whether they are enrolled in the relevant CPD programme. Show me the result before writing attendance or credit records."
:::

**When to use it:** Use this for courses, conferences, and sessions where attendance may later support CPD or certification credit. Staff need attendance captured cleanly so CPD administration is not rebuilt from memory later.

**What AgentZ does:** AgentZ checks registration and attendance context, then looks for CPD enrolment or credit rules where available. It should separate event check-in from CPD crediting and pause before each record-changing step.

**Before you begin:** Have the event/session name, attendee details, and CPD programme or credit rule if relevant.

**Keep in mind:** Attendance and CPD credit may be separate records. Confirm both if the event has professional-development consequences.

## Cancel a registration and apply the correct cancellation handling

**Recipe R-02-05** · **Kind of request:** Review then change · **For:** Events team, Finance team

:::example
**Ask:** "Please prepare cancellation for [attendee name/email] on [event name]. Check the registration, payment status, cancellation deadline, fee policy, open invoice or refund position, and any session or waitlist impact. Show me the financial and roster effect before changing anything."
:::

**When to use it:** Use this when an attendee cancels or is no longer eligible to attend. The event team needs the roster corrected while finance gets the fee, credit, or refund treatment right.

**What AgentZ does:** AgentZ reads the registration, event rules, invoice/payment context, and roster impact, then presents a cancellation plan. It should not cancel, refund, or adjust money until staff approve the specific outcome.

**Before you begin:** Have the event name, attendee details, cancellation date, and policy instruction ready.

**Keep in mind:** Cancellation rules vary. If the financial treatment is unclear, have finance approve before changing the registration.

## Find event attendees with unpaid balances

**Recipe R-02-06** · **Kind of request:** Multi-step plan · **For:** Events team, Finance team

:::example
**Ask:** "For [event name], please list registered attendees with unpaid or partly paid balances. Separate confirmed attendees, pending registrations, cancelled attendees, and organisations paying on behalf of others. Show invoice numbers, amounts, due dates, and a suggested follow-up order. Do not take payments or send reminders yet."
:::

**When to use it:** Use this before a conference, after early-bird deadlines, or before finance reconciliation. Events staff want to know who is genuinely unpaid, not just who has an invoice somewhere.

**What AgentZ does:** AgentZ reviews registration and billing evidence together, groups the results into action categories, and highlights exceptions such as cancelled registrations or third-party payers. It can then prepare payment or reminder follow-ups as separate approved tasks.

**Before you begin:** Have the event name, payment cutoff, and whether to include cancelled or transferred registrations.

**Keep in mind:** Do not treat every invoice as an attendee debt without checking registration status and payer relationship.

## Transfer a registration to another event or session

**Recipe R-02-07** · **Kind of request:** Review then change · **For:** Events team, Member services

:::example
**Ask:** "[Attendee name/email] needs to move from [current event/session] to [new event/session]. Please compare availability, price difference, payment status, cancellation or transfer rules, and any CPD or session consequences. Give me the transfer plan and wait for approval before changing the registration."
:::

**When to use it:** Use this when an attendee changes date, course, session, or event. Transfers can affect capacity, payment, CPD credit, and communications, so staff need the side effects before moving anything.

**What AgentZ does:** AgentZ reads the current registration, target event or session, balances, and eligibility clues, then prepares a transfer summary. It should pause before changing registration or finance records and provide confirmation language for the attendee.

**Before you begin:** Have both event/session names, attendee details, and transfer policy ready.

**Keep in mind:** If the price differs, make the finance treatment explicit before approving the transfer.

## Prepare session logistics for rooms, AV, and staff

**Recipe R-02-08** · **Kind of request:** Guided handoff · **For:** Events team, Operations team

:::example
**Ask:** "Please prepare the logistics view for [event name]. Pull sessions, speakers, expected attendance, room assignments if present, AV or accessibility notes, and staff responsibilities. Flag missing room or staff assignments and produce a handoff list the operations team can use."
:::

**When to use it:** Use this when the event programme is set but operational details still need checking. Staff want one view of the practical work before delegates arrive.

**What AgentZ does:** AgentZ reads the event and session information it can access, organises it into a logistics checklist, and highlights missing data. Where the organisation tracks rooms or AV outside AgentZ-readable iMIS data, it should make that handoff clear.

**Before you begin:** Have the event name and the planning date or venue version you want reviewed.

**Keep in mind:** Rooming and AV details may live outside iMIS. Treat AgentZ output as the iMIS-based logistics packet, not the only source of truth.

## Build an event operations dashboard and attendee roster

**Recipe R-02-09** · **Kind of request:** Multi-step plan · **For:** Events team, Leadership team

:::example
**Ask:** "Please build a working operations view for [event name]: registrations by status, capacity, waitlist, unpaid balances, attendance/check-in status if available, key sessions, and a clean attendee roster. Show me the sources and layout first, then create the reusable report or dashboard only after approval."
:::

**When to use it:** Use this for major conferences or recurring events where staff need the same view every day. A dashboard reduces spreadsheet drift and helps events, finance, and leadership discuss the same numbers.

**What AgentZ does:** AgentZ reviews the available event and billing data, prepares the report or dashboard design, and explains what each metric means. It can create supported iMIS reporting assets after approval and provide a final verification checklist.

**Before you begin:** Have the event code, audience for the dashboard, and desired refresh or meeting cadence ready.

**Keep in mind:** Dashboard numbers are only as reliable as the event statuses and payment records behind them. Ask AgentZ to state the source and exclusions for each metric.
