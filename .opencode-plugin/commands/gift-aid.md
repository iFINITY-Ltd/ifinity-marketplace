---
description: "Check Gift Aid declarations and estimate HMRC claims — read declarations, preview tax reclaims"
---

# Gift Aid Management

Read UK Gift Aid declarations and estimate HMRC claims in iMIS. AgentZ writes no declaration and submits no claim: iMIS submits claims to HMRC itself.

## Step 1: Determine Action

From $ARGUMENTS, determine what the user wants:
- **Check**: Check if a donor has a Gift Aid declaration
- **Declare**: The user wants a new Gift Aid declaration recorded (AgentZ cannot record it; see below)
- **Claim**: Preview an HMRC Gift Aid claim for a tax year

## Step 2: Find the Donor (for check/declare)

If a donor name or ID is provided, use `imis_find_member` to locate them.

## Step 3: Execute

### Check Declaration
```
imis_gift_aid action="declaration_check" partyId="<party-id>"
```

Present:
- Whether a declaration exists
- Declaration date, type, and period
- Each declaration's status (Active, Cancelled or Pending), from ContactGiftAidDeclaration only
- Any `customPanelRows`, stated plainly as the tenant's custom panel data: not a Gift Aid declaration, and not counted towards claims

### Record a Declaration
AgentZ does not record declarations: `imis_gift_aid` refuses `declaration_create` and `declaration_update` and writes nothing. A tenant's own custom Gift Aid panel (GiftAid, Gift_Aid, GIFT_AID) stays an ordinary custom panel: AgentZ does not treat it as the Gift Aid declaration store. Do not record a declaration in such a panel through `imis_panel_records` either: iMIS does not claim on it. iMIS keeps declarations in ContactGiftAidDeclaration, and the write is being rebuilt on that store (lane L52).

Tell the user to record it in iMIS on the donor's Giving tab > Gift Aid > Declarations (method, date received, whether it covers past and future donations), then run the check above to read it back.

### Preview HMRC Claim
```
imis_gift_aid action="claim_preview" taxYear="<year>"
```

Present:
- Tax year period (e.g., 6 April 2024 – 5 April 2025)
- Total eligible donations
- 25% reclaim amount
- Number of qualifying gifts
- That this is an estimate: iMIS submits the claim to HMRC from Fundraising > Gift Aid > Process Claims

## Step 4: Confirm

Summarise what was done and any next steps:
- For declarations: Remind that the donor must be a UK taxpayer
- For claims: iMIS submits the claim to HMRC from Fundraising > Gift Aid > Process Claims; AgentZ does not submit
