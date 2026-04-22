# OMSwap 🔄

OMSwap is a side-by-side DeFi comparison app for discovering and opening DEXes, aggregators, bridges, and ecosystem tools by chain.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-omswap.app-blue?style=flat-square)](https://omswap.app/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

- **Split-screen comparison**: Open two destinations at once for quick side-by-side checks
- **Multi-chain support**: Chain-specific lists of DEXes, bridges, and tools
- **Smart iframe handling**: Uses per-site `iFrame` metadata to decide embed vs. open-in-new-tab
- **Unified reference registry**: Shared canonical references mapped into per-chain menus
- **Chain-themed UI**: Dynamic branding colors and logos based on active chain
- **Mobile-friendly layout**: Panels stack on small screens

## 🚀 Live Demo

Use the app at **[omswap.app](https://omswap.app/)**.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI**: shadcn-ui + Radix primitives
- **Deployment**: Vercel

## 📦 Local Development

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Setup

1. Clone:
```bash
git clone https://github.com/Alvincible/omswap.git
cd omswap
```
2. Install dependencies:
```bash
npm install
```
3. Start development server:
```bash
npm run dev
```
4. Open `http://localhost:5173`

## 🏗️ Production Build

Build:
```bash
npm run build
```

Preview:
```bash
npm run preview
```

## 🌐 Supported Chains

Current chain list is driven by `src/data/Chains.json`:

- **XCH** (Chia)
- **BASE** (Base)
- **PLS** (PulseChain)
- **ETH** (Ethereum)
- **BSC** (BNB Smart Chain)
- **S** (Sonic)
- **ADA** (Cardano)
- **CRO** (Cronos)

## 📖 Usage

1. Select a chain from the center dropdown.
2. Pick destinations for the left and right panels.
3. Compare DEXes/aggregators, bridges, or tools.
4. If a site blocks iframe embedding, use the generated **Open in new tab** button.

## 🗂️ Data Model and Infrastructure

OMSwap is a static, data-driven frontend. The comparison menus are composed from JSON registries:

- `src/data/References.json`: canonical objects for:
  - `websites` (DEXes/aggregators)
  - `bridges` (cross-chain routes)
  - `tools` (ecosystem/community resources)
- `src/data/<CHAIN>.json`: per-chain arrays of reference IDs (for example `XCH.json`, `BASE.json`, `CRO.json`)
- `src/data/Chains.json`: chain metadata (`id`, `name`, `color`)
- `src/pages/Index.tsx`: resolves IDs to full objects and renders chain-specific dropdowns

Each reference object includes:

- `id`: unique key
- `url`: destination URL
- `name`: display label
- `iFrame`: whether embedding is allowed

## 🤝 Contributing

Contributions are welcome.

1. Fork and branch.
2. Make your changes.
3. Run lint/build checks.
4. Open a PR.

### Updating references (DEXes, bridges, tools)

1. Add or update canonical entries in `src/data/References.json`.
2. Add the corresponding `id` to one or more chain files in `src/data/<CHAIN>.json`.
3. If adding a new URL, verify iframe support with:
```bash
node .cursor/skills/omswap-reference-registry/scripts/check-iframe-support.mjs "<url>"
```
4. Set `iFrame` based on the result (fallback to `false` if uncertain).
5. Run:
```bash
npm run lint
```

### Adding a new chain

1. Add chain metadata to `src/data/Chains.json`.
2. Create `src/data/<CHAIN>.json` with `websites`, `bridges`, and `tools` arrays.
3. Add a chain logo in `src/assets/chains/<id>.png`.
4. Wire the new chain in `src/pages/Index.tsx` (imports, logos, and per-chain maps).

## 🔗 Links

- Live Application: [omswap.app](https://omswap.app/)
- Repository: [github.com/Alvincible/omswap](https://github.com/Alvincible/omswap)
- Issues: [GitHub Issues](https://github.com/Alvincible/omswap/issues)

## 📝 License

Released under the [MIT License](LICENSE).
