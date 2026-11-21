---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "What AgentZ can do in iMIS"
description: "What AgentZ can and cannot do yet in each part of iMIS, and what it asks you to approve, from contacts and events to websites, reporting and configuration."
sidebar:
  label: "Overview"
  order: 0
sectionPages: false
---

Each page in this section covers one part of iMIS: what you can ask AgentZ to do there, what it asks you to approve first, and what it cannot do yet. The lists on each page come from the AgentZ plugin itself, so they always describe the newest release, {{fact:plugin-version}}.

:::access
AgentZ works as you, with your own iMIS permissions. To change something with AgentZ, you need the same permission in iMIS that you would need to change it yourself.
:::

## How to read each page

- **What AgentZ does** lists the work you can ask AgentZ for in that part of iMIS.
- **Needs your approval** lists the changes that AgentZ shows you as a preview first, and makes only once you approve them in your AI app. See [How work is shown and approved](/docs/ai-apps/approvals/).
- **What AgentZ does not do** lists what AgentZ cannot do yet, and what it never does, such as handling card details itself.

When a piece of work can only be done in iMIS's own screens, AgentZ either does it there, in the :term[iMIS browser] where you can watch, or gives you the steps to do it yourself.

## The parts of iMIS

- **[Contacts and organisations](/docs/capabilities/contacts-and-organisations/)**: AgentZ finds contacts and organisations, gives you an overview of a member, donor or organisation, and looks after their groups, relationships, notes and activity. AgentZ checks that it is connected to your iMIS site and looks up what kinds of records the site holds, so that it can choose the right way to answer your question.
- **[Billing, payments and orders](/docs/capabilities/billing-payments-and-orders/)**: AgentZ sets up membership dues and products, looks after invoices, payments, subscriptions and automatic payments, and reads your finance settings.
- **[Events](/docs/capabilities/events/)**: AgentZ creates and changes events, registers and cancels attendees, records attendance, and tells you who is coming.
- **[Fundraising and Gift Aid](/docs/capabilities/fundraising-and-gift-aid/)**: AgentZ records gifts and pledges, issues receipts, manages campaigns and appeals, and estimates Gift Aid claims for you to review.
- **[Certification and CPD](/docs/capabilities/certification-and-cpd/)**: AgentZ sets up certification programmes, enrols members in them, and reads a member's certification progress.
- **[Communications](/docs/capabilities/communications/)**: AgentZ creates email templates, shows you who will receive a communication and what they will see, and sends it once you approve it.
- **[Websites and content](/docs/capabilities/websites-and-content/)**: AgentZ creates and looks after your RiSE content: pages and folders, uploaded files and images, page layouts, website themes and custom iParts. AgentZ plans and builds whole sections of a website at once, such as member portals, microsites, dashboards, campaign pages and checkout pages. It also creates test websites, moves work between iMIS sites and installs BuildHub apps. AgentZ adds, changes and removes iParts on your content pages, from text and query lists to charts, reports, forms and panels. AgentZ looks after your website navigation, shortcuts and redirects. AgentZ publishes pages, folders and navigation through iMIS's own publish step in the iMIS browser, and checks the result. AgentZ builds dashboard pages for staff, members or the public from your queries, charts and lists, and checks that they display. AgentZ looks after your content tags and tagged list formats, and tags pages so that they appear in tagged lists. AgentZ looks after the user-defined fields on content records and fills in their values. **AgentZ Design** keeps your organisation's brand as a design set, with its colours, fonts, logo and writing style, and AgentZ applies it to the pages, themes and other visual content it creates.
- **[Migrating a website into iMIS](/docs/capabilities/migrating-a-website-into-imis/)**: AgentZ moves an existing public website into iMIS RiSE. It reads the old site, plans where each page goes, and creates the pages, images and navigation once you approve each batch.
- **[Queries and reports](/docs/capabilities/queries-and-reports/)**: AgentZ finds and runs your saved IQA queries, and builds or changes queries for you from a plain description of the list or report you want. AgentZ creates formatted Reporting Services reports from a query or from several sets of data, puts them on a page, and checks that they display and export.
- **[Forms](/docs/capabilities/forms/)**: AgentZ builds and changes iMIS forms, puts them on pages, tests them as different kinds of visitor, and checks whether they are ready to launch.
- **[Imports and data quality](/docs/capabilities/imports-and-data-quality/)**: AgentZ adds up to 50 contacts without a file, posts and rolls back import batches, and checks what an import did. AgentZ finds possible duplicate contacts and organisations, and merges them once you review them.
- **[Custom data](/docs/capabilities/custom-data/)**: AgentZ creates custom business objects, the tables behind custom panels, with their fields, drop-down lists and access settings. AgentZ lays out panels in **Panel Designer** over your business objects. AgentZ reads and changes the records stored in your custom panels. AgentZ reads and changes the values in the general lookup tables of iMIS.
- **[Automation and workflows](/docs/capabilities/automation-and-workflows/)**: AgentZ creates **Process Automation** tasks, runs them, and reads their logs to explain what happened. AgentZ shows you the tasks and work items waiting in the older workflow queue of iMIS.
- **[System setup and security](/docs/capabilities/system-setup-and-security/)**: AgentZ reads and changes some of the core settings of iMIS, such as customer types, cultures, translated phrases and **Settings > RiSE > Recent history**. AgentZ shows you a user's sign-in and security details, looks after sign-in accounts, and adds or removes a user's roles.
- **[Advertising](/docs/capabilities/advertising/)**: AgentZ sets up advertising, manages media orders and creative files, and posts orders to billing.

:::example
**Ask:** "What can AgentZ do with events in iMIS, and what can't it do yet?"

Your AI app answers from the same lists as these pages, for the version of AgentZ you have.
:::

:::faq
**Do these pages cover every part of iMIS that AgentZ works in?** Yes. If your work is not here, ask your AI app whether AgentZ can do it: it answers from the same lists.

**Will the "What AgentZ does not do" lists change?** Yes. Each release may let AgentZ do more; see [What's new](/docs/whats-new/). Some lines, such as never handling card details, stay as they are.

**Does AgentZ work with every version of iMIS?** No. AgentZ works with :term[iMIS EMS], the cloud version of iMIS. See [AgentZ requirements](/docs/getting-started/agentz-requirements/).
:::
