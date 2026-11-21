---
title: "Plugin Release: November 2026 (0.7.45)"
description: "AgentZ builds business objects in iMIS's own designer again, changes your Membership settings for you, and asks fewer needless questions on your website."
sidebar:
  order: 70086158
lastUpdated: 2026-11-16T00:22:42Z
---

This release brings back building business objects, this time in iMIS's own designer, lets AgentZ change your Membership settings itself, asks you to approve fewer routine website changes, and makes AgentZ more careful when iMIS asks it a question it did not expect.

## Change your Membership settings

You can ask AgentZ to change your **Settings > Membership** options, and it makes the change on the settings page itself.

### Key features

- **The options you use** – **Billing time**, **Prorating**, **Start date control** and early renewal.
- **In the page's own words** – AgentZ shows the current and the new value before you approve, and checks the saved values afterwards.
- **Prorating schedules** – AgentZ can change a schedule's description and monthly rates, and delete a schedule that no billing product uses.
- **Mid-year joiners** – the membership plan preview now says, from your site's own setting, whether a member who joins part-way through the year pays the full price.

### Key use cases

- Switching prorating on before a membership year starts.
- Tidying up prorating schedules that are no longer used.

### How it works

Ask in your AI app, for example "Turn on standard prorating for membership". AgentZ shows the change, waits for your approval, makes it on the iMIS page and reads the saved values back.

## Build and update business objects in iMIS's own designer

AgentZ can build Expression Builder business objects again, and they appear in the **Business Object Designer** exactly like one you made there.

### Key features

- **Built the designer's way** – AgentZ makes the object in the **Business Object Designer**, fills in the design and publishes it. It can set the object's default display, title and description property.
- **Updates you can trust** – to change a published object, AgentZ opens it in the designer, saves a working copy, fills in the new design and publishes it. It first checks that nobody changed the object since you approved the update.
- **Edit it yourself too** – an object AgentZ built can be opened, edited and published in the designer like any other.

### How it works

Ask in your AI app, for example "Add a business object that shows each member's joining fee". AgentZ shows the design, waits for your approval, builds it and checks the result. This needs the AgentZ app connected to your iMIS site. After a change, iMIS's description of the object can take up to about half an hour to catch up; the data itself changes straight away.

## Additional enhancements

- **Fewer approvals on your website** – AgentZ no longer asks before ordinary page changes, publishing a page, adding a menu item, launching pages or republishing them through **Content Designer**. It still checks that nobody changed the page in the meantime and reads the result back. It still asks before removing or replacing content.
- **Taking a page off your site** – AgentZ no longer offers to archive a page, because iMIS ignores that change. It moves the page to the **Recycle Bin** after you approve, and you can restore it from there.
- **When iMIS asks something unexpected** – if iMIS asks an unexpected question while AgentZ saves or deletes something (for example, that someone else has the page open), AgentZ answers **Cancel**, tells you what iMIS asked, and says whether anything may already have changed. If it might have, AgentZ checks the record.
- **Business objects in use** – when you ask AgentZ to delete a business object made in the **Business Object Designer**, it tells you which panels, forms, queries and special prices use it. It cannot remove this kind of business object yet, so the object stays in place.
- **Reports** – reports never include payment details or sign-in details. A few of iMIS's own automatic-payment reports include them, so AgentZ doesn't run those; you can run them in iMIS itself, or ask AgentZ for the same list without those details.
