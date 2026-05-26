---
name: data-explorer
description: >-
  Discover and explore what data exists in the iMIS instance. This skill should
  be used when the user says "what entities are available", "show me the schema",
  "what custom fields exist", "explore the data model", "what panels are there",
  "list lookup tables", or when they want to understand the iMIS data structure.
argument-hint: "[area: entities|panels|queries|lookups|all]"
---

# iMIS Data Explorer

Discover what data and configuration exists in the iMIS instance.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles when you need to understand what a specific entity, field, or configuration option means in context.

## Areas to Explore

Based on $ARGUMENTS, explore one or more areas:

### Entity Types
Use `imis_entity_types` to list all 200+ entity types organized by category:
- Accounting, Advertising, Cart, Certification, Commerce, Communications
- Core, Events, Fundraising, Invoice, Item, Membership
- Order Processing, Payments, Party, User Security

For any entity, use `imis_entity_schema` to see its fields, types, and relationships.

### Business Objects (Custom Entities)
Use `imis_entity_list` with entityType "BOEntityDefinition" to discover custom business objects.
These are user-defined entities with custom fields — the backbone of iMIS customization.

### Panel Sources (Custom Data)
Use `imis_entity_list` PanelDefinition to see available panel layouts.
Panels represent custom data tables that extend standard entities.
Access panel data with `imis_panel_data`.

### IQA Queries
Use `imis_document_browse` with path `$/Common/Queries/` to see available query folders.
Browse deeper into each folder to find specific queries.

### Lookup Tables (GenTable)
Use `imis_lookup_tables` with `action: "list"` and common table names:
- `PREFIX` — Name prefixes
- `SUFFIX` — Name suffixes
- `MEMBER_TYPE` — Customer/member types
- `ACTIVITY_TYPE` — Activity categories
- `STATE_CODES` — State/province codes
- `COUNTRY` — Country codes
- `CHAPTER` — Chapter codes

### Document System / Content
Use `imis_document_browse` with path `@/` to explore the site structure.

## Presentation

For each area explored, present:
- What was found (counts, names, categories)
- Key items of interest
- How to access the data (which tool to use)
- Suggestions for further exploration
