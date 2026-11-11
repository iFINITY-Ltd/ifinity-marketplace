---
name: data-explorer
description: >-
  Discover and explore what data exists in the iMIS instance. This skill should
  be used when the user says "what entities are available", "show me the schema",
  "what custom fields exist", "explore the data model", "what panels are there",
  "list lookup tables", or when they want to understand the iMIS data structure.
  This skill discovers and reads only; create/edit lookup values belong to
  content-management, Business Objects to business-object-design, and query
  authoring/execution to iqa-query-design.
argument-hint: "[area: entities|panels|queries|lookups|all]"
---

# iMIS Data Explorer

Discover what data and configuration exists in the iMIS instance.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles when you need to understand what a specific entity, field, or configuration option means in context.

## Areas to Explore

Based on $ARGUMENTS, explore one or more areas:

### Entity Types
Use `imis_entity_discover action=types` to list all 200+ entity types organized by category:
- Accounting, Advertising, Cart, Certification, Commerce, Communications
- Core, Events, Fundraising, Invoice, Item, Membership
- Order Processing, Payments, Party, User Security

For any entity, use `imis_entity_discover action=schema` to see its fields, types, and relationships.

### Listing Records
To list records, filter with comma-separated `Field=value` pairs (`filter` on `imis_entity`, `filters` on `imis_search`). A plain value matches the whole stored value in any case; a value may start with an iMIS operator: `Name=contains:smith`, `LastName=startswith:mur`, `DocumentTypeId=IQD`, `UpdatedOn=gt:2026-01-01`. SQL or OData text (`EQ`, `LIKE`, `AND`, quotes) is refused with the supported syntax.

Some entities list only with filters iMIS requires, and the entity's description (from `imis_entity_discover action=types`) says which. A list without them is refused before any call to iMIS, and the refusal names the filters and the owning tool action that reads the same data:
- `EventRegistration`, `EventRegistrationSummary`: `EventId` and `PartyId` (one person's registration). Everyone registered for an event: `imis_manage_event_registration action=list_registrants eventId=...`.
- `PartyItemAvailability`: `PartyId` and `ItemId`; or `imis_item_catalog_profile action=item_context itemId=... partyId=...`.
- `ContentItem`: `ContentKey` and `ContentItemKey`; or `imis_document action=content_items`, or `imis_page_iparts action=inspect documentId=...` for a whole page.
- `PartyPledgeScheduledPayment`: `PartyId`. `imis_donor_360 donorPartyId=...` summarises a donor's pledge rows (up to `pledgeLimit`, default 50, at most 100; its totals cover only the rows returned). For a longer schedule, page through `imis_entity action=list entityType=PartyPledgeScheduledPayment filter="PartyId=..."` with `limit` and `offset`.
- `ItemPrice`: `ItemId`. `CsOrderLines`: `OrderNumber`. `PartyItemPrice`: pass `PartyId` (some builds refuse it without one); `imis_item_catalog_profile action=resolve_party_item_price` resolves one member's price.
- Not listable at all: `Message` (read what was sent with `imis_communication_history_profile action=party`), `UserSecurity` (`imis_security_access_setup action=get_user partyId=...`), `MembershipLogin` (get by id), and `QueryService` (`imis_iqa_reporting action=execute_query`).
- `Communication` is email templates, listed by folder: `imis_communication_setup action=list_communication_templates`. A contact's communication history is `imis_communication_history_profile`.

Reading what comes back: iMIS returns enum members as numbers (for example `Event.RegistrationType` reads `3` for `FeeRegistrationRequired`) and often omits default values (a zero count, `false`, an enum's first name), so a missing field usually means its default. When an `imis_entity` write sets an enum, write it by name; the readback matches the name to the number iMIS returns.

### Business Objects (Custom Entities)
Use `imis_entity action=list` with entityType "BOEntityDefinition" to discover custom business objects.
These are user-defined entities with custom fields — the backbone of iMIS customization.
This is discovery only; create/edit/prove a BO via `imis_business_object_design`.

### Panel Sources (Custom Data)
Use `imis_panel_records action=list_panel_sources` to see available panel sources (the reportable custom data tables), profile a source's fields with `imis_panel_source_contract`, and read rows with `imis_panel_records action=list_records`. `imis_entity action=list entityType=PanelDefinition` returns layout definitions only, not the data source.
Panel sources are mostly Party-scoped, but some are Standalone/Event/Invoice or multi-instance; confirm the parent entity and cardinality with `imis_panel_source_contract` before assuming a Party scope.

### IQA Queries
Use `imis_document action=browse path=$/Common/Queries maxDepth=2` to see available query folders; both IQA and IQD documents live here. Browsing does not prove a query is REST-available — run it via `imis_query` and inspect its design via `imis_iqd_query`.

### Lookup Tables (GenTable)
Use `imis_lookup_configuration action=list_tables` to enumerate GenTable names, then `action=list_values tableName=<NAME>` for one table's Code/Description rows. Common populated tables:
- `PREFIX` — Name prefixes
- `SUFFIX` — Name suffixes
- `MEMBER_STATUS` — Contact status codes (A active, I inactive, S suspended, D dropped)
- Member types are NOT here: they are customer types — `imis_core_system_configuration action=list entity=LegacyCustomerType` (the MEMBER_TYPE GenTable is empty on live tenants)
- `STATE_CODES` — State/province codes
- `COUNTRY` — Country codes
- `CHAPTER` — Chapter codes

The Settings>Contacts>Activity types grid is NOT a GenTable — it is the LegacyActivityType catalog (read via `imis_contact_activity`), distinct from the modern InteractionType classification; GenTable ACTIVITY_TYPE is empty on live tenants.

### Document System / Content
Use `imis_document action=browse` with path `@/` to explore the site structure.

## Presentation

For each area explored, present:
- What was found (counts, names, categories)
- Key items of interest
- How to access the data (which tool to use)
- Suggestions for further exploration
