---
name: advertising-management
description: >-
  Manage advertising sales for iMIS publications — media assets, ad orders,
  inventory, rate cards, and production tracking. This skill should be used
  when the user says "advertising", "ad sales", "media order", "publication
  advertising", "rate card", "ad inventory", "ad placement", "media asset",
  "ad booking", "advertising revenue", "publication issue", "ad size",
  "insertion order", or when working with advertising management in iMIS.
argument-hint: "[action: assets|orders|inventory|rates|report]"
---

# Advertising & Media Sales Management

Manage advertising sales for association publications in iMIS — media assets (publications/channels), ad orders, inventory, rate cards, and production tracking.

**Documentation resource**: Use the `imis-docs` connector to search official iMIS help articles for advertising module configuration and workflows. Use the `imis-docs-dev` connector to look up advertising API endpoints, data contracts, and the advertising Swagger spec.

## Key Concepts

- **Media Asset**: A publication or channel that sells advertising space (magazine, journal, website, newsletter)
- **Media Order**: An advertising purchase — links an advertiser (Party) to a media asset with ad size, placement, issue, and pricing
- **Media Inventory**: Available ad slots across publications and issues — tracks what space is sold vs available
- **Rate Card**: Published pricing for ad sizes, positions, and frequency discounts
- **Media Rep**: Sales representative assigned to advertising accounts
- **Media Territory**: Geographic or market segments for sales rep assignment

## Tool Selection

| I want to... | Tool |
|--------------|------|
| List publications/channels | `imis_media_assets` action="list" |
| Get a specific media asset | `imis_media_assets` action="get" assetId={id} |
| View ad orders | `imis_media_orders` action="list" |
| Get order details | `imis_media_orders` action="get" orderId={id} |
| Create an ad order | `imis_media_orders` action="create" data={json} |
| Check available ad slots | `imis_media_inventory` |
| Check inventory for a publication | `imis_media_inventory` assetId={id} |
| View rate cards | `imis_entity_list` entityType="RateCard" |
| View rate card line items | `imis_entity_list` entityType="RateCardDetail" |
| View ad sizes | `imis_entity_list` entityType="MediaAdSize" |
| View issue dates | `imis_entity_list` entityType="MediaIssueDate" |
| View sales reps | `imis_entity_list` entityType="MediaRep" |
| View territories | `imis_entity_list` entityType="MediaTerritory" |
| View production stages | `imis_entity_list` entityType="MediaProductionStageRef" |
| View production status | `imis_entity_list` entityType="MediaProductionStatusRef" |

---

## Workflows

### Browse Publications and Advertising Venues
```
imis_media_assets action="list"
```
Returns all media assets — publications, websites, newsletters, and other advertising venues.

### Check Ad Availability
```
imis_media_inventory assetId={mediaAssetId}
```
Shows available ad slots for a specific publication. Check this before booking an order.

### View Pricing
```
imis_entity_list entityType="RateCard" limit=50
imis_entity_list entityType="RateCardDetail" limit=100
```
Rate cards define pricing by ad size, position, and frequency. Rate card details are the individual line items.

### Create an Ad Order
1. **Find the advertiser**: `imis_find_member` with name or company
2. **Check the publication**: `imis_media_assets` action="get" assetId={id}
3. **Check availability**: `imis_media_inventory` assetId={id}
4. **Check pricing**: `imis_entity_list` entityType="RateCard"
5. **Create the order**: `imis_media_orders` action="create" data={json}
6. **Verify**: `imis_media_orders` action="get" orderId={newId}

### View Order Pipeline
```
imis_media_orders action="list" limit=50
```
List all orders. Cross-reference with production status for pipeline visibility.

### Advertising Revenue Analysis
1. List all orders: `imis_media_orders` action="list" limit=100
2. Cross-reference with media assets for publication breakdown
3. Use IQA queries for deeper analysis: `imis_query` with an advertising-focused query if one exists

---

## Related Entity Types

The advertising module has 30 entity types accessible via `imis_entity_list` and `imis_entity_get`:

| Entity | Description |
|--------|-------------|
| MediaAsset / MediaAssetSummary | Publications and advertising venues |
| MediaAssetGroup | Groupings of media assets |
| MediaOrder / MediaOrderSummary | Advertising orders |
| MediaOrderLine | Line items on orders |
| MediaOrderProductionDetail | Production tracking per order |
| MediaOrderRep | Sales rep assignments on orders |
| MediaOrderSignedDocuments | Signed contracts/insertions |
| MediaInventoryMaster / MediaInventoryDetail | Available ad slots |
| RateCard / RateCardDetail | Pricing definitions |
| MediaAdSize | Ad size definitions |
| MediaAdType | Ad type reference values |
| MediaIssueDate | Publication issue dates |
| MediaRep | Sales representatives |
| MediaTerritory | Sales territories |
| RepTerritory | Rep-to-territory assignments |
| AdvertiserAgencyMap | Advertiser-agency relationships |
| AdvertiserRepTerritoryMap | Advertiser-rep-territory links |
| MediaColor | Colour specifications |
| MediaFrequency | Frequency discount tiers |
| MediaPosition | Ad placement positions |
| MediaProductionStageRef | Production workflow stages |
| MediaProductionStatusRef | Production status values |
| MediaSeparation | Colour separation specs |
| MediaType | Media type reference values |
| AdAdjustment | Rate adjustments and discounts |

---

## What Claude Can vs Cannot Do

**Claude can** (via MCP tools):
- Browse and inspect media assets (publications, channels)
- View and create advertising orders
- Check ad inventory and availability
- View rate cards and pricing
- Inspect all advertising reference data (ad sizes, positions, colours, frequencies, territories)
- View sales rep assignments and territories
- View production tracking details
- Run advertising-related IQA queries

**Requires iMIS web UI**:
- Configuring media assets and issue schedules
- Setting up rate cards (complex pricing tiers)
- Configuring production workflows
- Generating advertising invoices and billing runs
- Ad material upload and creative management
