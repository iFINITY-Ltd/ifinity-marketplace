---
lastUpdated: 2026-11-16T14:51:16Z
title: "Forms and applications recipes"
description: "Prompts for form audits, contact updates, applications, approval forms, placement, testing, response reporting, and launch checks. The recipes make writeback and routing visible before launch."
sidebar:
  order: 9
---

Prompts for form audits, contact updates, applications, approval forms, placement, testing, response reporting, and launch checks. The recipes make writeback and routing visible before launch.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Audit existing forms and where they appear

**Recipe R-09-01** · **Kind of request:** Look up · **For:** Forms owner, Digital team

:::example
**Ask:** "Please audit forms for [site/process]. Show active forms, draft or old forms, the pages where they appear, submission purpose, owner if visible, writeback target, notifications, and obvious launch risks. Do not change forms or pages."
:::

**When to use it:** Use this when staff inherit forms, prepare a launch, or suspect old forms are still live. It gives the team a map before they edit or replace anything.

**What AgentZ does:** AgentZ reads forms, page placement, and related configuration evidence, then organises it into a practical inventory. It should flag forms that need owner review, testing, or retirement.

**Before you begin:** Have the site, process, or form name scope ready.

**Keep in mind:** A form existing in iMIS does not mean it is live on a page. Check placement and route behaviour too.

## Build a member contact-update form

**Recipe R-09-02** · **Kind of request:** Multi-step plan · **For:** Membership team, Digital team

:::example
**Ask:** "Please design a member contact-update form for [audience]. Include fields for [address/phone/email/preferences], validation, member-only access, writeback expectations, confirmation message, and staff review needs. Show the form plan and test cases before creating or placing anything."
:::

**When to use it:** Use this when members should maintain their own contact details. The team wants fewer manual updates while protecting core data quality.

**What AgentZ does:** AgentZ reviews the member-data fields, designs and creates the native form through the governed Form Builder writer, prepares placement, and verifies the intended audience and writeback with a controlled test. It returns an explicit alternative only when a requested business outcome belongs to commerce, Process Automation, PanelEditor, cloud post-processing, or a custom iPart.

**Before you begin:** Have the fields, audience, approval requirement, confirmation text, and page location ready.

**Keep in mind:** Contact forms can overwrite important data. Test with a controlled member record before launch.

## Design a membership application form

**Recipe R-09-03** · **Kind of request:** Multi-step plan · **For:** Membership team, Digital team

:::example
**Ask:** "Please design a membership application form for [member type]. Include required applicant details, eligibility questions, supporting information, fee or payment expectations, duplicate-check step, approval workflow, confirmation copy, and staff notification. Show the plan before building or publishing."
:::

**When to use it:** Use this when creating or improving a join form. Membership teams need the form to collect enough information for onboarding without creating duplicate or incomplete records.

**What AgentZ does:** AgentZ maps the application journey, builds the supported native form after presenting the governed write plan, and connects it to member setup, approval, placement, and verification. Standard iMIS commerce owns payment; AgentZ must not imitate checkout inside a post-processing script.

**Before you begin:** Have member type, eligibility rules, required fields, payment policy, approval path, and launch page ready.

**Keep in mind:** Application forms affect data quality and member experience. Test duplicate handling and staff notifications before launch.

## Design a nomination, survey, or approval form

**Recipe R-09-04** · **Kind of request:** Multi-step plan · **For:** Governance team, Membership team, Digital team

:::example
**Ask:** "Please design a [nomination/survey/application] form for [purpose]. Include audience, questions, required evidence, routing or approval steps, confirmation message, reporting fields, and closure date. Show the staff workflow and test plan before any form is created or changed."
:::

**When to use it:** Use this for awards, committee nominations, surveys, bursaries, or applications where submissions need review. Staff need the form and the back-office process designed together.

**What AgentZ does:** AgentZ turns the process into native fields, rules, approval configuration, notifications, and reporting needs, builds the supported Form Builder configuration, and verifies each configured outcome. Delivery and task execution remain owned by Communications and Process Automation even when Forms supplies the trigger.

**Before you begin:** Have the purpose, audience, questions, reviewers, deadlines, and outcome process ready.

**Keep in mind:** Approval forms fail when routing is unclear. Name the owner and test the full path before launch.

## Place a form on a portal page and verify it is connected

**Recipe R-09-05** · **Kind of request:** Multi-step plan · **For:** Digital team, Forms owner

:::example
**Ask:** "Please prepare placement of [form name] on [page/URL]. Check the page, audience permissions, form binding, confirmation behaviour, notifications, and test-submission plan. Show the placement steps and do not publish or change the page until I approve."
:::

**When to use it:** Use this when a completed form needs to appear on the public site or member portal. Placement is where many launch issues happen: wrong page, wrong audience, or wrong confirmation.

**What AgentZ does:** AgentZ checks form and page evidence, uses the canonical Forms iPart serializer and RiSE owner to place/publish after the exact governed confirmation, then verifies the saved binding and rendered route as the intended audience.

**Before you begin:** Have the form name, page URL, audience, confirmation message, and launch date ready.

**Keep in mind:** A form can be correctly built but incorrectly placed. Verify the actual page as the intended audience.

## Run a controlled form test and verify writeback

**Recipe R-09-06** · **Kind of request:** Multi-step plan · **For:** Forms owner, Membership team

:::example
**Ask:** "Please help run a controlled test for [form name]. Use test person [name/ID] or create a safe test plan, submit the expected values, then verify confirmation, notifications, response record, and any contact/profile writeback. Do not use real member changes unless I confirm the test record."
:::

**When to use it:** Use this before launching a form or after fixing one. Staff need evidence that submission, notification, and data writeback work together.

**What AgentZ does:** AgentZ prepares the test case, guides or performs supported submission steps, and checks response/writeback evidence. It should produce a pass/fail checklist with screenshots or route notes where useful.

**Before you begin:** Have the form, test record, expected values, and allowed test scope ready.

**Keep in mind:** Never test risky writeback on a real member without explicit approval and a rollback plan.

## Profile form responses for reporting

**Recipe R-09-07** · **Kind of request:** Multi-step plan · **For:** Forms owner, Reporting team

:::example
**Ask:** "Please analyse responses for [form name] during [date range]. Show counts, completion status, key answers, missing or invalid data, owner follow-ups, and recommended report columns. If a reusable report is needed, show the design before creating it."
:::

**When to use it:** Use this after applications, surveys, nominations, or contact-update forms start collecting responses. Staff need usable insight and follow-up lists, not just raw submissions.

**What AgentZ does:** AgentZ reads form-response evidence, profiles answer patterns and exceptions, and designs a reporting view if needed. It should ask before creating saved queries or dashboards.

**Before you begin:** Have the form name, date range, questions of interest, and reporting audience ready.

**Keep in mind:** Survey or application data may be sensitive. Limit exports and report columns to what staff need.

## Gate a form for launch with a readiness checklist

**Recipe R-09-08** · **Kind of request:** Look up · **For:** Forms owner, Digital team, Process owner

:::example
**Ask:** "Please perform a launch-readiness check for [form name/page]. Review fields, required questions, permissions, page placement, confirmation, notifications, writeback, reporting, accessibility, and owner sign-off. Give me a red/amber/green checklist and do not change anything."
:::

**When to use it:** Use this immediately before launch or after major form edits, especially for applications, contact updates, surveys, or approval forms that affect member data. It gives staff a shared go/no-go view before members or applicants rely on the form.

**What AgentZ does:** AgentZ checks the form, page, and related setup evidence it can reach and turns it into a readiness matrix. It should clearly state what has been verified and what still needs manual testing.

**Before you begin:** Have the form, page, audience, and launch date ready.

**Keep in mind:** Readiness is not the same as live. Complete the test submission and owner sign-off before announcing the form.

## Add and prove cloud REST post-processing

**Recipe R-09-09** · **Kind of request:** Multi-step plan · **For:** Forms owner, Integration team

:::example
**Ask:** "Please add supported cloud REST post-processing to [form name] so a successful submission [desired supported record outcome]. Show the source/domain-owner assessment, target before state, generated process-page and form binding plan, rollback, and cleanup plan before changing anything. Then run one controlled submission and prove the exact target changed."
:::

**When to use it:** Use this when the native form must invoke a supported iMIS REST/domain operation after submission. It is not a route for arbitrary JavaScript, SQL, payment, subscription, or security mutations.

**What AgentZ does:** AgentZ compiles the bounded `formswebhook(ID, Ordinal, FormName)` process page, normalizes an omitted/blank optional Ordinal, deploys and verifies the script fingerprint and submit-action binding, uses a separate staff context route when selecting an on-behalf Party, submits the intended public/shared or member form route, and verifies native process-resource observation, counter movement, clean-before/matched-after target state, context restoration, rollback, and cleanup. When `processTable` names a reusable Multi Layout source, AgentZ proves the process at that exact row Save, matches the observed Ordinal to the saved native row key, keeps the later main-form Submit separate, and returns an attested post-processing evidence packet that carries directly into launch readiness. For approval forms, the same approval owner waits through the native observation window and proves the completed decision. If iMIS persists no process identity and emits no call/resource/receipt, AgentZ may invoke that exact Published canonical process once as explicitly labelled recovery; a multi-row Ordinal must be supplied from correlated evidence or uniquely derived from a complete pre/post row diff.

**Before you begin:** Have the form, intended audience, supported target entity/operation, a disposable test record, expected after state, and rollback policy ready.

**Keep in mind:** A saved script page or process binding alone is not success. The controlled rendered submission or completed approval plus canonical receipt and target readback prove causality. AgentZ recovery after a proven native omission must never be reported as a native iMIS invocation. Use native commerce, Process Automation, or a custom iPart when the requested outcome lies outside the governed REST contract.
