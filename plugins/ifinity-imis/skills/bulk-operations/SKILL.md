---
name: bulk-operations
description: >-
  Bulk import and batch data operations in iMIS. This skill should be used when
  the user says "import members", "bulk upload", "batch import", "import contacts",
  "mass update", "import file", "bulk data", "import status", "import log",
  or when working with large-scale data loading operations.
argument-hint: "[batch-id-or-action]"
---

# Bulk Import & Batch Operations

Manage bulk data imports in iMIS — member lists, event registrations, donation records, and more.

## Key Concepts

- **ImportBatch**: A batch import job with status tracking
- **ImportBatchSummary**: Overview of import batches with counts and status
- **ImportBatchLog**: Detailed log entries for each batch (errors, warnings, successes)
- **ImportFileType**: Defines the format and field mapping for an import

## Step 1: Check Available Import Types

```
imis_import_file_types action="list"
```
Shows what import formats are configured (contacts, events, donations, etc.).

## Step 2: Create an Import Batch

```
imis_import_batch action="create" fileTypeId="CONTACT_IMPORT"
```

## Step 3: Monitor Import Status

```
imis_import_batch action="status" batchId="BATCH-001"
```
Returns both the batch record and its log entries showing progress, errors, and warnings.

## Step 4: Review Results

### List All Batches
```
imis_import_batch action="list"
```

### Get Batch Details
```
imis_import_batch action="get" batchId="BATCH-001"
```

## Troubleshooting Imports

When an import fails or has errors:
1. Check the batch status: `imis_import_batch action="status" batchId={id}`
2. Review log entries for specific error messages
3. Common issues: duplicate records, missing required fields, invalid data formats
4. For duplicate issues, use `imis_find_duplicates` to investigate
