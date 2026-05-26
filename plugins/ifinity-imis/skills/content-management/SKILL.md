---
name: content-management
description: >-
  Manage content pages, folders, and the Document System in iMIS. This skill
  should be used when the user says "create a page", "update content",
  "publish page", "browse site", "document system", "content record",
  "website content", "CMS", "iParts", "content folder", "page layout",
  "content type", "lookup table", "dropdown values", "add iPart",
  "theme", "template", "navigation", "redirect",
  or when working with the iMIS Document System, website content, or content items.
when_to_use: >-
  Use for arbitrary content/page/iPart/navigation work, including generated
  dashboard sections, query-backed pages, custom layouts, template-aware content,
  and publish verification. Pair with iqa-query-design when content depends on
  IQA, custom BOs, panel sources, Display aliases, or Query Template Display.
argument-hint: "[path-or-action] [browse|create|edit|publish|iparts]"
---

# Content & Document System Management

Create, edit, browse, and prepare content in the iMIS Document System using MCP tools. Add iParts to pages, manage themes and templates, configure navigation, and handle URL redirects. Publish is treated as a verified state transition: the MCP can request it and verify the result, but if iMIS keeps the record in Working/approval state the tool must return a user-intervention packet instead of claiming success.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles for Document System behaviour, content types, publishing workflows, and iPart configuration. Use the `imis-docs-dev` connector to look up Document API data contracts, `$type` values, and content item endpoint details.

## Tool Selection

First classify the content task by surface:
- Existing site/microsite/member portal/navigation context: use `imis_content_discovery` first to resolve native Perspective/site ownership, content roots, website keys, and NAV targets.
- Existing content change: keep `backupBeforeWrite` enabled on the mutating primitive. `imis_document_update`, `imis_page_iparts`, and layout replacement return compact backup metadata before changing existing XML/Data.
- Content folder/page: use `imis_document_create` or `imis_document_update`
- HTML/design block: use `imis_page_iparts action="add_html"`
- Custom page/grid layout: use `imis_content_layouts` to create a `LAY` document, then bind it through `imis_dashboard_pages customLayout` or a page `layoutDocumentVersionKey`
- Query table/search/export: use `imis_page_iparts action="add_query_menu"`
- Query template/card layout: use `imis_page_iparts action="add_query_template"` after alias proof
- Multi-page dashboard or sidebar section: use `imis_dashboard_pages` with a declarative pages/iParts/navigation spec
- Query/custom BO/panel-backed page design: use `imis_iqa_content_plan` before writing IQD or iPart XML
- Other iPart type: inspect a working example, then use `add_typed`
- Navigation/routing/publish: treat as a separate surface; publish must verify through a callable API response or become a user-intervention-required handoff
- Sitemap/sidebar placement: use `imis_navigation_items` or `imis_dashboard_pages installNavigation=true`, but trust only a returned NAV item with the intended non-empty `DocumentSummary.Path` and a resolved Hierarchy row. If the tool reports `api_created_orphan_without_hierarchy`, the REST create produced an empty-path orphan and native Site Builder placement is still required.
- After native Site Builder placement, re-run `imis_navigation_items action="list"` or `inspect` for the intended `~/...` path. If the tool reports duplicate path records, stop and call out the duplicates; repeated native Save submissions can create multiple Working NAV rows at the same sitemap path.

| I want to... | Tool |
|--------------|------|
| Discover which iMIS site owns content and sitemap records | `imis_content_discovery` |
| Render/audit a routable page with AgentZ | `imis_rendered_page_audit` |
| Browse folders and pages | `imis_document_browse` |
| Get a specific page or document | `imis_document_get` |
| Create a new page or folder | `imis_document_create` |
| Create an arbitrary reusable page layout | `imis_content_layouts` |
| Build a dashboard page set with subpages/iParts/navigation | `imis_dashboard_pages` |
| Update a page or request verified publish | `imis_document_update` |
| See what iParts are on a page | `imis_content_items` or `imis_page_iparts action="inspect"` |
| Add HTML content to a page | `imis_page_iparts action="add_html"` |
| Add searchable/exportable IQA results to a page | `imis_page_iparts action="add_query_menu"` |
| Add IQA Template tab results to a page | `imis_page_iparts action="add_query_template"` |
| Add any registered iPart to a page | `imis_page_iparts action="add_typed"` after inspecting a working example |
| Add fallback raw iPart XML | `imis_page_iparts action="add_raw"` |
| Remove an iPart from a page | `imis_page_iparts action="remove"` |
| Manage themes | `imis_entity_list entityType="Themes"` / `imis_entity_get` / `imis_entity_create` |
| Manage communication templates | `imis_entity_list entityType="Template"` / `imis_entity_create` |
| Manage URL redirects | `imis_entity_list entityType="RedirectRule"` / `imis_entity_create` |
| Manage content tags | `imis_entity_list entityType="Tag"` / `imis_entity_create` |
| Manage panel definitions | `imis_entity_list entityType="PanelDefinition"` / full CRUD |
| Manage dropdown/picklist values | `imis_lookup_tables` |
| Run a query that powers an iPart | `imis_query` |
| Read/write custom data shown in a panel | `imis_panel_data` |
| Discover business objects / panel schemas | `imis_entity_list entityType="BOEntityDefinition"` |
| Plan query-backed content from BO/panel metadata | `imis_iqa_content_plan` |
| Send an email | `imis_send_email` |
| Delete a document | **Use iMIS web UI** (API DELETE is hard delete — blocked for safety) |
| Create an IQA query | `imis_iqd_query` capabilities/validate/assemble/create for supported query forms; do not work around backend rejections with raw IQD writes |
| Create page layouts | `imis_content_layouts` for custom `LAY` documents; use iMIS web UI only for unproven editor-only layout behavior |
| Register a custom iPart content type | **Use iMIS web UI** (RiSE > Maintenance > Content types) |

## Workflows

### Browse Site Content
```
imis_content_discovery
imis_content_discovery perspectiveName="Member Responsive"
imis_content_discovery targetContentRoot="@/Shared Content/ClientSite" includeDiagnostics=true
imis_document_browse path="@/iCore/Content"
imis_document_browse path="@" maxDepth=1        — top-level folders only
imis_document_browse path="@" maxDepth=2        — two levels deep
imis_document_browse path="@" maxDepth=0        — full tree (large!)
```
Start with discovery when the task mentions a public website, microsite, member portal, SEO/sitemap, or navigation placement. Use the returned `perspectiveName`, `websiteKey`, `contentRoots`, and `navigationRoots` to scope later `imis_document_browse`, `imis_navigation_items`, `imis_dashboard_pages`, `imis_public_sitemap_audit`, or `imis_rendered_page_audit` calls. Use rendered audit results as evidence, then resolve the exact content/layout/iPart records before editing.

For Cowork SEO, sitemap, rendered-page, content, iPart, or publish-readiness audits, present the result as an inline `show_widget` board when the tool is available. Include summary cards, active/public rows, excluded findings, evidence fields, and buttons for predictable next actions such as `Run rendered audit`, `Inspect content record`, `Draft meta descriptions`, `Prepare remediation`, `Open native handoff`, or `Export report`. Do not use `create_artifact` as the primary Cowork presentation for these boards; saved reports are secondary exports after the inline board.

Key paths:
- `@/` — Site root (never create here directly)
- `@/Shared Content/` — preferred peripheral workspace area for generated/custom proof content when present
- `@/iCore/Content/` — system/sample content pages; inspect freely, but do not create generated proof pages here unless deliberately overriding the guard
- `~/` — sitemap/navigation structure (`NAV` documents; use `imis_navigation_items`)
- `$/Common/Queries/` — System IQA queries

### Create a Page
```
imis_document_create name="MyPage" parentPath="@/Shared Content/Codex Work" title="My Page" description="A new page"
```
The tool auto-detects CON (content record) type for `@/` paths, generates the required XML Data blob, sets the display title, and validates before submission.
It blocks creation under `@/iCore/` by default. Pass `allowSystemPath=true` only for deliberate edits to system/sample content.

### Safe Change Scaffold
Use this sequence for any remediation that edits existing iMIS content, navigation, layouts, queries, or iParts:

1. Start with `imis_content_discovery` when site/Perspective ownership matters.
2. Resolve exact target paths/DocumentIds with discovery, browse, `document_get`, `page_iparts inspect`, or `navigation_items inspect`.
3. Keep `backupBeforeWrite` enabled on the writer. Existing-document writers return `backup.snapshotId`, `backup.snapshotPath`, and compact document hashes before mutation.
4. Apply the narrowest writer: `imis_document_update`, `imis_page_iparts`, `imis_content_layouts`, `imis_dashboard_pages`, `imis_navigation_items`, or `imis_iqd_query`.
5. Publish only when requested, and trust only verified publish responses. If AgentZ is connected, a `document_publish` `userIntervention` packet may be completed through native browser automation, but you still must re-read `DocumentSummary.Status` before claiming live.
6. Verify through API/XML/rendered route checks, then leave the `backupRef`, touched keys, publish state, and restore instruction in the delivery packet.

Use `imis_document_update restoreSnapshotRef="<backupRef>" confirmRestore=true` only when intentionally rolling back. Restore captures a pre-restore snapshot by default so the post-change state is not lost.

### Add Content to a Page (iParts)

Before adding multiple iParts or using any non-default `layoutZone`, establish the page layout contract:

1. Inspect an existing comparable page with `imis_page_iparts action="inspect"` or inspect/create a layout with `imis_content_layouts`.
2. Choose a built-in `layoutPreset`/`layoutPath` or create a reusable `LAY` document with `imis_content_layouts`.
3. Carry the layout key and `layoutZones` into `imis_dashboard_pages`, or verify the target page already has `layout.hasLayout=true`.
4. Assign every iPart an explicit `layoutZone` and `sortOrder`; do not rely on creation order as the design.
5. After writing, inspect again and require `postWriteVerification.layoutPlacementSafe=true`, `duplicateNameSafe=true`, and no web-part duplicate-key errors before saying the page is assembled.

If a page has no `LayoutDocumentVersionKey`, iMIS will stack iParts. The MCP blocks non-default zone writes in that state; bind or create a layout first rather than pushing malformed placement.

**Build a dashboard page set:**
```
imis_dashboard_pages action="plan" dashboardName="Member_Dashboard" dashboardTitle="Member Dashboard" parentContentPath="@/Shared Content/Codex Work" pages='[{"title":"Overview","iparts":[{"type":"query_menu","title":"Members","queryPath":"$/Common/Queries/Membership/All active members"}]}]'
imis_dashboard_pages action="create" dashboardName="Member_Dashboard_20260508" dashboardTitle="Member Dashboard" parentContentPath="@/Shared Content/Codex Work" installNavigation=true parentNavigationPath="~/Membership" navigationCssClass="MembershipLink" pages='[...]'
```
Use this before composing dashboards manually. It returns a handoff packet containing every content path, DocumentId, layout contract, iPart binding, navigation item, and publish/intervention state. Read `layoutContract[].warning` before creating; if it says the page needs a layout, choose an existing layout or provide `customLayout`. For staff/sidebar pages, create or copy the content record into the content root used by the intended sitemap branch; a published `@/` proof-folder page can render as standalone body content even when a `~/` NAV record points at it.

Dashboard pages are created as Working content. Read `contentPublishSummary` and do not say a dashboard is live until every returned page has verified publish status. Generated subpage tabs are a Content Collection Organizer surface that points to subpage content versions; they are not a substitute for putting real HTML/query/chart iParts on the subpages.

### Sitemap Route Proof

Sitemap properties affect different parts of the route:
- `Navigation Folder Name` / NAV `Name` creates the URL segment under the parent `~/` path.
- `Content or URL to link to` / `PrePublishUrl` selects the target content record, shortcut, relative URL, or absolute URL.
- `URL parameters` are appended to the target and only matter to content/iParts that consume those parameters.
- `Hide on this page` hides the breadcrumb entry; it is not a Staff shell/sidebar switch.
- `Override content title`, `Breadcrumb name`, `Navigation code`, image URL, and CSS class change display/alias/icon behavior, not whether the Staff header/sidebar renders.

For staff work, prove the route by opening the `~/` navigation path in AgentZ and checking for Staff chrome (`body-main sidebar-fixed`, header/nav) plus the expected page content. Do not use the raw publish location (`.../ContentPath/Page.aspx`) as proof of staff integration.

For arbitrary layouts, do not clone the native dashboard presets. Pass a `customLayout` object or create the layout first:
```
imis_content_layouts action="create" layoutName="Client_Bento_Layout" parentPath="$/Custom/Layouts" layoutSpec='{"wrapperClass":"client-bento","rows":[{"columns":[{"zone":1,"className":"col-sm-8"},{"zone":2,"className":"col-sm-4"}]},{"columns":[{"zone":3,"className":"col-sm-4"},{"zone":4,"className":"col-sm-4"},{"zone":5,"className":"col-sm-4"}]},{"columns":[{"zone":6,"className":"col-sm-12"}]}]}'
imis_dashboard_pages action="create" dashboardName="Client_Ops" dashboardTitle="Client Operations" parentContentPath="@/Shared Content/Codex Work" customLayout='{"name":"Client_Bento_Layout","parentPath":"$/Custom/Layouts","reuseExisting":true,"layoutSpec":{"rows":[{"columns":[{"zone":1,"className":"col-sm-8"},{"zone":2,"className":"col-sm-4"}]}]}}' pages='[...]'
```
The public iMIS authoring contract is one outer `<div>` and unique `<p>1</p>`, `<p>2</p>` zone tokens with no gaps. The MCP writer serializes those zones to the internal `LAY` form used by native layouts (`{1}`, `{2}`) so Content Designer shows editable Add content/configuration zones instead of static numbers. Use stable layout names and reuse them; do not generate timestamped layout definitions unless isolation is explicitly required. Use `replaceExisting=true` only when deliberately changing a reusable layout. Use `col-sm-*` grids for the safest editor-compatible pattern, but raw valid body markup is allowed when the theme supports it.

**Add HTML content:**
```
imis_page_iparts action="add_html" documentId="<uuid>" html="<h2>Welcome</h2><p>Page content here.</p>" title="Welcome Section" layoutZone="1" sortOrder=1
```
Use `stylesheet` and `cssClass` for scoped, page-local design work:
```
imis_page_iparts action="add_html" documentId="<uuid>" cssClass="ifinity-section" stylesheet=".ifinity-section h2 { margin-bottom: .5rem; }" html="<section class=\"ifinity-section\"><h2>Welcome</h2></section>"
```

**Add a Query Template Display iPart:**
```
imis_page_iparts action="add_query_template" documentId="<uuid>" queryPath="$/Common/Queries/Custom/MyTemplateQuery" title="Results" rowsPerPage=10 displayCards=true displayColumns=true numberOfColumns=3
```
The source IQD must have Template tab content. Generate that with `imis_iqd_query` by including `templateHtml` in the design, using placeholders such as `{#query.FullName}` that match Display tab aliases.
If iMIS shows `Invalid property` in a Query Template Display iPart, inspect the bound IQD and correct the Display aliases or the template placeholders. The iPart does not resolve raw BO property names that are not exposed on the Display tab.

**Add a Query Menu iPart for a query or whole query folder:**
```
imis_page_iparts action="add_query_menu" documentId="<uuid>" queryPath="$/iFINITY/BSA" title="BSA query explorer" rowsPerPage=20 enableExport=true menuCaptionText="Select a BSA query"
```
Use Query Menu for existing IQDs that do not have Template tab HTML, for query folders, exportable tables, prompted searches, or staff-facing operational lists.

**Inspect an existing page to learn iPart XML format:**
```
imis_page_iparts action="inspect" documentId="<uuid>"
```
Returns parsed iPart summaries, `typeSpecificXml`, `typeSpecificElementNames`, `addTypedTemplate`, and raw ContentItems XML. Use `iparts[].addTypedTemplate` as the preferred input for `add_typed` when copying a proven iPart such as `QueryChartViewer`, `PanelEditorCommon`, navigation/content organizer, or a specialist commerce/event iPart.

**List/search known iPart types:**
```
imis_page_iparts action="list_types" ipartSearch="commerce"
```

**Add a captured typed iPart:**
```
imis_page_iparts action="add_typed" documentId="<uuid>" ipartType="QueryChartViewer" title="Contact type chart" typeElements="<b:ChartHeight>...</b:ChartHeight>"
```
`add_typed` generates the WCF base structure and inserts the iPart into `ContentItems` by `layoutZone`/`sortOrder`. Do not assume `SortOrder` alone controls rendering; live testing showed iMIS follows serialized iPart order, so the writer maintains that order when adding new iParts.

**Add any iPart type via raw XML:**
```
imis_page_iparts action="add_raw" documentId="<uuid>" ipartXml="<a:ContentItem i:type=\"b:QueryMenu\" xmlns:b=\"...\">...</a:ContentItem>"
```

**Remove an iPart:**
```
imis_page_iparts action="remove" documentId="<uuid>" contentItemKey="<content-item-guid>"
```

### Create a Content Folder (for organizing pages)
```
imis_document_create name="NewSection" parentPath="@/Shared Content" isFolder=true title="New Section"
```
Auto-detects CFL type and generates ContentFolder XML. Content folders organize content pages in the `@/` tree; they do not by themselves install sidebar/menu items in the `~/` sitemap tree. For navigation, use `imis_navigation_items` or dashboard `installNavigation`, then inspect the returned `createState` and `userIntervention` fields before claiming placement.

### Create a Generic Folder (for queries, files, etc.)
```
imis_document_create name="MyQueries" parentPath="$/Custom" isFolder=true
```
Auto-detects FOL type. No Data blob needed for `$/` folders.

### Publish a Page
```
imis_document_update documentId="<uuid>" status="Published"
```
Pages start in "Working" status. Inspect the response before saying the page is live:
- `statusVerification.verified=true` means the callable API path proved `DocumentSummary.Status` is `Published`.
- `publishState="user_intervention_required"` means iMIS did not accept REST status publish for that record; hand off the returned `userIntervention` packet. The native route is RiSE > Page Builder > Manage content, or Page Builder > Task list if approval is required.
- For multiple pages, report per-document status. Partial publish success is still not a live page set; name which DocumentIds verified and which require the native publish/approval packet.

Browser/native publish through AgentZ is an allowed operational path when the user has requested live staff-site work and AgentZ is connected, but it must still be verified afterwards with `statusVerification.verified=true` or a fresh document/status read. Do not mark a page set live based only on having clicked a button in the browser.

### Manage Themes
```
imis_entity_list entityType="Themes"
imis_entity_get entityType="Themes" id="<theme-id>"
imis_entity_create entityType="Themes" data='{"ThemeName": "Custom Theme", ...}'
imis_entity_update entityType="Themes" id="<theme-id>" data='{"ThemeName": "Updated Theme", ...}'
```

### Manage URL Redirects
```
imis_entity_list entityType="RedirectRule"
imis_entity_create entityType="RedirectRule" data='{"OldUrl": "/old-path", "NewUrl": "/new-path", "RedirectType": "301"}'
```

### Manage Dropdown Values
```
imis_lookup_tables action="list" tableName="PREFIX"
imis_lookup_tables action="create" tableName="ACTIVITY_TYPE" code="WEBINAR" description="Webinar"
```
Every dropdown in iMIS is driven by a GenTable. Common tables: PREFIX, SUFFIX, MEMBER_TYPE, ACTIVITY_TYPE, STATE_CODES, COUNTRY.

---

## Document System Rules

### Hierarchy and Types
The Document System has strict type-to-hierarchy rules:

| Path prefix | Allowed types | Purpose |
|-------------|---------------|---------|
| `@/` | CFL (content folder), CON (content record/page) | Website pages and structure |
| `$/` | FOL (generic folder), IQD (query), BOD, file uploads | Queries, definitions, files |

**The API does NOT validate type-to-hierarchy.** Creating the wrong type in the wrong tree causes site corruption. The `imis_document_create` tool validates this automatically.

### Safety Rules
- **Never create at bare root** (`@/` or `$/`). Always use a subfolder.
- **Never use `imis_entity_delete` for documents.** API DELETE permanently removes the record. Deletion is blocked for Document entities.
- **CFL and CON documents require Data blobs.** Without the XML payload, iMIS UI crashes with 500 errors. `imis_document_create` auto-generates these.
- **IQD (query) documents require guarded assembly.** Their Data is .NET BinaryFormatter serialization. Do not create raw IQD documents with generic `imis_document_create`; use `imis_iqd_query` for generated IQDs. If the backend rejects a relation-heavy, grouped, templated, report, or alert form, stop the write path and use only safe existing-query/read alternatives.
- **`@/iCore/` is protected** — only SysAdmin role can edit it.

### Document Lifecycle
Working → Published → Archived

---

## Cross-Area Workflows

### Page Powered by a Query
1. Use `imis_content_discovery` first if the page belongs to an existing site, microsite, member portal, or navigation scope.
2. Confirm the IQA query exists or plan one with `imis_iqa_content_plan` when the source is custom/client-specific.
3. Execute or preview it to verify results: `imis_query queryPath="$/path/to/query"`
4. For a dashboard, use `imis_dashboard_pages` so content, iParts, optional subpages, and optional NAV are one tracked delivery packet.
5. For a single page, create the page: `imis_document_create name="MemberList" parentPath="@/Shared Content/Codex Work"`
6. Add a Query Menu iPart with `imis_page_iparts action="add_query_menu"` for table-style results, or `action="add_query_template"` when the IQD Template tab has proven placeholder aliases.
7. Request publish only when explicitly requested, then verify the result: `imis_document_update documentId="<uuid>" status="Published"`. If the response returns `userInterventionRequired`, stop at the handoff packet.

### Page Showing Custom Data
1. Check the panel source exists: `imis_entity_list entityType="BOEntityDefinition"`
2. Plan the query/content contract: `imis_iqa_content_plan sources='["<PanelSource>"]' targetExperience="form|table|cards"`
3. Read sample data where appropriate: `imis_panel_data panelSource="<PanelSource>" partyId="12345"`
4. For read-only lists/cards, create an IQD and bind it with Query Menu or Query Template Display.
5. For editable panel forms, inspect a working PanelEditor iPart and add it with `imis_page_iparts action="add_typed"` using the captured type-specific XML.

### Content for Events
1. Find the event: `imis_entity_get entityType="Event" id="EVENT001"`
2. Browse existing event pages: `imis_document_browse path="@/iCore/Content/Events"`
3. Create event-specific content page if needed
4. Use event queries to display registrant lists, capacity, etc.

### Bulk Content Updates
1. Discover site scope: `imis_content_discovery perspectiveName="<site>"` or `targetContentRoot="<root>"`.
2. Browse to find pages: `imis_document_browse path="<discovered content root>"`
3. Get each page: `imis_document_get documentId="<uuid>"`
4. Keep `backupBeforeWrite` enabled and use `backupLabel="<bulk-change>"` on each mutating call.
5. Update each: `imis_document_update documentId="<uuid>" description="Updated description"`

### Content Delivery Packet

Leave this packet whenever content or iParts are created, changed, or handed to another agent:

```text
Goal:
Site/Perspective / websiteKey:
Content path / DocumentId / status:
BackupRef:
iParts:
- type:
- contentItemKey:
- layoutZone:
- sortOrder:
- queryPath/sourceKey:
- alias/template assumptions:
Verification:
- Document Data XML inspection:
- query preview:
- browser/editor check:
Publish/navigation state:
Publish verification / user intervention:
Risks or proof gaps:
```

---

## What Claude Can vs Cannot Do

**Claude can** (via MCP tools):
- Discover native iMIS site/Perspective/content/navigation ownership before acting
- Snapshot existing documents to local backup files and restore them with explicit confirmation
- Browse, create, and update documents (pages, folders)
- Request and verify publish status, or produce a user-intervention-required packet when iMIS keeps publish behind native Page Builder/approval workflows
- Add, remove, and inspect iParts on pages (via Document Data XML manipulation)
- Add HTML content, query displays, panel editors, and other iPart types to pages
- Manage navigation structure by creating CFL (content folder) documents
- List, create, update, and delete website themes
- Manage communication templates (email, letter, notification)
- Create and manage URL redirect rules
- Manage content tags
- Manage panel definitions (page panel layouts)
- Manage lookup table values (dropdowns)
- Execute IQA queries that power pages
- Create guarded IQD queries through `imis_iqd_query`
- Create custom content layouts (`LAY`) through `imis_content_layouts`
- Read and write panel source data displayed on pages
- Discover business object schemas

**Requires iMIS web UI**:
- Completing publish/approval when `imis_document_update` or `imis_navigation_items publish=true` returns `userInterventionRequired`
- Layout editor-only behaviour that is not represented by a proven `LAY` document shape
- Creating unproven IQA shapes still requires a matching iMIS example and serializer extension before MCP write automation
- Registering custom iPart content types (RiSE > Maintenance)
- Deleting documents (API DELETE is hard delete — use web UI Recycle Bin)
- Credit card payment processing (PCI compliance)

See `rise-website-design` skill for iPart reference, navigation design, and theming.
See `business-object-design` skill for panel source design and custom data.
See `iqa-query-design` skill for query design and reporting.
