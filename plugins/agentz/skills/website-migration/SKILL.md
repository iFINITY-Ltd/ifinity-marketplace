---
name: website-migration
description: >-
  Migrate an external client website into iMIS RiSE. This skill should be used
  when the user says "migrate our website", "move our site into iMIS", "website
  migration", "crawl our site", "import our web pages", "rebuild our site in
  RiSE", "site migration project", or when moving pages, images, and files from
  a non-iMIS website into RiSE content. This skill owns the end-to-end migration
  pipeline (crawl → classify → map → preview → write → rollback); building new
  pages from scratch belongs to rise-website-design, and moving configuration
  BETWEEN iMIS tenants belongs to configuration-packages.
argument-hint: "[source-url-or-project-id]"
---

# External Website Migration into RiSE

Migrate a client's external website into iMIS RiSE through one tool — `imis_website_migration` — as a durable, resumable project with explicit approval gates. Every phase produces evidence; nothing writes to iMIS without an exact confirmation.

## The Pipeline

```
create_project → crawl → classify → map → preview_batch → write_batch → (rollback_batch if needed)
```

## Step 1: Create the Project

```
imis_website_migration action="create_project" projectName="Acme Society" sourceOrigin="https://www.example.org"
```
The project persists locally and survives across sessions (`action="list_projects"` / `action="get_project"` to resume). Saving an iMIS TXT snapshot of the project is optional and gated behind its own exact `confirmationText`.

## Step 2: Crawl the Source Site (no iMIS writes)

```
imis_website_migration action="crawl" projectId={id}
```
Robots-respecting, GET-only, anonymous: it inventories pages, assets, and redirects with titles, headings, content hashes, and risk flags, and persists the stylesheets the pages link (plus one level of `@import`; every stylesheet origin's robots.txt is obeyed). It cannot crawl login-protected areas or execute page JavaScript — client-rendered or authenticated content is flagged for manual review, never guessed.

### Optional: Capture the Source Brand (no iMIS writes)

```
imis_website_migration action="brand_capture" projectKey={id}
```
A source that answers 403 to every request, robots.txt included, stops the crawl at the first page, recorded as forbidden (`authPostureCounts.forbidden`), so brand_capture has no page to read: use another public site of the brand or ask the person; never work around the refusal.

Offline over the persisted crawl: a static CSS cascade reads the header, navigation, button, link and heading colours, the font stacks and `@font-face` files, and the header logo of one page (default the home page; pass `pageUrl` or `pageId` for another). Pin an element with `brandSelectors` (`header`, `navigation`, `button`, `logo`, `footer`) when the default pick is wrong. The result carries `proposedTokens` (a full DesignTokensV1), `validation`, per-token `evidence`, `observations` (hover colours included), `unresolved` (colours painted by images, missing roles), `brandReview` and a `nextCall` to `imis_design_system action="preview_update"`. Secondary and accent come from the observed header, navigation and footer bands, headings and hover states. `brandReview.notFromYourBrand` names each brand colour left at an AgentZ default with the observed candidates: tell the person those are not from their brand. `brandReview.substitutions` names what was not carried over: the source's licensed web fonts become open-licence families (system or Google Fonts), and the logo is left for upload with `imis_site_assets`; nothing is hot-linked from the source site. `crawl` and `brand_capture` read the external website, not iMIS: their `imisPersistence` (`not_applicable`, `external_website`) and `localPersistence` (the project file) say so. Saving the set and generating a matching App Theme belong to the design-system skill.

## Step 3: Classify and Map

```
imis_website_migration action="classify" projectId={id}
imis_website_migration action="map" projectId={id} targetRootPath="@/Migrated/acme"
```
Classification sorts pages into migration patterns (landing, article, directory, form candidate, events, donation, member-only, …) with a manual-review queue for low-confidence rows. Mapping produces a dependency-ordered target plan (folders → assets → pages → navigation) under the target root, which must be an `@/` path for page and folder rows. When folders in the target root chain are missing, `preview_batch` adds them as folder rows covered by the same approval.

## Step 4: Preview a Batch (no iMIS writes)

```
imis_website_migration action="preview_batch" projectId={id} batchSize=10
```
Returns the ordered rows, read-only target-collision checks, unsupported patterns, a rollback strategy, and the exact `confirmationText` that `write_batch` requires. Review the collisions and unsupported rows with the user before writing.

## Step 5: Write the Batch (gated, create-only)

```
imis_website_migration action="write_batch" projectId={id} batchId={id} confirmationText="{exact text from preview_batch}"
```
- **Create-only**: an existing page at a target path fails that row (never overwritten); an existing published folder is reused; a non-reusable folder collision refuses the whole batch before the approval is consumed.
- The approval is **single-use** and drift-checked: if the plan or live target state changed since the preview, the write refuses — run `preview_batch` again.
- Every created artifact is independently read back. Eligible navigation rows are written through `imis_navigation_items` and verified for target, parent and SortOrder; a row it cannot write (for example the sitemap root, or a menu label that cannot name a sitemap folder) is returned as a handoff.
- Batches containing folder rows need the connected companion; the tool tells you before consuming the approval if it is unavailable.

## Step 6: Roll Back if Needed (gated)

```
imis_website_migration action="rollback_batch" projectId={id} batchId={id}
→ returns the rollback plan + confirmationText
imis_website_migration action="rollback_batch" projectId={id} batchId={id} confirmationText="{exact text}"
```
Deletes ONLY artifacts this writer created, in reverse order (navigation rows it wrote are recycled first), with per-artifact absence readback. Pre-existing reused folders and handoff rows are never touched. A partially failed rollback is resumable — re-run it; already-verified deletions are not repeated.

Before deleting a folder it created, the rollback lists everything the folder still holds, never-published (Working) pages included. A folder holding anything this batch did not create is kept: the plan row reads `retain_shared` with the contents listed in `foreignChildren`, the executed row reads `folder_retained_shared`, and the rollback ends `rolled_back_shared_folders_retained`. Re-run `rollback_batch` once those contents are gone (for example after the other batch's rollback) to remove the folder.

## Boundaries and Verification

- A successful `write_batch` proves artifact creation + readback, NOT that the migrated site renders, routes, or redirects correctly. Run `action="qa_batch"` for a written batch (rendered plus anonymous HTTP evidence, persisted on the project) or `imis_rendered_page_audit` per target page.
- Migrated pages keep absolute source URLs for internal links (watchlisted, not rewritten); plan a link-rewrite pass before launch.
- In a multi-batch project that shares a folder between batches, roll back newest-first: an older batch's rollback keeps a shared folder while another batch's contents are in it (`folder_retained_shared`).
- `action="watchlist"` lists the project's launch obligations (for example internal links pointing at the source site); redirect/SEO parity and post-launch monitoring are launch tasks outside this tool.
