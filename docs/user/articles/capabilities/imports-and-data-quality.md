---
lastUpdated: 2026-11-20T20:44:31-05:00
title: "Imports and data quality"
description: "What AgentZ can do with import batches and duplicate records in iMIS."
describes: [src/tools/imports/**, src/tools/data-quality/**, src/services/imports/**, src/services/data-quality/**]
sidebar:
  order: 11
---

AgentZ adds up to 50 contacts at a time from the names and email addresses you give it, posts and rolls back import batches and explains why an import failed. It finds possible duplicates and merges them once you have reviewed both records.

## Imports

AgentZ adds up to 50 contacts without a file, posts and rolls back import batches, and checks what an import did.

**What AgentZ does:**

- AgentZ imports up to 50 contacts from the names and email addresses you give it, and warns you about possible duplicates first.
- AgentZ posts an existing import batch after iMIS has checked it, and lists the contacts it created.
- AgentZ rolls back an import of contacts.
- AgentZ shows import batches and their logs, and explains why an import failed.
- AgentZ checks that imported records exist, compares their details for contacts, gifts and orders, and tells you which details it could not compare.
- AgentZ retries a batch that failed.

**Needs your approval:**

- Before AgentZ creates, posts, retries or rolls back an import batch, or changes import setup, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot upload an import file or spreadsheet; create the batch with the **File Importer For Web Services** content item in iMIS, and AgentZ then posts it and rolls it back.
- AgentZ cannot build gift, dues, order or payment batches from rows, or roll back financial imports; reverse those through the gift, return and refund steps.
- AgentZ cannot post individual rows of a batch again once iMIS has posted the batch; create a new batch for those rows.
- AgentZ cannot change import mappings, or schedule, pause or resume imports; do those in iMIS.

## Duplicates

AgentZ finds possible duplicate contacts and organisations, and merges them once you review them.

**What AgentZ does:**

- AgentZ finds possible duplicates.
- AgentZ prepares a merge of two contacts or two organisations, so that you review both records first.
- AgentZ merges them after you approve the merge, and checks both records afterwards.
- AgentZ marks two records as not being duplicates.

**Needs your approval:**

- Before every merge, AgentZ asks you to approve it, because a merge is permanent and cannot be undone.
- Before AgentZ marks records as not being duplicates, it asks you to approve it.

**What AgentZ does not do:**

- AgentZ cannot undo a merge.
- AgentZ cannot guarantee that every related record, household link and custom panel moved across; check them after the merge.

## Examples

:::example
**Ask:** "Why did yesterday's import batch fail? Show me the rows that went wrong."

You see the batch, its log and the reason for each failed row, read from iMIS.
:::

:::example
**Ask:** "Find contacts who share an email address with another contact, and prepare a merge for the first pair. Don't merge anything yet."

You see the possible duplicates and both records of the first pair side by side. Nothing is merged until you approve it.
:::

:::faq
**Can AgentZ undo a merge?** No. Review both records before you approve a merge.

**Can AgentZ import our spreadsheet?** Yes, up to 50 contacts from the rows you give it in your AI app. A larger file goes into iMIS through the **File Importer For Web Services** content item, and AgentZ then posts the batch and checks what it did.
:::
