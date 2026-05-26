---
name: rise-website-design
description: >-
  Design and manage iMIS RiSE websites — page creation, iPart configuration,
  navigation design, theming, and content publishing. This skill should be used
  when the user says "RiSE", "website", "web design", "page builder",
  "iPart", "content item", "master page", "template", "theme", "CSS",
  "navigation menu", "mega menu", "layout", "public site", "staff site",
  "create a page", "add a widget", "website navigation", "page layout",
  "responsive design", or when working with iMIS website configuration.
when_to_use: >-
  Use for arbitrary RiSE design and implementation: custom page layouts,
  dashboard/bento sections, iPart grids, query/template/chart bindings,
  navigation/sidebar placement, themes, CSS, and publish handoffs. Prefer
  reusable declarative layout/page specs over cloned native dashboard presets.
argument-hint: "[action: create-page|navigation|iparts|theme|browse]"
---

# RiSE Website Design & Management

Design, build, and manage iMIS RiSE websites — pages, iParts (content items), navigation, themes, and publishing.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles for iPart configuration options, theme builder steps, navigation design, page layout details, and RiSE site management (300+ articles). Use the `imis-docs-dev` connector to look up Document/ContentItem API endpoints and iPart data contracts.

## Key Concepts

- **RiSE**: Responsive iMIS Experience — the website builder that fuses database management with web publishing
- **Content Record**: A page in iMIS — identified by path, contains iParts in layout zones
- **iPart (Content Item)**: A dynamic widget placed on a page (query display, form, navigation, HTML, chart)
- **Layout**: Page template defining content zones (SingleColumn, OneOverTwo, TwoColumn, ThreeColumn, etc.)
- **Document System**: Hierarchical tree storing all content (pages, folders, queries, templates)
- **Master Page**: The overall page wrapper (header, footer, navigation) applied to all pages
- **Theme**: CSS + skin files + images defining the visual appearance
- **Navigation**: Primary (main menu), Secondary (sub-menus), Utility (header/footer links)

---

## Page Creation Workflow

### Step 1: Discover Site Ownership and Browse Existing Structure
```
imis_content_discovery perspectiveName="<site or portal name>"
imis_document_browse path="@/iCore/Content"
imis_document_browse path="@/Shared Content"
imis_document_browse path="@" maxDepth=1        — see top-level folders
```
Understand what exists before creating new content. For an existing website, microsite, or member portal, start with `imis_content_discovery` so the agent carries native RiSE Perspective/site ownership, website keys, content roots, and NAV roots into every later browse/write/publish step. Use `maxDepth` to control depth (1 = immediate children, 2 = two levels, 0 = full tree).

Key paths:
- `@/` — Site root
- `@/Shared Content/` — preferred workspace for generated/custom proof content when present
- `@/iCore/Content/` — system/sample content pages; inspect, but do not use as the default write target
- `~/` — sitemap/navigation structure (`NAV` documents; use `imis_navigation_items`)
- `$/Common/Queries/` — System IQA queries

Before changing an existing page, iPart, layout, query, or NAV item, keep `backupBeforeWrite` enabled on the relevant write primitive and include the returned `backup.snapshotId`/`backup.snapshotPath` in the handoff packet.

When running in Cowork, use `show_widget` for RiSE website audit and action boards whenever that tool is loaded. Sitemap/SEO/a11y results, rendered page checks, navigation placement findings, iPart inventories, and publish/action matrices should appear inline in chat with evidence rows and follow-up buttons. Do not make `create_artifact` the primary Cowork output for these boards; files are optional exports after the inline widget.

### Step 2: Plan the Page

Choose and prove a **layout** for the page before placing iParts:
- **SingleColumn**: Full-width, best for simple content pages
- **OneOverTwo**: One zone on top, two below — good for dashboards
- **TwoColumn**: Side-by-side zones — good for content with sidebar
- **ThreeColumn**: Three equal zones — good for feature showcases

For real dashboard/workbench pages, do not create the content record first and then pile iParts into zone 1 unless that is the intended design. Inspect an existing page/layout or create a `LAY` document, then map every iPart to a specific `layoutZone` and `sortOrder`. After writing, use `imis_page_iparts action="inspect"` and require `layoutPlacementSafe=true`; if `layout.hasLayout=false`, iMIS will stack the iParts even if the XML contains zone numbers.

For dashboards or client staff sections, prefer `imis_dashboard_pages` over manually chaining document and iPart tools. It accepts a subject-agnostic JSON spec for pages, iParts, query/chart/template bindings, custom layouts, and optional NAV records, then returns a single delivery packet with all paths and keys. Read the returned `layoutContract` before writing or before claiming completion; it shows the chosen layout, configured zones, requested iPart placements, and whether the design is safe before write.

For any content section, not just dashboards, carry the discovered `perspectiveName`, `websiteKey`, selected parent content path, and parent navigation path into the creation/update packet so the work is tied to the real iMIS site rather than a remembered demo folder.

When a page must appear inside an existing Staff/sidebar section, match the content root used by working siblings in that sitemap branch before installing or repointing NAV. The sitemap folder name creates the `~/` route segment and `PrePublishUrl` chooses the target content, but breadcrumb/title/CSS/navigation-code fields do not attach the Staff shell. Render the final `~/` path in AgentZ and require header/sidebar DOM proof; a raw `@/` publish URL or body-only route is not acceptable evidence.

For novel layouts, use `imis_content_layouts` or the `customLayout` field on `imis_dashboard_pages`. Do not hardcode Membership/Event dashboard presets when the requested design is arbitrary. The public layout grammar is one outer `<div>` containing unique `<p>1</p>`, `<p>2</p>` authoring tokens; the MCP serializes these as native `LAY` tokens (`{1}`, `{2}`), matching built-in layouts and preserving editable Content Designer zones. Bootstrap `col-sm-*` grids are the safest supported editor pattern; nested rows produce bento/dashboard arrangements without needing new code.

### Step 3: Create the Content Record
```
imis_document_create name="My New Page" parentPath="@/Shared Content/Codex Work" documentTypeId="CON" isFolder=false
```

Document types:
- **CON**: Content record (page)
- **CFL**: Content folder (for organising pages in the `@/` tree)
- **NAV**: Sitemap/sidebar navigation item in the `~/` tree
- **FOL**: Generic folder
- **IQD**: IQA query definition

### Step 4: Add Content Items (iParts)

Use `imis_page_iparts` to manage iParts on pages:

For a full dashboard page set:
```
imis_dashboard_pages action="create" dashboardName="Client_Dashboard_20260508" dashboardTitle="Client Dashboard" parentContentPath="@/Shared Content/Codex Work" installNavigation=true parentNavigationPath="~/Client" navigationCssClass="ReportsLink" pages='[{"title":"Overview","iparts":[{"type":"query_chart","title":"Contacts by type","queryPath":"$/Samples/Dashboards/Community/Contacts by type","chartType":"donut","labelColumnName":"Customer Type","dataColumnName":"Records"}]},{"title":"Detail","role":"subpage","iparts":[{"type":"query_menu","title":"Detail list","queryPath":"$/Common/Queries/..."}]}]'
```

For a custom bento/grid dashboard:
```
imis_dashboard_pages action="create" dashboardName="Client_Ops" dashboardTitle="Client Operations" parentContentPath="@/Shared Content/Codex Work" includeSubpageTabs=true subpageTabsLayoutZone="6" customLayout='{"name":"Client_Ops_Bento","parentPath":"$/Custom/Layouts","reuseExisting":true,"defaultZoneCssClass":"ClientOpsZone","layoutSpec":{"wrapperClass":"client-ops-bento","rows":[{"columns":[{"zone":1,"className":"col-sm-8"},{"zone":2,"className":"col-sm-4"}]},{"columns":[{"zone":3,"className":"col-sm-4"},{"zone":4,"className":"col-sm-4"},{"zone":5,"className":"col-sm-4"}]},{"columns":[{"zone":6,"className":"col-sm-12"}]}]}}' pages='[...]'
```

For query-backed or custom panel-backed pages, plan the cross-surface contract first:
```
imis_iqa_content_plan goal="<page goal>" sources='["<BOOrPanelSource>"]' requestedFields='["field ideas"]' targetExperience="table|cards|dashboard|form"
```
Carry the returned Display aliases, template placeholders, filter prompts, relation hints, and iPart recommendation into the page build.

For `includeSubpageTabs`, the generated Content Collection Organizer is only the tab/organizer surface. Each subpage must carry its own real content and query/chart/template iParts, and the generated shell must not be treated as end-user content. Do not expose raw `ContentDesigner.aspx` links or `@/` document paths as site content.

**Inspect existing iParts:**
```
imis_page_iparts action="inspect" documentId={id}
```
Returns raw ContentItems XML plus parsed iPart summaries, `typeSpecificXml`, and `addTypedTemplate`. For any non-turnkey iPart, inspect a working page first and reuse `iparts[].addTypedTemplate` rather than guessing WCF XML.

**Add HTML content:**
```
imis_page_iparts action="add_html" documentId={id} html="<h2>Welcome</h2><p>Your content here.</p>" title="Welcome" layoutZone="1" sortOrder=1
```

**Add IQA table/search/export results:**
```
imis_page_iparts action="add_query_menu" documentId={id} queryPath="$/path/to/query-or-folder" title="Results" rowsPerPage=20 enableExport=true
```

**Add IQA Template tab cards/custom HTML:**
```
imis_page_iparts action="add_query_template" documentId={id} queryPath="$/path/to/template-backed-query" title="Cards" rowsPerPage=12
```
Before using Query Template Display, verify every `{#query.Alias}` placeholder matches a Display tab alias.

**Add any other registered iPart type after inspecting a working example:**
```
imis_page_iparts action="add_typed" documentId={id} ipartType="<registered type>" typeElements="<b:...>...</b:...>"
```
`add_typed` inserts by layout zone and sort order because iMIS rendering follows serialized `ContentItems` order in practice. If the visual order matters, set `layoutZone` and `sortOrder` explicitly and inspect after writing. The MCP blocks non-default zone writes when the page has no bound layout; bind/create the layout first instead of forcing the iPart XML.

**Fallback raw XML path:**
```
imis_page_iparts action="add_raw" documentId={id} ipartXml="<a:ContentItem i:type=\"b:QueryMenu\" ...>...</a:ContentItem>"
```
Use raw XML only when the typed helper cannot represent the captured example.

**Remove an iPart:**
```
imis_page_iparts action="remove" documentId={id} contentItemKey={guid}
```

Also available: `imis_content_items` contentKey={documentId} — read-only GET of iPart metadata (simpler but less detail than inspect).

### Step 5: Configure Navigation

Options for making the page accessible:
- Auto-create navigation on publish (checkbox in page properties)
- Manually add to navigation structure
- Navigation link text + breadcrumb name

### Step 6: Publish
```
imis_document_update documentId={id} status="Published"
```
Treat this as a publish request plus verification, not a guaranteed publish. If the response includes `publishState="user_intervention_required"`, hand off the returned packet for RiSE > Page Builder > Manage content or Page Builder Task list approval. Browser/native staff clicks through AgentZ are an accepted live-ops path when requested, especially for publish/approval flows that iMIS does not expose as clean REST writes. They still need a follow-up API/status verification before the agent says the page is live.

When publishing a page set, track every page independently. If two pages verify and two remain Working, report that exact split and keep the overall result as not fully live.

---

## iPart Reference Guide

iParts are organised by category. Each serves a specific purpose:

### Content iParts
- **ContentHtml**: Static HTML content — WYSIWYG editor for text, images, embedded media
- **ContentTaggedList**: Dynamically display content records matching specific tags — great for news feeds, article lists

### Query & Data iParts
- **QueryMenu**: Display IQA query results with sorting, filtering, export (DOC/XLS/PDF/CSV/XML), and email merge. The most versatile data display iPart
  - Supports horizontal filter display (up to 3 filters per row)
  - Paging styles: Simple, Advanced, NextPrev, Slider, NextPrevAndNumeric
  - Export and address mapping capabilities
- **PanelEditor**: Display and edit panel source data — custom forms tied to business objects
- **Chart iParts**: Area, Bar, Donut, Funnel, Line, Pie — all powered by IQA queries
Use `imis_iqa_content_plan` before choosing between QueryMenu, QueryTemplateDisplay, PanelEditor, and chart iParts. It turns live BO/panel metadata into aliases, prompt fields, join hints, and the safest iPart action.

### Commerce iParts
- **ProductDisplay**: Show products from the catalog
- **ShoppingCart**: Shopping cart functionality
- **OrderConfirmation**: Post-purchase confirmation display

### Community iParts
- **Registration**: Member self-service registration form
- **RosterManager**: Display member directories and rosters
- **ProfileDisplay**: Show member profile information

### Event iParts
- **EventDisplay**: List and display events
- **EventRegistrationList**: Show event registrants

### Navigation iParts
- **PrimaryNavigation**: Main site menu with mega-menu support
  - Configuration: level limiting, expand/collapse delays, skin selection
  - Path variables: `[Website]`, `[@]`, `[~]`, `[Root]`, `[Common]`, `[iMIS]`, `[Theme]`
- **SecondaryNavigation**: Sub-level navigation
- **UtilityNavigation**: Header/footer utility links
- **DashboardNavigation**: Staff site dashboard menus

### Utility iParts
- **SocialSharing**: Facebook, X (Twitter), LinkedIn share buttons
- **AlertDisplay**: Display important notifications to users

---

## Navigation Design

### Navigation Types
- **Primary**: Main horizontal menu across the top — supports mega-menus
- **Secondary**: Vertical or sub-level navigation — context-sensitive
- **Utility**: Small links in header/footer (Login, Contact Us, Search)
- **Dashboard**: Staff site internal navigation

### Navigation Structure
Navigation is a separate `~/` sitemap hierarchy of `NAV` documents. Content folders/pages live under `@/` and can be linked from navigation, but creating a `CFL` or `CON` does not automatically create a sidebar/menu item.

When creating a page, you can auto-create a navigation item:
- Navigation link text (what users see in the menu)
- Navigation location (where in the sitemap tree)
- Breadcrumb name (auto-matches navigation link text)

For agentic writes, treat navigation as proven only when `imis_navigation_items` or `imis_dashboard_pages` returns a NAV item whose `DocumentSummary.Path` equals the intended `~/...` path and whose `Hierarchy` lookup succeeds. A Working NAV with empty `Path`/`FolderPath` is an API orphan, not a placed menu item; follow the returned `nativeEditorUrl` / Site Builder handoff packet.

### Mega-Menu Configuration
Primary Navigation supports mega-menus — large panels displaying grouped items:
- Group navigation items under parent folders
- Configure expand/collapse delays for hover behavior
- Apply custom CSS skins for styling

---

## Theme & CSS Guidance

### Theme Architecture
iMIS themes consist of:
- **Theme CSS files**: Colours, fonts, headings, button styles, link styles
- **.skin files**: Control properties for buttons, labels, grids (1-2 files)
- **Required images**: Icons, user messages, UI elements
- **Base stylesheet**: UltraWave (dynamically included by iMIS — never edit)

### Managing Themes via API
```
imis_entity_list entityType="Themes"
imis_entity_get entityType="Themes" id={themeId}
imis_entity_create entityType="Themes" data='{"ThemeName": "Custom Theme", ...}'
imis_entity_update entityType="Themes" id={themeId} data='{"ThemeName": "Updated Theme", ...}'
```
Full CRUD is available via the API for theme metadata and configuration.

### Creating a Custom Theme

**Best practice**: Copy an existing theme as your starting point. Building from scratch is harder.

1. Create a custom `.css` file that loads after the default stylesheet
2. Override specific styles (colours, fonts, spacing, etc.)
3. DO NOT rename default `.css` files (requires full re-upload)
4. NEVER edit Quick Start Site themes directly — they're overwritten on upgrade
5. Package: theme CSS + .skin files + images folder → compress into ZIP
6. Upload: RiSE > Theme Builder > Themes (for uploading the ZIP package itself)
7. Apply: Set theme in website Look and Feel settings or via API
8. Test: Use browser developer tools (F12) to inspect and debug

### CSS Best Practices
- Develop toward W3C standards for accessibility (WCAG compliance)
- Test responsive design across screen sizes
- Use CSS variables for consistent theming
- Keep custom overrides organised and commented
- Mobile-first approach for responsive layouts

---

## Content Management

### Content Lifecycle
Draft → Published → Archived

- **Draft/Working**: Content exists but is not visible to website visitors
- **Published**: Live and visible on the website
- **Archived**: Removed from live site but retained for history

### Version Control
iMIS supports content versioning — you can revert to earlier versions of a page.

### Content Folders
- **Core Content**: System-provided base content (don't modify directly)
- **Quick Start Sites**: Template-based starter content (copy, don't edit originals)
- **Shared Content**: Organisation-wide custom content
- **Custom Folders**: Create your own structure

### Content Properties
- **Title**: Page heading (supports dynamic page title)
- **Publish File Name**: URL-friendly identifier
- **Layout**: Template selection
- **Keywords**: SEO and internal search terms
- **Description**: Meta description for SEO
- **Tags**: Categorisation and inheritance
- **Access Settings**: Security and visibility controls
- **Cache Duration**: Default or custom per page

---

## Troubleshooting

### Page Not Appearing After Publish
- Check publish verification: `imis_document_update` publish responses include `statusVerification`; otherwise inspect `DocumentSummary.Status` and verify it is "Published"
- If the MCP returned `userInterventionRequired`, the page still needs native iMIS publish/approval
- Sitemap may need rebuilding after navigation changes
- Check access settings — page may be restricted to specific groups
- Check cache duration — cached pages may take time to refresh

### iPart Not Displaying Data
- Verify the IQA query powering the iPart is REST-enabled
- Check query parameters and filters
- Verify the content zone placement in the layout

### Navigation Not Showing
- Navigation created from content folders (CFL type)
- Verify the folder has the right parent in the document tree
- Check navigation item visibility settings
