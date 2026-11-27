---
title: "Plugin Release: November 2026 (0.7.49)"
description: "Joining fees in membership plans, unapplying payments, pausing and changing scheduled tasks, saving query results and report exports, comparing two iMIS sites, checking pages as a member sees them, and clearer previews."
sidebar:
  order: 70078922
lastUpdated: 2026-11-21T03:53:55Z
---

This release adds joining fees to membership plans, lets staff unapply a payment, pause and change scheduled tasks, save query results and report exports, compare two iMIS sites and check a page as a member sees it. Previews now say each change in your words, and money steps check more before and after you approve.

## Joining fees in membership plans

A membership plan can now include a one-off joining fee. Give the amount, and AgentZ sets up the fee and its special price for each member type.

### Key features

- **Only new joiners pay** – only contacts with no Paid Through date are charged, so lapsed members who rejoin are not.
- **Charged once, in full** – a new joiner billed part-way through the year is charged the full fee once, on the same invoice as their dues.
- **Use special pricing stays on** – the fee is a Miscellaneous billing product with **Use special pricing** on.
- **Removed with the plan** – removing the plan takes the fee back, except the new-joiner pricing object.

### Key use cases

- Your association charges a one-off fee when someone first joins.
- You are setting up a new member type and want the joining fee from the start.

### How it works

Ask in your AI app, for example "Add a £25 joining fee to the Associate membership plan". AgentZ shows what it will set up, waits for your approval, then sets it up and reads it back. Setting the fee up needs the AgentZ browser. Check one renewal before you rely on it.

## Unapply a payment

Staff can ask AgentZ to unapply a payment that went on the wrong invoice.

### Key features

- **Everything before you approve** – AgentZ shows which invoices will be owed again, the Open Credit the money moves to, and iMIS's own warning.
- **Checked afterwards** – AgentZ reads back both the invoices and the Open Credit.

### Key use cases

- A payment was applied to the wrong invoice and has to come off it.

### How it works

Ask, for example "Unapply payment 1910". To apply that credit to another invoice, use **Pay Invoice** in iMIS for now.

## Pause, resume and change scheduled tasks and email templates

You can now ask AgentZ to pause a scheduled task and to resume it later, and to change an email template in place.

### Key features

- **Who it emails, first** – before resuming an email task, AgentZ tells you who it will email.
- **Tasks that run** – tasks you ask AgentZ to switch on now run on their schedule.
- **Templates changed in place** – change a template's wording, sender or recipients; every task that sends it uses the new version, and AgentZ names those tasks first.
- **Large mailings as tasks** – asked to email more than 500 people at once, AgentZ offers to build the mailing as a switched-off task, shows who it will email and sends it once you approve.
- **Honest run results** – when a task runs but its condition finds nothing to do, AgentZ says so. A run with no log is reported as not proven. Failed runs are counted again.
- **Tasks AgentZ made** – tasks AgentZ creates or changes say "(built with AgentZ)" at the end of their description. AgentZ can list tasks with a trigger on that never run because the task is switched off, and switches on only the tasks you name.

### Key use cases

- Hold a reminder email while a list is being cleaned, then resume it.
- Update the wording of a renewal email that several tasks send.

### How it works

Ask, for example "Pause the renewal reminder task" or "Change the sender on the welcome email template". AgentZ shows the change and who it affects, and waits for your approval.

## Hand an unpaid event place to a colleague

Staff can ask AgentZ to hand someone's event place to a colleague when nobody has paid for it yet.

### Key features

- **Both people shown** – AgentZ shows both people and the charge before you approve.
- **Safe order** – AgentZ registers the new person first, then cancels the original, and checks both before saying it is done.

### Key use cases

- A delegate cannot attend and a colleague takes their place before anyone has paid.

### How it works

Ask, for example "Transfer Jane Smith's place at the Annual Conference to Tom Brown". A paid place is still handed over in iMIS.

## Save query results and report exports

AgentZ can save the rows of a query as a spreadsheet (CSV) file on your computer and tell you where it is.

### Key features

- **Checked file** – AgentZ checks that the file is exactly what it built and that its row count matches the query's total.
- **Report exports** – AgentZ can also save a report's PDF, Excel, Word, CSV or XML export when the report has an export link on your iMIS site.

### Key use cases

- You need a list of lapsed members in a spreadsheet.
- You want the PDF of a report without opening iMIS.

### How it works

Ask, for example "Save the Lapsed Members query as a spreadsheet". AgentZ tells you where the file is.

## Compare two iMIS sites

AgentZ can compare two iMIS sites, such as staging and production, without changing either.

### Key features

- **Item by item** – for each item, AgentZ says whether it is new, the same or different, and how.
- **What the other site has** – AgentZ also lists what the other site has there that the package does not.

### Key use cases

- Before moving configuration from staging to production, see what will change.

### How it works

Package an area of one site, then on the other site ask AgentZ to plan the import. Nothing changes on either site. After an import, AgentZ can offer to check the imported pages: whether each one shows, whether its links and images work, and what a signed-out visitor gets.

## Check a page as a member sees it

AgentZ can check a page as a particular member sees it, or as a signed-out visitor.

### Key features

- **As a member** – after someone signs in as that member in the member tab AgentZ opens at that page.
- **Phone and tablet** – AgentZ can show a page at phone or tablet size.
- **Slow tiles** – AgentZ says which tiles on a page take longest to load their data.

### Key use cases

- Check that members see the right content after a change.
- See how a page looks on a phone.

### How it works

Ask, for example "Check the Member Home page as a signed-out visitor". AgentZ opens the page in the AgentZ browser and reports what it found.

## Forms with files and approval

AgentZ can now build a form where each submission adds a row with its own file, such as a qualification with its certificate, or attaches a file to one existing row.

### Key features

- **Files per row** – each submission can add a row with its own file. A file upload still cannot sit inside a reusable multi-row layout, because iMIS does not allow it.
- **Approval routes explained** – when a form needs approval, creates an account, touches member type or membership, or runs a step after submission, AgentZ says which combinations work, which iMIS cannot do (in iMIS's own words), and which routes do work.
- **Membership changes only with approval** – a step after submission that could change someone's membership is only attached to a form that staff approve.

### Key use cases

- Collect qualifications with their certificates.
- Build a membership application form.

### How it works

Ask, for example "Build a form for members to add a qualification with a certificate". AgentZ shows the form before it builds it.

## Clearer previews and results

Before you approve a change, AgentZ now says it in your words.

### Key features

- **Your words** – a paragraph's text before and after, the note being deleted, and every price in your site's currency, including the non-member price (or that your site has never set one).
- **Blank columns noticed** – when a new query's column comes back mostly blank, AgentZ says so.
- **Results headed by what happened** – a read is shown as a read, a refusal as **Refused before sending**, a question as **Question for you**, and a missing iMIS connection as **Not connected to iMIS** with what to do. **Could not complete** gives iMIS's own words.

### How it works

You see this in every preview and result. Messages no longer name AgentZ's internal steps.

## Carts, prices and recurring donations

### Key features

- **Cart deletes** – a cart delete lists every cart of the same person that iMIS may remove with it, asks you to approve them all, and reports which went.
- **One cart per approval** – a cart can be created only for a named person, and approving the same cart creation twice makes one cart.
- **Special pricing kept** – changing a billing product with AgentZ no longer switches off its special pricing. If the product has special price rules, AgentZ keeps **Use special pricing** on and says so in the preview. If it cannot read the rules completely, it changes nothing.
- **What a member pays** – asking "what would this member pay for this item?" works again, with member pricing and special price rules applied. A date can be given to see the price on that day.
- **Business objects that prices use** – before removing a business object, AgentZ now also counts a special price rule made on the **Billing products** screen, so it no longer reports such an object as unused.
- **Recurring donation previews** – previewing a recurring-donation run no longer changes anything in iMIS.

### How it works

These checks run in every preview and approval. Clearing another person's carts, and creating an order on a site that cannot look orders up, now say plainly that they cannot be done there.

## Additional enhancements

- A contact who has orders, invoices or other history can now be removed: it is set to **Marked for deletion**, as iMIS does it, and its history stays linked to it. AgentZ shows what will happen to the history before you confirm.
- Staff can ask for a field that takes several choices, such as areas of interest. AgentZ makes it the way the Panel Designer's **Allow multi-selections** does, and can fill it with several choices at once.
- AgentZ can set a page's **Metatag image**, the picture a tagged list shows for the page, and says why a page's tile does not show, such as a page that is not published or not open to the visitor.
- AgentZ can move a saved query to another folder. It shows which named pages still point at the old place, and pages and automations that use the query by its key keep working.
- AgentZ can move a menu item before or after another item, or to the end of a parent menu, and shows the new order.
- A menu item added by naming a page's id now links to that page and is published with it.
- When you approve removing a page, AgentZ also removes the menu items under its other menu items that lead only to that page, and lists every menu item that will go.
- Before you approve removing an event, AgentZ names each registrant's order and invoice and the event's cancellation fee, and afterwards tells you what stayed. It also answers "what's the cancellation fee on this event?" directly.
- When you book sessions for someone, the preview names the invoice the sessions will go on, and the result names the invoice to quote. Progress moves as each step finishes.
- Automatic payment and payment method results show the schedule, amounts, dates, status and the payment method as iMIS shows it, such as "Visa ending 1111", without card or bank account details.
- When a website migration batch is previewed, the preview names the iMIS site it will write to. If a different site is in use when the batch is written or undone, AgentZ stops with nothing changed.
- When iMIS stops accepting AgentZ's access in the middle of your work, looking up a member or organisation now says so and tells you what to do.
- When a workflow queue query cannot be read, AgentZ checks whether the query lets other systems read it, and asks you before switching that on.
- Asking AgentZ to build, change or preview a business object no longer comes back as an answer too large to return.
- Questions about membership settings and changing a member's bill now go to the right step straight away.
- With AgentZ app 0.9.8, each person's AI apps connect to their own AgentZ through a connection of their own.
- AgentZ no longer offers to create a gift premium or a legacy membership billing record, which iMIS turns down. It points to premium sets, premium rules and donation premiums, or to subscription and group membership changes.
- Links to iMIS help in AgentZ's answers now open the right page on the current iMIS help site.
- The plugin's update steps for the Claude desktop app now use Claude's **Plugins** menu. If **Update** is greyed out and shows "On latest version", Claude already has the new version.
- The warning about an unrecognised key in the plugin's file no longer appears on the iFINITY marketplace in Claude's **Manage marketplaces** screen.

## Known issue

Renewing a subscription through AgentZ does not yet move its Paid Through date. Check the Paid Through date in iMIS after a renewal, and change it there if needed. This is fixed in the next release.
