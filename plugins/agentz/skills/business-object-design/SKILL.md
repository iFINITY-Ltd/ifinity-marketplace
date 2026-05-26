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

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles for Panel Source creation steps, property type details, expression builder syntax, and panel designer workflows. BO/Panel creation is done in the iMIS UI — the docs provide the exact steps. Use the `imis-docs-dev` connector to look up BO data contracts, panel source API endpoints, and field definitions.

## Key Concepts

- **Business Object (BO)**: A data model definition (schema) used by IQA, API, and iParts. Standard BOs ship with iMIS; custom BOs use `My_` prefix
- **Panel Source**: A custom data table tied to a parent type (Contact, Event, Invoice, or Standalone). Creating a Panel Source auto-generates a BO
- **Panel**: A UI layout (form/grid) that displays and edits Panel Source data
- **Rule of thumb**: Panel Source = data storage, Panel = form/layout, Business Object = schema definition

### Single-Instance vs Multi-Instance

- **Single-instance**: One record per parent (e.g., custom demographics for a contact). The record is created automatically
- **Multi-instance**: Multiple records per parent (e.g., certifications, employment history, education). Each record has an Ordinal
- **Cannot change** after creation — choose carefully during design

---

## Discovering Existing BOs and Panel Sources

### List All Business Objects
```
imis_entity_list BOEntityDefinition limit=100
```
Returns all BO definitions including custom ones. Look for `My_` prefix for custom BOs.

### Get BO Field Details
```
imis_entity_schema entityType={entityName}
imis_iqa_source_profile source="{entityName}" requestedFields='["business field ideas"]'
imis_iqa_content_plan goal="<page or report goal>" sources='["{entityName}"]' targetExperience="table|cards|form|dashboard"
```
Returns all properties (fields) with data types, required flags, descriptions, likely custom fields, IQA display/filter candidates, and content/iPart implications.

### List Panel Definitions
```
imis_entity_list PanelDefinition limit=100
```
Shows all panel definitions — both system and custom.

### Inspect Panel Source Data
```
imis_panel_data panelSource={name} action="list" partyId={partyId}
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

### Creation Steps (via iMIS UI)
1. Navigate to **RiSE > Panel Designer > Panel Sources > Add new**
2. Set the **Name**: starts with a letter, only letters/numbers/underscores
3. Select **Parent type**: Contact, Event, Invoice, or Standalone
4. Choose **Single-instance** or **Multi-instance**
5. Add properties (fields) — see Property Types below
6. Save and **Publish**
7. Verify via API:
```
imis_entity_list BOEntityDefinition limit=100
```
Look for your new BO in the list.

### Auto-Generated Fields
Every Panel Source automatically includes:
- **ID**: Unique identifier (GUID)
- **Ordinal**: Sequence number (multi-instance only)
- **CreatedOn**: Creation timestamp
- **UpdatedOn**: Last modified timestamp
- **CreatedBy / UpdatedBy**: User who created/modified the record

---

## Panel Source Property Types

| Type | Description | Use For |
|------|-------------|---------|
| String | Text field | Names, descriptions, codes |
| Integer | Whole number | Counts, years, quantities |
| Numeric | Decimal number | Amounts, percentages, scores |
| DateTime | Date and time | Dates, deadlines, timestamps |
| Boolean | True/false | Flags, toggles, yes/no fields |

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
- Create via **Settings > General Lookup/Validation Tables**
- Reference in property definition as Value List type
- Users see a dropdown in the Panel UI

---

## Working with Panel Source Data via API

### List Records
```
imis_panel_data panelSource={name} action="list" partyId={partyId}
```
Returns all records for a contact. For multi-instance, returns array of records.

### Get Single Record
```
imis_panel_data panelSource={name} action="get" id={recordId}
```

### Create Record
```
imis_panel_data panelSource={name} action="create" partyId={partyId} data='{"FieldName":"value","AnotherField":123}'
```
For single-instance sources, this creates (or updates if it already exists) the one record.
For multi-instance, this adds a new record.

### Update Record
```
imis_panel_data panelSource={name} action="update" id={recordId} data='{"FieldName":"new value"}'
```

### Data Patterns
- **Single-instance** (e.g., custom demographics): One record per contact — create once, update thereafter
- **Multi-instance** (e.g., certifications): Multiple records — create new entries, update/delete individual records
- **Standalone** (e.g., lookup tables): Not tied to a specific contact — independent data storage

---

## Expression Builder (Calculated Fields)

Calculated fields derive values from other properties. Configured in the BO Designer.

### Expression Types
- **Calculation**: Mathematical expressions (`Price * Quantity`)
- **Constant**: Fixed value (e.g., `"Active"`, `100`)
- **If Then Else**: Conditional logic (`IF PaidThrough > Today THEN "Active" ELSE "Lapsed"`)
- **Property**: Reference another property's value
- **Today**: Current date/time

### String Functions
| Function | Example | Result |
|----------|---------|--------|
| Trim | `Trim(" hello ")` | `"hello"` |
| Lower | `Lower("HELLO")` | `"hello"` |
| Upper | `Upper("hello")` | `"HELLO"` |
| Length | `Length("hello")` | `5` |
| Left | `Left("hello", 3)` | `"hel"` |
| Right | `Right("hello", 3)` | `"llo"` |
| Replace | `Replace("hello", "l", "r")` | `"herro"` |
| Substring | `Substring("hello", 1, 3)` | `"ell"` |

### Numeric Functions
| Function | Description |
|----------|-------------|
| Round | Round to N decimal places |
| Floor | Round down to nearest integer |
| Ceiling | Round up to nearest integer |
| Absolute | Absolute value |

### Date Functions
| Function | Description |
|----------|-------------|
| DateOnly | Extract date part (no time) |
| TimeOnly | Extract time part |
| Day / Month / Year | Extract component |
| EndOfMonth | Last day of the month |
| DatePart | Extract specific part (quarter, week, etc.) |

---

## Designing Panels (UI Forms)

Panels define how users interact with Panel Source data in the iMIS UI.

### Panel Types
- **Form Panel**: Standard data entry form — fields with labels, validation
- **Grid Panel**: Tabular display for multi-instance data — rows and columns
- **Mixed**: Form at top + grid below (common for single-instance header + multi-instance detail)

### Panel Design Workflow
1. **Navigate to**: RiSE > Panel Designer
2. **Select Panel Source**: Choose which data table to build a form for
3. **Drag fields**: Add properties to the layout
4. **Configure each field**: Label, width, required indicator, help text
5. **Set layout**: Column arrangement, section grouping, tab organisation
6. **Add to page**: Use PanelEditor iPart on a RiSE page to display the panel

### Panel on a RiSE Page
To display a panel on a website page:
1. Use `imis_iqa_content_plan` to decide whether the page needs a read-only query display, card template, editable PanelEditor, or mixed layout.
2. Create or edit a content record in a peripheral workspace (see `rise-website-design` skill).
3. For read-only lists/cards, bind the generated or existing IQD with Query Menu or Query Template Display.
4. For editable panel data, inspect a working **PanelEditor** iPart and add it with `imis_page_iparts action="add_typed"` using captured type-specific XML.
5. Publish only when requested and browser/editor verification is available.

---

## Best Practices

1. **Always use organisation prefix**: `My_OrgName_` avoids name collisions with system BOs and other customisations
2. **Design for IQA**: Enable "Available in IQA" on properties that need reporting
3. **Choose cardinality carefully**: Single vs multi-instance cannot be changed after creation
4. **Keep panel sources focused**: One concept per source (don't combine certifications and preferences in one table)
5. **Use meaningful names**: `ABC_Certifications` not `ABC_Data1`
6. **Test via API first**: Use `imis_panel_data` to verify data before building UI panels
7. **Document field purposes**: Use the Description field in property definitions
8. **Consider performance**: Indexed fields (foreign keys, frequently filtered fields) perform better in IQA queries
9. **Plan relationships**: If multiple panel sources relate to each other, use foreign key properties to link them
10. **Version control**: Document your panel source designs externally — iMIS doesn't version custom BO definitions
