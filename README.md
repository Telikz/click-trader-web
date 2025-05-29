# Click Trader

Click Trader is a real-time multiplayer idle clicker and economic simulation game. It features a dynamic player-driven market, idle progression, and real-time competition built on a modern React + SpaceTimeDB stack.

## Getting Started

### Prerequisites

- npm
- Node.js (v16 or higher)
- Bun (for production builds, optional)

 ### Installation

 ```bash
 npm install
 ```

 ### Running Locally

 ```bash
 npm run dev
 ```

 The app will be available at `http://localhost:3000`.

 ### Building for Production

 ```bash
 npm run build
 bun run .output/server/index.mjs
 ```

## Development

- **Linting:** ESLint is configured via `eslint.config.js`.
- **Formatting:** Prettier is included via ESLint plugins.
- **Game Logic:** Reducers defined in the Rust module at `click-trader-server/`.
