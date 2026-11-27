---
name: business-object-design
description: >-
  Design, create, and manage custom Business Objects and Panel Sources in iMIS.
  This skill should be used when the user says "business object", "panel
  source", "custom field", "custom data", "BO designer", "panel designer",
  "create a panel", "custom table", "extend the data model", "add a field",
  "panel source properties", "expression builder", "calculated field",
  "custom demographics", "multi-instance data", or when working with iMIS
  data model extensions.
argument-hint: "[action: design|create|list|inspect|data]"
---

# Business Object & Panel Source Design

Design, create, and manage custom Business Objects (BOs) and Panel Sources in iMIS — the mechanism for extending the iMIS data model with custom fields and tables.

**Build over MCP, not the UI.** BO/Panel **schema** creation is a proven MCP capability (see _Creating via MCP_ below) — prefer it over manual iMIS UI steps. The iMIS UI remains the path for visual/rendered panel design and anything not yet exposed over MCP.

**Documentation resource**: Use the `imis-docs` connector for official iMIS help articles (property types, expression builder syntax, panel designer workflows) and the `imis-docs-dev` connector for BO data contracts, panel source API endpoints, and field definitions.

## Key Concepts

- **Business Object (BO)**: A data model definition (schema) used by IQA, API, and iParts. Standard BOs ship with iMIS; custom BOs use `My_` prefix
- **Panel Source**: A custom data table tied to a parent type (Contact, Event, Invoice, or Standalone). Creating a Panel Source auto-generates a BO
- **Panel**: A UI layout (form/grid) that displays and edits Panel Source data
- **Rule of thumb**: Panel Source = data storage, Panel = form/layout, Business Object = schema definition
- **BO/Panel Source vs `imis_udf_design`**: use a Business Object / Panel Source for reportable custom tables or multi-field demographics; use `imis_udf_design` for a single RiSE UDF string on a CON (content record) — not for structured multi-field custom data

### Single-Instance vs Multi-Instance

- **Single-instance**: One record per parent (e.g., custom demographics for a contact). The record is created automatically
- **Multi-instance**: Multiple records per parent (e.g., certifications, employment history, education). Each record has an Ordinal
- **Multi-instance identity is the parent's key plus Ordinal**, added automatically: Party on `ID`, Event on `EventKey`, Invoice on `InvoiceId`; Standalone on `Ordinal` alone. A row's record id is `~<owner id>|<Ordinal>` (bare Ordinal for Standalone). Do not declare a custom field named after the parent key — the design is refused
- **Cannot change** after creation — choose carefully during design

---

## Creating via MCP (preferred over the UI)

Choose the Business Object authoring lane **before** designing the fields. AgentZ exposes two underlying iMIS writers plus one governed composition action through `imis_business_object_design`:

- **Generated Panel Source** (`sourceMode` omitted or `generatedTable`) — `preview_create` / `create` writes a `BOEntityDefinition`. It provisions a new Single/Multi source and its physical SQL table in one call, so there is no separate deploy/publish step. This lane creates persisted fields; it does **not** author Expression Builder custom properties. Do not send `customExpression` or `expressionJson` through this lane, and do not treat an accepted `BOEntityDefinition` POST/PUT as expression proof because iMIS can silently drop unsupported property mutations.
- **Native Business Object Designer** (`sourceMode: "nativeDesigner"`) — `preview_native_bod` assembles the BOD XML as iMIS writes it (Expression Builder `CustomPropertyExpression` JSON, a BranchReference row per join, and the optional `defaultProperty` / `titleProperty` / `descriptionProperty`). `create_native_bod` makes a new object the way the native designer does, through the AgentZ app: the designer's Create Object and Save put a Working BOD at `$/Design Business Object Definition/<name>` (and its design schema record), the XML is written into it by id and read back, then it is published through native BOA and `BOEntityDefinition`, `metadata`, expected fields and bounded query readback are verified. It needs the AgentZ app connected to the same iMIS; if a step after the designer's Save fails, both records are removed by id. A REST Document POST never creates a BOD (iMIS cannot place it there, and the client refuses one). Its root table/view must already be selectable in Business Object Designer; this lane does not create the underlying database source.

If the requirement combines a brand-new custom table and calculated fields, prefer `preview_generated_table_with_overlay` followed by `create_generated_table_with_overlay`. Pass the generated Single/Multi Party design as `designObject` and a **separately named, read-only Standard native BOD** as `overlayDesignObject`. The preview proves both runtime names and the overlay document path are absent, validates that every persisted/expression reference belongs to the generated table, and returns an exact confirmation bound to the tenant and normalized design. Execution creates and field-verifies the generated table first, then publishes the Standard overlay through native BOA and requires overlay definition, metadata, fields, and query readback. If the second stage fails, it reports the retained physical table and saved overlay state; it never silently drops the table.

This is one governed AgentZ operation over two iMIS definitions. The Standard BO is the expression-capable IQA/reporting source; the generated Single/Multi source remains the writable Panel Designer source.

Do not claim those two definitions are one Panel Source or try to reuse the generated source name. BOA can display an expression injected into a generated Single/Multi BOD but refuses deployment, and a clean Standard BOD cannot replace the existing Single/Multi runtime object under the same name. Use distinct names, or explain that an exact same-name writable Panel Source plus Expression Builder field is not an iMIS-supported shape. This is an object-type/ownership boundary, not a limitation in AgentZ's Expression Builder authoring.

Three tools form the custom-data triad:

- **Source** = `imis_business_object_design` — writes either the generated Panel Source or the native BOD definition, using the matching action family above.
- **Layout** = `imis_panel_definition` — writes the `PanelDefinition` (Groups → Columns → Fields over a BO). Supports server-side `_validate`; create returns a server-assigned `PanelDefinitionId`.
- **Data** = `imis_panel_records` — row CRUD (GenericEntityData envelope).

### Source lifecycle (guarded: preview → create → prove)

```
imis_business_object_design action=surface
imis_business_object_design action=list_business_objects
imis_business_object_design action=preview_create designObject=<BoDesign>          # safe dry run, returns confirmationText
imis_business_object_design action=create         designObject=<BoDesign> confirmationText="<exact text from preview>"
imis_business_object_design action=prove          designObject=<BoDesign> testPartyId="<real party id>" confirmationText="PROVE BUSINESS OBJECT My_Source"   # round-trips create→readback→table-queryable→row CRUD

# Preferred new-table + calculated-properties composition
imis_business_object_design action=preview_generated_table_with_overlay designObject=<generated Party Single/Multi design> overlayDesignObject=<distinct read-only Standard BOD rooted on generated name>
imis_business_object_design action=create_generated_table_with_overlay  designObject=<same generated design> overlayDesignObject=<same overlay design> confirmationText="<exact tenant/plan-bound text from preview>"
```

- `action=prove` covers every parent and cardinality: Party single/multi (`testPartyId`), Standalone single/multi (optional `testRowId` for single), and Event/Invoice single/multi (`testParentId` = a real EventId or invoice id; iMIS does not validate parent association, so prove reads the parent first). A parent/cardinality shape without a proven row lifecycle is a validation error at `preview_create`.
- **Event and Invoice multi sources** carry `EventKey` or `InvoiceId` plus `Ordinal`, and their rows go through `imis_panel_records` with the event code or invoice id as `partyId`. An existing Event/Invoice multi source keyed on `Ordinal` alone accepts no rows in iMIS: `update` and every row write refuse it and name the recovery — delete it (`preview_delete` → `delete`) and create it again.
- **Cardinality and parent type are immutable** after creation; `update` is additive (never drop columns holding data).
- **Every designed attribute is sent and read back**: the object's `description` and each field's `caption`, `description`, default and visibility. A dropped attribute fails the write (`fieldVerification.missingAttributes`). iMIS drops a description sent on create, so create sends it again with a PUT. Two things iMIS stores differently are stated at preview (`storageCaveats`) and reported as `mutationPhase: verified_with_caveat` with `caveats` (the result reads "Change verified, with a note"): a caption that only spells the property name may be stored capitalised (`Room setup` → `Room Setup`; write the caption in other words to keep it exactly), and a `required` field stays a nullable column (forms and panels still enforce it).
- **Delete names what still uses the object.** `preview_delete` lists the panels that edit it and the Form Builder forms that store answers in it (`usedBy`). iMIS refuses to delete an object a panel uses, so the preview refuses too and names the `imis_panel_definition` delete to run first. A form does not stop iMIS (the form is left pointing at a missing source), so tell the person before deleting: the confirmation then says `STILL USED BY 1 FORM …` and is bound to that usage, and the plain `DELETE BUSINESS OBJECT <name>` is refused.
- **A Standard (Business Object designer) object is removed through the designer, in two steps the person approves, with the AgentZ app connected.**
  - `preview_delete` (`mode: native_designer_object`) reports `usedBy`: each panel, form, query and special price rule by kind and exact id (a price rule's id is `<item>|<customer type>|<category>`). `refusals[].code` is `in_use` for each user and another code when the check could not be made; never read that as "not used". It also lists the records (design, schema, design schema) and the boundaries. Only when nothing uses the object does `removal` carry `available: true` and the exact `confirmationText`. A refusal's `text`, `removal.steps`, a result's `next` and a retire job's `message` are written for the person (on-screen names, no actions): show them as they are, and take the calls from `nextActions` or `nextCall`.
  - An object whose only design record is still Working was saved in the designer and never published (a failed publish leaves it so). `preview_delete` refuses it with code `never_published`, says whether AgentZ made it, and still reports `usedBy`. To remove one AgentZ made, publish a corrected design first (`preview_update`, then `create_native_bod` with `replaceExisting: true` writes into that record and publishes it), then retire it.
  - `delete` with that text moves the object to the **Recycle Bin** (status `business_object_recycled`). The object stops working at once.
  - Until it is purged, `preview_restore`, then `restore` with its own text, brings it back: the designer reverts its last design and publishes it (status `business_object_restored`, verified on its records and its rows). Use this when the person changes their mind; never rebuild the object instead.
  - `preview_purge`, then `purge` with its own text, removes it for good. This cannot be undone.
  - `delete`, `restore` and `purge` each run as a job in the AgentZ app: the call returns a `jobId` (status `business_object_retire_job_started`), and nothing is done until the job says so. Call `retire_result` with that `jobId` straight away: it waits for the job (up to 25 seconds) and answers as soon as it ends; if the job is still running when the wait ends, ask again at once, until it returns the step's status above; a step refused inside the job returns `business_object_retire_step_refused`, and an error `business_object_retire_step_failed`, each saying why. After either, run `preview_delete` before anything else, and never start the same step twice while one is running.
  - An AgentZ app too old to run the job refuses the step, changing nothing: ask the person to update AgentZ. The previews work with any version.
- **Tell the person the boundaries in these words.**
  - After the purge, iMIS still describes the object by name, but its data can no longer be read (status `business_object_retired_registration_remains`).
  - The name can be used again straight away. A new design takes over at once, and iMIS's description catches up within about half an hour.
  - iMIS's hosting clears the leftover description by itself; in our tests it was gone within 18 days. AgentZ cannot clear it and does not try.
- **Never use these instead.**
  - Never delete its records by id: that leaves it registered with a broken row source.
  - Never untick **Active**: the publish reports "There are no Active branches." and the object keeps working.
  - AgentZ never sends a definition DELETE or "restore object metadata" for it; the latter shut off a working object's data.

### Native BOD expression lifecycle (guarded: preview -> create/publish -> verify)

```text
imis_business_object_design action=preview_native_bod designObject={
  "name": "My_GiftSummary",
  "sourceMode": "nativeDesigner",
  "nativeSource": {
    "rootTable": "vGiftSummary",
    "whereText": "vGiftSummary.Gift > 0",
    "isReadOnly": true
  },
  "fields": [
    {
      "name": "GiftAmount",
      "type": "decimal",
      "sourceTable": "vGiftSummary",
      "sourceColumn": "Gift"
    },
    {
      "name": "GiftDate",
      "type": "date",
      "customExpression": {
        "kind": "function",
        "function": "dateOnly",
        "dbType": 31,
        "parameters": [
          {
            "kind": "property",
            "table": "vGiftSummary",
            "column": "TransactionDate",
            "dbType": 4
          }
        ]
      }
    }
  ]
}

imis_business_object_design action=create_native_bod designObject=<same object> confirmationText="<exact text from preview>"
imis_business_object_design action=verify_native_bod name="My_GiftSummary"
```

To update an existing native BOD, run `action=preview_update name="My_GiftSummary" designObject=<full replacement design>` and then execute `action=create_native_bod replaceExisting=true designObject=<same object>` with the exact confirmation the preview returned (`UPDATE NATIVE BOD My_GiftSummary #<digest>`). The token binds the design, its authoring template and the record it replaces (`updateTarget`: id, version, status and stored bytes), so a changed design, template or record since the preview needs a new preview; the fixed phrase and the create token are refused. A published object is updated the way a person edits one in the Business Object Designer: the designer's Save makes a Working copy, AgentZ writes the design into it by id, and the publish promotes it (the old record is Archived). It needs the AgentZ app connected. If someone has saved an unpublished designer edit beside the published record, the update is refused until it is published or discarded.

For a calculated field, see "How to write a calculated field" below: `customExpression` is a structured object, never SQL text. Creation is complete only when native BOA publish succeeds and the returned field/query verification passes. A BOA HTTP 500 is an operation failure to diagnose (source selectability, document shape, action family, or tenant permissions), not evidence that AgentZ lacks Expression Builder authoring. `native_bod_publish_failed_shell_removed` means the publish did not report success and the records the designer made were deleted (the result's `cleanup` names them); fix the cause and run the create again. If AgentZ answers `waiting_on_person`, the iMIS browser is busy: stop and say so rather than retrying.

For generated-table overlays, prove the complete chain: write a row through the original generated source, query it through the distinct Standard BOD and a runtime-proven IQD, and verify the calculated value. That is an execution-context mismatch, not an Expression Builder authoring limitation.

### Layout lifecycle

```
imis_panel_definition action=list_panels
imis_panel_definition action=preview_create designObject=<PanelLayoutDesign over the BO>   # returns confirmationText
imis_panel_definition action=create         designObject=<PanelLayoutDesign> confirmationText="<exact text from preview>"
```

Each field takes the Business Object's own caption and required flag unless the design gives its own, so there is no need to repeat captions. The confirmation text carries a digest of the exact planned definition: run a new preview after changing the design, and confirm with the text that preview returns.

The panel takes its instance type and parent from the Business Object it binds. Leave `isMultipleInstance` and `parent` out of the design for a Single or Multi object: a Multi object's panel is multi-instance (it lists every row) and relates to the object's parent (Party, Event, Invoice or Standalone). The preview shows both in `plannedDefinition` (`IsMultipleInstance`, `RelatedEntityName`). A design that states the other instance type or another parent is refused at preview with the reason. For a Standard source (an iMIS-supplied table) state `isMultipleInstance=true` when its rows are multi-instance; otherwise the panel is single-instance, and the preview warns.

### Place the panel on a RiSE page

```
imis_page_iparts action=place kind=panel panelDefinitionId="<from imis_panel_definition>"
```

This places a `PanelEditorCommon` iPart bound to the `PanelDefinitionId`. Full custom-data loop: **BO (source) → PanelDefinition (layout) → place kind=panel → publish**. Only rendered-UI proof after publish remains a companion render-audit step (`imis_rendered_page_audit`).

AgentZ does every step of this loop itself. Do not send the person to RiSE > Panel Designer for a source or a layout.

---

## Discovering Existing BOs and Panel Sources

### List All Business Objects

```
imis_business_object_design action=list_business_objects     # preferred
imis_entity action=list entityType=BOEntityDefinition limit=100   # raw alternative
```

Returns all BO definitions including custom ones. Look for `My_` prefix for custom BOs.

### Get BO Field Details

```
imis_entity_discover action=schema entityType={entityName}
imis_iqa action=source_profile source="{entityName}" requestedFieldsArray=["business field ideas"]
imis_iqa action=content_plan goal="<page or report goal>" sourcesArray=["{entityName}"] targetExperience="dashboard"  # one of: table, cards, detail, dashboard, chart, form, navigation, export, automation
```

Returns all properties (fields) with data types, required flags, descriptions, likely custom fields, IQA display/filter candidates, and content/iPart implications.

### List Panel Definitions

```
imis_panel_definition action=list_panels                     # preferred
imis_entity action=list entityType=PanelDefinition limit=100     # raw alternative
```

Shows all panel definitions — both system and custom.

### Inspect Panel Source Data

```
imis_panel_records panelSource={name} action="list_records" partyId={partyId}
```

View existing data for a specific contact's panel source records.

---

## Creating a Panel Source (Custom Data Table)

### Design Checklist

Before creating, determine:

1. **Purpose**: What data are you storing? (e.g., certifications, custom preferences, tracking data)
2. **Parent type**: Contact (most common), Event, Invoice, or Standalone
3. **Cardinality**: Single-instance (one per parent) or multi-instance (many per parent)
4. **Fields**: Name, data type, required, default values, IQA availability
5. **Naming**: Use organisation prefix to avoid conflicts (e.g., `ABC_Certifications`)

### Creation Steps

AgentZ creates the source, its table and its fields with `imis_business_object_design`; there is no native Panel Designer step.

1. Build the `BoDesign` from the checklist: a **Name** that starts with a letter (letters, numbers and underscores only), the **parent** (Party, Event, Invoice or Standalone), **cardinality** (single or multi) and the fields (see Property Types below).
2. `imis_business_object_design action=preview_create designObject=<BoDesign>` and show the person the plan; it returns the confirmationText.
3. `imis_business_object_design action=create designObject=<BoDesign> confirmationText="<exact text from preview>"`. iMIS creates the source and its SQL table at once; there is no separate publish.
4. Rely on the create's readback, then `imis_business_object_design action=list_business_objects` lists the new object.

### Auto-Generated Fields

Every Panel Source automatically includes:

- **ID**: The owner's identifier (a multi-instance Event or Invoice source uses `EventKey` or `InvoiceId` instead; Standalone multi has none)
- **Ordinal**: Sequence number (multi-instance only)
- **CreatedOn**: Creation timestamp
- **UpdatedOn**: Last modified timestamp
- **CreatedBy / UpdatedBy**: User who created/modified the record

---

## Panel Source Property Types

| Type     | Description    | Use For                       |
| -------- | -------------- | ----------------------------- |
| String   | Text field     | Names, descriptions, codes    |
| Integer  | Whole number   | Counts, years, quantities     |
| Numeric  | Decimal number | Amounts, percentages, scores  |
| DateTime | Date and time  | Dates, deadlines, timestamps  |
| Boolean  | True/false     | Flags, toggles, yes/no fields |

### Property Settings

- **Required**: Enforces NOT NULL — use for essential fields only
- **Length/Scale**: For String (max chars) and Numeric (precision/scale)
- **Default Value**: Pre-populated value for new records
- **Foreign Key**: Reference to another BO (creates relationship)
- **Read-only**: System-managed fields users cannot edit
- **Available in IQA**: Must be enabled for the field to appear in IQA queries
- **Values**: Freeform (any input), Query Object (dropdown from BO), or Value List (fixed options)

### Value Lists

For fields with fixed options (e.g., Status = Active/Inactive/Pending):

- Create via **Settings > General Lookup/Validation Tables** — use `imis_lookup_configuration` for General Lookup Table (GenTable) value CRUD. This skill designs the BO property that _references_ the list; the list values themselves are owned by `imis_lookup_configuration`.
- Reference in property definition as Value List type
- Users see a dropdown in the Panel UI

### Multi-select fields (several choices per record)

For a field like "Areas of interest" where a person picks several values, use one string field with a drop-down and `multiSelect: true` (Panel Designer **Allow multi-selections**). Do not split it into one yes/no field per value.

```
imis_business_object_design action="preview_create" designObject={
  name: "ABC_Volunteer", parent: "Party", cardinality: "single",
  fields: [{ name: "AreasOfInterest", type: "string", maxLength: 100, multiSelect: true,
             valueList: [{ value: "EVENTS", label: "Events" }, { value: "MENTOR", label: "Mentoring" }] }]
}
```

- iMIS stores the picks as one comma-separated value (`EVENTS,MENTOR`). Codes cannot contain commas, and `maxLength` must hold every code joined by commas; the preview refuses either.
- Create and update read `AllowMultiSelect` back; a field where iMIS dropped it fails as `missingFieldFlags: <field>:multiSelect`.
- Write rows with `imis_panel_records` passing a list: `recordObject: { AreasOfInterest: ["EVENTS", "MENTOR"] }`. Each code is checked against the list and stored comma-joined.
- In IQA, filter with "contains"; keep codes distinct so one is never part of another (EVENTS vs SPECIALEVENTS).

---

## Working with Panel Source Data via API

### List Records

```
imis_panel_records panelSource={name} action="list_records" partyId={partyId}
```

Returns all records for a contact. For multi-instance, returns array of records. For an Event- or Invoice-parented source, pass the event code or invoice id as `partyId`; the scope field (`EventKey` or `InvoiceId`) is chosen from live metadata unless `partyField` names it.

### Get Single Record

```
imis_panel_records panelSource={name} action="get_record" recordId={recordId}
```

### Create Record (gated)

```
imis_panel_records panelSource={name} action="preview_create_record" partyId={partyId} recordObject={"FieldName":"value","AnotherField":123}
imis_panel_records panelSource={name} action="create_record" partyId={partyId} recordObject={"FieldName":"value","AnotherField":123} confirmationText="<exact text from preview>"
```

For single-instance sources, this creates (or updates if it already exists) the one record.
For multi-instance, this adds a new record.

### Update Record (gated)

```
imis_panel_records panelSource={name} action="preview_update_record" recordId={recordId} recordObject={"FieldName":"new value"}
imis_panel_records panelSource={name} action="update_record" recordId={recordId} recordObject={"FieldName":"new value"} confirmationText="<exact text from preview>"
```

### Data Patterns

- **Single-instance** (e.g., custom demographics): One record per contact — create once, update thereafter
- **Multi-instance** (e.g., certifications): Multiple records — create new entries, update/delete individual records
- **Standalone** (e.g., lookup tables): Not tied to a specific contact — independent data storage

---

## Expression Builder (Calculated Fields)

Calculated fields derive values from other properties. AgentZ authors them programmatically through the **native BOD expression lifecycle above**; they are not generated Panel Source fields and do not belong in `preview_create` / `create` payloads.

The structured `customExpression` mapper currently covers property, constant, today, function, calculation, condition, and if/then/else nodes. Named function/operator support is intentionally conservative; `expressionJson` is available for a captured, proven native expression shape. The function lists below describe iMIS Expression Builder concepts, not a promise that every function name can be supplied directly to the structured mapper. Always use `preview_native_bod`, then require publish plus metadata/field/query readback.

### How to write a calculated field

`customExpression` is a structured object, **never SQL text**. iMIS's Expression Builder does not take SQL: a `"CASE WHEN … END"` string is refused at preview (`invalid_design`), naming the field, the shape expected and the example below. (Before this was refused, such a field was saved with no expression, and iMIS's publish failed with "An object or column name is missing or empty".)

Each node is one of:

- `{ kind: "property", table, column, dbType?, nullable? }`: a column of a table the object uses.
- `{ kind: "constant", value, dbType?, selectedType?, cast? }`: a fixed value, written as text (`"1"`, `"0.00"`).
- `{ kind: "today" }`: today's date.
- `{ kind: "condition", operator, left, right? }`: `equal`, `contains`, `lessThanOrEqual`, `greaterThanOrEqual`, `and`, `or`; `empty` and `notEmpty` take no `right`.
- `{ kind: "calculation", operator: "add", left, right }`.
- `{ kind: "function", function: "dateOnly" | "timeOnly" | "month", parameters: [...] }`.
- `{ kind: "ifThenElse", whenThen: [{ when, then }], else }`.

`dbType` is iMIS's SqlDbType number: 2 Bit, 4 DateTime, 5 Decimal, 8 Int, 12 NVarChar. Give the whole expression the field's own type, and compare a bit column the way the designer does (a constant with `selectedType: 3`, `cast: true`, `dbType: 2`).

Example, from a request in staff words, "a joining-fee column worth 1 for members and 0 otherwise":

```json
{
  "name": "JoiningFee",
  "caption": "Joining fee",
  "type": "integer",
  "customExpression": {
    "kind": "ifThenElse",
    "whenThen": [{
      "when": { "kind": "condition", "operator": "equal",
        "left": { "kind": "property", "table": "Name", "column": "MEMBER_RECORD", "dbType": 2, "nullable": false },
        "right": { "kind": "constant", "value": "1", "selectedType": 3, "cast": true, "dbType": 2 } },
      "then": { "kind": "constant", "value": "1", "dbType": 8 }
    }],
    "else": { "kind": "constant", "value": "0", "dbType": 8 },
    "dbType": 8,
    "nullable": false
  }
}
```

The field keeps its `name` (`JoiningFee`) as its property name; `caption` is only its label. An object AgentZ published before 16 November 2026 may have a property named by its caption ("Joining fee"): an update keeps that name, so queries and panels using it keep working, and the preview says so. The preview's `inPlainWords` says, in plain words, what the object and each field will show ("JoiningFee (labelled "Joining fee") is calculated: if Name.MEMBER_RECORD equals 1, then 1; otherwise 0."): show it to the person before they approve.

**After the publish.** When iMIS's publish window lists an error, the result's status is `native_bod_publish_failed` (or `native_bod_publish_failed_shell_removed` when AgentZ removed the records it made), `error` quotes iMIS's own words and `publishErrors` lists them, even when the window also counts "Succeeded: 1". Tell the person what iMIS said; do not ask them to verify. `verify_native_bod` always reads up to 3 rows: an object whose rows cannot be read is `native_bod_not_ready` with the read's error, never verified. The rows show a republished design at once; iMIS's own description of the object can take half an hour or more to catch up.

### Expression Types

- **Calculation**: Mathematical expressions (`Price * Quantity`)
- **Constant**: Fixed value (e.g., `"Active"`, `100`)
- **If Then Else**: Conditional logic (in words: if Paid Through is after today, "Active", otherwise "Lapsed"; written as an `ifThenElse` node, never as text)
- **Property**: Reference another property's value
- **Today**: Current date/time

### String Functions

| Function  | Example                      | Result    |
| --------- | ---------------------------- | --------- |
| Trim      | `Trim(" hello ")`            | `"hello"` |
| Lower     | `Lower("HELLO")`             | `"hello"` |
| Upper     | `Upper("hello")`             | `"HELLO"` |
| Length    | `Length("hello")`            | `5`       |
| Left      | `Left("hello", 3)`           | `"hel"`   |
| Right     | `Right("hello", 3)`          | `"llo"`   |
| Replace   | `Replace("hello", "l", "r")` | `"herro"` |
| Substring | `Substring("hello", 1, 3)`   | `"ell"`   |

### Numeric Functions

| Function | Description                   |
| -------- | ----------------------------- |
| Round    | Round to N decimal places     |
| Floor    | Round down to nearest integer |
| Ceiling  | Round up to nearest integer   |
| Absolute | Absolute value                |

### Date Functions

| Function           | Description                                 |
| ------------------ | ------------------------------------------- |
| DateOnly           | Extract date part (no time)                 |
| TimeOnly           | Extract time part                           |
| Day / Month / Year | Extract component                           |
| EndOfMonth         | Last day of the month                       |
| DatePart           | Extract specific part (quarter, week, etc.) |

---

## Designing Panels (UI Forms)

Panels define how users interact with Panel Source data in the iMIS UI.

### Panel Types

- **Form Panel**: Standard data entry form — fields with labels, validation
- **Grid Panel**: Tabular display for multi-instance data — rows and columns
- **Mixed**: Form at top + grid below (common for single-instance header + multi-instance detail)

### Panel Design Workflow

AgentZ builds the panel with `imis_panel_definition` (see Layout lifecycle above); there is no native Panel Designer step.

1. **Choose the Panel Source**: the Business Object the panel edits (`imis_business_object_design action=list_business_objects`).
2. **Lay out the fields**: a `PanelLayoutDesign` (name, caption, businessObject and a flat `fields` list) over that source. Each field takes the object's caption and required flag unless the design states its own. The writer builds one group with one column: a panel with several groups or columns is something AgentZ cannot do yet.
3. **Preview**: `imis_panel_definition action=preview_create designObject=<PanelLayoutDesign>` shows the planned definition and returns the confirmationText.
4. **Create**: `imis_panel_definition action=create designObject=<PanelLayoutDesign> confirmationText="<exact text from preview>"` returns the `PanelDefinitionId`, read back.
5. **Add to page**: `imis_page_iparts action=place kind=panel panelDefinitionId="<from create>"` places the PanelEditor iPart on a RiSE page (see below).

### Panel on a RiSE Page

To display a panel on a website page:

1. Use `imis_iqa action=content_plan` to decide whether the page needs a read-only query display, card template, editable PanelEditor, or mixed layout.
2. Create or edit a content record in a peripheral workspace (see `rise-website-design` skill).
3. For read-only lists/cards, bind the generated or existing IQD with Query Menu or Query Template Display.
4. For editable panel data, place a **PanelEditor** iPart with `imis_page_iparts action="place" kind="panel"` bound to the PanelDefinitionId from `imis_panel_definition`.
5. Publish only when requested and browser/editor verification is available.

### Adding a Tab to the Contact / Staff Record

Contact/staff-record tabs are a `DynamicContentCollectionOrganizer` over a CON content folder — add a Party-scoped panel/BO via `imis_page_iparts` (PanelEditor) in the contact-record folder. There is no single "add tab" tool; compose from panel + content-folder placement.

---

## Best Practices

1. **Always use organisation prefix**: `My_OrgName_` avoids name collisions with system BOs and other customisations
2. **Design for IQA**: Enable "Available in IQA" on properties that need reporting
3. **Choose cardinality carefully**: Single vs multi-instance cannot be changed after creation
4. **Keep panel sources focused**: One concept per source (don't combine certifications and preferences in one table)
5. **Use meaningful names**: `ABC_Certifications` not `ABC_Data1`
6. **Test via API first**: Use `imis_panel_records` to verify data before building UI panels
7. **Document field purposes**: Use the Description field in property definitions
8. **Consider performance**: Indexed fields (foreign keys, frequently filtered fields) perform better in IQA queries
9. **Plan relationships**: If multiple panel sources relate to each other, use foreign key properties to link them
10. **Version control**: Document your panel source designs externally — iMIS doesn't version custom BO definitions
