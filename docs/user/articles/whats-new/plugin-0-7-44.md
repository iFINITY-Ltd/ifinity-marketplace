---
title: "Plugin Release: November 2026 (0.7.44)"
description: "Ask AgentZ what your iMIS settings are and get the actual values, and let it change more of iMIS for you."
sidebar:
  order: 70087976
lastUpdated: 2026-11-15T11:37:24Z
---

This release lets you ask AgentZ about far more of your iMIS, and has it do more of the work for you instead of pointing you to an iMIS screen.

## Ask AgentZ about your iMIS settings

You can ask what your iMIS settings are and get the values iMIS actually holds, in the words the settings pages use.

### Key features

- **Your settings, as they are** – Finance, Membership, Contacts, Fundraising, Events and Certification settings, each with its current value. A setting that has never been saved shows that iMIS uses its built-in default.
- **More of iMIS to look at** – activity history, communication logs, users and roles, access settings, financial entities, Gift Aid declarations and claims, fundraising requests and sitemaps. AgentZ reads these and does not change them.
- **Values that are kept private stay private** – where a setting holds a password or key, AgentZ shows only that it is set, never the value itself.

### Key use cases

- Checking how membership renewals or Gift Aid are set up before you change anything.
- Comparing your settings with what a colleague or a supplier has asked for.

### How it works

Ask in your AI app, for example "What are our Membership settings?". Where AgentZ cannot change a setting yet, it says so plainly.

## Additional enhancements

- **Recent history in RiSE** – AgentZ can change **Settings › RiSE › Recent history** itself. It shows the current and the new text, stops if someone else changed the page in the meantime, reports iMIS's own message, and offers to put the old text back.
- **Getting it done** – when a bill, a notification, a billing cycle, a panel, page access, a contact merge, a cancellation fee, a layout or a theme comes up, AgentZ makes the change itself, with a preview, your approval and a check of the result, instead of explaining which iMIS screen to use.
- **Gift Aid declarations** – whether a donor has a Gift Aid declaration now comes only from iMIS's own declarations. A row in a custom Gift Aid panel added to your iMIS is shown separately and never counts. When you ask AgentZ to record a declaration, it tells you where iMIS keeps them.
- **Pages and documents** – removing or replacing content on a page or in a document asks you to approve the exact change first. Other changes to a page go ahead: AgentZ checks that no one has changed the page in the meantime, then reads the saved page back.
- **Undoing an import or a website move** – rolling one back keeps a copy of every item it removes and tells you where the copies are. If a copy cannot be kept, that item is not removed.
- **New websites** – creating a website always gives it a theme, and AgentZ reports what iMIS said, including any refusal in iMIS's own words.
- **Contact details** – searches, lists and the preview before a contact is deleted show email addresses and phone numbers only when you searched for that one person.
- **Reports** – reports leave out stored card details and sign-in details. If you ask for a report that would include them, AgentZ tells you plainly that it can't.
- **Membership plans** – after a membership plan is applied, AgentZ reads each price back from iMIS. The preview shows each dues item's prorating and your site's prorating schedules.
- **Events** – AgentZ asks before creating an event whose prices look like they are in another currency, and never converts amounts. It says that sessions are added on the event's page in iMIS, shows the invoice number to quote, and lists anything left behind when an event is removed. The preview before cancelling a registration says when no cancellation fee is switched on.
- **Clearer results** – each result's headline says what happened, for example "Check found problems" when a preview is refused.
- **When iMIS can't be reached** – the AgentZ app and your AI app say why and send you to **Settings > iMIS**.
- **Business objects** – AgentZ no longer mistakes an existing iMIS design folder for a missing one, and removes any part-saved record iMIS leaves behind when it refuses a save.
