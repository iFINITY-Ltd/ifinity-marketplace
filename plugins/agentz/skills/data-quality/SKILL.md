---
name: data-quality
description: >-
  Find and manage duplicate contacts and maintain data quality in iMIS. This
  skill should be used when the user says "duplicate", "merge contacts",
  "clean up data", "find duplicates", "data quality", "duplicate records",
  "same person twice", "merge organisations", or when investigating potential
  duplicate contacts or planning data cleanup.
argument-hint: "[name-or-email-to-check]"
---

# Data Quality & Duplicate Management

Find duplicate contacts and merge records in iMIS to maintain clean, accurate data.

## Key Concepts

- **PartyDuplicate**: iMIS-flagged potential duplicate records
- **OrganizationMerge**: Merge duplicate organisation records (uses `_execute`)
- Merging is **irreversible** — the duplicate record is permanently retired into the survivor

## Step 1: Find Duplicates

### Check System-Flagged Duplicates
```
imis_find_duplicates partyId="12345"
```

### Search by Name/Email
```
imis_find_duplicates firstName="John" lastName="Smith"
imis_find_duplicates email="john@example.com"
```

### List All Flagged Duplicates
```
imis_find_duplicates
```

## Step 2: Review Matches

For each potential duplicate pair, compare:
- Names and email addresses
- Addresses and phone numbers
- Membership status and history
- Group memberships
- Activity/interaction history

Use `imis_entity_get Party/{id}` for detailed comparison of both records.

## Step 3: Merge (with confirmation)

**WARNING**: Merging is destructive and irreversible. Always:

1. **Dry run first**: `imis_merge_contacts survivorId="12345" duplicateId="67890" dryRun=true`
2. **Explain the impact**: Which record survives, what data moves
3. **Get explicit confirmation** from the user
4. **Execute**: `imis_merge_contacts survivorId="12345" duplicateId="67890" dryRun=false`

### Choosing the Survivor
- Keep the record with the most complete data
- Keep the record with the longest history
- Keep the record that's actively used for billing/membership
- The survivor keeps its Party ID; the duplicate's ID is retired

## Notes
- OrganizationMerge works for organisation records
- Individual person merges may need manual data consolidation using entity updates
- Always check both records thoroughly before merging
