---
name: imis-domain-knowledge
description: >-
  iMIS EMS Cloud domain knowledge and agent routing contract. Use for every
  iMIS task to classify intent, name target surfaces, discover live shape,
  choose the lowest-risk MCP writer, verify results, and leave a handoff packet
  so the next agent does not reverse-engineer iMIS from scratch.
when_to_use: >-
  Trigger on any request involving iMIS, RiSE, IQA/IQD, content, iParts,
  navigation, Business Objects, panels, contacts, members, events, fundraising,
  finance, commerce, certification, imports, configuration, or client-specific
  custom fields. Load this before specialist iMIS skills.
user-invocable: false
---

# iMIS EMS Cloud — Domain Knowledge

You are connected to **iMIS EMS Cloud**, an association and membership management system used by nonprofits, professional associations, and membership organizations. Think in iMIS terms, not generic REST API terms.

## Claude Plugin Routing Contract

This skill is the durable context entrypoint for the plugin. Claude Code loads plugin components from the root-level `skills/`, `commands/`, `agents/`, `hooks/`, and `.mcp.json` files; root `CLAUDE.md` files are not plugin context. Therefore, any learned iMIS rule that another agent needs must live in a tool contract, this skill, a specialist skill, a slash command, or the agent prompt.

## Cowork Inline Presentation Contract

When running in Claude Cowork and the `show_widget` inline chat visualization tool is available, present iMIS task results that require the user to read, compare, choose, approve, or act as an inline widget in the conversation. This applies to sitemap/SEO/a11y audits, rendered page evidence, content and iPart change plans, IQA/source comparisons, publish checklists, excluded findings, remediation queues, and any call-to-action matrix.

Use `show_widget` as the primary surface with compact summary cards, filterable/detail rows, severity or status chips, evidence links/paths, and follow-up buttons for predictable actions. Do not use `create_artifact` for those boards in Cowork. A saved HTML, DOCX, CSV, or other export can be offered only as a secondary deliverable when the user asks for a file or when a file is the explicit deliverable; still render the actionable board inline first.

Do not apply this as a hard requirement in Claude Code, CLI, or other runtimes where `show_widget` is not loaded. In those environments, preserve the same structure in concise Markdown and ordinary files while making the follow-up actions explicit.

For every iMIS request:

1. Classify intent, surface, grain, and desired output. Use [routing-contract.md](routing-contract.md) to decide whether the work belongs to a domain workflow, raw entity/API lookup, IQA/report tooling, content tooling, a specialist agent, or an implementation packet.
2. For answer-only or operational Party/contact questions, prefer workflow/domain tools before IQA/IQD design. Members, prospects, donors, customers, and organisations are all Party records; do not route them to IQD creation just because the user asks for analysis.
3. For broad cohort work, distinguish an immediate answer from a reusable report/export. If the MCP lacks a compact candidate-list primitive, identify that as a tool gap and use the lowest-noise proven path instead of drifting through unrelated schemas.
4. Discover live shape before writing or integrating. Use `imis_content_discovery` before RiSE/content/navigation/member portal/microsite work to resolve Perspective/site ownership, content roots, website keys, and NAV targets; use `imis_iqa_surface`, `imis_iqa_source_profile`, and `imis_iqa_content_plan` for query/content planning; browse existing `@/`, `$/`, or `~/` artifacts; inspect working examples for serialized XML or IQD graph shapes.
5. For existing content changes, keep backup enabled on the mutating primitive (`imis_document_update`, `imis_page_iparts`, layout replacement, or the relevant writer) so the handoff carries a compact backupRef instead of the full XML payload in chat context.
6. Choose a proven writer: entity tools, `imis_iqd_query`, `imis_document_create`, `imis_document_update`, `imis_content_layouts`, `imis_dashboard_pages`, `imis_navigation_items`, or `imis_page_iparts`. Browser/native iMIS actions are reverse-engineering evidence, not an autonomous agent contract unless the tool returns a user-intervention packet.
7. Verify and hand off with exact paths, IDs, source aliases, display aliases, iPart keys, backupRef, publish state, preview/browser/test evidence, risks, and unresolved proof gaps.

Do not preserve demo-specific workflows as permanent code paths. If a shape is not yet synthesizable, find or create a representative iMIS example, inspect it, extend the relevant writer, and prove it with the strongest available signal.

For complete terminology, see [glossary.md](glossary.md).
For entity relationships and lifecycles, see [data-model.md](data-model.md).
For API conventions and tool selection, see [api-patterns.md](api-patterns.md).
For exact agent/tool/workflow routing rules, see [routing-contract.md](routing-contract.md).
For agent handoffs and proof packets, see [agent-delivery-contract.md](agent-delivery-contract.md).
For UK-specific features (Gift Aid, VAT, Direct Debit), see [uk-localisation.md](uk-localisation.md).
For implementation partner guidance, see [implementation-guide.md](implementation-guide.md).

## Official iMIS Product Documentation

The `imis-docs` connector provides searchable access to 1,200+ articles from the official iMIS help site (help.imis.com). These cover product features, configuration, and UI workflows — not API/developer reference. Use it when you need to:
- Explain how to configure something in the iMIS UI that the API cannot do (e.g., IQA query creation, page layouts, SSO setup, payment gateway configuration)
- Look up iMIS feature behaviour, settings options, or step-by-step UI workflows
- Provide accurate guidance on RiSE website design, billing cycle setup, process automation, form builder, or commerce configuration
- Answer "how does this work in iMIS?" questions with official product documentation rather than assumptions

This is product documentation for iMIS administrators and users, not API/developer reference.

The `imis-docs-dev` connector provides searchable access to the iMIS developer documentation (developer.imis.com) — 2,115 API reference pages, 72 developer guides, and 17 Swagger specs. Use it when you need to:
- Look up exact API endpoint behaviour, request/response formats, or field definitions
- Verify which operations an entity supports or check `$type` values for entity creation
- Find data contract details, filter syntax, or special endpoint parameters
- Reference Swagger/OpenAPI specs for a specific API module (accounting, events, party, etc.)

## Quick Reference

- **Party** = Contact/Person. Use `$type` for PersonData (individual) vs InstitutionData (org).
- **Subscription** = Membership dues. Active = `PaidThrough > today`. Composite key: `PartyId~ItemId`.
- **Group** = Committee or Chapter. Members via GroupMember (key: `~GroupId|PartyId`).
- **EventRegistration** = Use `_execute` to create. Key: `EventId~PartyId`.
- **Document** = Content/CMS item. `Path` field is REQUIRED for creation.
- **Perspective** = native RiSE site record. Content folders assign site ownership with `DefaultWebsiteKey` and `AdditionalWebsiteKeys`; NAV rows inherit that ownership through their target content path.
- **GenTable** = Lookup/dropdown values. Key: `~TableName|Code`.
- **IQA** = Intelligent Query Architect — the primary reporting tool.

## Agent Delivery Rule

Every iMIS task should leave a surface-agnostic proof trail: intent class, target surfaces, iMIS paths/keys, data/query contract, content/iPart contract when applicable, verification evidence, risks, and unresolved proof gaps. Use [agent-delivery-contract.md](agent-delivery-contract.md) as the standard packet format before handing work to another agent or reporting completion.

## User Language Translation

When users say "member" they mean a Party with active Subscriptions. "Dues" = Subscription products. "Chapter" = Group with Chapter class. "Committee" = Group with Committee class. "Renewal" = updated PaidThrough dates. "Lapsed" = PaidThrough < today. "Panel" = custom data table. "Page" = Document in Document System. "Dropdown values" = GenTable entries.
