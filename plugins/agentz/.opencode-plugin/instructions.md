# iFINITY AgentZ operational instructions

Use the relevant AgentZ skills for iMIS work; load `imis-domain-knowledge` first when the target surface is unclear or spans domains. Treat tool readback as evidence only for the surface it actually verifies, and never include credentials, access tokens, or unnecessary personal data in reports.

## Calling AgentZ tools through Code Mode

OpenCode lists only a few AgentZ tools in its Code Mode catalog. The others exist; look them up instead of guessing a name or a parameter.

1. Inside `execute`, call `search({ namespace: "agentz", query: "<what you want to do>" })`. `search` is a top-level function: call it without `await`, and never as `tools.agentz.search`. Each result gives the tool's `path`, `description` and full `signature`.
2. Read the signature, then call the tool by its `path`, for example `await tools.agentz.imis_find_member({ query: "Murphy" })`. Use the parameter names from the signature exactly. A parameter whose name ends in `Json` takes a string: pass `JSON.stringify(value)`.
3. When a call is rejected, the error names the accepted keys or the tool's signature. Correct the call from that text; do not try variations.
4. Servers with a hyphen in the name use bracket paths: `tools["imis-docs"].search_docs(...)`.

Where to start:

- What an area can do, and what needs approval: `imis_capability_guide` with `area`.
- Find a person: `imis_find_member` (name, email or Party ID). For a cohort, `imis_party_search_compact`.
- Find a saved query and its path: `imis_iqa` with `action: "surface"` and `liveCheck: true`, then run the returned path with `imis_query`. Do not build query paths from names.
- Build or change a query: call `imis_iqd_query` with `action: "capabilities"` first; it returns the design shape the writer accepts.
- Events: `imis_event_360` to read; `imis_manage_event_setup` to create (`eventDesignJson`) or update (`setupPatchJson`).
- Any write: preview first, submit with the exact `confirmationText` the preview returned, then report only what the readback proves.

OpenCode does not execute Claude-style prompt hooks. The canonical guards below are therefore always-on instructions for equivalent AgentZ MCP tool calls.

## Guard 1

Canonical Claude matcher: `^mcp__(?:agentz|plugin_agentz_agentz)__imis_entity$`. In OpenCode, apply this to the equivalent `agentz_*` MCP tool.

This is the generic imis_entity escape hatch. ALLOW the call; never block it. You see only this tool call, never the conversation, so you cannot judge whether the person asked for it: consent is asked in the chat, and the MCP's own preview-bound confirmation is the gate. Reads (get, list, changelog) and validate are non-mutating. For create, update, delete, or execute, the MCP enforces a purpose-owner map before network I/O: if a purpose-built tool owns that entity/operation, raw mutation is denied and the returned owner tool/action must be used. Never encourage a retry that bypasses that owner (the same record under another entity name, or another raw route). Removing a contact (Party, Person or Organization) is owned by imis_party_profile action=preview_remove_contact then remove_contact; the raw delete is denied. Raw execute is default-deny unless the operation is explicitly allowlisted. Every raw write is two-step: a call without confirmationText writes nothing and returns the record preview and its exact confirmationText (of the form `DELETE IMIS ENTITY <EntityType>/<id> #<hash>`: the operation, `IMIS ENTITY`, the EntityType/id and a hash binding the record as read); only the second call, carrying that exact text, writes, and the MCP refuses any other text. When this call carries a confirmationText, remind the agent in your response that it sends that text only after asking the person in chat about that EntityType/id, and that it claims success only from the MCP's readback.

## Guard 2

Canonical Claude matcher: `^mcp__(?:agentz|plugin_agentz_agentz)__imis_(page_builder|page_iparts|content_layouts|client_ipart_package|app_theme_package)$`. In OpenCode, apply this to the equivalent `agentz_*` MCP tool.

This tool generates or places visual content for the organisation. ALLOW the call — never block — but check: has the org design system been resolved this session (imis_design_system action='get')? If NOT, and this call composes visual output (HTML/CSS, layout markup, chart colours, fonts), remind the agent in your response to resolve imis_design_system first and apply its tokens, usage semantics, and language rules to any markup it authors. Generator-side chrome already consumes the tokens server-side; this nudge covers agent-authored markup. Always allow the tool call itself to proceed.
