# ExplicitMarket - Trading Platform Dashboard

## Project Overview
A professional MT4-style trading platform dashboard built with React and Vite. Simulates a high-end trading environment for Forex, Crypto, Commodities, and Indices.

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** TradingView Widgets (embedded)

## Project Structure
- `src/App.tsx` - Root component with routing and auth guards
- `src/lib/store.tsx` - Global state, market simulation engine
- `src/lib/types.ts` - TypeScript interfaces
- `src/pages/` - Main page views (Dashboard, TradePage, Admin, Wallet, etc.)
- `src/components/trading/` - Specialized trading components (Chart, OrderPanel, MarketWatch)

## Running the Project
- **Dev server:** `npm run dev` (runs on port 5000)
- **Build:** `npm run build`
- **Preview:** `npm run preview`

## Replit Configuration
- Vite configured to bind to `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy compatibility
- Workflow: "Start application" runs `npm run dev`
