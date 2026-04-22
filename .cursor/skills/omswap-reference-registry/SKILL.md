---
name: omswap-reference-registry
description: Maintains OMSwap chain, dex/aggregator, bridge, and tool registries, including automatic iframe support checks for new URLs. Use when the user asks to add or update a chain, add a DEX or aggregator, add a bridge, add a tool, or asks where to wire new references by blockchain.
---

# OMSwap Reference Registry

## Purpose

Apply consistent edits when the user asks to add a Chain, DEX/Aggregator, Bridge, or Tool.

## Canonical Files

- `src/data/References.json`: master reference objects grouped by `websites`, `bridges`, and `tools`
- `src/data/Chains.json`: chain selector metadata (`id`, `name`, `color`)
- `src/data/XCH.json`, `src/data/BASE.json`, `src/data/ETH.json`, etc.: per-chain lists of IDs by category
- `src/pages/Index.tsx`: UI resolution logic that maps IDs to dropdown options

## Category Mapping

- **DEX/Aggregator** -> add reference under `websites`
- **Bridge/Cross-chain** -> add reference under `bridges`
- **Tool/Community site** -> add reference under `tools`

## Chain File Mapping

- Chia -> `src/data/XCH.json` (chain name `XCH`)
- Base -> `src/data/BASE.json` (chain name `BASE`)
- Ethereum -> `src/data/ETH.json` (chain name `ETH`)
- For any other chain, use `<CHAIN>.json` that matches `Chains.json`

## Required Workflow

1. Identify the requested category (`websites`, `bridges`, or `tools`).
2. Auto-detect iframe support before writing the reference:
   - Run:
     - `node .cursor/skills/omswap-reference-registry/scripts/check-iframe-support.mjs "<url>"`
   - Use the returned `iFrame` boolean value.
   - If detection is uncertain or request fails, set `iFrame` to `false` (safe fallback).
3. Add one canonical object in `src/data/References.json`:
   - `id`: lowercase kebab-case unique key
   - `url`: full URL
   - `name`: short display label
   - `iFrame`: use detected value from step 2
4. For each requested chain, add the new `id` to that chain JSON category list.
5. If a chain file does not yet have that category, create the array.
6. Keep JSON valid, preserve style, and avoid duplicate IDs.
7. Verify with search:
   - reference object exists once in `References.json`
   - ID appears in each intended chain file
8. Run lints for touched files.

## iFrame Detection Rules

`check-iframe-support.mjs` uses response headers to classify iframe support:

- `X-Frame-Options: DENY` or `SAMEORIGIN` -> `iFrame: false`
- `Content-Security-Policy` with `frame-ancestors 'none'` -> `iFrame: false`
- `frame-ancestors *` -> `iFrame: true`
- no blocking headers detected -> `iFrame: true`
- network/SSL/timeout/unknown parsing case -> `iFrame: false` (safe fallback)

## Adding a New Chain

When user asks to add a chain:

1. Add chain metadata in `src/data/Chains.json` with:
   - unique lowercase `id`
   - uppercase `name` shown in UI
   - valid `color` token used by `Index.tsx`
2. Add a new chain file `src/data/<NAME>.json` with at least:
   - `websites`: `[]`
   - `bridges`: `[]`
   - `tools`: `[]`
3. Wire imports/usages in `src/pages/Index.tsx`:
   - import the new chain JSON and logo
   - extend `chainLogos`, `chainWebsites`, `chainBridges`, `chainTools`
4. Ensure chain logo asset exists at `src/assets/chains/<id>.png`.

## Output Contract

After edits, report:

- what was added to `References.json`
- which chain files were updated
- whether any new category arrays were created
- iframe detection result used for each new URL
