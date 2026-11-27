---
lastUpdated: 2026-11-27T13:51:37Z
title: "Contacts and organisations"
description: "What AgentZ can do with contacts, members, donors and organisations in iMIS: finding them, giving you the full picture, and looking after their groups, relationships and notes."
describes: [src/tools/party/**, src/tools/membership/**, src/tools/engagement/**, src/services/party/**, src/services/membership/**, src/services/engagement/**]
sidebar:
  order: 1
---

Most work in iMIS starts with a person or an organisation. AgentZ finds the right contact, brings together what iMIS holds about them from its different screens, and keeps their groups, relationships and notes up to date.

## Contacts, members and organisations

AgentZ finds contacts and organisations, gives you an overview of a member, donor or organisation, and looks after their groups, relationships, notes and activity.

**What AgentZ does:**

- AgentZ finds a person by their name, even part of a name, or by their email address or iMIS ID. It shows email addresses and phone numbers only for results matched by iMIS ID, a whole email address, an exact name or the beginning of a name.
- AgentZ gives you an overview of a member, organisation or donor from the records it can read, covering contact details, billing, groups, activity, relationships, giving, events, sign-in, automatic payments, certification, possible duplicates and engagement, and tells you which sections it could not read or found incomplete.
- AgentZ creates a contact, and warns you first about any existing contacts with the same name or email address.
- AgentZ removes a contact who has no financial or transaction history. A contact who has history is retired the way iMIS does it: its status is set to **Marked for deletion**, and its orders, invoices and other history stay linked to it.
- AgentZ adds, changes and removes committee and chapter members, and adds up to 200 members at once.
- AgentZ creates and deletes groups, such as committees, chapters and dynamic groups.
- AgentZ makes someone a **Company Administrator** for an organisation.
- AgentZ adds a note to a contact's record, and shows one contact's notes on their own.
- AgentZ logs contact activity where your site has interaction types set up, and removes a logged activity.
- AgentZ tells you what your **Settings > Membership** and **Settings > Contacts** values are, in the words those pages use, and says when a setting has never been saved so iMIS uses its built-in default.
- AgentZ reads every setting on **Settings > Membership**, including **Billing time** and **Paid thru date update**, and changes them: **Standard billing interval**, **Accounting method**, **Billing time**, **Paid thru date update**, **Prorating**, **Start date control**, **Grace period in months**, early renewal, the two chapter roster settings and single-member renewal posting. Each change is shown in the page's own words before you approve it, then read back on the page and from what iMIS stores.
- AgentZ changes a prorating schedule's description and monthly rates on its own form, and deletes a schedule from **Membership > Prorating schedules** when no billing product uses it.
- AgentZ shows the engagement scores that iMIS calculates.

**Needs your approval:**

- Before AgentZ adds, changes or removes group members, creates or deletes groups, repairs committee positions, changes a **Settings > Membership** setting or deletes a prorating schedule, it asks you to approve it.
- Before AgentZ changes relationships, including making someone a **Company Administrator**, it asks you to approve it.
- Before AgentZ creates a contact, changes profile details such as statuses, notes, images and salutations, logs activity, or changes the list of activity and interaction types, it asks you to approve it.
- Before AgentZ removes a contact, it lists everything attached to them and asks you to approve the removal. The removal is permanent.

**What AgentZ does not do:**

- AgentZ cannot delete a contact who has orders, invoices, payments, gifts, memberships, event registrations or a sign-in account, or delete an organisation; iMIS keeps that history, so mark the contact for deletion, erase their personal data or merge them instead.
- AgentZ cannot add members by hand to a dynamic group or a product group, because iMIS fills those groups itself.
- AgentZ cannot create relationship types yet; create them at **Settings > Contacts > Relationship types**.
- AgentZ cannot create groups on iMIS sites that do not allow it from outside iMIS; it names the screen to use instead, such as **Community > Committees**.
- AgentZ does not calculate engagement scores itself; it shows only the scores that iMIS calculates.
- AgentZ cannot change any **Settings > Contacts** value yet.
- AgentZ cannot change **Payment application basis** or **Update paid thru date for complimentary items at payment time** on **Settings > Membership** yet; it reads them on the page.

## Finding and reading any record

AgentZ checks that it is connected to your iMIS site and looks up what kinds of records the site holds, so that it can choose the right way to answer your question.

**What AgentZ does:**

- AgentZ checks that it is connected to your iMIS site, and tells you which versions of AgentZ and iMIS are running when you report a problem. If iMIS stops accepting AgentZ's access part-way through the hour, for example after a settings change, AgentZ tells you and gets new access by itself.
- AgentZ looks up which kinds of records your iMIS site holds, and reads lists of them filtered by simple conditions, such as a name that contains certain letters or a date after a given day.
- AgentZ reads one record in full when you ask about it. Its lists show only summary details, so AgentZ reads each person's details separately. When you ask for one contact's notes, images or salutations, it shows that contact's rows only.
- AgentZ reads more kinds of iMIS records without changing them, such as contact activity history, communication logs, users and their roles, access settings, Gift Aid declarations and claims, fundraising requests and sitemaps. A stored secret, such as a password for a connected service, shows only as set, never its value.
- AgentZ tells you after every task whether it made and checked a change, is still waiting to check one, saved something only in the AgentZ app, refused before sending anything, needs your answer to a question first, or could not reach iMIS. When something fails, it says why in plain words, or what iMIS answered.
- AgentZ keeps any copy it makes of a record before changing it on your computer for 7 days, or 30 days for a form, so that the earlier values can be put back.
- AgentZ shows you in the iMIS browser what it has just changed in iMIS.

**Needs your approval:**

- Before most changes, and before any deletion, merge, import, payment or email, AgentZ shows you a preview of exactly what it will do and asks you to approve it. Routine page changes, such as creating a page, changing its settings or publishing it on its own, do not need your approval: AgentZ reads the page back afterwards.
- When AgentZ deletes a record directly, the record cannot be recovered from a recycle bin, so AgentZ always asks you to approve the deletion first.

**What AgentZ does not do:**

- AgentZ cannot list some kinds of records without being told which event, contact or item they belong to; for example, it lists registrations one event at a time.
- AgentZ cannot carry out tasks that iMIS offers only on its own screens; it plans them as steps for you in iMIS or for the iMIS browser.
- AgentZ does not change these extra records through general record reading; where AgentZ can change one, such as a user's roles, it does so through the task for that area.

## Examples

:::example
**Ask:** "Give me the full picture for member 12345 before I change anything: membership, open invoices, recent payments, committees, event registrations and recent communications."

You see one summary of the member, each part taken from iMIS, with anything missing or inconsistent pointed out, and nothing changed.
:::

:::example
**Ask:** "Add Jane Smith, ID 12345, to the Education Committee from today."

You see a preview of the new committee membership and approve it. AgentZ adds her and reads the committee back to show she is on it.
:::

:::faq
**Can AgentZ remove a contact?** Yes. It first lists everything attached to the contact, and acts once you approve it. A contact with no financial or transaction history is removed for good. A contact with history is retired the way iMIS does it: AgentZ sets its status to **Marked for deletion**. The contact and its orders, invoices and registrations stay in iMIS, but it no longer shows in most searches and lists. Setting the status back to **Active** undoes it.

**Will I see a note's words before AgentZ deletes it?** Yes. The preview shows the note's subject and its text, so you can see it is the note you mean before you approve.

**Can AgentZ merge duplicate contacts?** Yes. See [Imports and data quality](/docs/capabilities/imports-and-data-quality/).
:::
