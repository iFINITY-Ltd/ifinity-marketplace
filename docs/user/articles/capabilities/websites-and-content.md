---
lastUpdated: 2026-11-27T13:51:37Z
title: "Websites and content"
description: "What AgentZ can do with your RiSE websites: pages, files, layouts, themes, iParts, navigation, publishing, dashboards, tags and your brand."
describes: [src/tools/content/**, src/services/content/**, src/services/design/**]
sidebar:
  order: 7
---

AgentZ builds and looks after your RiSE websites: single pages and whole sections, the iParts on them, navigation, publishing and themes, all in your organisation's brand from :term[AgentZ Design]. Routine changes, such as creating a page or adding a menu item, are made without asking first and read back; removing or replacing content needs your approval. See [How work is shown and approved](/docs/ai-apps/approvals/#what-needs-your-approval).

## Pages, files, layouts and themes

AgentZ creates and looks after your RiSE content: pages and folders, uploaded files and images, page layouts, website themes and custom iParts.

**What AgentZ does:**

- AgentZ creates, changes, backs up, restores and recycles content pages and folders, and takes a backup before it changes existing content.
- AgentZ uploads documents such as PDFs, Office files and spreadsheets, adds images to the image library, and gives you the address to link to.
- AgentZ chooses a page layout to suit each page, or creates a new layout when none of the existing ones fits.
- AgentZ creates website themes and checks that iMIS serves every file of the theme. When it builds a theme from the colours, fonts and logo of a design set in **AgentZ Design**, it also checks that the text and icons in the theme's header, navigation and footer meet accessibility contrast rules.
- AgentZ builds and installs custom iParts, including ones that staff configure on the page.
- AgentZ brings in a single page exported from another iMIS site.
- AgentZ reads lists that iMIS shows only on staff screens, such as publishing servers and content authority groups, without changing them.

**Needs your approval:**

- Before AgentZ restores a backup over existing content, replaces a layout, a file or a page's content, recycles a page or folder, installs a custom iPart or imports a page, it shows you a preview of the change and asks you to approve it.
- AgentZ does not ask you to approve routine changes, such as creating a page or changing its name or settings; it checks that nobody changed the page meanwhile, reads it back and tells you what changed.
- Before AgentZ replaces a custom iPart that is already installed, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ does not report a page as live until it has published the page and checked it.
- AgentZ cannot archive a page or folder, because iMIS ignores that change when AgentZ sends it; to take a page off your site, AgentZ moves it to the **Recycle Bin**, from where it can be restored.
- AgentZ cannot install older server-side custom iParts, the kind that need files placed on the iMIS server, on iMIS EMS; it builds custom iParts that run in the browser instead.
- AgentZ cannot apply changes to a theme's built-in controls, such as its menus, while a website keeps using that theme; for a theme AgentZ generated, it creates a repaired copy and moves the website onto it, with your approval.
- AgentZ cannot create a theme when it cannot tell for certain which menu style the base theme uses; it tells you why instead of guessing.

## Building whole sections and moving work between iMIS sites

AgentZ plans and builds whole sections of a website at once, such as member portals, microsites, dashboards, campaign pages and checkout pages. It also creates test websites, moves work between iMIS sites and installs BuildHub apps.

**What AgentZ does:**

- AgentZ plans and builds a set of pages with their layout, iParts, images and navigation in one go, then publishes them and checks that each page displays.
- AgentZ adds new parts to an existing page.
- AgentZ publishes the menu item too when it adds a page that is live to a menu, so the link works straight away.
- AgentZ tells you which one to publish when a page's address shows "not found" because its menu item or the page itself is not published.
- AgentZ looks at a page as the staff user signed in to its iMIS browser, as a signed-out visitor, or as a particular member. For a member, AgentZ opens a member tab in the AgentZ app and someone signs in there as that member, for example a test member; AgentZ never enters a password. It checks that iMIS shows that member signed in before it says what the member sees.
- AgentZ tells you which tiles on a page or dashboard are slow: by how long the page itself waited for each tile's data where it could see that, otherwise by timing the tile's query on its own, and it says which.
- AgentZ shows you a page as it looks on a phone or a tablet, and checks that the page laid out at that width.
- AgentZ creates a test website in **Manage websites**, puts a theme on it, publishes it and removes it again later. A new website always gets a theme and a master page, taken from your default website when you do not choose them, and if iMIS refuses the website, AgentZ tells you iMIS's own reason.
- AgentZ puts a theme on a website and publishes the change.
- AgentZ builds a configuration package of queries, pages, layouts, forms, business objects, panels, groups and custom iParts, together with what they depend on, so that you can move them to another iMIS site.
- AgentZ installs a configuration package on another iMIS site, and undoes the install if needed. When it undoes an install or a website migration batch, AgentZ first keeps a copy on your computer of each page, query or other document it removes and tells you where; it does not remove a document it could not copy.
- AgentZ installs BuildHub apps as a background job that you follow in the AgentZ app, and picks up an install that was interrupted.
- AgentZ checks every configuration package for anything that would show personal details to the public before it is shared or installed.
- AgentZ compares two iMIS sites, such as staging and production, without changing either: it packages an area of one site, then, on the other site, lists for each query, page and business object whether it is new, the same or different (and how), and what the other site has there that the package does not.
- AgentZ checks the pages a configuration package installed, once the install is done: it opens each one to see that it displays, for you and for a signed-out visitor, and points out links that still lead to the site the package came from. Pages that are still drafts are listed rather than opened.

**Needs your approval:**

- Before AgentZ installs a configuration package or a BuildHub app, it shows you a preview of the plan and asks you to approve it.
- AgentZ does not ask you to approve adding pages to your site navigation, launching pages (publishing them, adding them to navigation and checking how they display) or republishing them through **Content Designer**. It checks that nobody changed each page or menu meanwhile, and reads the result back. Before AgentZ adds navigation exported from another iMIS site, it asks you to approve it.
- Before AgentZ replaces or removes content on an existing page, recycles a page, changes who can see a page, replaces a layout or a file, installs or replaces a custom iPart, creates or changes a theme, or changes a website's settings, it asks you to approve it.
- When you approve recycling a page, the same approval recycles the menu items that open it, first, so no menu is left with a link to nothing. A menu item beneath another that opens the same page goes too, before the one above it. A menu item stays, and AgentZ tells you why, when it also leads somewhere else or has a menu item under it that is not recycled.
- AgentZ does not ask you to approve building new pages, adding parts to an existing page or publishing pages. When it changes a page, it checks that nobody changed the page meanwhile, reads it back and tells you what changed.
- AgentZ does not ask you to approve building a page that takes payments or sends emails, such as a checkout page. It still asks before it takes a payment or sends an email itself.

**What AgentZ does not do:**

- AgentZ cannot add a logo to a new website's header from scratch; it uses the header content of an existing website instead.
- AgentZ cannot remove the default website, a website it did not create, or one that holds anything added after AgentZ created it, such as pages, folders or navigation items; ask AgentZ to remove those additions first.
- AgentZ cannot change the theme of your default website; use a named test website instead.
- AgentZ does not repoint the groups that pages and navigation are restricted to when it moves them to another iMIS site, even when it brings the groups across; ask AgentZ to set who can see them on the other site. Queries that use a dynamic group find it by name, so that group must exist there with the same name.
- AgentZ cannot publish someone else's unpublished changes to a website; review them in **Manage websites**.
- AgentZ cannot bring back an item that an undo removed; it can put an earlier copy back only over an item that still exists.

## iParts on your pages

AgentZ adds, changes and removes iParts on your content pages, from text and query lists to charts, reports, forms and panels.

**What AgentZ does:**

- AgentZ adds iParts to a page, including text and HTML content, **Query Menu**, **Query Template Display**, charts, progress trackers, summary displays, reports, forms, panels, and any of the roughly 75 iPart types iMIS provides.
- AgentZ changes an iPart's settings as you would in its **Configure** dialog, shows you in the preview any other change it makes to the page, such as repairing the order of iParts, and reads the saved page back.
- AgentZ places iParts in a chosen zone and order when the page has a layout.
- AgentZ checks that the query an iPart uses exists and runs before it puts the iPart on a page, and tells you when a query is one it cannot check.
- AgentZ shows bar, column, doughnut and line charts from a query.
- AgentZ adds a panel to every event, on the staff event console, on a public event page or both, and takes it away again later.
- AgentZ builds checkout and order confirmation pages, **Give Now** pages and standalone event pages from iMIS's own iParts.
- AgentZ removes an iPart from a page.

**Needs your approval:**

- Before AgentZ adds or removes a panel on every event, it shows you a preview of every page, tab and shortcut it will change and asks you to approve it. If a public page would show its data to everyone, AgentZ asks you to approve that first.
- Before AgentZ changes or removes an iPart that is already on a page, it shows you a preview of every change it would make and asks you to approve it. If someone changes the page after the preview, AgentZ stops.
- AgentZ does not ask you to approve adding an iPart to a page; it checks that nobody changed the page meanwhile, reads the page back and lists every change.
- Before AgentZ recycles a page or folder, or replaces a page's content, it shows you a preview and asks you to approve it.
- Before AgentZ replaces a custom iPart that is already installed, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot show area, pie or funnel charts.
- AgentZ cannot place iParts in other zones on a page that has no layout.
- AgentZ cannot show an event panel on events whose page is fixed to another page, such as the simple event page; the plan lists those events before anything changes.
- AgentZ cannot tell you whether a signed-out visitor sees an event panel on a public event page, because AgentZ has not checked that yet.
- AgentZ cannot install older server-side custom iParts on iMIS EMS.
- AgentZ does not treat a checkout, donation or event page as taking payments or registrations correctly just because it built the page; check those with a test payment or registration.

## Navigation, shortcuts and redirects

AgentZ looks after your website navigation, shortcuts and redirects.

**What AgentZ does:**

- AgentZ shows you your sitemap and sidebar navigation.
- AgentZ moves a menu item before or after another, or to the end of a parent menu, with **Manage sitemaps**' own move, and reads back the new order. Moving an item among its neighbours has been tried on a test site; moving it under another parent menu is still new, so check the menu after the first moves of that kind.
- AgentZ adds navigation items through **Site Builder** in the iMIS browser, and checks where they landed. You can name the page by its address or by the id AgentZ gave you for it: either way the menu item links to the page, and is published when the page is.
- AgentZ creates **Custom** shortcuts, changes **Custom** and **Editable** shortcuts, and removes **Custom** shortcuts in **Manage shortcuts**, and makes the changes take effect straight away.
- AgentZ brings in navigation exported from another iMIS site.
- AgentZ reviews and changes the redirect rules held on iMIS records.

**Needs your approval:**

- AgentZ does not ask you to approve adding a menu item. It checks that nobody changed that part of the menu meanwhile, and reads the new item back.
- Before AgentZ removes or moves a menu item, brings in navigation exported from another iMIS site, or changes shortcuts or redirect rules, it asks you to approve it. A move shows you where the item will go, and whether its address changes.
- Before AgentZ moves or restructures many menu items at once, it asks you to approve the plan.

**What AgentZ does not do:**

- AgentZ cannot change **Reference** or **System** shortcuts.
- AgentZ cannot restructure a large menu without a migration plan that you have agreed.
- AgentZ does not report a menu item as visible until it has published the item and checked it.

## Publishing

AgentZ publishes pages, folders and navigation through iMIS's own publish step in the iMIS browser, and checks the result.

**What AgentZ does:**

- AgentZ publishes content through **Content Designer** and **Site Builder** in the iMIS browser.
- AgentZ checks whether a page shows as **Published**, whether AgentZ or someone else published it.
- AgentZ stops before it publishes a page whose iParts use a query that is missing or does not run, and changes nothing.
- AgentZ answers **Cancel** when iMIS asks a question it does not expect as it saves or deletes something in the iMIS browser, such as a warning that someone else has the page open, then stops and tells you what iMIS asked. If the change may already have started, AgentZ says so and checks the record.

**Needs your approval:**

- AgentZ does not ask you to approve publishing a single page, folder or navigation item. It checks afterwards whether iMIS shows it as **Published**, is still publishing it, or still needs the iMIS publish step, which AgentZ runs in the iMIS browser.
- AgentZ does not ask you to approve launching pages (publishing them, adding them to navigation and checking how they display), republishing them through **Content Designer** or adding a page to your navigation. It checks that nobody changed each page or menu meanwhile, and reads the result back.
- Before AgentZ adds navigation exported from another iMIS site, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot report a publish as done until iMIS shows the page as **Published** and its address works.
- AgentZ cannot publish without the AgentZ app connected.

## Dashboards

AgentZ builds dashboard pages for staff, members or the public from your queries, charts and lists, and checks that they display.

**What AgentZ does:**

- AgentZ builds a set of dashboard pages in one of several layouts, such as a staff operations dashboard, a communications workspace, a key figures workspace, a drill-down across several sections, or a custom layout.
- AgentZ checks that every query the dashboard uses runs before it builds or publishes the dashboard.
- AgentZ publishes the dashboard and checks that each page shows what it should, with no errors and no unexpected sign-in page.
- AgentZ creates a custom page layout for the dashboard when the standard ones do not fit.

**Needs your approval:**

- AgentZ does not ask you to approve adding a dashboard to your navigation or launching it; it checks that nobody changed the pages meanwhile and reads them back.
- Before AgentZ replaces or restores existing dashboard pages, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot tell you that a dashboard is live while its pages are still unpublished.
- AgentZ does not report a dashboard as working until it has checked its queries, iParts, permissions and how its pages display.

## Tags and tagged lists

AgentZ looks after your content tags and tagged list formats, and tags pages so that they appear in tagged lists.

**What AgentZ does:**

- AgentZ shows your tags and your tagged list formats.
- AgentZ adds tags through the iMIS tag screens in the iMIS browser, and deletes tags.
- AgentZ creates, changes, deletes and publishes tagged list formats.
- AgentZ adds or removes tags on a page so that the page appears in, or drops out of, a tagged list.
- AgentZ sets the image a tagged list shows beside a page (its tile icon or thumbnail), and tells you who will see the page's tile: nobody until the page is published, and only the people allowed to open the page.

**Needs your approval:**

- Before AgentZ adds or deletes tags, creates, changes or deletes tagged list formats, or tags content, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot show a custom tagged list format until someone saves it once on the iMIS tagged list format screen; AgentZ gives you the steps and checks afterwards.
- AgentZ cannot delete tags on iMIS sites that do not allow it from outside iMIS; delete them on the iMIS tag screens.
- AgentZ cannot set the order of items in a tagged list through the order of a page's tags; the list sets its own order.

## User-defined fields on content

AgentZ looks after the user-defined fields on content records and fills in their values.

**What AgentZ does:**

- AgentZ lists the user-defined fields and where they are used.
- AgentZ creates and deletes user-defined fields through **Maintenance > User defined fields** in the iMIS browser.
- AgentZ reads and sets text, yes or no, date and number values on content records.

**Needs your approval:**

- Before AgentZ creates or deletes user-defined fields, or sets values on content records, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot create fields with drop-down lists, look-ups, multiple choices or several values.
- AgentZ does not use user-defined fields in place of custom panel fields, which it creates as business objects.
- AgentZ cannot create or delete fields unless the iMIS browser is signed in to the staff site.

## Your brand in AgentZ Design

**AgentZ Design** keeps your organisation's brand as a design set, with its colours, fonts, logo and writing style, and AgentZ applies it to the pages, themes and other visual content it creates.

**What AgentZ does:**

- AgentZ shows your design set and where each of its settings came from. It says a colleague last changed it, without giving their email address.
- AgentZ applies your brand to the pages, iParts, charts, emails and themes it creates.
- AgentZ updates or resets your brand, checks that colours meet accessibility contrast rules, and moves a colour to the nearest passing shade where it can. It asks you to correct failing dark-theme colours yourself.
- AgentZ keeps separate design sets for microsites and sub-brands, based on your main design set.
- AgentZ takes the look of another website, such as a prospect's, and turns it into a design set and an iMIS theme.
- AgentZ lists the brand materials that are still missing.

**Needs your approval:**

- Before AgentZ updates or resets a design set, it shows you a preview and asks you to approve it, and it tells you about any colour it adjusted.

**What AgentZ does not do:**

- AgentZ cannot restyle the AgentZ app itself.
- AgentZ cannot restyle content that is already published; content takes on the brand when AgentZ creates it again.
- AgentZ cannot load fonts or logos from another organisation's website.
- AgentZ does not copy later changes to your main design set into the design sets based on it; update each of those separately.
- AgentZ does not yet apply your brand to every kind of content it creates; it tells you which kinds do.

## Examples

:::example
**Ask:** "Create a new events landing page in our design set, with a list of upcoming events and a short introduction, and add it to the main menu under Events."

AgentZ creates the page and the menu item, reads both back and lists every change. It tells you the page is not live until it is published.
:::

:::example
**Ask:** "Publish the new events landing page and check it shows on the public site."

AgentZ publishes the page through iMIS's own publish step in the :term[iMIS browser], then checks whether iMIS shows it as **Published** and how it looks to a signed-out visitor.
:::

:::example
**Ask:** "Change the welcome paragraph on the members page to say 'Hello, members', then remove the old notice."

Before each change you see it in words: the paragraph's text before and after, and the iPart being removed by its type, its title and the words it shows. If AgentZ stores a new page's name with underscores in place of spaces, it tells you; the page's title keeps your words.
:::

:::example
**Ask:** "Show me the members' library page as our test member, 10482."

AgentZ opens a member tab in the AgentZ app, at the page to check, and asks you to allow it and sign in there as member 10482. Checking the same page again later that day uses the same tab, as long as it stays open and signed in; a different page opens its own tab. AgentZ never enters a password. Once iMIS shows that member signed in, AgentZ opens the page in that tab and tells you what the member sees.
:::

:::faq
**Will AgentZ change our live website without asking?** Yes, for routine changes: it creates pages, adds iParts, forms and menu items, uploads images and publishes without asking first, and lists each change. Removing or replacing anything, and changes that would show personal details to the public, wait for your approval.

**Can I see a page before it is published?** Yes. A new page stays unpublished until you ask AgentZ to publish it.

**Can AgentZ look at a page as a particular member?** Yes, once someone signs in as that member in the member tab AgentZ opens in the AgentZ app. Use a test member's sign-in: AgentZ never enters a password, and it checks that iMIS shows that member signed in before it tells you what they see. If the site refuses the page to that member (or to a signed-out visitor), AgentZ tells you they are not allowed to see it, and does not check it. Who can see a page is set in the **Access settings** of the page, its menu item or its website in iMIS.

**Can AgentZ show me a page on a phone?** Yes. Ask "show me the directory page on a phone". AgentZ opens the page at a phone's width in the :term[iMIS browser], checks that the page laid out at that width, and puts the browser back to its own size afterwards. This needs an up-to-date AgentZ app.

**Can AgentZ tell me which dashboard tiles are slow?** Yes. Ask "which tiles on the membership dashboard are slow?" AgentZ lists the tiles slowest first: each tile it can match to a saved query on the page. Requests for data it cannot match to a tile, such as those from a custom iPart, are listed separately with their own times. Requests made inside an embedded frame on the page are not seen at all. Where the page asked for a tile's data itself, that is how long the page waited for it. Where it did not (some tiles are drawn by iMIS before the page arrives), AgentZ runs the tile's query on its own as staff and times that instead, which can differ from what a member waits for; each tile says which timing it has. Either way it is the wait for data, not the time to draw.

**How do I set our brand?** Ask your AI app to set up your design set, or use the **Design** tab of **Tools** in the AgentZ app. See [AgentZ Design](/docs/app/agentz-design/).
:::
