---
name: uk-localisation
description: >-
  UK-specific iMIS features — Gift Aid, VAT, UK Direct Debit, and HMRC
  compliance. This skill should be used when the user says "Gift Aid", "HMRC",
  "VAT", "Direct Debit", "UK tax", "UK charity", "Gift Aid declaration",
  "HMRC claim", "VAT rules", "BACS", "UK donations", "tax reclaim",
  "25% reclaim", or when working with UK charity regulations, tax compliance,
  or UK payment methods. Do Gift Aid, VAT, and Direct Debit configuration
  checks here; posting the gift itself goes to fundraising and payment
  gateway setup goes to billing / system-configuration.
argument-hint: "[donor-name-or-id] [action: check|declare|claim|vat]"
---

# UK Localisation — Gift Aid, VAT & Direct Debit

Manage UK-specific iMIS functionality including Gift Aid declarations, HMRC claim preparation, VAT rules, and UK Direct Debit mandates.

## Key Concepts

### Gift Aid
- UK charities can reclaim **25% tax** on donations from UK taxpayers
- Requires a valid **Gift Aid declaration** from the donor
- Claims go to **HMRC** from iMIS itself: staff run Fundraising > Gift Aid > Process Claims and iMIS submits the claim. AgentZ estimates claims but never submits one
- Declarations live in iMIS's own store, **ContactGiftAidDeclaration** (the donor's Giving tab > Gift Aid > Declarations). AgentZ reads them and writes none
- UK tax year runs **6 April to 5 April** (not calendar year)

### VAT
- UK and EU organisations must charge VAT on certain products and services
- Membership subscriptions may have **partial VAT exemption** for nonprofits
- **LegacyVatRule** and **LegacyVatRuleSet** entities manage VAT configuration

### UK Direct Debit
- BACS Direct Debit allows recurring collections from UK bank accounts
- In iMIS, collected through whichever payment gateway the tenant has configured for Direct Debit — the gateway provider varies by tenant
- **GatewayAccount** + **AutoPayAccount** + **AutoPayInstruction**
- `imis_uk_direct_debit` reads iMIS configuration state only; it does not perform a live BACS/gateway mandate check

## Actions

### Check Gift Aid Declaration
```
imis_gift_aid partyId="12345" action="declaration_check"
```
Answers declaration_on_record, no_declaration, no_declaration_store or unknown from iMIS's own declarations (ContactGiftAidDeclaration) only, with each declaration's status (Active, Cancelled or Pending). A row in a tenant's custom Gift Aid panel (GiftAid, Gift_Aid, GIFT_AID) is reported apart in `customPanelRows`: it is not an iMIS Gift Aid declaration, does not count towards claims, and never changes the answer.

### Recording a Gift Aid declaration
AgentZ cannot record, change or cancel a declaration. `imis_gift_aid` action="declaration_create" and action="declaration_update" are refused and write nothing: `imis_gift_aid` never records a declaration. iMIS keeps declarations in ContactGiftAidDeclaration, which AgentZ does not write yet; tell the person AgentZ does not record declarations yet, without naming the store or any internal work. A tenant's own custom Gift Aid panel (GiftAid, Gift_Aid, GIFT_AID) stays an ordinary custom panel: AgentZ does not treat it as the Gift Aid declaration store. Ask staff to record it on the donor's Giving tab > Gift Aid > Declarations, then read it back with action="declaration_check". Do not write a declaration into a custom panel through `imis_panel_records` instead: iMIS does not claim on it.

### Preview HMRC Claim
```
imis_gift_aid action="claim_preview" taxYear="2025"
```
Totals the gifts iMIS lists as ready to claim for the 2024/25 tax year (GiftAidGiftsToClaim, the source of Fundraising > Gift Aid > Process Claims) and the ReclaimAmount iMIS calculated for each. Pass queryPath to estimate from an eligible-gifts IQA instead, such as the stock `$/Fundraising/DefaultSystem/Queries/GiftAid/Gifts to be Claimed`; a source that cannot be read, or a query that is missing, is refused with the reason and never replaced by a list of every gift. It is an estimate: iMIS submits the claim to HMRC from Process Claims.

### List Gift Aid Eligible Donations
```
imis_gift_aid action="claim_list" taxYear="2025"
```

### View VAT Rules
```
imis_accounting_configuration_profile action="inventory"
imis_accounting_configuration_setup action="list" entity="LegacyVatRule"
imis_accounting_configuration_setup action="list" entity="LegacyVatRuleSet"
imis_accounting_configuration_setup action="get" entity="LegacyVatRule" id="<vat-rule-guid>"
```
`imis_accounting_configuration_profile action=inventory` reads VAT posture; `imis_accounting_configuration_setup` (gated create/update/delete) writes VAT rules.

### Check Direct Debit Mandate
```
imis_uk_direct_debit partyId="12345"
```
Cross-references the tenant's configured gateway accounts with the member's auto-pay configuration (iMIS config state only; no live BACS/gateway mandate check).

## Gift Aid Workflow

1. **Find the donor**: `imis_find_member`
2. **Check existing declaration**: `imis_gift_aid` action="declaration_check"
3. **No declaration?** Ask staff to record one on the donor's Giving tab > Gift Aid > Declarations (AgentZ writes no declaration), then check again
4. **Preview claim**: `imis_gift_aid` action="claim_preview" for the relevant tax year

## Important Notes

- iMIS keeps declarations in ContactGiftAidDeclaration, and only that store decides whether a donor has one. Some tenants also have an old custom panel (GiftAid, Gift_Aid, GIFT_AID): declaration_check lists its row in `customPanelRows`, which never counts as a declaration. Pass `panelSource` to report a panel with another name. Never tell staff a donor is covered because of a custom panel row
- iMIS submits Gift Aid claims to HMRC itself, from Fundraising > Gift Aid > Process Claims; AgentZ does not submit
- VAT rules use the "Legacy" prefix in iMIS entity names but are the current implementation
