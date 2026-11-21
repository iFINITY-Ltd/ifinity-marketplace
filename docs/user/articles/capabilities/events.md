---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Events"
description: "What AgentZ can do with events in iMIS: creating them, registering and cancelling attendees, attendance, and who is coming."
describes: [src/tools/events/**, src/services/event/**]
sidebar:
  order: 3
---

AgentZ sets up events, handles registrations and cancellations, and tells you who is coming. Before anything that charges or refunds an attendee, it shows you the charge.

## Events and registrations

AgentZ creates and changes events, registers and cancels attendees, records attendance, and tells you who is coming.

**What AgentZ does:**

- AgentZ lists upcoming events, and shows an event's details, sessions, prices and fees.
- AgentZ creates an event from scratch with its dates, capacity, location, image, time zone, registration options and sessions, or adds options and sessions to an existing event.
- AgentZ sets member and non-member prices for each option, and a cancellation fee. It never converts a price into another currency: if a price looks like it is in a different currency from your site's, AgentZ asks you which currency you meant, and goes on only once you have answered.
- AgentZ asks registrants questions, such as dietary needs or access requirements, and summarises their answers.
- AgentZ registers a contact for an event, shows you the charge first, and gives you the invoice number to quote.
- AgentZ books optional sessions for someone already registered. It shows you each session, its price and the places left, the total, which is added to their account to pay later, and which invoice it goes on: their registration's unpaid invoice, or a new one. If your site asks for a purchase order number to pay later, AgentZ asks you for it before you approve. It then books them on the event's page in iMIS and tells you once iMIS shows them on the registration, with the invoice number to quote. It never takes a payment or sends the order email.
- AgentZ asks iMIS to put a registrant on the waiting list, and tells you whether iMIS did.
- AgentZ cancels a registration, records attendance and credits, and refunds cancellation credits.
- AgentZ hands a registration nobody has paid for to another person on the same event. It registers the new person first, so the place is never given up, then cancels the original, and shows you both before it starts.
- AgentZ lists who is registered for an event, up to 250 registrations at a time, with counts by status, and tells you when the list is not complete.
- AgentZ reconciles an event's registrations, invoices and balances.
- AgentZ sets which page staff and the public see when they open an event.
- AgentZ removes an event, and first lists what else belongs to it, such as its registration questions, its panel records and recently saved pages fixed to it. It tells you about anything left behind, and does not report the removal complete while any of the event's own records remain.
- AgentZ tells you, before it removes an event, each registrant's order and invoice, which iMIS keeps on their account, and the event's cancellation fee as iMIS holds it. Cancelling a whole event charges no cancellation fee. Afterwards, AgentZ reads the orders and invoices back and tells you what stayed.
- AgentZ tells you an event's status in words, such as Pending, and what it means for who can register.
- AgentZ tells you what your **Settings > Events > General** values are.

**Needs your approval:**

- Before AgentZ registers, cancels or refunds attendees, or changes attendee details, it shows you a preview of the change and any charge, and asks you to approve it.
- Before AgentZ creates, changes or removes an event, it shows you a preview of the change and asks you to approve it. Cancelling an event cannot be undone.

**What AgentZ does not do:**

- AgentZ cannot move a registrant from the waiting list to registered, change a registration to another option, or take a session off a registration; do those in iMIS.
- AgentZ cannot yet transfer a registration that has been paid for, because its money has to move to the new person as credit; do that in iMIS.
- AgentZ cannot provide badge scanning or kiosk check-in.
- AgentZ cannot remove a registration question that already has answers; it hides the question instead.
- AgentZ cannot tell you whether a signed-out visitor sees an event panel on a public event page.
- AgentZ cannot change your **Settings > Events > General** values yet.

## Examples

:::example
**Ask:** "Check the Annual Conference before we open registration: capacity, prices, registration options, dates and sessions. List anything that looks wrong, with what must be fixed first, and don't change anything."

You see a readiness list for the event, read from iMIS, with the problems first.
:::

:::example
**Ask:** "Register Jane Smith, ID 12345, for the Annual Conference at the member price."

You see a preview of the registration and its charge, and approve it. AgentZ registers her and gives you the invoice number to quote.
:::

:::example
**Ask:** "Book Jane Smith onto both workshops at the Annual Conference. Our purchase order number is PO-4471."

You see each workshop, its price and the places left, the total, and the invoice it goes on: her registration's unpaid invoice, or a new one. No payment is taken and no email is sent. If your site asks for a purchase order number and you have not given one, AgentZ asks you for it first. Once you approve, AgentZ books the workshops in iMIS and tells you when iMIS shows them on her registration, with the invoice number to quote.
:::

:::faq
**Can AgentZ move someone off the waiting list?** No, not yet. Do it in iMIS; AgentZ can tell you who is waiting.

**What stays when AgentZ removes an event?** iMIS keeps each registrant's order and invoice on their account, so a contact who registered keeps that history. Before you approve, AgentZ names each order and invoice and tells you the event's cancellation fee as iMIS holds it; cancelling a whole event charges no cancellation fee. Afterwards, AgentZ reads the orders and invoices back and tells you what stayed.

**Can AgentZ add a panel to every event's page for staff?** Yes. See [Websites and content](/docs/capabilities/websites-and-content/), which covers the iParts AgentZ places, including on the :term[event console].
:::
