---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "System setup and security"
description: "What AgentZ can do with core iMIS settings, users, sign-in accounts and roles."
describes: [src/tools/security/**, src/services/security/**]
sidebar:
  order: 14
---

AgentZ reads and changes some of the core settings of iMIS, and looks after users' sign-in accounts and roles. Every change here needs your approval.

## Core settings

AgentZ reads and changes some of the core settings of iMIS, such as customer types, cultures, translated phrases and **Settings > RiSE > Recent history**.

**What AgentZ does:**

- AgentZ looks up core settings, such as data definitions, customer and member types, date and number formats, cultures and translated phrases.
- AgentZ creates, changes and removes the supported settings, and checks each change afterwards.
- AgentZ adds a diagnostic message to the iMIS log.
- AgentZ changes **Settings > RiSE > Recent history** in the iMIS browser: it shows you each current and new value, saves only what you approved, passes on iMIS's own message if iMIS refuses, reads the page back and offers to put the old values back. AgentZ must be connected and signed in to iMIS to do this.

**Needs your approval:**

- Before AgentZ changes core settings, cultures, translated phrases or customer types, or adds a message to the iMIS log, it asks you to approve it.
- Before AgentZ changes a settings page, it shows you each setting's current and new value and asks you to approve it. If someone changes the page after the preview, AgentZ stops.

**What AgentZ does not do:**

- AgentZ cannot read a diagnostic message back once it is added to the log.
- AgentZ cannot save a customer type with a description longer than 20 characters or a code longer than 5 characters; it stops before sending it.
- AgentZ cannot change other settings pages through this area yet.
- AgentZ does not change multi-factor authentication, maintenance mode, or security, sign-in or payment settings through settings pages.
- AgentZ does not treat a settings change as working on staff or public screens just because it saved the change.

## Users, sign-in accounts and roles

AgentZ shows you a user's sign-in and security details, looks after sign-in accounts, and adds or removes a user's roles.

**What AgentZ does:**

- AgentZ shows a user's security profile, their roles, and whether they have a sign-in account.
- AgentZ creates and deletes sign-in accounts, and manages membership logins.
- AgentZ adds roles to a user or removes them, and checks the user's roles afterwards.

**Needs your approval:**

- Before AgentZ creates or deletes sign-in accounts, changes membership logins, adds or removes a user's roles, or makes any change to security groups, single sign-on or who can see protected content, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot create or change roles themselves, fully manage groups, set up single sign-on, or test what a user can see; do those in iMIS.
- AgentZ does not treat a user's account details alone as showing that they can sign in or see a protected page.
- AgentZ does not set who may open a page or run a query here; it does that when it creates or changes the page or query.

## Examples

:::example
**Ask:** "What roles does user jsmith have, and do they have a sign-in account?"

You see the user's security profile and roles, read from iMIS.
:::

:::example
**Ask:** "Give jsmith the Events role."

You see a preview of the change and approve it. AgentZ adds the role and reads the user's roles back.
:::

:::faq
**Can AgentZ change a user's roles without asking?** No. Every change to sign-in accounts, roles, security groups or who can see protected content needs your approval.
:::
