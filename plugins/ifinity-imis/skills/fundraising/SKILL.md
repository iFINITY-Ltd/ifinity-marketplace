---
name: fundraising
description: >-
  Manage donations, gifts, pledges, and fundraising in iMIS. This skill should
  be used when the user says "donation", "gift", "pledge", "donor", "campaign",
  "fundraising", "giving", "tribute", "memorial gift", "soft credit",
  "giving history", "record a donation", "donor report", "pledge payments",
  "thank you letter", "acknowledgment", "LYBUNT", "SYBUNT", "lapsed donors",
  "major donor", "in-kind gift", "donor cultivation", "annual fund",
  or when working with charitable giving, donor management, or fundraising
  analytics.
argument-hint: "[donor-name-or-id] [action: gift|pledge|history|report|acknowledge|tribute|major-donors]"
---

# Fundraising Management

Record donations, manage pledges, acknowledge donors, track giving history, and analyse fundraising performance in iMIS.

## Key Concepts

- **GiftInformationBatch**: The primary gift/donation entity — records donor, amount, date, campaign, fund
- **Pledges**: Gifts with `Frequency` and `NumberOfInstallments` — installment-based giving commitments
- **Soft Credits**: Attribute one gift to multiple parties (e.g., spouse gets credit too)
- **Tributes**: Gifts made in honour or memory of someone
- **Campaign**: The fundraising initiative a gift is associated with (e.g., "Annual Fund 2025")
- **Appeal**: Sub-segment of a campaign targeting a specific audience
- **SourceCode**: Tracking code for the marketing channel (email, direct mail, event, etc.)
- **DonationPremium**: Thank-you gifts sent to donors who give above certain thresholds

---

## Actions

### Record a Donation

1. **Find the donor**: `imis_find_member` with name, email, or ID
2. **Gather gift details**:
   - Amount (required)
   - Fund/product code (required — the ItemId for the donation product)
   - Campaign (optional but recommended)
   - Source code (optional — how did the donor hear about this?)
   - Payment type: cash, check, ACH (NOTE: credit card payments CANNOT go via API)
   - Gift date (optional, defaults to today)
3. **Record the gift**:
   ```
   imis_process_gift donorId={partyId} amount=100 giftItemId="DONATION" campaignId="ANNUAL-2025" sourceCode="EMAIL"
   ```
4. **Acknowledge**: Always follow up with a thank-you (see Donor Acknowledgment below)

---

### Donor Acknowledgment / Thank-You

The most basic and most important fundraising follow-up. Every gift should be acknowledged promptly.

1. **Get donor and gift details**:
   - `imis_entity_get` Party/{partyId} — donor name, email, address
   - Recent gift: from the `imis_process_gift` response, or `imis_entity_list` GiftInformationBatch with PartyId filter

2. **Compose thank-you email** with:
   - Donor's name
   - Gift amount and date
   - Fund/campaign the gift supports
   - Tax-deductibility statement (if applicable)
   - If Gift Aid eligible (UK): "We will claim an additional 25% from HMRC through Gift Aid"

3. **Send**: `imis_send_email` to={donor_email} subject="Thank you for your generous gift" body={composed_html}

4. **Log the acknowledgment**: `imis_log_activity` partyId={partyId} subject="Donation acknowledgment sent — {amount}" interactionType="Email"

5. **Timing best practice**: Acknowledge within 48 hours of receiving the gift. Major gifts (above organisational threshold) should also get a personal phone call.

---

### Record Pledge Payment Against Existing Pledge

When a donor makes a payment towards a previously committed pledge.

1. **Find existing pledges**: `imis_entity_list` GiftInformationBatch with PartyId filter — look for entries with pledge frequency/installment data
2. **View pledge schedule**: `imis_scheduled_payments` partyId={partyId} — shows upcoming installment dates and amounts
3. **Record the payment**: `imis_process_gift` donorId={partyId} amount={installment_amount} giftItemId={same_fund_as_pledge}
   - Reference the original pledge if the API supports linking
4. **Verify**: Check `imis_scheduled_payments` again to confirm the next installment date has advanced
5. **Present**: Show updated pledge status — payments made, remaining balance, next due date

---

### In-Kind Gift Recording

Donations of goods, services, or property rather than cash.

1. **Determine fair market value**: Ask the user for the appraised or estimated value
   - For gifts over applicable thresholds, advise the donor to get an independent appraisal
2. **Record the gift**: `imis_process_gift` donorId={partyId} amount={fair_market_value} giftItemId={in_kind_fund_code}
3. **Log details**: `imis_log_activity` partyId={partyId} subject="In-kind donation: {description}" interactionType="Note" notes="Description: {item_description}. Fair market value: {value}. Condition: {condition}."
4. **Acknowledge**: Send thank-you noting the in-kind nature (do NOT state a dollar value in the thank-you letter for tax purposes — the donor determines the deduction)

---

### Complete Tribute / Memorial Gift Workflow

Gifts made "In Honour Of" or "In Memory Of" someone.

1. **Determine tribute type**:
   - "In Honour Of" — celebrating a living person (birthday, achievement, etc.)
   - "In Memory Of" — memorialising someone who has passed
   - Check available types: `imis_entity_list` TributeType

2. **Gather details**:
   - Donor (who is giving)
   - Tribute name (who is being honoured/memorialised)
   - Notification recipient (optional — family member or honoree to notify)
   - Amount, fund, campaign

3. **Record the gift**: `imis_process_gift` donorId={partyId} amount={amount} giftItemId={fund} tributeType={type} tributeName={honouree_name}

4. **Send acknowledgment to donor**: `imis_send_email` thanking them and confirming the tribute

5. **Notify tribute recipient** (if requested):
   - Send a separate email/letter to the honoree or family member
   - `imis_send_email` with message noting the gift was made in honour/memory (do NOT include the gift amount — that's between the donor and the organisation)

6. **Log**: `imis_log_activity` for both the donor and (optionally) the tribute contact

---

### View Giving History

Use `imis_billing_summary` partyId={partyId} for a quick overview, or for detailed gift records:
```
imis_entity_list GiftInformationBatch filter="PartyId={partyId}" limit=100
```

Present:
- Total lifetime giving
- Giving by year (current year, last year, etc.)
- Largest single gift
- Most recent gift (date, amount, fund)
- Campaign breakdown
- Pledge status (if any active pledges)

---

### Create a Pledge

Multi-year or installment-based giving commitment.

```
imis_process_gift donorId={partyId} amount=1200 giftItemId="PLEDGE" pledgeFrequency="Monthly" pledgeInstallments=12 campaignId="CAPITAL"
```

After creating:
- View schedule: `imis_scheduled_payments` partyId={partyId}
- Set up auto-pay (if requested): guide to `imis_manage_autopay`
- Present: pledge total, installment amount, frequency, start date, estimated completion

---

### Campaign Analysis

```
imis_campaigns action="list_campaigns"
imis_campaigns action="get" entityType="Campaign" id="ANNUAL-2025"
```

For deeper analysis:
1. List gifts by campaign: `imis_entity_list` GiftInformationBatch with campaign filter
2. Or use IQA: `imis_query` with a fundraising query path
3. **Present**:
   - Campaign goal vs raised
   - Number of donors
   - Average gift size
   - Breakdown by appeal/source code
   - Comparison to prior campaigns

---

### LYBUNT / SYBUNT Analysis (Lapsed Donor Identification)

**LYBUNT** = Last Year But Unfortunately Not This (year) — donors who gave last year but haven't given this year.
**SYBUNT** = Some Years But Unfortunately Not This (year) — donors who gave in any prior year but not this year.

These are the most important donor retention metrics. Recapturing lapsed donors is far cheaper than acquiring new ones.

1. **Check for existing IQA query**: `imis_document_browse` path `$/Common/Queries/` — look for donor lapse or LYBUNT queries
2. **If query exists**: `imis_query` queryPath={path} to run it
3. **If no query exists**, build the analysis manually:
   a. Pull giving history: `imis_entity_list` GiftInformationBatch limit=500 — get recent years of gifts
   b. Group by PartyId and extract gift year
   c. Identify donors who gave in prior year(s) but NOT in the current year
   d. For each lapsed donor: get contact details via `imis_entity_get` Party/{id}
4. **Present**:
   - Total LYBUNT donors (gave last year, not this year)
   - Total SYBUNT donors (gave some prior year, not this year)
   - Aggregate amount at risk (sum of their last gifts)
   - Top lapsed donors by prior giving level
   - Suggested outreach actions
5. **Recommend**: Send a re-engagement appeal to these donors via `imis_send_email` or create a targeted campaign

---

### Major Donor Identification and Cultivation

Identify top donors and track cultivation activities.

1. **Define threshold**: Ask the user what constitutes a "major donor" for their organisation (common: $1,000+, $5,000+, $10,000+)
2. **Pull giving data**: `imis_entity_list` GiftInformationBatch limit=500 — get all gifts
3. **Aggregate by donor**:
   - Total lifetime giving
   - Largest single gift
   - Number of gifts (frequency)
   - Most recent gift date
   - Giving trend (increasing, decreasing, stable)
4. **Enrich profiles**: For top donors:
   - `imis_engagement_score` action="list" — see what scoring models are configured (e.g., event attendance, giving, volunteer hours)
   - `imis_engagement_summary` partyId={id} — engagement level (activities, groups, subscriptions)
   - `imis_contact_relationships` partyId={id} — connected contacts (board members, spouse, etc.)
   - `imis_entity_list` GroupMember with PartyId filter — committee/board involvement
5. **Present ranked list**:
   - Name | Lifetime Giving | Last Gift | Engagement Score | Key Relationships
6. **Cultivation tracking**: Use `imis_log_activity` to record:
   - Phone calls, meetings, event invitations
   - Proposal discussions
   - Follow-up actions
   - Each interaction builds the cultivation history visible in the member's activity log

---

## Workflow: Complete Donor Profile

The holistic view of a donor for any fundraising conversation.

1. Find the donor: `imis_find_member` or use `imis_member_360` partyId={id} for everything at once
2. Giving history: `imis_billing_summary` partyId={id}
3. Detailed gifts: `imis_entity_list` GiftInformationBatch with PartyId filter
4. Pledge status: `imis_scheduled_payments` partyId={id}
5. Engagement: `imis_engagement_summary` partyId={id}
6. Gift Aid (UK): `imis_gift_aid_declaration` partyId={id} action="check"
7. Relationships: `imis_contact_relationships` partyId={id}
8. Communication history: `imis_communications` partyId={id}
9. Summarise: total giving, recent gifts, pledge status, engagement level, Gift Aid status, key relationships

---

## Workflow: Fundraising Report

1. List campaigns: `imis_campaigns` action="list_campaigns"
2. Run a gifts query: `imis_query` with a fundraising IQA query path
3. Calculate totals by campaign, time period, or donor segment
4. Compare to prior periods (year-over-year)
5. Present findings with totals, averages, and trends
6. Highlight: top donors, biggest campaigns, LYBUNT risk
