---
lastUpdated: 2026-11-27T13:51:37Z
title: "Custom data"
description: "What AgentZ can do with your own data in iMIS: business objects, panels and their records, and lookup tables."
describes: [src/tools/core/imis-business-object-design.ts, src/tools/core/imis-panel-definition.ts, src/tools/core/imis-udf-design.ts, src/tools/lookup/**, src/services/lookup/**]
sidebar:
  order: 12
---

AgentZ creates the business objects behind custom panels, lays out the panels, and reads and changes the records in them. It also looks after the values in your lookup tables.

## Business objects

AgentZ creates custom business objects, the tables behind custom panels, with their fields, drop-down lists and access settings.

**What AgentZ does:**

- AgentZ creates a business object for contacts, events, invoices or standalone lists, holding either one record or many.
- AgentZ adds fields for text, numbers, dates, yes or no answers and files, with drop-down lists and required, read-only and change logging settings.
- AgentZ makes a drop-down list that takes several choices, such as areas of interest, the same as **Allow multi-selections** in the **Panel Designer**. iMIS keeps the choices together in one field, separated by commas, so the list's codes cannot contain commas and the field must be long enough for every choice at once.
- AgentZ keeps new business objects closed to members and the public unless you choose otherwise.
- AgentZ creates calculated fields with **Expression Builder** alongside a new contact table, shown through a separate read-only business object.
- AgentZ builds an **Expression Builder** business object the way the **Business Object Designer** does: it makes the object in the designer, fills in its design, and publishes it, so the object appears in the designer like one you made there.
- AgentZ sets the default display, title and description property of a business object it builds.
- AgentZ updates a published **Expression Builder** business object the way you edit one in the **Business Object Designer**: it opens the object, saves a working copy, fills in the new design, and publishes it.
- AgentZ tests a business object from start to finish with a temporary record that it removes afterwards.
- AgentZ tells you which panels and forms still use a business object before it is deleted.
- AgentZ shows you, in plain words, what a business object it builds in the **Business Object Designer** will show, field by field, before you approve it, and tells you in iMIS's own words when iMIS cannot publish it.
- AgentZ tells you which panels, forms, queries and special prices use a business object made in the **Business Object Designer**, including special prices set up on iMIS's own special pricing screen.
- AgentZ removes an unused business object made in the **Business Object Designer** through the designer itself, in two steps, each with its own approval: it moves the object to the **Recycle Bin**, then purges it.
- AgentZ restores a business object from the **Recycle Bin**, with your approval, until it is purged. The object stops working as soon as it's deleted and works again once restored.
- AgentZ runs each of these steps in the background in the AgentZ app, so a site with many queries doesn't make it time out, and tells you when the step has finished.
- AgentZ brings in a business object exported from another iMIS site.

**Needs your approval:**

- Before AgentZ creates, changes or deletes a business object, runs its test, or creates a table with calculated fields, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot change whether a business object holds one record or many, or what it belongs to, once it has created the object.
- AgentZ cannot remove fields that still hold data.
- AgentZ does not lay out a panel or place it on a page when it creates a business object; those are separate steps.
- AgentZ cannot delete a business object that a panel still uses; AgentZ deletes the panel first, with your approval.
- AgentZ cannot clear the description iMIS keeps of a business object it has purged, and does not try. iMIS still describes the object by name, but its data can no longer be read, and the name can be used again straight away. On one of our test sites these descriptions were gone within 18 days; iMIS's hosting appears to clear them.
- AgentZ cannot undo a purge.
- AgentZ cannot remove a business object made in the **Business Object Designer** while something uses it, or unless the AgentZ app is connected, because the designer removes it.
- AgentZ cannot delete, restore or purge a business object made in the **Business Object Designer** with an AgentZ app too old to run these steps in the background. It changes nothing; update AgentZ first.
- AgentZ cannot build or update an **Expression Builder** business object unless the AgentZ app is connected to your iMIS site, because the **Business Object Designer** makes it.
- AgentZ cannot update a business object while someone has saved changes to it in the **Business Object Designer** without publishing them; publish or discard those first.

## Panel layouts

AgentZ lays out panels in **Panel Designer** over your business objects.

**What AgentZ does:**

- AgentZ creates, changes and deletes panel layouts from a list of fields.
- AgentZ uses the business object's own captions and required settings, and warns you about fields that do not belong to it.

**Needs your approval:**

- Before AgentZ creates, changes or deletes a panel layout, it asks you to approve it. If anything has changed since it showed you the preview, it asks you to approve it again.

**What AgentZ does not do:**

- AgentZ does not place the panel on a page, or check how staff and members see it, when it lays out the panel; those are separate steps.
- AgentZ does not create the business object that the panel shows when it lays out the panel.

## Panel records

AgentZ reads and changes the records stored in your custom panels.

**What AgentZ does:**

- AgentZ lists your custom panels and describes what each one holds.
- AgentZ reads, adds, changes and removes panel records, and checks each change afterwards.
- AgentZ checks which panel fields are available for queries and pages.

**Needs your approval:**

- Before AgentZ adds, changes or removes panel records, or changes fields or how they are mapped, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ does not create panels or fields when it changes panel records; it creates them as business objects.
- AgentZ does not treat a saved record as showing on the staff profile or in a form; check the profile or form to confirm.
- AgentZ cannot place panels on the staff profile or set up forms to save into panels from here; do those in iMIS.

## Lookup tables

AgentZ reads and changes the values in the general lookup tables of iMIS.

**What AgentZ does:**

- AgentZ lists the lookup tables and their values.
- AgentZ adds, changes and removes lookup values, and checks each change afterwards.

**Needs your approval:**

- Before AgentZ adds, changes or removes lookup values, especially member types, status codes, countries and finance tables, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot show that every page, query, form or import that uses a value has picked up a change.
- AgentZ does not edit lists that are not general lookup tables, such as **Activity types**, through lookup tables; it changes **Activity types** with contact activity.

## Examples

:::example
**Ask:** "Create a panel for members to record their volunteering: the organisation, the role, start and end dates, and hours. Keep it closed to the public."

You see a preview of the business object and its fields, and approve it. AgentZ creates it, lays out the panel, and tests it with a temporary record that it removes afterwards.
:::

:::example
**Ask:** "Add 'Retired' to the member status lookup values."

You see a preview of the new value and approve it. AgentZ adds it and reads the lookup table back.
:::

:::faq
**Can AgentZ put a new panel on the staff profile?** No, not yet. Place it in iMIS; AgentZ can then read and change its records.
:::
