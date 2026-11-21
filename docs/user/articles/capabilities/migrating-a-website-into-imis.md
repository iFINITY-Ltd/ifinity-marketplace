---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Migrating a website into iMIS"
description: "Moving an existing public website into iMIS RiSE with AgentZ: reading the old site, planning the new structure, and creating, checking and publishing the pages in approved batches."
describes: [src/tools/content/imis-website-migration.ts]
sidebar:
  order: 8
---

AgentZ moves an existing public website into your iMIS site, in batches you approve. You follow the migration in the AgentZ app's **Migration** tab of **Tools**, and ask for each stage in your AI app.

:::tip
For the **Migration** screen in the AgentZ app, see [Website Migration](/docs/app/website-migration/).
:::

## Before you begin

- **The address of the old website.** AgentZ reads only its public pages.
- **Where the new pages go in iMIS**, such as a website and a folder.
- **A design set in AgentZ Design**, if the new pages should take your brand. AgentZ can make one from the old site's colours and fonts.

## Migrating a website

Do the following to migrate a website into iMIS:

1. Ask your AI app to read the old site, for example "Use AgentZ to read www.example.org and plan its move into our public website in iMIS."
2. Review how AgentZ sorted the pages, and the ones it marked for you to check.
3. Review the planned structure and approve the first batch of pages.
4. AgentZ creates the pages, images and navigation in that batch, checks each new page, and tells you what it made.
5. Ask AgentZ to publish the batch. It publishes each page, sets who may open it, and checks that each address works.
6. Repeat for the next batch.

At the end, AgentZ lists the old addresses that need redirects and the pages that still need your review.

## What AgentZ does in a migration

AgentZ moves an existing public website into iMIS RiSE. It reads the old site, plans where each page goes, and creates the pages, images and navigation once you approve each batch.

**What AgentZ does:**

- AgentZ reads your existing website's public pages, follows the site's instructions to search engines, and never signs in or submits forms.
- AgentZ sorts pages into types such as articles, events and directories, and flags the ones it is unsure about for you to review.
- AgentZ plans the new structure from the old site's menus or page addresses.
- AgentZ captures the old site's brand colours and fonts for a design set in **AgentZ Design**.
- AgentZ creates the approved pages, folders, images and navigation, and never overwrites existing content.
- AgentZ checks every new page after writing it, and undoes a batch.
- AgentZ publishes each migrated page, sets who may open it, and checks that each page's address works.

**Needs your approval:**

- Before AgentZ writes each batch, and before it undoes one, it shows you a preview of the plan, naming the iMIS site it changes, and asks you to approve it. Each approval is used once, and only on that iMIS site: if another iMIS site is in use, AgentZ stops and changes nothing.
- Before AgentZ saves the migration project in iMIS, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot copy content that sits behind a sign-in, or content that appears only when the page's scripts run.
- AgentZ cannot set up redirects from old addresses automatically; it lists them for you.
- AgentZ cannot set the order of menu items or pages; set the order in iMIS.
- AgentZ cannot convert forms or galleries into iMIS iParts; it keeps them as page content.
- AgentZ does not report the migrated site as ready to launch; redirects and the pages it marks for review stay with your team.
- AgentZ cannot check a migrated page as a member on its own: someone signs in as that member in the member tab AgentZ opens. The migration's own checks look at pages as staff and as a signed-out visitor.

:::faq
**Can AgentZ overwrite pages we already have?** No. It creates new pages only and never overwrites existing content.

**Can I undo a batch?** Yes. Ask AgentZ to undo it, and it removes what that batch created.

**Does AgentZ set up the redirects from our old addresses?** No. It lists them for you to set up.
:::
