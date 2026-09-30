---
name: configuration-packages
description: >-
  Move iMIS configuration between tenants as durable packages. This skill should
  be used when the user says "export our configuration", "copy this to the other
  tenant", "move queries/pages/forms to production", "configuration package",
  "tenant-to-tenant", "deploy to the live site", "import the package", "roll back
  the import", or when transporting queries, content pages, layouts, forms,
  business objects, panels, or client iPart packages from one iMIS instance to
  another. This is iMIS-to-iMIS transport; migrating an EXTERNAL website into
  RiSE belongs to website-migration.
argument-hint: "[export-root-or-package-path]"
---

# Configuration Packages (Tenant-to-Tenant Transport)

Export a working configuration from one iMIS tenant into a durable local package, then import it into another tenant as one gated operation with a persisted rollback manifest. Two tools own the lane: `imis_configuration_export` and `imis_configuration_import`.

## Step 1: Export a Package

```
imis_configuration_export action="plan" contentRootPath="@/AcmeSite" queryRootPath="$/Common/Queries/Acme"   # no-write scope preview
imis_configuration_export action="export_package" contentRootPath="@/AcmeSite" queryRootPath="$/Common/Queries/Acme" packageName="acme-rollout"
```
Seed selectors with the root params (`contentRootPath`, `queryRootPath`) or explicit path arrays (`contentDocumentPathsArray`, `queryPathsArray`, `groupNamesArray`, …). The export walks the selected roots plus discovered dependencies — queries, content folders/pages, content layouts, navigation, forms, business objects, panels, client iPart ZIP packages, notification sets — into a local package with a manifest, per-artifact files, and explicit gaps. Page-discovered dependencies (queries a page binds, form bindings, client packages) are pulled in automatically, so exporting a content root carries its runtime dependencies without listing each one.

Review the returned manifest summary and the `gaps` list with the user before promising the package is complete.

## Step 1a: Seed From the Work Session Instead of Memory

When the configuration was built in an AgentZ session, pass `workSessionId={sessionId from imis_agentz_work_session index/search}` to `plan` or `export_package`. Every configuration artifact the session recorded is proposed as a selector and merged with any arrays you pass; `workSessionSeed` in the result lists what was seeded per selector and `unmapped` refs (data records such as parties are left out on purpose — they are not configuration). Review the proposed selectors in `plan` before exporting. If a selector path does not resolve, the gap carries `suggestions` ranked from the same folder ("Did you mean …") — use the exact suggested path rather than guessing again.

## Step 1b: Read the Closure Report

Every `export_package` result carries `closure` and the manifest carries `closureReport`. The export scans what the packaged artifacts reference (IQD sources, panel Business Objects, page layouts/assets/content types, client-iPart runtime queries, automation/notification keys) and pulls the missing custom Business Objects, queries, layouts, assets, and sibling client packages in automatically (`closure.promotionRounds` shows what each round added).

- `closure.status = "closed"` → every reference is packaged, an iMIS built-in, acknowledged, or a listed per-tenant prerequisite. Read `closure.prerequisites` anyway: groups, access areas, communication templates, and query FOLDER sources must exist on the target — they are never transported.
- `closure.status = "open"` (result status `exported_with_unresolved_references`) → `closure.unresolved` lists what could not be packaged or classified, each with `howToClose`. Either add the selector it names and re-export, or — when the target is known to already hold it — re-export with `acknowledgedExternalPrerequisitesArray=["<kind>:<identity>"]`. An open package is REFUSED by import.
- Switching a lane off (`includeQueryDefinitions=false`, `includeRawDocuments=false`) counts as acknowledging that lane's references; they are listed under `closure.acknowledged` with the flag as the reason.

## Step 2: Plan Before Import (no writes)

```
imis_configuration_import action="plan" packageRoot={package folder}
```
Read-only: shows what the package contains, per-artifact import lanes, what will be created vs. what already exists on the target, and the exact `confirmationText` the import requires. (Point at the package with `packageRoot` — the package folder — or `packageManifestPath` — the MANIFEST.json.)

- **Target folders are checked before anything is written.** `targetFolders[]` classifies every folder a query or document will be written into as `ready`, `creatable` (the import creates the missing segments and records them for rollback — including root-level `$/...` folders), or `blocked` (the path runs through a non-folder document, or the tenant cannot resolve it). Operations under a blocked folder are `blocked_target_folder` with the reason and `suggestedRewrites`; they are skipped as gaps until you re-plan with `pathRewritesObject={ "<blocked folder>": "<readable folder>" }` (queries can also use `targetQueryRootPath`). A rewrite rebinds the confirmation text.
- **Byte-copied content cannot follow the import.** `contentReferenceImpacts[]` lists references that a client iPart ZIP holds inside its files: a query it fetches by source id (`identity_reassigned` — the target assigns a new id; after import `resolvedTo` carries the target id) or by a path a rewrite moved (`path_rewritten`). The ZIP bytes are not rewritten; update the package content (or reference queries by path) and re-deploy it, otherwise the runtime reference dangles.

## Step 3: Import (gated, per-artifact routing)

```
imis_configuration_import action="import_package" packageRoot={package folder} confirmationText="{exact text from plan}"
```
- Make sure the ACTIVE connection is the TARGET tenant first (import always writes to the active connection) — confirm with `imis_connection_status`.
- Each artifact kind is routed through its guarded owner lane (queries through the query writer, forms through the form writer, layouts before the pages that bind them, client ZIPs as packages); source→target keys are remapped incrementally so imported pages point at imported dependencies.
- **Collision handling is per-lane and defaults to SKIP existing.** An artifact that already exists on the target is left untouched unless you set that lane's `overwriteExisting*` flag (`overwriteExistingDocuments`, `overwriteExistingForms`, `overwriteExistingTaskDefinitions`, `overwriteExistingContentLayouts`, `overwriteExistingClientIpartPackages`, `overwriteExistingGroups`, `overwriteExistingNotificationSets`, `overwriteExistingBusinessObjects`, `overwriteExistingPanelDefinitions`, `overwriteExistingPanelRecords`) to `true` — an overwrite captures a pre-write backup of each replaced artifact. There is no single create/skip/overwrite mode. **Updating an installed configuration** (a newer version of the same package on a tenant that already holds an older one) is exactly this: plan and import with every definition lane's `overwriteExisting*` flag set (leave `overwriteExistingPanelRecords` off unless the seed rows themselves should be replaced); the rollback manifest then restores each replaced artifact to its pre-update bytes, and a BuildHub receipt stamped for the update records the install it `supersedes`.
- The result reports per-artifact outcomes (`imported` / `updated` / `skippedExisting` / handoff); a run that skipped existing artifacts returns `imported_with_skips`. Treat any skipped entry as an INCOMPLETE import — the target keeps its existing copy — unless the user explicitly accepts that. A rollback manifest is persisted alongside the package.
- **Re-running one lane** (for example seeding panel rows after the Business Objects exist): pass `lanes=["panelRows"]` — a positive include-list that runs only the named lanes (`queries`, `clientIpartPackages`, `contentLayouts`, `contentPages`, `documents`, `navigation`, `businessObjects`, `panelDefinitions`, `panelRows`, `forms`, `lookupTables`, `notificationSets`, `taskDefinitions`, `groups`). Do not combine `lanes` with `include*` flags; the call is refused rather than merged. Changing the lane selection changes the confirmation text, so plan again.
- **Business Objects pick their writer per object.** The plan routes a generated Single/Multi definition with no Expression Builder properties through REST (`lane: rest`) and only uses the native BOD + BOA publish lane when the definition needs it; each planned operation states `lane` and `laneReason`. Force one lane for the whole package with `businessObjectLane="rest"|"native"` when you have a reason (a forced lane with no matching file is a gap, never a silent fallback).
- **Tampered packages are refused.** `plan` re-hashes every file the manifest records (`integrity`); a mismatch, missing, or unreadable file returns `blocked_package_integrity` with the offending paths and nothing is written — re-export rather than importing altered bytes. Packages exported before per-file hashes existed report `not_recorded`.
- **Query-source IQDs import after the queries they reference.** The plan orders them and lists the dependency under `prerequisites`; on import the referenced query's id is remapped to the one just created (or kept when the target already holds that exact query) and the IQD is re-emitted through the query builder (the result names the re-emit `writer` and lists each change under `querySourceRemap`). A reference that is neither packaged nor on the target is an `unresolved_query_source` gap — the IQD is not written pointing at nothing.
- **Open packages are refused.** If the manifest closure report is open, `plan` and `import_package` return `blocked_open_closure` with the unresolved list and no confirmation text. Prefer fixing the export; `acceptUnresolvedReferences=true` is only for a target already known to hold the unresolved references, and it rebinds the confirmation.
- **Failures do not cascade.** An artifact whose prerequisite failed, was left unverified, or is awaiting a native handoff earlier in the same run is reported as `blocked_by_prerequisite` (with `blockedBy`) and is NOT attempted — fix the named prerequisite, then re-run that lane with `lanes=[...]`. A native BOD whose BOA publish fails cleans up the BOD document it created (or keeps its pre-write snapshot in the rollback manifest if it overwrote one) and reports `orphanCleanup` + `retry` on its gap, so the next attempt is never blocked by an orphan.
- When an export or import result is too large to return inline, the inline packet still carries `counts`, the `gaps` list (kind, name, error), and the `rollback` manifest pointer — read those directly; open the full resource only for per-artifact readback detail.

## Step 4: Verify on the Target

- Re-read imported artifacts on the target (the import result carries readback ids/paths).
- For content pages, verify a rendered route with `imis_rendered_page_audit` after publish — import readback alone does not prove the page renders.
- Navigation placement is returned as an `imis_navigation_items` handoff, not written by the import.
- **Reskin imported design CSS.** Transport is byte-exact and never re-resolves design, so artifacts with baked AgentZ design CSS (selfContained ContentHtml stylesheets, AgentZ Forms Chrome items, `design-tokens.css` in packages) arrive wearing the SOURCE instance's branding. Run `imis_design_system action="reskin_scan"` with `paths` set to the imported document paths, then `preview_reskin` + `reskin` to re-emit those blocks from the TARGET instance's active design set — authored content is preserved byte for byte. Skip this only when source and target deliberately share identical design tokens.

## Step 5: Roll Back an Import (gated)

```
imis_configuration_import action="rollback" rollbackManifestPath={rollback manifest} → plan + confirmationText
imis_configuration_import action="rollback" rollbackManifestPath={rollback manifest} confirmationText="{exact text}"
```
Reverses the import from its persisted manifest in reverse order: created artifacts are deleted with absence readback, overwritten artifacts are restored from their pre-write backups, folders the import created are removed last and only when empty (a folder that gained other content is reported, never cascade-deleted), and forms/navigation reversals that need native steps are returned as handoffs. A stale confirmation (manifest edited or partially rolled back) is refused — request a fresh plan.
- **Business Object deletes are verified by the document index, not by the DELETE status.** Multi-node tenants keep serving a deleted (or freshly created) Business Object from per-node metadata caches for a long time: `BOEntityDefinition/<name>` can answer 200, 404, or an empty 400 on consecutive calls, and the DELETE itself can 500 on a stale node. The rollback row reports `deleted` once no backing document carries the name, with `readback.consistency` = `immediate` or `eventual` (a node still served the stale definition) and the reads it observed. Until those caches expire, a stale node answers row reads for that name with 500 and refuses to recreate the same name — choose a new name rather than retrying a recreate.

## Publishing a Package to BuildHub

A completed export folder can be published to AgentZ BuildHub — the hosted catalogue — as an immutable listed version. Publishing is a two-step gate on the same tool:

```
imis_configuration_export action="publish_plan" packageRoot={package folder} bundleSlug="sponsorship-suite" listingName="Sponsorship Suite" listingVersion="1.0.0" visibility="team"
imis_configuration_export action="publish_package" packageRoot={package folder} confirmation="{the EXACT confirmation string publish_plan returned}"
```

- `publish_plan` stages locally and publishes NOTHING: it refuses an open closure report, refuses a folder that no longer matches its manifest integrity spine, refuses server-side iPart binaries for `public`/`paywalled` visibility, scrubs publisher identity from the bundled manifest (local paths and the source instance URL never leave the machine — the instance becomes a keyed digest), and returns the exact `confirmation` string plus what was scrubbed. Review the plan (listing coordinates, clamped visibility, artifact counts) with the user before confirming.
- `publish_package` requires that exact `confirmation` and performs the upload + store commit. The store clamps visibility to the organisation's BuildHub exposure policy and refuses stale listing states; a `retryable` failure means the staged plan is still valid — retry `publish_package` as-is. A committed version is immutable: publish a new `listingVersion` to change content.
- **Public exposure is checked before anything ships.** `export_package` and `publish_plan` return `publicExposure`: what the package would open to people outside the staff, judged from the importer's own reading of the package (what installs as what, the client iPart endpoints on each page, each query's REST flag and columns, each business object's public permissions, and the access the importer will apply). Anything the importer cannot read or resolve is listed under `notJudged` and blocks like a finding. Who a page or query lets in comes from the grants the export recorded for its access set (per-document Local keys included), so a Local key granting Everyone is judged public. A public page whose app calls contact or user records, a personal-data query open to Everyone over REST, and a staff-style query open to Everyone (E1–E3) refuse `publish_plan` — show the user each finding's `summary` and `change`; fix the package on the source site and re-export, or, only when the user confirms the exposure is intended, re-run `publish_plan` with `acknowledgeExposure` listing every id in `publicExposure.unacknowledged` (findings and `notJudged` items); the staged plan records those ids with the seat and time, and `publish_package` sends that record to the store with the version (`exposureAcknowledgement.recordedByStore` says whether the store kept it). E4 (public writes on a staff-managed business object) and E5 (Everyone Full Control where Read would serve) are warnings. On a target, `imis_configuration_import action="plan"` declares the same findings in plain words for the installer and never blocks on them.
- Publishing requires the iFINITY AgentZ companion (the licensing session rides its bridge). Publishing proves the bundle is stored and listed — never that it installs anywhere; install proof is a target-tenant import like any other package.

## Boundaries

- Access sets are applied on the target by id, by exact name, or (access-settings v2 packages) by an existing set with identical grantees; the importer never creates access sets, so a per-document (Local) access key no target set reproduces is a native step per artifact, and that artifact keeps the target's default access until it is done.
- Business Object deletion during rollback is irreversible (it drops data); the rollback plan requires identity evidence captured at import and will hand off rather than guess.
- A green import is configuration transport proof, not business-behavior proof: verify the consuming surface (rendered page, running query, submitting form) on the target before claiming success.
