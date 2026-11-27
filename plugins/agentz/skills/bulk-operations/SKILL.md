---
name: bulk-operations
description: >-
  Bulk import and batch data operations in iMIS. This skill should be used when
  the user says "import members", "bulk upload", "batch import", "import contacts",
  "import file", "bulk data", "import status", "import log",
  or when working with large-scale data loading operations. This skill builds
  contact import batches from rows, and reads, posts and rolls back ImportBatch
  records; file formats and the File Importer content item belong to
  system-configuration, and record merges belong to data-quality.
argument-hint: "[batch-id-or-action]"
---

# Bulk Import & Batch Operations

Build, inspect, post and roll back import batches in iMIS. AgentZ builds a contact batch from plain rows itself. It does not upload files: a file goes through iMIS's File Importer For Web Services content item, which creates a batch AgentZ can then post and roll back (see system-configuration).

## Key Concepts

- **ImportBatch**: A batch import job with status tracking
- **ImportBatchSummary**: Overview of import batches with counts and status
- **ImportBatchLog**: Detailed log entries for each batch (errors, warnings, successes)
- **ImportFileType**: Defines the format and field mapping for an import

## Step 1: Check Available Import Types and Batches

```
imis_import_operations_profile action="inventory"
```
Read-only; does not upload or post. Shows what import setup and batches exist (contacts, events, donations). Batches and logs are listed as summaries: each batch shows its id, name, type, status, dates and row count, never the people in its rows or its Results, and log rows leave out their imported Data. To see one batch's rows, read that batch (Step 3 or `get`).

## Step 2: Build a Contact Batch From Rows

```
imis_import_setup action="preview_create_batch_from_rows" rowsArray=[{"firstName":"Ann","lastName":"Lee","email":"ann@example.org","memberType":"NM"}] → action="create_batch_from_rows" rowsArray=[...same rows...] confirmationText="{exact text from preview}"
```
Up to 50 rows; AgentZ builds the typed contact batch (a PartyDataCollection of PersonData rows), validates it with ImportBatch/_validate and reads it back. Financial batch types are refused. For a file, staff upload it with the File Importer For Web Services content item in iMIS, which creates the batch instead.

## Step 3: Monitor Import Status

```
imis_import_operations_profile action="batch_status" batchId="BATCH-001"
```
Returns both the batch record and its log entries showing progress, errors, and warnings.

## Step 4: Post and Review Results

### Post a Batch (gated)
```
imis_import_processing action="plan_post_batch" batchId="BATCH-001" → imis_import_processing action="post_batch" batchId="BATCH-001" confirmationText="{exact text from plan}"
```
Read `imis_import_operations_profile action="batch_post_plan" batchId="BATCH-001"` first for the guarded plan context. Re-posting an already-Posted batch requires `allowRepost=true` on `imis_import_processing` and risks duplicate target records. Then confirm with `imis_import_operations_profile action="target_readback" batchId="BATCH-001" targetEntity="Party" identifiersArray=[...]` (API-created batches have no log identifiers, so pass the identifiers explicitly). A completed post is not proof the target records exist — verify the target records. `post_batch` lists the ids iMIS reports creating (`postedRecords`): pass them as `identifiersArray`.

### Roll Back a Contact Batch (gated)
```
imis_import_processing action="plan_rollback_execute" batchId="BATCH-001" targetEntity="Party" identifiersArray=[postedRecords ids] → imis_import_processing action="rollback_execute" batchId="BATCH-001" targetEntity="Party" identifiersArray=[...] confirmationText="{exact text from plan}"
```
Each contact is deleted and read back as not found; financial rows stay manual handoffs to their owning tools.

### Get Batch Details
```
imis_import_operations_profile action="batch_status" batchId="BATCH-001"
```
(or `imis_import_setup action="get" entity="ImportBatch" id="BATCH-001"` for the setup record)

## Troubleshooting Imports

When an import fails or has errors:
1. Check the batch status: `imis_import_operations_profile action="batch_status" batchId={id}` then `action="diagnostics_error_packet" batchId={id} importBatchLogId={logId}`
2. Review log entries for specific error messages
3. Common issues: duplicate records, missing required fields, invalid data formats
4. For duplicate issues, use `imis_duplicate_resolution` to investigate
