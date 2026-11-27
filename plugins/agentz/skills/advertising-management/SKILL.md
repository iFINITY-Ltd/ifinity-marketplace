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

This skill owns advertising order records only. Invoicing, payment, and settlement of an advertising order belong to billing-management; advertising revenue reporting belongs to iqa-query-design. A MediaOrder write does not create or prove an invoice.

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
| List publications/channels | `imis_advertising_operations_profile` action="inventory" |
| Get a specific media asset | `imis_advertising_operations_profile` action="inventory" mediaAssetId={id} |
| View ad orders | `imis_advertising_orders` action="list_orders" |
| Get order details | `imis_advertising_orders` action="get_order_packet" orderId={id} |
| Create an ad order | `imis_advertising_orders` action="preview_create_order" payloadObject={...} → action="create_order" with the same payloadObject and the confirmationText the preview returned |
| Change an ad order | `imis_advertising_orders` action="preview_update_order" orderId={id} payloadObject={only the fields to change} → action="update_order" with the same orderId, payloadObject and the confirmationText the preview returned. A change of rate card, size, quantity or classified text prices the order again: the preview's derivedValues show the new price |
| Add, change or remove an order adjustment | `imis_advertising_orders` action="preview_create_line" orderId={id} payloadObject={AdAdjustment:{AdAdjustmentId}, ManualAdjustmentValue, GrossInd} (or preview_update_line / preview_delete_line with lineId) → the same action without "preview_" and the confirmationText the preview returned. iMIS prices the order again; the preview shows the expected gross and net |
| Check available ad slots | `imis_advertising_orders` action="availability_profile" then gated `check_blocked_inventory` |
| Check inventory for a publication | `imis_advertising_operations_profile` action="inventory" mediaAssetId={id} |
| View rate cards | `imis_entity action=list` entityType="RateCard" |
| View rate card line items | `imis_entity action=list` entityType="RateCardDetail" (belongs to a RateCard, idField RateCardDetailId; read the RateCard first) |
| View ad sizes | `imis_entity action=list` entityType="AdSize" |
| View issue dates | `imis_entity action=list` entityType="AdIssueDate" |
| View sales reps | `imis_entity action=list` entityType="MediaRep" |
| View territories | `imis_entity action=list` entityType="MediaTerritory" |
| View production stages | `imis_entity action=list` entityType="MediaProductionStageRef" |
| View production status | `imis_entity action=list` entityType="MediaProductionStatusRef" |
| Create/edit setup records (media assets, rate cards, reps, territories, reference data) | `imis_advertising_setup` — approval-gated validate/create/update/delete with readback; preview first, then confirm with the exact text |

---

## Workflows

### Browse Publications and Advertising Venues
```
imis_advertising_operations_profile action="inventory"
```
Returns all media assets — publications, websites, newsletters, and other advertising venues.

### Check Ad Availability
```
imis_advertising_operations_profile action="inventory" mediaAssetId={mediaAssetId}
imis_advertising_orders action="availability_profile" mediaAssetId={mediaAssetId}
```
The operations_profile inventory read is availability posture only. For a real availability execution, use `imis_advertising_orders action="availability_profile"` then the gated `check_blocked_inventory` (preview_check_blocked_inventory → check_blocked_inventory). Check this before booking an order.

### View Pricing
```
imis_entity action=list entityType="RateCard" limit=50
imis_entity action=list entityType="RateCardDetail" limit=100
```
Rate cards define pricing by ad size, position, and frequency. Rate card details are the individual line items.

### Create an Ad Order
1. **Find the advertiser**: `imis_find_member` with name or company
2. **Check the publication**: `imis_advertising_operations_profile` action="inventory" mediaAssetId={id}
3. **Check availability**: `imis_advertising_orders` action="availability_profile" mediaAssetId={id}
4. **Check pricing**: `imis_entity action=list` entityType="RateCard"
5. **Create the order** (gated two-step): `imis_advertising_orders` action="preview_create_order" payloadObject={...} → `imis_advertising_orders` action="create_order" with the same payloadObject and the confirmationText the preview returned
6. **Verify**: `imis_advertising_orders` action="get_order_packet" orderId={newId}

### Correct Orders on the Wrong Rate Card
1. **List the unposted orders**: `imis_advertising_orders` action="list_orders" (an order with IsFrozen true is posted; unpost it with preview_unpost_order → unpost_order before you change it)
2. **Read each advertiser's membership**: `imis_member_360` partyId={AdvertiserId} sections="contact,billing"
3. **Read the rate cards**: `imis_advertising_setup` action="get" entity="RateCard" id={RateCardId}. A card with IsMember true is the member rate card ("Members only")
4. **Preview each correction**: `imis_advertising_orders` action="preview_update_order" orderId={id} payloadObject={RateCard:{RateCardId}}. The preview keeps the order's ad size, colour and frequency, and its derivedValues show the new rate-card detail, the five costs and the notes (for example, that the card's dates do not cover the order)
5. **Show the person each mismatch** with the price before and after: the order, the advertiser, its membership, the rate card it uses and the one it should use
6. **Change the orders the person approves**: action="update_order" with the same orderId, payloadObject and the confirmationText the preview returned
7. **Verify**: read the order packet back and check the rate card and all five costs

### View Order Pipeline
```
imis_advertising_orders action="list_orders" limit=50
```
List all orders. Cross-reference with production status for pipeline visibility.

### Advertising Revenue Analysis
1. List all orders: `imis_advertising_orders` action="list_orders" limit=100
2. Cross-reference with media assets for publication breakdown
3. Use IQA queries for deeper analysis: `imis_query` with an advertising-focused query if one exists

---

## Related Entity Types

The advertising module has 29 entity types accessible via `imis_entity action=list` and `imis_entity action=get`:

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
| AdSize | Ad size definitions |
| MediaAdTypeRef | Ad type reference values |
| AdIssueDate | Publication issue dates |
| MediaRep | Sales representatives |
| MediaTerritory | Sales territories |
| RepTerritory | Rep-to-territory assignments |
| AdvertiserAgencyMap | Advertiser-agency relationships |
| AdvertiserRepTerritoryMap | Advertiser-rep-territory links |
| MediaColorRef | Colour specifications |
| MediaFrequencyRef | Frequency discount tiers |
| MediaPositionRef | Ad placement positions |
| MediaProductionStageRef | Production workflow stages |
| MediaProductionStatusRef | Production status values |
| MediaSeparationRef | Colour separation specs |
| MediaTypeRef | Media type reference values |
| AdAdjustment | Rate adjustments and discounts |

---

## What Claude Can vs Cannot Do

**Claude can** (via MCP tools):
- Browse and inspect media assets (publications, channels)
- Create, change and remove advertising orders and their adjustments, with the order's price worked out again (unpost a posted order first)
- Set up media assets, issue dates, ad sizes, rate cards, reps, territories and reference data (`imis_advertising_setup`)
- Check ad inventory and availability
- View rate cards and pricing
- Inspect all advertising reference data (ad sizes, positions, colours, frequencies, territories)
- View sales rep assignments and territories
- View production tracking details, upload creative files and attach signed documents
- Post and unpost orders, which creates or keeps a bill-me invoice
- Run advertising-related IQA queries

**Cannot do yet**:
- Approve creative proofs or move production workflow states
- Hold inventory on its own: space is held only through the iMIS order process
