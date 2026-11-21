---
lastUpdated: 2026-11-16T14:51:16Z
title: "Certification and CPD recipes"
description: "Prompts for CPD administrators and education teams managing programmes, enrolments, credits, progress, expiries, and event-linked attendance. They focus on member-facing transcript accuracy and review before crediting."
sidebar:
  order: 4
---

Prompts for CPD administrators and education teams managing programmes, enrolments, credits, progress, expiries, and event-linked attendance. They focus on member-facing transcript accuracy and review before crediting.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Review the certification programme catalogue

**Recipe R-04-01** · **Kind of request:** Look up · **For:** CPD administrator, Education team

:::example
**Ask:** "Please show me the current certification and CPD programmes in iMIS, with their main components, enrolment posture, credit or experience requirements where visible, expiry rules, and anything that looks incomplete. I only need a readable catalogue summary, not a data dump."
:::

**When to use it:** Use this when a CPD administrator is orienting themselves, checking setup before enrolments, or answering a staff question about what programmes exist. It turns scattered configuration into a usable staff view.

**What AgentZ does:** AgentZ reads the certification programme and component evidence it can access, summarises the setup, and highlights gaps or unusual configuration. It should keep this read-only and identify where native iMIS setup needs staff review.

**Before you begin:** Know whether you want all programmes or a specific credential, category, or year.

**Keep in mind:** Programme setup can be local and complex. Treat the summary as a staff navigation aid, not a replacement for formal policy documentation.

## Enrol a member in a certification programme

**Recipe R-04-02** · **Kind of request:** Review then change · **For:** CPD administrator, Member services

:::example
**Ask:** "Please prepare enrolment for [member name/ID] into [certification programme]. Check their membership status, existing enrolments, eligibility clues, previous credits, fees or invoices if relevant, and the correct start date. Show me the enrolment summary and any risks before creating it."
:::

**When to use it:** Use this when a member joins a professional programme or staff need to fix a missing enrolment. The CPD team wants the person in the right programme once, with the right date and no duplicate enrolment.

**What AgentZ does:** AgentZ confirms the member, reads existing certification context, checks for duplicate or conflicting enrolments, and prepares the enrolment action. It should pause before writing and verify the enrolment after approval.

**Before you begin:** Have the member identifier, programme name/code, start date, and any eligibility or payment rule ready.

**Keep in mind:** If enrolment requires committee approval, assessment, or payment, record that decision before changing the programme status.

## Add CPD or experience units for a member

**Recipe R-04-03** · **Kind of request:** Review then change · **For:** CPD administrator, Education team

:::example
**Ask:** "Please prepare CPD credit for [member name/ID]: [number] units for [activity/course] on [date], under [programme/component]. First check their enrolment, existing transcript entries, duplicate credit risk, expiry period, and any evidence needed. Show the transcript effect before recording the units."
:::

**When to use it:** Use this after a course, webinar, professional activity, or manual evidence review. CPD staff need credits added accurately because members rely on transcripts for compliance.

**What AgentZ does:** AgentZ checks enrolment and transcript evidence and looks for duplicate or conflicting credit. It cannot record the credit yet: the iMIS store that holds a member's experience records has not been mapped, so AgentZ says so, asks staff to record the experience in iMIS, and then reads back the transcript evidence it can see. (It never writes the credit as an ExperienceUnit: those are the unit types, such as CPD or Hours, not credits.)

**Before you begin:** Have the member, programme, component/activity, units, date, and evidence source ready.

**Keep in mind:** Do not use this to bypass CPD approval rules. If evidence is incomplete, record the issue rather than awarding credit.

## Check a member progress toward a credential

**Recipe R-04-04** · **Kind of request:** Look up · **For:** CPD administrator, Member services

:::example
**Ask:** "Please check [member name/ID] progress toward [credential/programme]. Show enrolment status, required components, completed credits or milestones, missing items, expiry or renewal dates, and any transcript entries that need staff review. Finish with the plain-English answer I can give the member."
:::

**When to use it:** Use this when a member asks what they still need to do, or staff need to support a renewal or credential decision. The useful answer is a progress explanation, not raw transcript rows.

**What AgentZ does:** AgentZ reads the member certification profile and transcript context, compares visible progress with programme requirements, and summarises what is complete, missing, or uncertain. It should keep the task read-only.

**Before you begin:** Have the member identifier and programme or credential name ready.

**Keep in mind:** If programme rules are not fully represented in accessible iMIS data, AgentZ should say so and point to the policy check needed.

## Find members whose certification expires soon

**Recipe R-04-05** · **Kind of request:** Multi-step plan · **For:** CPD administrator, Communications team

:::example
**Ask:** "Please find members whose [certification/programme] expires between [start date] and [end date]. Group them by renewal urgency, missing requirements, communication preference, and any recent renewal activity. Prepare the review list and suggested reminder wording, but do not send anything."
:::

**When to use it:** Use this before a renewal reminder campaign or compliance deadline. CPD staff need to focus attention on people who can still act, while communications avoid sending the wrong message.

**What AgentZ does:** AgentZ identifies the cohort from certification evidence, enriches it with membership/contact and communication context, and creates segments for review. It can then hand off to a confirmed communications recipe if staff approve sending.

**Before you begin:** Have the programme, expiry window, reminder policy, and exclusion rules ready.

**Keep in mind:** Check opt-outs, deceased/sensitive statuses, and recently renewed members before sending reminders.

## Credit event attendance toward a CPD programme

**Recipe R-04-06** · **Kind of request:** Review then change · **For:** CPD administrator, Events team

:::example
**Ask:** "We have finished [event/session]. Please find attendees marked as attended, check which are enrolled in [CPD programme], and prepare [number] CPD units for [activity/component]. Show me eligible people, exceptions, duplicates, and missing enrolments before writing any credits. Once I approve, record only the confirmed credits and summarise what changed."
:::

**When to use it:** Use this after conferences, courses, webinars, or training sessions where attendance should count toward CPD. The real job is matching attended people to eligible enrolled people, not bulk-crediting everyone on a registration list.

**What AgentZ does:** AgentZ reads the event attendance evidence, checks each person against certification enrolment and transcript context, builds a review list, and flags exceptions. It should pause before adding credits and provide readback after approved entries.

**Before you begin:** Have the event/session name, programme, activity/component, credit value, and attendance rule ready.

**Keep in mind:** Attendance, registration, and CPD eligibility are not the same thing. Review exceptions before awarding credit.

## Review or update a certification programme component

**Recipe R-04-07** · **Kind of request:** Guided handoff · **For:** CPD administrator, System administrator

:::example
**Ask:** "Please review [certification programme/component] setup. Show current requirements, dates, credit values, statuses, and dependencies you can see. If [specific change] is appropriate, prepare the change plan, risks, affected members, and the native iMIS steps staff should confirm before updating setup."
:::

**When to use it:** Use this when programme rules, components, or CPD values change. Setup changes can affect many members, so staff need an impact view before editing configuration.

**What AgentZ does:** AgentZ reads the setup records and related usage evidence, explains the current configuration, and prepares a careful change plan. Where setup editing requires native iMIS review or approval, it should produce a handoff rather than over-automating.

**Before you begin:** Have the programme/component, proposed change, effective date, and policy approval ready.

**Keep in mind:** Changing certification setup can alter reporting and member progress. Test and review before applying to live programmes.

## Report which certification members are on track or at risk

**Recipe R-04-08** · **Kind of request:** Multi-step plan · **For:** CPD administrator, Leadership team

:::example
**Ask:** "Please prepare a progress report for [certification programme/cohort]. Show enrolled members, completed requirements, missing requirements, upcoming expiries, inactive or lapsed members, and people at risk. Group the results into on track, needs reminder, needs staff review, and likely ineligible. Explain the source for each category."
:::

**When to use it:** Use this before a board report, education committee meeting, or renewal deadline. CPD leaders need to know where support is needed, not just how many people are enrolled.

**What AgentZ does:** AgentZ reviews certification progress, member status, and contact evidence, then groups people into action-oriented categories. It should show assumptions, missing data, and create a reusable report only after staff approve the design.

**Before you begin:** Have the programme, cohort, date range, and risk definitions ready.

**Keep in mind:** Risk categories should be explained and reviewed. Do not treat them as final compliance decisions without policy confirmation.
