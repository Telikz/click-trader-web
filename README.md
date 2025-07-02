# Click Trader

Click Trader is a real-time multiplayer idle clicker and economic simulation game. Players click to earn currency, invest in upgrades, and compete in a dynamic, player-driven market. The game is powered by a modern React frontend and a Rust-based [SpaceTimeDB](https://spacetimedb.com/) backend module.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Run a SpaceTimeDB Server](#run-a-spacetimedb-server)
    - [Run Locally](#run-locally)
  - [Linting and Formatting](#linting-and-formatting)
  - [Building for Production](#building-for-production)
  - [Docker](#docker)

---

## Features

- **Real-time multiplayer:** Sync players and upgrades across clients via SpaceTimeDB subscriptions.
- **Idle progression:** Passive income accumulates automatically over time.
- **Click challenges:** Perform rapid clicks within a time window to earn instant rewards.
- **Upgradeable economy:** Buy upgrades that boost click power, reduce cooldown, add passive income, or enable auto-click.
- **Usernames & persistence:** Set your username; game state is persisted in the SpaceTimeDB module.
- **Dynamic UI:** Built with React, React Query, TanStack Router, Zustand, and Tailwind CSS.

---

## Architecture

Click Trader consists of two main parts:

### 1. SpaceTimeDB Rust Module (`click-trader-server/`)

The Rust crate in `click-trader-server/` defines the game state tables (players and upgrades) and reducers (server-side logic) using the SpaceTimeDB SDK:

- **Player table:** Tracks each player's identity, username, currency, click stats, and owned upgrades.
- **Upgrades table:** Defines purchasable upgrades and their effects.
- **Reducers:** Implement game logic for passive income, click handling, username assignment, and upgrade purchases.

### 2. React Frontend (`src/`)

The React application is built with [TanStack Start](https://tanstack.com/start/latest):

- `module_bindings/`: Auto-generated TypeScript/WASM bindings for the SpaceTimeDB module (**do not edit**).
- `spacetimedb/`: Hooks to establish the DB connection and synchronize tables to Zustand stores.
- `stores/`: Zustand-based client caches (`usePlayerStore`, `useUpgradeStore`).
- `components/`: Reusable UI components (`CanvasButton`, `UsernameForm`, `UpgradeForm`, etc.).
- `routes/`: File-based routing with TanStack Router.
- `utils/`: Utility helpers such as big integer formatting.

---

## Tech Stack

- **Languages:** TypeScript, Rust, JSX
- **Frontend:** React, Tanstack Start, @tanstack/react-query, @tanstack/react-router, Zustand
- **CSS:** Tailwind CSS, DaisyUI
- **Build & Dev:** Vite, PostCSS
- **Linting & Formatting:** Biome
- **Backend Module:** SpaceTimeDB (Rust crate), @clockworklabs/spacetimedb-sdk
- **Deployment:** Docker multi-stage build

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Rust](https://rust-lang.org/) toolchain (for the SpaceTimeDB module)
- [A running SpaceTimeDB server](https://spacetimedb.com/docs/getting-started/installation) (local or remote)

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd click-trader
```

### Install Dependencies

```bash
npm install
```

> The `module_bindings/` folder is generated automatically; no manual steps required.

### Run a SpaceTimeDB Server

For local development, start a SpaceTimeDB instance on port `3001`. Follow the [SpaceTimeDB documentation](https://spacetimedb.com/docs/getting-started/installation) to build and run it natively.

### Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The frontend will connect to `ws://localhost:3001` by default.

---

## Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

To check for linting and formatting errors, run:

```bash
npx biome check .
```

To apply formatting and fix safe linting errors, run:

```bash
npx biome check --apply .
```

---

## Building for Production

```bash
npm run build
npm run start
```

By default, production builds will connect to the live SpaceTimeDB endpoint at:

```
wss://spacetimedb.minmaxing.net
```

> You can update or clear the `auth_token` in `localStorage` to control authentication.

---

## Docker

A multi-stage Docker build is provided. To build and run the container:

```bash
docker build -t click-trader .
docker run -p 3000:3000 click-trader
```