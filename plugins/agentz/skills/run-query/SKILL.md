---
name: run-query
description: >-
  Execute and analyze existing iMIS IQA queries and reports. Use when the user
  explicitly asks for an IQA/query/report/export, when the desired output is a
  reusable report, or when the routing contract selects IQA for broad cohort
  joins or aggregation. Do not use this merely because the user says "pull the
  data" if a Party/domain workflow tool answers the question more directly.
argument-hint: "[query-path] [filters]"
---

# IQA Query Execution

Run and analyze iMIS Intelligent Query Architect (IQA) queries. This is the
right path for existing reports, reusable report outputs, exports, complex joins,
and aggregation. It is not the default path for Party-scoped support questions.

## Step 1: Find the Query

If a query path is provided in $ARGUMENTS, use it directly.
Otherwise, help the user find the right query:

1. Browse available queries: `imis_document_browse` with path `$/Common/Queries/`
2. Common query locations:
   - `$/Common/Queries/ContactManagement/` — Contact/member queries
   - `$/Common/Queries/Commerce/` — Financial queries
   - `$/Common/Queries/Events/` — Event queries
3. Present available queries and let the user choose

## Step 2: Execute the Query

Use `imis_query` with:
- `queryPath`: the full query path (e.g., `$/Common/Queries/ContactManagement/AllContacts`)
- `queryDocumentVersionKey`: preferred when a `DocumentSummary.DocumentVersionId` is known and the query path may change
- `limit`: default 100, increase if the user wants more results
- `offset`: for pagination
- `parameters`: JSON object for runtime prompt values
- `queryUrlParameters`: JSON object or literal query string for URL-dependent filters

Note: Queries must have "Available via the REST API" enabled in iMIS. If a query returns an error about access, inform the user.

## Step 3: Analyze Results

Present results in a clear format:
- Total record count
- Column headers with data types
- First N rows in a readable table
- Summary statistics if applicable (counts, totals, averages)

If the user asks follow-up questions about the data:
- Re-run with different filters
- Cross-reference with entity tools for detail
- Suggest related queries

## Tips
- The modern Query endpoint (`/api/Query`) returns flat JSON — preferred
- Falls back to legacy IQA endpoint if needed
- Legacy IQA ordered prompts use repeated `Parameter` values; the Query endpoint uses named prompt/search-label parameters
- Required Query endpoint prompt filters are enforced by iMIS
- Max 500 records per page — use pagination for larger datasets
- For very large datasets, suggest breaking into smaller filtered queries
