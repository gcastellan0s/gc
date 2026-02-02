# Setup Guide

## Prerequisites

- **Node.js** >= 20.x
- **Yarn** >= 4.x (via `corepack enable && corepack prepare yarn@stable --activate`)
- **Playwright browsers** (installed after `yarn install`)

## Quick Start

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in the values in `.env` with your AWS credentials (see `.env.example` for all variables).

3. **Start development server:**
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues |
| `yarn format` | Check Prettier formatting |
| `yarn format:fix` | Fix Prettier formatting |
| `yarn test` | Run unit tests (watch mode) |
| `yarn test:unit` | Run unit tests once |
| `yarn test:e2e` | Run Playwright E2E tests |
| `yarn test:e2e:ui` | Run E2E tests with Playwright UI |
| `yarn test:coverage` | Run tests with coverage |
| `yarn typecheck` | Run TypeScript type checking |
| `yarn amplify:sandbox` | Start Amplify sandbox (local cloud) |

## Amplify Sandbox (when ready to deploy)

1. Install the AWS CLI and configure credentials.
2. Run `yarn amplify:sandbox` to deploy a personal cloud sandbox.
3. This generates `amplify_outputs.json` with your backend config.
4. The Amplify plugin (`app/plugins/01.amplify.ts`) can be updated to use the generated outputs.

## Installing Playwright Browsers

After installing dependencies, run:
```bash
npx playwright install
```

## Project Structure

See [NAMING-CONVENTIONS.md](./NAMING-CONVENTIONS.md) for the full directory structure and naming standards.
