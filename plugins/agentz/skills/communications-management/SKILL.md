---
name: communications-management
description: >-
  Manage communications, campaigns, and outreach in iMIS. This skill should be
  used when the user says "send email", "communications history", "campaign",
  "appeal", "outreach", "notification", "email history", "source code tracking",
  "solicitation", "communication log", "what emails were sent", "create a
  campaign", "set up appeals", "thank you letter", "donor acknowledgment",
  "notification trigger", "automated email", "renewal reminder",
  or when working with marketing campaigns, fundraising appeals, or member
  communications.
argument-hint: "[member-name-or-id] [action: history|send|campaigns|create-campaign|thank-you|notifications]"
---

# Communications & Campaign Management

View communication history, manage campaigns, send communications, and configure notifications in iMIS.

## Key Concepts

- **Communication**: A record of an email, letter, or other communication sent to a contact
- **Campaign**: A fundraising or marketing initiative (e.g., "Annual Fund 2025")
- **Appeal**: A sub-segment within a campaign targeting specific audiences (e.g., "Major Donors", "Lapsed Members")
- **SourceCode**: Tracks the marketing channel or origin of a response (e.g., "EMAIL-DEC", "DIRECTMAIL")
- **Solicitation**: An outreach effort within a campaign
- **NotificationSet**: Automated email triggers (renewal reminders, registration confirmations, payment receipts)
- **ContactInteraction**: Activity log entry — used to record that a communication was sent

---

## Actions

### View Communication History
```
imis_communications partyId={id}
```
Note: Communications REQUIRE a PartyId filter — they cannot be listed globally.

For activity-based history: `imis_entity_list` ContactInteraction with PartyId filter — shows logged emails, calls, meetings, notes.

### Send an Email
```
imis_send_email to={email} subject="Subject" body="<h1>Hello</h1><p>Your message here</p>"
```
HTML is supported in the body. Always log the communication afterward with `imis_log_activity`.

### View Campaigns
```
imis_campaigns action="list_campaigns"
imis_campaigns action="list_appeals"
imis_campaigns action="list_sources"
imis_campaigns action="list_solicitations"
```

### Get Campaign Details
```
imis_campaigns action="get" entityType="Campaign" id="ANNUAL-2025"
```

### View Notification Configurations
```
imis_notifications action="list"
imis_notifications action="get" notificationSetId="RENEWAL_REMINDER"
```

---

## Campaign Creation Workflow

Set up a new fundraising or marketing campaign with appeals and tracking codes.

1. **Gather details**:
   - Campaign name/code (e.g., "ANNUAL-2025")
   - Description and purpose
   - Start and end dates
   - Goal amount (for fundraising campaigns)

2. **Create the campaign**: `imis_entity_create` entityType="CampaignSummary" with data:
   ```json
   {
     "CampaignCode": "ANNUAL-2025",
     "Name": "Annual Fund 2025",
     "Description": "Annual fundraising campaign",
     "StartDate": "2025-01-01",
     "EndDate": "2025-12-31"
   }
   ```
   Note: If CampaignSummary creation fails (some instances treat Summary entities as read-only views), guide the user to create via the iMIS staff site.

3. **Create appeals** (audience segments): `imis_entity_create` entityType="AppealSummary" with campaign reference

4. **Create source codes** (tracking): `imis_entity_create` entityType="SourceCodeSummary" with channel details (EMAIL, DIRECTMAIL, EVENT, PHONE, etc.)

5. **Verify**: `imis_campaigns` action="get" entityType="Campaign" id={campaignId}

6. **Present**: Campaign created with ID, appeals configured, source codes ready for tracking

---

## Donor Thank-You / Acknowledgment Workflow

Send a personalised thank-you after a donation.

1. **Find the donor**: `imis_find_member` with name/email/ID
2. **Get recent gift details**: `imis_entity_list` GiftInformationBatch with PartyId filter — find the most recent gift
3. **Compose the email**:
   - Address the donor by name
   - Acknowledge the specific gift amount and date
   - Mention the fund/campaign it supports
   - Include tax-deductibility language if applicable
   - For UK donors with Gift Aid: mention the 25% uplift
4. **Send**: `imis_send_email` to={donor_email} subject="Thank you for your generous gift of {amount}" body={composed_html}
5. **Log**: `imis_log_activity` partyId={id} subject="Donation acknowledgment sent — {amount}" interactionType="Email"

**Best practices**:
- Acknowledge within 48 hours
- Major gifts deserve a personal phone call in addition to email
- Include the donor's cumulative giving total for the year if meaningful
- For tribute gifts, also notify the honoree/family (see fundraising skill)

---

## Notification / Trigger Email Configuration

iMIS notifications automate email sends based on system events.

### View Existing Notifications
```
imis_notifications action="list"
imis_notifications action="get" notificationSetId={id}
```

### Common Notification Types
- **Membership renewal reminders**: Sent X days before PaidThrough date
- **Event registration confirmations**: Sent immediately after registration
- **Payment receipt confirmations**: Sent when payment is processed
- **Welcome emails**: Sent to new members
- **Lapse notifications**: Sent when membership expires
- **Order confirmations**: Sent after purchase

### Configuring Notifications
**API Limitation**: Creating or modifying notification triggers typically requires the iMIS admin UI (RiSE > Process Automation). The API can inspect and report on what's configured but cannot create new notification sets.

**Advisory workflow for implementation**:
1. Review current notifications: `imis_notifications` action="list"
2. Identify gaps (e.g., missing renewal reminders, no welcome email)
3. Document the required notification:
   - Trigger event (what causes it to fire)
   - Timing (immediately, X days before/after)
   - Template content
   - Recipient(s)
4. Guide the user to configure in iMIS: Settings > Communications or RiSE > Process Automation
5. After creation, verify: `imis_notifications` action="list" to confirm it appears

---

## Workflow: Review Member Communications

1. Find the member: `imis_find_member`
2. View communication history: `imis_communications` partyId={id}
3. View activity log: `imis_entity_list` ContactInteraction with PartyId filter
4. Summarise:
   - Total communications sent
   - Types (email, letter, phone, etc.)
   - Most recent communication (date, subject, type)
   - Any gaps (e.g., haven't communicated in 6+ months)

---

## Workflow: Campaign Analysis

1. List campaigns: `imis_campaigns` action="list_campaigns"
2. Get campaign details: `imis_campaigns` action="get" entityType="Campaign" id={id}
3. Check associated gifts: `imis_entity_list` GiftInformationBatch with Campaign filter, or `imis_query` with a fundraising IQA query
4. Check appeals: `imis_campaigns` action="list_appeals" — which audience segments performed best
5. Check sources: `imis_campaigns` action="list_sources" — which channels drove the most responses
6. Summarise:
   - Total raised vs goal
   - Number of donors
   - Average gift size
   - Breakdown by appeal and source code
   - Comparison to prior campaigns if data available
