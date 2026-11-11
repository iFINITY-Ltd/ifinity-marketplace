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
  Dropdown/lookup editing here covers GenTable-backed values only; route
  Activity types and interaction-type catalogs to imis_contact_activity
  (LegacyActivityType/InteractionType) and message/email template content to
  communications-management.
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

## Design Surface Directory

Load [references/design-surfaces.md](references/design-surfaces.md) when content
work includes generated visual HTML, custom dashboard sections, registered
client iPart packages, retired query-client artifact migration, or design-system exhibits.

The short model:

- Native iMIS behavior stays in native iParts.
- Branded page sections use designed ContentHtml.
- Custom live IQA experiences and other discrete apps use registered client iPart packages.
- Every discrete app/runtime ZIP includes a registered `config.html` configuration area, even when it exposes no business settings.
- `queryClient` writes are retired and always rejected. Inspect an existing artifact only to migrate it to a registered client iPart or remove it.
- Existing reusable visual patterns come from design-system exhibits.
- New reusable patterns can be proposed as exhibits, but promotion is a
  deliberate design-system update.

## Tool Selection

First classify the content task by surface:

- Existing site/microsite/member portal/navigation context: use `imis_site_profile scope=discovery` first to resolve native Perspective/site ownership, content roots, website keys, and NAV targets.
- Existing content change: keep `backupBeforeWrite` enabled on the mutating primitive. `imis_document action=update`, `imis_page_iparts`, and layout replacement return compact backup metadata before changing existing XML/Data.
- Content folder/page: use `imis_document action=create` or `imis_document action=update`
- HTML/design block: use `imis_page_iparts action="place" kind="html"`; new
  generated visual HTML defaults to AgentZ self-contained design binding.
- Custom page/grid layout: use `imis_content_layouts` to create a `LAY` document, then bind it through `imis_page_builder recipe=dashboard customLayout` or a page `layoutDocumentVersionKey`
- Query table/search/export: use `imis_page_iparts action="place" kind="queryIpart" queryDisplay="menu"`
- Query template/card layout: use `imis_page_iparts action="place" kind="queryIpart" queryDisplay="template"` after alias verification
- Multi-page dashboard or sidebar section: use `imis_page_builder recipe=dashboard` with a declarative pages/iParts/navigation spec
- Query/custom BO/panel-backed page design: use `imis_iqa action=content_plan` before writing IQD or iPart XML
- Other iPart type: inspect a working example, then use `action="place" kind="nativeIpart"`
- Navigation/routing/publish: treat as a separate surface; publish must verify through a callable API response or become a user-intervention-required handoff
- Sitemap/sidebar placement: use `imis_navigation_items` or `imis_page_builder recipe=dashboard installNavigation=true`; NAV creation is native Site Builder/AgentZ only. Trust only a returned NAV item with the intended non-empty `DocumentSummary.Path` and a resolved Hierarchy row, and do not attempt REST navigation creation.
- After native Site Builder placement, re-run `imis_navigation_items action="list"` or `inspect` for the intended `~/...` path. If the tool reports duplicate path records, stop and call out the duplicates; repeated native Save submissions can create multiple Working NAV rows at the same sitemap path.

| I want to...                                               | Tool                                                                                                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Discover which iMIS site owns content and sitemap records  | `imis_site_profile scope=discovery`                                                                                                         |
| Render/audit a routable page with AgentZ                   | `imis_rendered_page_audit`                                                                                                                  |
| Browse folders and pages                                   | `imis_document action=browse`                                                                                                               |
| Get a specific page or document                            | `imis_document action=get`                                                                                                                  |
| Create a new page or folder                                | `imis_document action=create`                                                                                                               |
| Create an arbitrary reusable page layout                   | `imis_content_layouts`                                                                                                                      |
| Build a dashboard page set with subpages/iParts/navigation | `imis_page_builder recipe=dashboard`                                                                                                        |
| Update a page or request verified publish                  | `imis_document action=update`                                                                                                               |
| See what iParts are on a page                              | `imis_page_iparts action="inspect" documentId="<uuid>"`; read one iPart with `imis_document action=content_items` (needs both `contentKey` and `contentItemKey`) |
| Add HTML content to a page                                 | `imis_page_iparts action="place" kind="html"`                                                                                               |
| Add searchable/exportable IQA results to a page            | `imis_page_iparts action="place" kind="queryIpart" queryDisplay="menu"`                                                                      |
| Add IQA Template tab results to a page                     | `imis_page_iparts action="place" kind="queryIpart" queryDisplay="template"`                                                                  |
| Add native IQA-backed chart/progress/related/summary views | `imis_page_iparts action="place"` with `kind=queryIpart queryDisplay=chart`, `kind=progressTracker`, `kind=relatedItems`, or `kind=summaryDisplay` |
| Add any registered iPart to a page                         | `imis_page_iparts action="place" kind="nativeIpart"` after inspecting a working example                                                     |
| Add fallback raw iPart XML                                 | `imis_page_iparts action="place" kind="raw"`                                                                                                |
| Remove an iPart from a page                                | `imis_page_iparts action="remove"`                                                                                                          |
| Manage themes                                              | `imis_site_shell lane=themeRecord` with `profile` or guarded `preview_create/create`, `preview_update/update`, `preview_delete/delete`       |
| Manage communication templates                             | `imis_communication_setup entity=Template` with read/validate and guarded preview/write actions                                               |
| Manage URL redirects                                       | `imis_rise_shortcuts` with `profile` or guarded `preview_*_redirect_rule` → matching write action                                              |
| Read content tags                                          | `imis_entity action=list entityType="Tag"` (read/validate/changelog only — `create` returns 501)                                            |
| Create/delete content tags                                 | `imis_tagging_design` (native companion handoff)                                                                                             |
| Manage panel definitions                                   | `imis_panel_definition` with `list_panels`/`get_panel` or guarded `preview_create/create`, `preview_update/update`, `preview_delete/delete`   |
| Manage dropdown/picklist values                            | `imis_lookup_configuration` (GenTable-backed values only — NOT the Activity types grid (LegacyActivityType) or InteractionType, both `imis_contact_activity`) |
| Run a query that powers an iPart                           | `imis_query`                                                                                                                                |
| Read/write custom data shown in a panel                    | `imis_panel_records`                                                                                                                        |
| Discover business objects / panel schemas                  | `imis_entity action=list entityType="BOEntityDefinition"`                                                                                   |
| Plan query-backed content from BO/panel metadata           | `imis_iqa action=content_plan`                                                                                                                     |
| Send an email                                              | `imis_communication_message_submit`                                                                                                         |
| Delete a document                                          | `imis_document action=preview_delete` → `action=delete` (exact-confirm), or native recycle handoff; raw `imis_entity action=delete` on Document stays blocked |
| Create an IQA query                                        | `imis_iqd_query` capabilities/validate/assemble/create for supported query forms; do not work around backend rejections with raw IQD writes |
| Create page layouts                                        | `imis_content_layouts` for custom `LAY` documents; use iMIS web UI only for unproven editor-only layout behavior                            |
| Register a custom iPart content type                       | `imis_client_ipart_package` (plan → validate → deploy) — deploys the ZIP under `$/iPartSource`, creates/updates the RCT, and registers its runtime plus required configuration area |

## Workflows

### Browse Site Content

```
imis_site_profile scope=discovery
imis_site_profile scope=discovery perspectiveName="Member Responsive"
imis_site_profile scope=discovery targetContentRoot="@/Shared_Content/ClientSite" includeDiagnostics=true
imis_document action=browse path="@/iCore/Content"
imis_document action=browse path="@" maxDepth=1        — top-level folders only
imis_document action=browse path="@" maxDepth=2        — two levels deep
imis_document action=browse path="@" maxDepth=0        — full tree (large!)
```

Start with discovery when the task mentions a public website, microsite, member portal, SEO/sitemap, or navigation placement. Use the returned `perspectiveName`, `websiteKey`, `contentRoots`, and `navigationRoots` to scope later `imis_document action=browse`, `imis_navigation_items`, `imis_page_builder recipe=dashboard`, `imis_site_profile scope=routes`, or `imis_rendered_page_audit` calls. Use rendered audit results as evidence, then resolve the exact content/layout/iPart records before editing.

For Cowork SEO, sitemap, rendered-page, content, iPart, or publish-readiness audits, present the result as an inline `show_widget` board when the tool is available. Include summary cards, active/public rows, excluded findings, evidence fields, and buttons for predictable next actions such as `Run rendered audit`, `Inspect content record`, `Draft meta descriptions`, `Prepare remediation`, `Open native handoff`, or `Export report`. Do not use `create_artifact` as the primary Cowork presentation for these boards; saved reports are secondary exports after the inline board.

Key paths:

- `@/` — Site root (never create here directly)
- `@/Shared_Content/` (the stock Shared Content folder; its display name has a space, its path does not) — preferred peripheral workspace area for generated/custom content when present
- `@/iCore/Content/` — system/sample content pages; inspect freely, but do not create generated pages here unless deliberately overriding the guard
- `~/` — sitemap/navigation structure (`NAV` documents; use `imis_navigation_items`)
- `$/Common/Queries/` — System IQA queries

### Create a Page

```
imis_document action=create name="MyPage" parentPath="@/Shared_Content/" title="My Page" description="A new page"
```

The tool auto-detects CON (content record) type for `@/` paths, generates the required XML Data blob, sets the display title, and validates before submission.
It blocks creation under `@/iCore/` by default. Pass `allowSystemPath=true` only for deliberate edits to system/sample content.

### Safe Change Scaffold

Use this sequence for any remediation that edits existing iMIS content, navigation, layouts, queries, or iParts:

1. Start with `imis_site_profile scope=discovery` when site/Perspective ownership matters.
2. Resolve exact target paths/DocumentIds with discovery, browse, `document_get`, `page_iparts inspect`, or `navigation_items inspect`.
3. Keep `backupBeforeWrite` enabled on the writer. Existing-document writers return `backup.snapshotId`, `backup.snapshotPath`, and compact document hashes before mutation.
4. Apply the narrowest writer: `imis_document action=update`, `imis_page_iparts`, `imis_content_layouts`, `imis_page_builder recipe=dashboard`, `imis_navigation_items`, or `imis_iqd_query`.
5. Publish only when requested, and trust only verified publish responses. If AgentZ is connected, a `document_publish` `userIntervention` packet may be completed through native browser automation, but you still must re-read `DocumentSummary.Status` before claiming live.
6. Verify through API/XML/rendered route checks, then leave the `backupRef`, touched keys, publish state, and restore instruction in the delivery packet.

Use `imis_document action=update restoreSnapshotRef="<backupRef>"` only when intentionally rolling back: the first call lists every document the restore would overwrite (snapshot and current versions) and returns `confirmationText`; re-issue with that exact text to restore, and each document is read back against the snapshot. Restore captures a pre-restore snapshot by default so the post-change state is not lost.

Pages with a native tabbed Content Collection Organizer (`TabbedDialogSettings`, whose separators iMIS stores as control-character references such as `&#x7;`) restore, and import through `imis_document action=import_native_export` or a configuration package, byte for byte. A malformed `UserDefinedFields` collection on such a page is refused before any write. A UDF value whose stored text holds a control-character reference is listed as unsupported (`rawType: control-character-in-value`) by `imis_udf_design action=list_values`; `preview_set_values` and `set_values` refuse to change that record unless the request names that field in `udfValuesObject` to overwrite it.

### Add Content to a Page (iParts)

Before adding multiple iParts or using any non-default `layoutZone`, establish the page layout contract:

1. Inspect an existing comparable page with `imis_page_iparts action="inspect"` or inspect/create a layout with `imis_content_layouts`.
2. Choose a built-in `layoutPreset`/`layoutPath` or create a reusable `LAY` document with `imis_content_layouts`.
3. Carry the layout key and `layoutZones` into `imis_page_builder recipe=dashboard`, or verify the target page already has `layout.hasLayout=true`.
4. Assign every iPart an explicit `layoutZone` and `sortOrder`; do not rely on creation order as the design.
5. After writing, inspect again and require `postWriteVerification.layoutPlacementSafe=true`, `duplicateNameSafe=true`, and no web-part duplicate-key errors before saying the page is assembled.

If a page has no `LayoutDocumentVersionKey`, iMIS will stack iParts. The MCP blocks non-default zone writes in that state; bind or create a layout first rather than pushing malformed placement.

**Build a dashboard page set:**

```
imis_page_builder recipe=dashboard action="plan" dashboardName="Member_Dashboard" dashboardTitle="Member Dashboard" parentContentPath="@/Shared_Content/AgentZ" pages='[{"title":"Overview","iparts":[{"type":"query_menu","title":"Members","queryPath":"$/Common/Queries/Membership/All active members"}]}]'
imis_page_builder recipe=dashboard action="create" dashboardName="Member_Dashboard_20260508" dashboardTitle="Member Dashboard" parentContentPath="@/Shared_Content/AgentZ" installNavigation=true parentNavigationPath="~/Membership" navigationCssClass="MembershipLink" pages='[...]'
```

Use this before composing dashboards manually. It returns a handoff packet containing every content path, DocumentId, layout contract, iPart binding, navigation item, and publish/intervention state. Read `layoutContract[].warning` before creating; if it says the page needs a layout, choose an existing layout or provide `customLayout`. For staff/sidebar pages, create or copy the content record into the content root used by the intended sitemap branch; a published `@/` generated page can render as standalone body content even when a `~/` NAV record points at it.

Dashboard pages are created as Working content. Read `contentPublishSummary` and do not say a dashboard is live until every returned page has verified publish status. Generated subpage tabs are a Content Collection Organizer surface that points to subpage content versions; they are not a substitute for putting real HTML/query/chart iParts on the subpages.

### Sitemap Route Verification

Sitemap properties affect different parts of the route:

- `Navigation Folder Name` / NAV `Name` creates the URL segment under the parent `~/` path.
- `Content or URL to link to` / `PrePublishUrl` selects the target content record, shortcut, relative URL, or absolute URL.
- `URL parameters` are appended to the target and only matter to content/iParts that consume those parameters.
- `Hide on this page` hides the breadcrumb entry; it is not a Staff shell/sidebar switch.
- `Override content title`, `Breadcrumb name`, `Navigation code`, image URL, and CSS class change display/alias/icon behavior, not whether the Staff header/sidebar renders.

For staff work, verify the route by opening the `~/` navigation path in AgentZ and checking for Staff chrome (`body-main sidebar-fixed`, header/nav) plus the expected page content. Do not use the raw publish location (`.../ContentPath/Page.aspx`) as verification of staff integration.

For arbitrary layouts, do not clone the native dashboard presets. Pass a `customLayout` object or create the layout first:

```
imis_content_layouts action="create" layoutName="Client_Bento_Layout" parentPath="$/Custom/Layouts" layoutSpec='{"wrapperClass":"client-bento","rows":[{"columns":[{"zone":1,"className":"col-sm-8"},{"zone":2,"className":"col-sm-4"}]},{"columns":[{"zone":3,"className":"col-sm-4"},{"zone":4,"className":"col-sm-4"},{"zone":5,"className":"col-sm-4"}]},{"columns":[{"zone":6,"className":"col-sm-12"}]}]}'
imis_page_builder recipe=dashboard action="create" dashboardName="Client_Ops" dashboardTitle="Client Operations" parentContentPath="@/Shared_Content/AgentZ" customLayout='{"name":"Client_Bento_Layout","parentPath":"$/Custom/Layouts","reuseExisting":true,"layoutSpec":{"rows":[{"columns":[{"zone":1,"className":"col-sm-8"},{"zone":2,"className":"col-sm-4"}]}]}}' pages='[...]'
```

The public iMIS authoring contract is one outer `<div>` and unique `<p>1</p>`, `<p>2</p>` zone tokens with no gaps. The MCP writer serializes those zones to the internal `LAY` form used by native layouts (`{1}`, `{2}`) so Content Designer shows editable Add content/configuration zones instead of static numbers. Use stable layout names and reuse them; do not generate timestamped layout definitions unless isolation is explicitly required. Use `replaceExisting=true` only when deliberately changing a reusable layout. Use `col-sm-*` grids for the safest editor-compatible pattern, but raw valid body markup is allowed when the theme supports it.

**Add HTML content:**

```
imis_page_iparts action="place" kind="html" documentId="<uuid>" html="<h2>Welcome</h2><p>Page content here.</p>" title="Welcome Section" layoutZone="1" sortOrder=1
```

Use `stylesheet` and `cssClass` for scoped, page-local design work. For
generated visual HTML, the writer binds AgentZ design by default; local CSS
must stay under `.agentz-design` and use tokens rather than hard-coded colors
or fonts:

```
imis_page_iparts action="place" kind="html" documentId="<uuid>" cssClass="ifinity-section" stylesheet=".agentz-design .ifinity-section h2 { color: var(--ds-primary); margin-bottom: .5rem; }" html="<section class=\"ifinity-section\"><h2>Welcome</h2></section>"
```

**Add a Query Template Display iPart:**

```
imis_page_iparts action="place" kind="queryIpart" queryDisplay="template" documentId="<uuid>" queryPath="$/Common/Queries/Custom/MyTemplateQuery" title="Results" rowsPerPage=10 displayCards=true displayColumns=true numberOfColumns=3
```

The source IQD must have Template tab content. Generate that with `imis_iqd_query` by including `templateHtml` in the design, using placeholders such as `{#query.FullName}` that match Display tab aliases.
If iMIS shows `Invalid property` in a Query Template Display iPart, inspect the bound IQD and correct the Display aliases or the template placeholders. The iPart does not resolve raw BO property names that are not exposed on the Display tab.

**Add a Query Menu iPart for a query or whole query folder:**

```
imis_page_iparts action="place" kind="queryIpart" queryDisplay="menu" documentId="<uuid>" queryPath="$/iFINITY/BSA" title="BSA query explorer" rowsPerPage=20 enableExport=true menuCaptionText="Select a BSA query"
```

Use Query Menu for existing IQDs that do not have Template tab HTML, for query folders, exportable tables, prompted searches, or staff-facing operational lists.

**Add native IQA-backed display iParts:**

```
imis_page_iparts action="place" kind="queryIpart" queryDisplay="chart" documentId="<uuid>" queryPath="$/Samples/Dashboards/Community/Contacts by Region" chartType="barvertical" labelColumnName="Region" dataColumnName="Members" title="Contacts by region"
imis_page_iparts action="place" kind="progressTracker" documentId="<uuid>" listSourceQuery="$/Common/Queries/Custom/Registration count" title="Registrations"
imis_page_iparts action="place" kind="relatedItems" documentId="<uuid>" listSourceQuery="$/Samples/RelatedItems/Certification Products" title="Related certifications" clickUrl="ItemDetail?iProductCode={key_Id}&Category={ProductCategory}"
imis_page_iparts action="place" kind="summaryDisplay" documentId="<uuid>" queryPath="$/ContactManagement/DefaultSystem/Queries/Advanced/Contact/Account page banner" title="Account summary"
```

Use the structured `queryIpart queryDisplay=chart`, `progressTracker`, `relatedItems`, and `summaryDisplay` kinds for these native display consumers. QueryChartViewer supports native-rendered chartType values `donut`, `bar`, `barvertical`, `barhorizontal`, and `line`; use `barvertical` (or `bar`) for vertical column charts and `barhorizontal` for horizontal bars. Incoming `column` is normalized to `barvertical` because persisted `column` renders an empty series. Bind Display aliases with `labelColumnName` and `dataColumnName`, set `seriesColumnName` for native series grouping, use `enableStackedSeries` for stacked series, and set `seriesDataDateAsCategory` deliberately for date/date-bucket category behavior. Other chart type strings are unsupported until the capability guide lists them and rendered verification passes. ProgressTracker source queries must expose `Sum_Total` and `Goal_Amount`, plus `End_Date` when days remaining is shown; `dataColumnName` is only the optional URL/filter column. RelatedItems source queries must expose the case-sensitive `key_Id` identity alias. Reserve `nativeIpart`/`capturedTypedIpart` for registered iParts whose settings do not yet have a typed writer.

**Inspect an existing page to learn iPart XML format:**

```
imis_page_iparts action="inspect" documentId="<uuid>"
```

Returns parsed iPart summaries, `typeSpecificXml`, `typeSpecificElementNames`, `placeTemplate`, and raw ContentItems XML. Use `iparts[].placeTemplate` as the preferred input for `action="place" kind="nativeIpart"` only when copying a proven iPart or setting that the structured writers do not cover, such as PanelEditorCommon, navigation/content organizer, or a specialist commerce/event iPart. For standard QueryChartViewer settings, use `kind=queryIpart queryDisplay=chart` instead of captured XML.

**List/search known iPart types:**

```
imis_page_iparts action="list_types" ipartSearch="commerce"
```

**Add a captured typed iPart when no structured writer covers it:**

```
imis_page_iparts action="place" kind="nativeIpart" documentId="<uuid>" ipartType="<registered type>" title="Captured native component" typeElements="<b:...>...</b:...>"
```

`action="place" kind="nativeIpart"` generates the WCF base structure and inserts the iPart into `ContentItems` by `layoutZone`/`sortOrder`. Do not assume `SortOrder` alone controls rendering; live testing showed iMIS follows serialized iPart order, so the writer maintains that order when adding new iParts.

**Add any iPart type via raw XML:**

```
imis_page_iparts action="place" kind="raw" documentId="<uuid>" ipartXml="<a:ContentItem i:type=\"b:QueryMenu\" xmlns:b=\"...\">...</a:ContentItem>"
```

**Remove an iPart:**

```
imis_page_iparts action="remove" documentId="<uuid>" contentItemKey="<content-item-guid>"
```

### Create a Content Folder (for organizing pages)

```
imis_document action=create name="NewSection" parentPath="@/Shared_Content" isFolder=true title="New Section"
```

Auto-detects CFL type and generates ContentFolder XML. With no `parentPath` and no `documentTypeId`, a folder for pages goes in AgentZ's own content folder (`@/Shared_Content/AgentZ` on stock tenants), never in `$/`; the result's `placement.landedAt` says where it landed. A new content folder reads Working, and no page can go in it until it is published: the result's `publishBeforeUse.nextCall` is that publish (`imis_document action=update status="Published"`). Tell the person where the folder is and that it needs publishing before pages go in it. Content folders organize content pages in the `@/` tree; they do not by themselves install sidebar/menu items in the `~/` sitemap tree. For navigation, use `imis_navigation_items` or dashboard `installNavigation`, then inspect the returned `createState` and `userIntervention` fields before claiming placement.

### Create a Generic Folder (for queries, files, etc.)

```
imis_document action=create name="MyQueries" parentPath="$/Custom" isFolder=true
```

Name `documentTypeId="FOL"` (or a `$/` parentPath) for a definitions folder: with neither, a folder goes in the content tree. No Data blob needed for `$/` folders.

### Publish a Page

```
imis_document action=update documentId="<uuid>" status="Published"
```

Pages start in "Working" status. Inspect the response before saying the page is live:

- `statusVerification.verified=true` means the callable API path proved `DocumentSummary.Status` is `Published`.
- `publishState="user_intervention_required"` means iMIS did not accept REST status publish for that record; hand off the returned `userIntervention` packet. The native route is RiSE > Page Builder > Manage content, or Page Builder > Task list if approval is required.
- `publishState="committed_publish_pending"` (`publishCommitted: true`, `userInterventionRequired: false`) means iMIS took the publish and is still deploying it: the publication is stamped and the record reads PublishPending. This is not a failure. Do not publish again, roll back or hand it to a person. Tell the person iMIS is still publishing it, read its status again in a few minutes, and say it is published only once it reads Published. This holds for every native publish: `imis_document`, `imis_page_builder` launch (`launchState="publish_committed_pending"`), the website binding, App Theme packages and configuration-import pages (gap status `publish_committed_pending`). A record that stays Working with no publication stamp is still unverified and needs the hand-off.
- `publishState="publish_sent_outcome_unknown"` (`publishOutcomeUnknown: true`, `userInterventionRequired: false`, no `userIntervention` packet) means the publish was sent, its step timed out, and every read of the record afterwards failed (for example iMIS answering 503). It may already have published, and nothing shows either way. Never publish it again, rerun the launch or roll back for it, and do not hand it to a person to publish. Tell the person the outcome is unknown, read its status again later, and let that read decide. `imis_page_builder` launch reports `launchState="publish_outcome_unknown"`; configuration import reports the gap status `publish_outcome_unknown`. A step that never ran (`stepError` says the browser was not available) published nothing and keeps `companion_timed_out_unverified`.
- For multiple pages, report per-document status. Partial publish success is still not a live page set; name which DocumentIds verified and which require the native publish/approval packet.

Browser/native publish through AgentZ is an allowed operational path when the user has requested live staff-site work and AgentZ is connected, but it must still be verified afterwards with `statusVerification.verified=true` or a fresh document/status read. Do not mark a page set live based only on having clicked a button in the browser.

### Manage Themes

```
imis_site_shell action=profile
imis_site_shell lane=themeRecord action=preview_create themeName="Custom Theme" ...
imis_site_shell lane=themeRecord action=create themeName="Custom Theme" ... confirmationText="<exact text from preview>"
imis_site_shell lane=themeRecord action=preview_update themeId="<theme-id>" themeName="Updated Theme" ...
imis_site_shell lane=themeRecord action=update themeId="<theme-id>" themeName="Updated Theme" ... confirmationText="<exact text from preview>"
```

### Manage URL Redirects

```
imis_rise_shortcuts action=profile
imis_rise_shortcuts action=preview_create_redirect_rule redirectRuleJson='<native RedirectRule fields>'
imis_rise_shortcuts action=create_redirect_rule redirectRuleJson='<same fields>' confirmationText="<exact text from preview>"
```

### Manage Dropdown Values

```
imis_lookup_configuration action="list_tables"
imis_lookup_configuration action="list_values" tableName="PREFIX"
imis_lookup_configuration action="preview_create_value" tableName="PREFIX" code="REV" description="The Reverend"
imis_lookup_configuration action="create_value" tableName="PREFIX" code="REV" description="The Reverend" confirmationText="<exact text from preview>"
```

Use `action="list_tables"` to enumerate GenTable names, then `action="list_values"` for one table's Code/Description rows. Value creation is gated: `preview_create_value` → `create_value` with the verbatim confirmationText the preview returns.

The guarded GenTable value lifecycle supports create/readback, update/readback, delete, and structured not-found cleanup. The owner tool handles the live `Table_Name` DataContract wire member internally. This proves the value row only; verify every dependent dropdown, form, IQA, import, workflow, and native screen separately.

Many dropdowns in iMIS are driven by a GenTable. Common populated tables: PREFIX, SUFFIX, MEMBER_STATUS, STATE_CODES, COUNTRY. Not every picklist is a GenTable. Member types are customer types (`imis_core_system_configuration action=list entity=LegacyCustomerType`; IsMember marks the member types), and the MEMBER_TYPE GenTable is empty on live tenants. Likewise the Settings>Contacts>Activity types grid is the LegacyActivityType catalog (route to `imis_contact_activity entity="LegacyActivityType"`; the modern classification is InteractionType), member option sets on custom Business Objects are owned by business-object-design/panel tools, and GenTable ACTIVITY_TYPE is empty on live tenants — do not edit the Activity types grid through `imis_lookup_configuration`.

---

## Document System Rules

### Hierarchy and Types

The Document System has strict type-to-hierarchy rules:

| Path prefix | Allowed types                                        | Purpose                     |
| ----------- | ---------------------------------------------------- | --------------------------- |
| `@/`        | CFL (content folder), CON (content record/page)      | Website pages and structure |
| `$/`        | FOL (generic folder), IQD (query), BOD, file uploads | Queries, definitions, files |

**The API does NOT validate type-to-hierarchy.** Creating the wrong type in the wrong tree causes site corruption. The `imis_document action=create` tool validates this automatically.

### Safety Rules

- **Never create at bare root** (`@/` or `$/`). Always use a subfolder.
- **Never use `imis_entity action=delete` for documents.** API DELETE permanently removes the record. Deletion is blocked for Document entities.
- **Read a folder's delete preview before confirming.** `imis_document action=preview_delete` on a folder lists what goes to the recycle bin with it under `recycledWithFolder` (`count`, `pages`, `documents`). Its completeness note says records that were never published (Working only) may be missing from that list. They go with the folder too, so tell the person before confirming.
- **A recycled page does not hold its path.** `imis_page_builder` create and `imis_document` create judge the path through the one path resolver, so a page can be created again at the path of one in the recycle bin. Do not "archive" a recycled page to free its path: it is already free.
- **A delete is verified by the document's own read.** Claim recycle-bin movement only when the document reads `Status=Recycled` or answers 404. A page that was never published is never in the parent folder's DocumentSummary listing, so its absence there proves nothing.
- **CFL and CON documents require Data blobs.** Without the XML payload, iMIS UI crashes with 500 errors. `imis_document action=create` auto-generates these.
- **IQD (query) documents require guarded assembly.** Do not create raw IQD documents with generic `imis_document action=create`; use `imis_iqd_query` for generated IQDs. If the backend rejects a relation-heavy, grouped, templated, report, or alert form, stop the write path and use only safe existing-query/read alternatives.
- **`@/iCore/` is protected** — only SysAdmin role can edit it.
- **Deleting a folder removes everything in it.** `imis_document action=browse` lists only documents that have a published version, so a folder can hold never-published (Working) pages that browse does not show; never judge a folder empty from browse. The rollbacks that remove folders they created (`imis_website_migration action=rollback_batch`, `imis_configuration_import action=rollback`) check the folder's full contents, never-published pages included, and keep any folder that still holds something they did not create.

### Document Lifecycle

Working → Published → Archived

---

## Cross-Area Workflows

### Page Powered by a Query

1. Use `imis_site_profile scope=discovery` first if the page belongs to an existing site, microsite, member portal, or navigation scope.
2. Confirm the IQA query exists or plan one with `imis_iqa action=content_plan` when the source is custom/client-specific.
3. Execute or preview it to verify results: `imis_query queryPath="$/path/to/query"`
4. For a dashboard, use `imis_page_builder recipe=dashboard` so content, iParts, optional subpages, and optional NAV are one tracked delivery packet.
5. For a single page, create the page: `imis_document action=create name="MemberList" parentPath="@/Shared_Content/AgentZ"`
6. Add a Query Menu iPart with `imis_page_iparts action="place" kind="queryIpart" queryDisplay="menu"` for table-style results, `action="place" kind="queryIpart" queryDisplay="template"` when the IQD Template tab has proven placeholder aliases, or `action="place" kind="queryIpart" queryDisplay="chart"` for native QueryChartViewer charts with proven Display-alias bindings.
7. Request publish only when explicitly requested, then verify the result: `imis_document action=update documentId="<uuid>" status="Published"`. If the response returns `userInterventionRequired`, stop at the handoff packet.

### Page Showing Custom Data

1. Check the panel source exists: `imis_entity action=list entityType="BOEntityDefinition"`
2. Plan the query/content contract: `imis_iqa action=content_plan sources='["<PanelSource>"]' targetExperience="form|table|cards"`
3. Read sample data where appropriate: `imis_panel_records panelSource="<PanelSource>" partyId="12345"`
4. For read-only lists/cards, create an IQD and bind it with Query Menu or Query Template Display.
5. For editable panel forms, inspect a working PanelEditor iPart and add it with `imis_page_iparts action="place" kind="nativeIpart"` using the captured type-specific XML.

### Add a Tab to the Contact/Staff Record

There is no single "add tab" tool. Contact/staff-record tabs are a `DynamicContentCollectionOrganizer` over a CON content folder — add a Party-scoped panel/BO via `imis_page_iparts` (PanelEditor) in the contact-record content folder. Compose the tab from a panel + content-folder placement rather than looking for a dedicated tool.

### Content for Events

1. Find the event: `imis_entity action=get entityType="Event" id="EVENT001"`
2. Browse existing event pages: `imis_document action=browse path="@/iCore/Content/Events"`
3. Create event-specific content page if needed
4. Use event queries to display registrant lists, capacity, etc.

`imis_page_builder recipe=event` builds a standalone event microsite page, a page of its own. Staff opening an event through Events > Find events, and visitors following the standard event links, never see it. It needs the published content folder the page goes in (`parentContentPath`); ask the person for it, or offer AgentZ's own folder that the refusal names. The page's Description is iMIS's meta description (search results, link previews): pass the person's own words as the top-level `description`, or leave it empty. AgentZ writes none of its own.

### Add a Panel to Every Event

To add a panel to events, so that every event shows it, use `imis_page_iparts action=extend_event_console`. Don't place a panel on a per-event page copy. iMIS shows every event through one event console, and the action extends that console the way iMIS documents it. The @/iCore console is copied once into a folder, its tabs are re-pointed to the copies, and the shortcut is re-pointed to the copy. A console copy that already exists is extended in place.

1. Make the panel: an Event-parent business object (`imis_business_object_design`) and its panel (`imis_panel_definition`). For a multi-instance object, create the panel with `designObject.isMultipleInstance: true`, so the panel lists every row.
2. Choose the audience with the person:
   - `staff`: the staff event console that Events > Find events opens, behind the All Sites EventDashboard shortcut;
   - `public`: one website's public event page behind its own EventDetail shortcut, named with `publicWebsite`;
   - `both`.
3. Preview: `imis_page_iparts action=extend_event_console audience=<staff|public|both> panelDefinitionIds=[...] consoleFolder="@/Shared_Content/<folder>"`, adding `publicWebsite` for the public side.
   - `consoleFolder` must be a Published, non-system @/ folder.
   - For staff, `staffPlacement=showcase` (the default) puts the panel on the Showcase tab at `layoutZone`/`sortOrder`; `staffPlacement=tab` adds a console tab named `tabTitle`.
   - The preview lists every copy, tab, shortcut and placement, and the reach: events whose own Event Showcase Layout pins another page, such as Simple_Event_Dashboard or Simple_Event_Display, never open the console and never show the panel. Tell the person which events those are.
4. Public exposure: when the preview says the public copy with its panel is not judged safe to open to everyone, ask the person in chat. Only with their agreement, repeat the call with `acknowledgeExposure` set to the exact text the preview returned.
5. Write: repeat the call with the exact `confirmationText`. The write runs as a job in the AgentZ app, which must be v0.7.37 or later; the preview works with any version. The call returns a `jobId` at once and reads "Job started" (`mutationPhase` `job_started`):
   - `action=event_console_status jobId=...` reports progress: the step as "step n of N", the real time the job has run (`job.elapsedMs`), and, while it is queued, the other AgentZ job on this iMIS it waits behind (`waitingFor`) or that it is starting;
   - `action=event_console_result jobId=...` returns the outcome once the job has finished, stated in `mutationPhase` (`verified`, or `submitted` with `verification.shortcutsNotYetLive` or `verification.notYetPublished`);
   - `action=cancel_event_console jobId=...` stops it between two steps;
   - `action=resume_event_console jobId=...` continues an interrupted extend from what the tenant holds.
   - The shortcut moves only once every copy reads Published. While iMIS is still deploying a copy (Publish Pending) the job waits and its status says so. Past about 15 minutes the job stops as interrupted with `interruption.reason` `publish_pending`: the copies were published, nothing was undone and visitors still see the stock console. Tell the person that, then resume it later with `resume_event_console`. It is not a failure and needs no restore.
6. Verify: audit `/Staff/EventDashboard?EventKey=<event code>` (staff) or the website's `/EventDetail?EventKey=<event code>` (public) with `imis_rendered_page_audit`. Pass `expectedText` markers taken from the panel's rows and require every one present. `/Staff/Event.aspx` redirects to the console page, which the audit reports as landing elsewhere, so audit the EventDashboard address.

Signed-out display of an Event panel is unverified. Never tell the person that signed-out visitors see the panel on a public event page.

To take the panels away, preview and confirm `imis_page_iparts action=restore_event_console` with the same `audience`, plus `publicWebsite` for the public side, `consoleFolder` to sweep copies an interrupted extend left, and the extend's `tabTitle` when it added a console tab. A stopped or failed extend's `recovery` names the exact inputs to use. It runs as a job in the same way. It points the shortcuts back to the stock pages and recycles the copies AgentZ made that nobody has edited. Copies someone has edited are listed for the person to decide on, and on records AgentZ did not create, only AgentZ's own panels and tabs are removed. An interrupted restore is previewed and confirmed again.

The copies carry AgentZ's mark in their DocumentCode, which iMIS never publishes, and keep the stock page's own Description, so no AgentZ text reaches a page's meta description. Copies made by an older release carry the mark in their Description; restore still recognises them.

A restore moves the copies to the recycle bin. iMIS keeps a recycled record readable by its DocumentId, with Status Recycled, so a copy reading back by id is not a failed restore. "Restored" means the copies are no longer listed in `consoleFolder` and the panel is no longer on the console page, not that the copies read 404. A recycled copy does not hold its path, so `extend_event_console` into the same `consoleFolder` after a restore makes new copies at the same paths.

### Bulk Content Updates

1. Discover site scope: `imis_site_profile scope=discovery perspectiveName="<site>"` or `targetContentRoot="<root>"`.
2. Browse to find pages: `imis_document action=browse path="<discovered content root>"`
3. Get each page: `imis_document action=get documentId="<uuid>"`
4. Keep `backupBeforeWrite` enabled and use `backupLabel="<bulk-change>"` on each mutating call.
5. Update each: `imis_document action=update documentId="<uuid>" description="Updated description"`

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
Risks or verification gaps:
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
- Add a panel to every event's staff console or a website's public event page, and take it away again (`imis_page_iparts action=extend_event_console` / `restore_event_console`)
- Organize content pages by creating CFL (content folder) documents in the `@/` tree — this does NOT create `~/` sitemap navigation; use `imis_navigation_items` or dashboard `installNavigation` for menu/sidebar items
- List, create, update, and delete website themes
- Create a website (for example a test website for a theme) and remove it again: `imis_rise_site_infrastructure preview_create_website`/`create_website`, publish it with `publish_site_binding`, then `preview_remove_website`/`remove_website`. AgentZ saves the website natively in Manage Websites; its `@/<websiteName>` content folder is made with it and removed with it. Only a website AgentZ created that holds nothing else is removed. See the rise-website-design skill.
- Manage communication templates (email, letter, notification)
- Create and manage URL redirect rules
- Read content tags (create/delete via `imis_tagging_design` native companion handoff)
- Manage panel definitions (page panel layouts)
- Manage lookup table values (dropdowns)
- Execute IQA queries that power pages
- Create guarded IQD queries through `imis_iqd_query`
- Create custom content layouts (`LAY`) through `imis_content_layouts`
- Read and write panel source data displayed on pages
- Discover business object schemas

**Requires iMIS web UI**:

- Completing publish/approval when `imis_document action=update` or `imis_navigation_items publish=true` returns `userInterventionRequired`
- Layout editor-only behaviour that is not represented by a proven `LAY` document shape
- Creating unproven IQA shapes still requires a matching iMIS example and serializer extension before MCP write automation
- Credit card payment processing (PCI compliance)

See `rise-website-design` skill for iPart reference, navigation design, and theming.
See `business-object-design` skill for panel source design and custom data.
See `iqa-query-design` skill for query design and reporting.
