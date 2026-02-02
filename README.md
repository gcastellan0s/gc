# gc-app

Base template for building full-stack applications with Nuxt 4 and AWS Amplify Gen 2.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4, Vue 3, TypeScript |
| UI | Nuxt UI v4, Tailwind CSS v4 |
| State | Pinia |
| Auth | Amazon Cognito (Email + Password) |
| API | AWS AppSync (GraphQL), Nuxt Nitro (REST) |
| Database | Amazon DynamoDB |
| Storage | Amazon S3 |
| Backend | AWS Amplify Gen 2 (Backend-as-Code) |
| Testing | Vitest, Playwright |
| Linting | ESLint, Prettier |

## Prerequisites

- Node.js >= 20.x
- Yarn >= 4.x (`corepack enable && corepack prepare yarn@stable --activate`)

## Quick Start

```bash
# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|---|---|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Check linting |
| `yarn lint:fix` | Fix linting issues |
| `yarn format` | Check formatting |
| `yarn format:fix` | Fix formatting |
| `yarn test:unit` | Run unit tests |
| `yarn test:e2e` | Run E2E tests |
| `yarn typecheck` | TypeScript type checking |
| `yarn amplify:sandbox` | Start Amplify local sandbox |

## Project Structure

```
gc-app/
├── amplify/              # Amplify Gen 2 backend-as-code
│   ├── auth/             # Cognito configuration
│   ├── data/             # AppSync + DynamoDB schema
│   └── storage/          # S3 bucket configuration
├── app/                  # Nuxt 4 app directory
│   ├── components/       # Vue components (base, domain, layout)
│   ├── composables/      # Vue composables
│   ├── layouts/          # Page layouts (default, auth)
│   ├── middleware/        # Route middleware (auth, guest)
│   ├── pages/            # File-based routing
│   ├── plugins/          # Nuxt plugins (Amplify init)
│   └── stores/           # Pinia stores
├── graphql/              # GraphQL operations
├── server/               # Nitro server
│   ├── api/              # REST API routes
│   ├── middleware/        # Server middleware
│   └── utils/            # Server utilities (db, auth, s3, logger)
├── tests/                # Vitest + Playwright tests
├── types/                # Shared TypeScript types
└── docs/                 # Project documentation
```

## Documentation

- [Setup Guide](docs/SETUP.md)
- [Naming Conventions](docs/NAMING-CONVENTIONS.md)
