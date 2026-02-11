# OMSwap 🔄

A powerful side-by-side DEX (Decentralized Exchange) and bridge comparison tool that allows you to compare multiple trading platforms and bridges across different blockchain networks in a single view.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-omswap.vercel.app-blue?style=flat-square)](https://omswap.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

- **Side-by-Side Comparison**: View two DEXes or bridges simultaneously in a split-screen interface
- **Multi-Chain Support**: Switch between 7+ blockchain networks seamlessly
- **Comprehensive DEX Directory**: Access to multiple decentralized exchanges per chain
- **Bridge Integration**: Compare cross-chain bridges for asset transfers
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smart Embedding**: Automatically detects and handles sites that don't support iframe embedding
- **Chain-Themed UI**: Dynamic color themes based on selected blockchain

## 🚀 Live Demo

Visit the live application: **[omswap.vercel.app](https://omswap.vercel.app/)**

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/omswap.git
cd omswap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

Preview the production build locally:
```bash
npm run preview
```

## 🌐 Supported Chains

- **XCH** (Chia Network)
- **ETH** (Ethereum)
- **BASE** (Base Layer 2)
- **BSC** (Binance Smart Chain)
- **PLS** (PulseChain)
- **S** (S Network)
- **ADA** (Cardano)

Each chain includes multiple DEXes and bridge options that can be compared side-by-side.

## 📖 Usage

1. **Select a Chain**: Use the chain selector in the center of the toolbar to choose your blockchain network
2. **Choose Left Panel**: Click the dropdown on the left to select a DEX or bridge
3. **Choose Right Panel**: Click the dropdown on the right to select another DEX or bridge for comparison
4. **Compare**: View both platforms side-by-side to compare rates, interfaces, and features
5. **Open in New Tab**: For sites that don't support embedding, click the "Open in new tab" button

## 🎨 Features in Detail

### Smart Embedding Detection
The app automatically detects which sites support iframe embedding. For sites that block embedding (like KyberSwap, Matcha, etc.), it provides a convenient button to open them in a new tab.

### Chain-Specific Theming
Each blockchain network has its own color theme that dynamically updates the UI borders and accents for a cohesive experience.

### Mobile Responsive
The interface adapts to mobile devices by stacking the panels vertically instead of side-by-side.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Chains or DEXes

To add support for a new chain or DEX:

1. Add chain data to `src/data/Chains.json`
2. Create a new JSON file in `src/data/` with the chain's DEXes and bridges
3. Add the chain logo to `src/assets/chains/`
4. Update the imports in `src/pages/Index.tsx`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Application**: [omswap.vercel.app](https://omswap.vercel.app/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/omswap/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/omswap/discussions)

---

Made with ❤️ for the DeFi community
