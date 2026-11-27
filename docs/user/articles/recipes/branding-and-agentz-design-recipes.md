---
lastUpdated: 2026-11-16T14:51:16Z
title: "Branding and AgentZ Design recipes"
description: "Prompts for reviewing, setting, applying, auditing, and extending the AgentZ design system. They help brand owners keep generated pages, dashboards, and emails coherent."
sidebar:
  order: 16
---

Prompts for reviewing, setting, applying, auditing, and extending the AgentZ design system. They help brand owners keep generated pages, dashboards, and emails coherent.

Copy a request into your AI app and replace the words in square brackets with your own. See [Using a recipe](/docs/recipes/#using-a-recipe).

## Review the current AgentZ brand guidance

**Recipe R-16-01** · **Kind of request:** Look up · **For:** Brand owner, Digital team

:::example
**Ask:** "Please review our current AgentZ brand guidance. Summarise colours, typography, logo or image guidance, spacing or component guidance, recent generated assets using it, and any gaps that make pages or emails inconsistent. Do not change the brand settings."
:::

**When to use it:** Use this before generating pages, dashboards, emails, or rebrand work. Brand owners need to know what AgentZ will apply before it creates new material.

**What AgentZ does:** AgentZ reads the organisation's saved brand guidance and related generated assets where visible, then summarises strengths and gaps. It should keep the review read-only.

**Before you begin:** Know whether you care about the whole brand or a specific page/email/dashboard family.

**Keep in mind:** A design-system review does not replace formal brand guidelines. It shows what AgentZ currently has available to use.

## Set or refresh brand colours, fonts, and guidance

**Recipe R-16-02** · **Kind of request:** Review then change · **For:** Brand owner, Digital team

:::example
**Ask:** "Please prepare an update to our AgentZ brand guidance using [brand colours/fonts/guidelines]. Show the proposed brand settings, accessibility contrast, example buttons/cards/headings, and which future pages or emails will use them. Wait for approval before saving the brand update."
:::

**When to use it:** Use this when a brand owner or digital team is onboarding a new organisation, correcting brand colours, or refreshing visual guidance. The goal is for future AgentZ-created pages, emails, and dashboards to start from the right brand, not be fixed one page at a time.

**What AgentZ does:** AgentZ turns brand guidance into reusable brand settings and examples, checks practical contrast and consistency, and saves the shared brand guidance only after approval.

**Before you begin:** Have brand colours, fonts, logo rules, accessibility requirements, and approval from the brand owner.

**Keep in mind:** Brand settings affect future generated pages, emails, and dashboards. Review examples before saving.

## Generate a branded portal page or dashboard

**Recipe R-16-03** · **Kind of request:** Multi-step plan · **For:** Digital team, Department owner

:::example
**Ask:** "Please design a branded [portal page/dashboard] for [purpose/audience] using our AgentZ design system. Include layout, content sections, data sources if any, calls to action, accessibility notes, and iMIS page/report assets needed. Show the preview plan before creating anything."
:::

**When to use it:** Use this when a staff team needs a useful page or dashboard that matches the organisation brand. The design system keeps the result consistent without asking each team to make design decisions.

**What AgentZ does:** AgentZ uses saved brand guidance, drafts content and layout, connects data/report sources where relevant, and creates supported assets after approval. It should verify the rendered page visually where possible.

**Before you begin:** Have audience, purpose, page location, data needs, call to action, and owner approval ready.

**Keep in mind:** Brand consistency should support the user task. Do not let visual polish hide incomplete data or unclear actions.

## Draft a branded email using the design system

**Recipe R-16-04** · **Kind of request:** Guided handoff · **For:** Communications team, Brand owner

:::example
**Ask:** "Please draft a branded email for [campaign/process] using our AgentZ design system. Include subject, preview text, layout sections, button style, accessible colours, merge placeholders, and plain-text fallback notes. Show the draft and testing checklist; do not update or send yet."
:::

**When to use it:** Use this when communications need a consistent branded message for renewals, events, fundraising, or member support. It gives the team a strong starting point without changing live templates immediately.

**What AgentZ does:** AgentZ uses the design system and message context to produce a branded email draft and build checklist. It should hand off template update/send steps separately after review.

**Before you begin:** Have message purpose, audience, call to action, links, required wording, and brand owner preferences.

**Keep in mind:** Email rendering varies by client. Test the final template before sending.

## Audit whether generated assets use the brand system

**Recipe R-16-05** · **Kind of request:** Look up · **For:** Brand owner, Digital team

:::example
**Ask:** "Please audit generated pages, dashboards, and emails in [scope] for design-system use. Show which appear aligned, which use old colours or inconsistent styles, accessibility concerns, and a prioritised fix list. Do not change assets yet."
:::

**When to use it:** Use this after several assets have been generated or during a brand cleanup. Brand owners need to see consistency gaps before commissioning fixes.

**What AgentZ does:** AgentZ compares available assets against the saved brand guidance, identifies mismatches, and recommends a fix order. It should keep the audit read-only unless staff approve updates.

**Before you begin:** Have the site, page set, email family, or dashboard scope ready.

**Keep in mind:** Visual audits should include usability and accessibility, not just colour matching.

## Create a design exhibit for a portal page

**Recipe R-16-06** · **Kind of request:** Guided handoff · **For:** Brand owner, Digital team

:::example
**Ask:** "Please create a design exhibit for [brand/page family]: colour palette, type scale, buttons, cards, forms, alert states, and example content blocks. Explain how it should be placed on [portal/page] as an iPart or content section. Show the exhibit before placement."
:::

**When to use it:** Use this when staff need a visible brand reference inside the portal or a design handoff for future work. It helps teams align around practical components, not abstract guidelines.

**What AgentZ does:** AgentZ reviews the design-system settings, generates the exhibit content, and prepares the page/iPart placement plan. It should wait for approval before adding it to a site page.

**Before you begin:** Have the brand scope, page location, audience, and components to include ready.

**Keep in mind:** A design exhibit should be useful and maintained. Assign an owner before publishing it.

## Plan a microsite or sub-brand refresh

**Recipe R-16-07** · **Kind of request:** Multi-step plan · **For:** Brand owner, Digital team, Marketing team

:::example
**Ask:** "Please plan a sub-brand refresh for [microsite/campaign]. Start from the main design system, then propose child colours, typography rules, page patterns, content tone, affected pages/emails, and migration steps. Show the plan and risks before changing any assets."
:::

**When to use it:** Use this when a conference, awards programme, campaign, or member segment needs its own identity while still belonging to the main brand. Staff need consistency and difference balanced deliberately.

**What AgentZ does:** AgentZ reviews the main design system, proposes a scoped child design set, and maps affected assets and rollout steps. It should keep changes behind brand owner approval and verify the most important pages.

**Before you begin:** Have the sub-brand purpose, audience, existing pages, required assets, and brand owner approval process ready.

**Keep in mind:** Sub-brands can fragment the member experience. Keep shared navigation, accessibility, and core brand cues intact.
