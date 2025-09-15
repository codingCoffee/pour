# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a WXT (Web Extension Toolkit) project using React and TypeScript for browser extension development. WXT is a framework that simplifies browser extension development with support for multiple browsers (Chrome, Firefox, etc.).

## Development Commands
- `bun dev` or `npm run dev`: Start development mode with hot reload
- `bun run dev:firefox` or `npm run dev:firefox`: Start development mode for Firefox
- `bun run build` or `npm run build`: Build for production (Chrome by default)
- `bun run build:firefox` or `npm run build:firefox`: Build for Firefox
- `bun run zip` or `npm run zip`: Create zip file for Chrome Web Store
- `bun run zip:firefox` or `npm run zip:firefox`: Create zip file for Firefox Add-ons
- `bun run compile` or `npm run compile`: Type check without emitting files

## Architecture
The project follows WXT's entrypoint-based architecture:

### Entry Points Structure (`entrypoints/`)
- **`background.ts`**: Service worker/background script entry point
- **`content.ts`**: Content script that runs on web pages (currently targeting `*://*.google.com/*`)
- **`popup/`**: Browser action popup UI
  - `main.tsx`: React app entry point
  - `App.tsx`: Main popup component with React state
  - `style.css`: Popup styles
  - `index.html`: Popup HTML template

### Key Features
- React 19 with TypeScript
- WXT handles manifest generation and browser compatibility
- Hot module replacement in development
- Asset handling with `@/assets/` path alias
- Uses devenv.nix for development environment with Bun and LibreWolf

### Configuration
- `wxt.config.ts`: WXT configuration with React module
- `tsconfig.json`: TypeScript config extending WXT's base config
- Uses JSX transform (`"jsx": "react-jsx"`)
- Path alias `@/` maps to project root

## Testing
No specific testing framework is configured. Add test commands to package.json scripts when implementing tests.

## Browser Compatibility
The project is set up to build for both Chrome and Firefox with separate build commands. WXT handles browser-specific manifest differences automatically.