---
name: iqa-query-design
description: >-
  Design, build, and analyse IQA queries and reports in iMIS. This skill should
  be used when the user says "design a query", "build a query", "create a
  report", "IQA", "query builder", "business intelligence", "reporting",
  "build me a report", "create an IQA query", "query design", "dashboard
  report", "export data", "analytics", "data extract", "member report",
  "financial report", "event report", or when working with iMIS reporting
  and data analysis.
when_to_use: >-
  Use for any query or report request, including unknown client fields,
  multi-surface dashboard/content work, runtime prompts, Query Template Display,
  charts, alerts, exports, custom Business Objects, and panel sources. Start
  from live source/profile evidence, submit structured IQD forms to the MCP
  builder, and use safe existing-query/read alternatives when backend validation
  rejects a write form.
argument-hint: "[query-path-or-description] [action: design|run|analyse|browse]"
---

# IQA Query Design & Reporting

Design, execute, and analyse Intelligent Query Architect (IQA) queries in iMIS — the primary reporting and analytics engine.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles for IQA query design guidance, BO property details, filter syntax, templates, dashboards, reports, alerts, and downstream content configuration. Use the `imis-docs-dev` connector to look up Query/IQA endpoint details, filter operators, runtime parameter syntax, `QueryDocumentVersionKey`, Search Label filters, and `queryUrlParameters`.

## Understanding IQA

IQA is the query-building tool that extracts data from the iMIS database. Key principles:

- **Design once, use everywhere**: A query defined in IQA can be displayed in iParts, dashboards, exports, and accessed via API
- **Business Object-based**: Queries draw from Business Objects (BOs) — not raw SQL tables
- **Non-technical friendly**: The IQA UI enables non-SQL users to build queries
- **Composable**: Copy and combine existing queries to build new ones
- **Real-time**: Query results are live, searchable, and sortable

Queries are stored as Documents in the Document System at `$/` paths.

---

## Current MCP IQA Build Posture

Agents should design from intent and live source metadata. The MCP owns IQD graph planning and serialization. Submit a structured `imis_iqd_query` form; do not choose iMIS templates, inspect BinaryFormatter graphs, or reason from internal archetype/proof details during normal work.

| Workload | Current MCP path |
|----------|------------------|
| Run an existing REST-enabled query | `imis_query` |
| Run a path-stable query after path changes | `imis_query queryDocumentVersionKey="<DocumentVersionId>"` |
| Resolve broad iMIS reporting intent to likely query/source surfaces | `imis_iqa_surface action="search" search="<intent>" liveCheck=true` |
| Profile a live BO/panel source and resolve custom fields | `imis_iqa_source_profile source="<BusinessObjectOrPanelSource>" requestedFields='["field idea"]'` |
| Produce an IQA/content/iPart design packet from live BO or panel metadata | `imis_iqa_content_plan goal="<intent>" sources='["<BOOrPanelSource>"]' requestedFields='["field idea"]' targetExperience="table|cards|dashboard|form"` |
| Inspect supported public query-form features | `imis_iqd_query action="capabilities"` |
| Create an IQD from a supported form | Guarded `imis_iqd_query` workflow: validate -> assemble -> create -> preview |
| Add IQA Template tab HTML for Query Template Display | Include `templateHtml` in the `imis_iqd_query` design; placeholders use `{#query.DisplayColumnAlias}` |
| Unsupported source/relation/display/filter/report form features | Do not attempt a manual IQD write; return the backend validation message and use only safe existing-query/read alternatives |
| Bind existing IQDs or a query folder to a page | `imis_page_iparts action="add_query_menu"` for searchable/exportable results |
| Bind a proven template-backed query to a page | `imis_page_iparts action="add_query_template"` after query execution is verified |

Important: The MCP can assemble and create IQD documents by rewriting a known-good BinaryFormatter query graph. Do not describe IQD creation as impossible in all cases, and do not hard-code an unproven shape as unsupported. REST metadata is not proof that a name is a valid IQA source; a write is only proven after `QueryDefinition` resolution and a limited `/api/Query` preview.

Date and numeric filters use literal IQA values, not SQL expressions. Prefer full ISO DateTime literals such as `2026-07-18T00:00:00`; the MCP normalizes date-only range bounds to start/end-of-day, but agents should emit explicit DateTime values when they can. Do not use `GETDATE()`, `DATEADD()`, or SQL snippets in `value`. For same-column ranges such as `PaidThrough >= start` and `PaidThrough <= end`, pass both structured filters or `compare="between"` with a two-value array; the MCP maps them internally when the builder supports that form. If backend validation rejects the form, do not attempt a manual IQD write.

Preview rows are business proof, not just serialization proof. Do not infer membership/renewal semantics from a field name like `IsMember`, `Status`, or `MemberStatus` until preview rows prove it against the requested business rule. For renewal windows, verify the returned `PaidThrough` values are inside the requested dates before claiming active, expiring, or lapsed cohorts.

For Query Template Display, placeholders are resolved against **Display tab aliases**, not raw Business Object property names. If the template uses `{#query.Lender}`, the IQD must expose a display column with alias `Lender`; otherwise iMIS renders `Invalid property`.

---

## Agentic Orchestration Contract

For broad IQA/content requests, split the work into explicit packets:

1. **Discovery**: resolve intent with `imis_iqa_surface`, browse existing query folders, profile live BO/panel sources with `imis_iqa_source_profile`, produce a cross-surface packet with `imis_iqa_content_plan` when content/iParts are involved, and identify REST/API permission status.
2. **IQA proof**: reuse an existing query or create a new IQD only after form validation, assembly, creation, QueryDefinition resolution, and preview evidence.
3. **Content composition**: choose a peripheral content workspace, create or reuse the page, add proven iParts (`add_html`, `add_query_menu`, `add_query_template`), and record layout zones plus source keys.
4. **Verification**: inspect the final Document Data XML, use browser/editor checks when useful, run tests/package when code changed, and list exact remaining iMIS manual or unproven-shape work.

The orchestrator should pass concrete artifacts between packets: iMIS paths, DocumentId/DocumentVersionId values, selected BO property names, iPart keys, preview/error evidence, and cleanup notes. Downstream agents should not be asked to rediscover basic iMIS behavior already captured in the MCP tools and skills.

When running in Cowork and `show_widget` is available, present IQA/source/content result boards inline in chat. Use it for source comparison matrices, query design choices, preview evidence, dashboard/iPart delivery plans, and follow-up action prompts, with buttons for predictable next steps such as `Preview query`, `Inspect source`, `Create IQD`, `Bind to page`, `Run rendered audit`, or `Export`. Do not use `create_artifact` as the primary Cowork surface for those boards; files are secondary exports.

When plugin agents are available, route by the roles defined in `/agents`:
- `implementation-consultant` owns the end-to-end RiSE/IQA/content architecture and final integration plan.
- `imis-data-analyst` owns source profiling, existing-query discovery, query preview proof, and result-shape validation.
- `configuration-specialist` reviews permissions, security, data-quality, import, gateway, and system-setting risks.
- `membership-specialist`, `event-coordinator`, and `fundraising-specialist` review domain-specific semantics before a query/page is treated as business-correct.

Each handoff should be a bounded packet with exact tool evidence. Never ask an agent to "RE iMIS" broadly when the learned rule can be encoded in MCP behavior, a skill, or a command.

### Surface-Agnostic Query Delivery Checklist

Use this checklist for every query workload, regardless of business domain:

1. **Intent**: classify as analysis, query design, query write, content integration, report/dashboard/alert integration, or verification.
2. **Surface**: name every target surface: IQA source, IQD document, Query endpoint, content record, iPart, navigation, process automation, or external export.
3. **Contract**: list sources, aliases, display aliases, filters/prompts, sort/group rules, template placeholders, and expected runtime parameters.
4. **Proof**: capture live metadata, existing-query examples, IQD validation, QueryDefinition resolution, preview rows, content XML, and browser/editor evidence as applicable.
5. **Handoff**: leave exact paths, keys, iPart bindings, evidence, risks, and the next proof gap. Do not leave the next agent to infer context from prose.

---

## Business Object Concepts

Business Objects (BOs) are the data sources for IQA queries. Understanding BOs is essential for query design.

### Standard Business Objects
These are built into iMIS:
- **CsContact**: Contact/Party data (names, addresses, emails, demographics)
- **CsEvent**: Event definitions (name, dates, location, capacity)
- **CsRegistration**: Event registrations (attendee records)
- **CsOrder**: Commerce orders and transactions
- **CsSubscription**: Membership subscriptions and billing
- **CsActivity**: Contact interactions and activity history
- **CsGroup**: Groups, committees, and chapters
- **CsGroupMember**: Group membership records
- **CsGift**: Fundraising gifts and donations
- **CsInvoice**: Invoice records
- **CsPayment**: Payment records

### Custom Business Objects
Created in the Business Object Designer (RiSE > Business Object Designer):
- Naming convention: `My_` prefix (e.g., `My_CustomBOname`)
- Must be published before use in IQA
- Properties must have "Available in IQA" enabled

### Discovering Available BOs
```
imis_entity_list BOEntityDefinition limit=100
```
This lists all Business Object definitions including custom ones.

For field details of any entity:
```
imis_entity_schema entityType={entityName}
```

---

## Query Design Workflow

### Step 1: Understand the Question
Translate the user's business question into iMIS data terms:
- "How many active members do we have?" → Subscription where PaidThrough > today, count
- "Who registered for the conference?" → CsRegistration joined to CsEvent where EventCode={id}
- "What's our giving total this year?" → CsGift where GiftDate in current year, sum Amount

### Step 2: Discover Available Data Sources
```
imis_iqa_surface action="search" search="<business intent>" liveCheck=true
imis_entity_list BOEntityDefinition
imis_entity_schema entityType={relevantEntity}
imis_iqa_source_profile source="{relevantEntity}" requestedFields='["fields the report needs"]'
imis_iqa_content_plan goal="<business intent>" sources='["{relevantEntity}"]' requestedFields='["fields the report needs"]' targetExperience="table"
```

For client-specific custom fields, prefer `imis_iqa_source_profile` and `imis_iqa_content_plan` over guessing. Panel sources are IQA business objects when exposed by Panel Designer, and their available properties come from live metadata rather than this skill's examples. If the output will be a RiSE page, the content plan should carry Display aliases, template placeholders, iPart choice, and proof gaps before any IQD or content write starts.

### Step 3: Browse Existing Queries
Check if a suitable query already exists:
```
imis_document_browse path="$/Common/Queries/"
```

Common query locations:
- `$/Common/Queries/ContactManagement/` — Contact and member queries
- `$/Common/Queries/Commerce/` — Financial and order queries
- `$/Common/Queries/Events/` — Event and registration queries
- `$/Common/Queries/Membership/` — Membership-specific queries
- `$/Common/Queries/Finance/` — GL and accounting queries

### Step 4: Test an Existing Query
```
imis_query queryPath="$/Common/Queries/ContactManagement/AllContacts" limit=10
```
Preview with limit=10 to see the data structure before pulling full results.

### Step 5: Design a New Query
If no existing query meets the need, use guarded MCP creation from the structured query form:

**Guarded MCP creation is appropriate when:**
- Required sources, columns, filters, and sorts are accepted by `imis_iqd_query validate`.
- Required properties validate against live metadata or an existing IQA source example.
- The user accepts that the query is not done until iMIS resolves and previews it.

```
imis_iqd_query action="capabilities"
imis_iqd_query action="validate" design='{"name":"MyQuery","source":{"businessObject":"Contact"},"columns":[{"name":"ID"},{"name":"FullName"}],"filters":[],"templateHtml":"<strong>{#query.FullName}</strong>"}'
imis_iqd_query action="create" folderPath="$/Common/Queries/Custom" design='...'
```

If the backend rejects the form, stop the write path. Do not ask the agent to
reverse-engineer iMIS or use the browser as a substitute query writer.

### Step 6: Analyse Results
After running a query:
- Total record count
- Column headers and data types
- Summary statistics (counts, totals, averages)
- Key patterns and anomalies
- Suggestions for follow-up analysis

---

## SQL Reference for IQA

IQA uses a SQL-like syntax for advanced query configuration:

### Source Specification
When multiple BOs share a property name, qualify with the source:
```
[source].[property name]
```
Example: `vBoCsEvent.EventCode` vs `vBoCsRegistration.EventCode`

The Summary tab in the IQA designer shows exact source names for reference.

### Alias
Use the Alias column to override query column headers:
```
Property: PersonName.LastName → Alias: "Surname"
```

### Filter Expressions
In the native iMIS UI, advanced filters can use WHERE-style conditions (omit the WHERE keyword):
```
PaidThrough > GETDATE()
Status = 'A'
Amount > 1000
GiftDate BETWEEN '2025-01-01' AND '2025-12-31'
```

For `imis_iqd_query`, pass each condition as a structured filter with a literal `value`; do not put these SQL expressions into the JSON `value` field.

---

## Common Query Patterns

### Active Members
Source: CsSubscription
Filter: PaidThrough > today, Status = Active
Properties: PartyId, ItemId, PaidThrough, BeginDate

### Lapsing Members (Expiring in N Days)
Source: CsSubscription
Filter: PaidThrough BETWEEN today AND today+30
Properties: PartyId, ItemId, PaidThrough
Join: CsContact for name/email

### Event Registrations
Source: CsRegistration joined to CsEvent
Filter: EventCode = '{eventId}'
Properties: PartyId, EventCode, RegistrationDate, Status, FunctionIds

### Donor Giving Summary
Source: CsGift
Filter: GiftDate in current year
Properties: PartyId, Amount, GiftDate, CampaignCode, SourceCode
Aggregate: SUM(Amount), COUNT(*) grouped by PartyId

### Chapter Membership Counts
Source: CsGroupMember joined to CsGroup
Filter: GroupClass = 'CHAPT'
Properties: GroupId, GroupName, COUNT(PartyId)
Group by: GroupId, GroupName

### Financial Summary
Source: CsInvoice joined to CsPayment
Properties: InvoiceNumber, InvoiceDate, Amount, Balance, PaymentAmount
Filter: Date range

---

## Dashboard Integration

IQA queries power dashboard widgets throughout iMIS:

### Query Menu iPart
The most versatile display iPart for query results:
- **Display options**: Title, parameters, columns, labels
- **Export formats**: DOC, XLS, PDF, CSV, XML
- **Email merge**: Send templates to query results
- **Address mapping**: Auto-map results if address fields available
- **Filtering**: Horizontal display of up to 3 filters per row
- **Paging**: Simple, Advanced, NextPrev, Slider, NextPrevAndNumeric
- **Results per page**: Configurable (0 = show all)

### Chart iParts
All chart types are powered by IQA queries:
- **Area**: Trends over time
- **Bar**: Category comparisons
- **Donut**: Proportional breakdowns
- **Funnel**: Pipeline stages
- **Line**: Trend lines
- **Pie**: Percentage distribution

Each chart iPart connects to an IQA query and maps data fields to axes/segments.

---

## Making Queries REST-Available

For a query to be accessible via `imis_query`:

1. Open the query in the IQA designer
2. On the Summary tab, check "Available via the REST API"
3. Save and publish

**API endpoints**:
- **Modern Query endpoint** (`/api/Query`): Returns flat JSON — preferred
- **Legacy IQA endpoint** (`/api/IQA`): Returns nested GenericPropertyData — use `useLegacyEndpoint: true`
- **Stable identifier**: Use `QueryDocumentVersionKey` when you have the query's `DocumentVersionId` from `DocumentSummary`; this survives path changes.

**Pagination**: Max 500 records per API page. Use `offset` parameter for subsequent pages.

**Runtime Parameters**: IQA queries can have runtime prompts. Pass Query endpoint prompt values by name through `parameters`. For legacy IQA, ordered prompt values can be passed as repeated `Parameter` entries. For filters that depend on URL parameters, pass `queryUrlParameters`.

---

## Best Practices

1. **Reuse before creating**: Always check existing queries first
2. **Start simple**: Build basic query, verify data, then add complexity
3. **Use aliases**: Make column headers user-friendly
4. **Index awareness**: Queries on indexed fields perform better
5. **Limit results**: Always use limits when testing (limit=10)
6. **REST-enable selectively**: Only enable REST access for queries that need API access
7. **Document queries**: Use meaningful names and paths
8. **For large datasets**: Use IQA instead of entity list — better for joins and aggregation
