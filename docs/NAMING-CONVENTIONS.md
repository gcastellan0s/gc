# Naming Conventions

Standard naming conventions for the project and all derived projects.

> **Prefix placeholder:** In all examples, `gc` is used as the project prefix. Replace it
> with the actual project prefix when creating a new project from this template.

---

## Table of Contents

1. [General Rules](#1-general-rules)
2. [Directory Structure](#2-directory-structure)
3. [Nuxt Frontend](#3-nuxt-frontend)
4. [Nuxt Server (Nitro)](#4-nuxt-server-nitro)
5. [Pinia Stores](#5-pinia-stores)
6. [GraphQL (AppSync)](#6-graphql-appsync)
7. [AWS / Amplify Resources](#7-aws--amplify-resources)
8. [DynamoDB Tables](#8-dynamodb-tables)
9. [S3 Buckets & Keys](#9-s3-buckets--keys)
10. [Environment Variables](#10-environment-variables)
11. [Tests](#11-tests)
12. [Git](#12-git)

---

## 1. General Rules

| Concept | Convention | Example |
|---|---|---|
| Files & folders | `kebab-case` | `user-profile.ts` |
| TypeScript types / interfaces | `PascalCase` | `UserProfile` |
| Variables & functions | `camelCase` | `getUserProfile` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| Booleans | Prefix with `is`, `has`, `can`, `should` | `isAuthenticated` |
| Enums | `PascalCase` name, `UPPER_SNAKE_CASE` members | `enum Role { ADMIN, EDITOR }` |
| Private properties | Prefix with `_` | `_internalCache` |

---

## 2. Directory Structure

```
gc-app/
├── amplify/                  # Amplify Gen 2 backend-as-code
│   ├── auth/
│   ├── data/
│   ├── storage/
│   └── backend.ts
├── app/                      # Nuxt 4 app directory
│   ├── assets/css/           # Uncompiled assets (CSS, images)
│   ├── components/           # Vue components
│   │   ├── base/             # Base/atomic UI components
│   │   ├── domain/           # Business-domain components
│   │   └── layout/           # Layout-specific components
│   ├── composables/          # Vue composables (use*)
│   ├── layouts/              # Nuxt layouts
│   ├── middleware/            # Route middleware
│   ├── pages/                # File-based routing
│   ├── plugins/              # Nuxt plugins
│   └── stores/               # Pinia stores
├── docs/                     # Project documentation
├── graphql/                  # GraphQL operations
│   ├── <entity>/             # Per-entity queries/mutations
│   └── fragments/            # Reusable fragments
├── public/                   # Static public assets
├── server/                   # Nitro server
│   ├── api/                  # API routes
│   ├── middleware/            # Server middleware
│   └── utils/                # Server utilities
├── tests/                    # Tests
│   ├── unit/                 # Vitest unit tests
│   └── e2e/                  # Playwright E2E tests
├── types/                    # Shared TypeScript types
└── utils/                    # Shared utility functions
```

---

## 3. Nuxt Frontend

### 3.1 Components

**Pattern:** `<Category><Entity><Action|Variant>.vue`

| Category | Prefix | Example | File path |
|---|---|---|---|
| Base / atomic | `Base` | `BaseButton.vue` | `components/base/BaseButton.vue` |
| Base / atomic | `Base` | `BaseModal.vue` | `components/base/BaseModal.vue` |
| Domain | `The` (singleton) | `TheNavbar.vue` | `components/layout/TheNavbar.vue` |
| Domain | `<Entity>` | `UserProfileCard.vue` | `components/domain/UserProfileCard.vue` |
| Domain | `<Entity>` | `UserProfileEditForm.vue` | `components/domain/UserProfileEditForm.vue` |
| Layout | `Layout` | `LayoutSidebar.vue` | `components/layout/LayoutSidebar.vue` |

Rules:
- Always **PascalCase** for component file names.
- Min 2 words to avoid collisions with HTML elements.
- Singleton components (used once per page) use the `The` prefix.
- Domain components are grouped by entity: `User*`, `Post*`, `Order*`.

### 3.2 Pages

**Pattern:** `kebab-case`, following Nuxt file-based routing.

```
pages/
├── index.vue                     # /
├── login.vue                     # /login
├── dashboard.vue                 # /dashboard
└── users/
    ├── index.vue                 # /users
    └── [id].vue                  # /users/:id
```

### 3.3 Composables

**Pattern:** `use<Entity><Action>.ts`

| Example | Description |
|---|---|
| `useAuth.ts` | Authentication state & methods |
| `useUserProfile.ts` | User profile data fetching |
| `useFileUpload.ts` | S3 file upload logic |
| `useGraphql.ts` | AppSync GraphQL client wrapper |
| `useNotification.ts` | Toast / notification system |

Rules:
- Always start with `use`.
- One composable per file.
- File name matches the exported function name: `useAuth.ts` → `export function useAuth()`.

### 3.4 Layouts

**Pattern:** `kebab-case.vue`

| File | Usage |
|---|---|
| `default.vue` | Main app layout (navbar + sidebar) |
| `auth.vue` | Login / signup pages (no navbar) |
| `blank.vue` | Completely empty layout |

### 3.5 Middleware

**Pattern:** `kebab-case.ts`

| File | Description |
|---|---|
| `auth.ts` | Redirect unauthenticated users to login |
| `guest.ts` | Redirect authenticated users away from login |
| `role-guard.ts` | Check user role before accessing route |

### 3.6 Plugins

**Pattern:** `<nn>.<name>.ts` where `<nn>` is a two-digit load order.

| File | Description |
|---|---|
| `01.amplify.ts` | Initialize Amplify SDK |
| `02.auth.ts` | Initialize auth listener |
| `03.appsync.ts` | Initialize AppSync client |

---

## 4. Nuxt Server (Nitro)

### 4.1 API Routes

**Pattern:** `server/api/<entity>/<action>.<method>.ts`

| File | Route | Method |
|---|---|---|
| `server/api/users/index.get.ts` | `GET /api/users` | List users |
| `server/api/users/index.post.ts` | `POST /api/users` | Create user |
| `server/api/users/[id].get.ts` | `GET /api/users/:id` | Get user by ID |
| `server/api/users/[id].put.ts` | `PUT /api/users/:id` | Update user |
| `server/api/users/[id].delete.ts` | `DELETE /api/users/:id` | Delete user |
| `server/api/auth/login.post.ts` | `POST /api/auth/login` | Login |
| `server/api/uploads/presign.post.ts` | `POST /api/uploads/presign` | Get S3 presigned URL |

Rules:
- Use the `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts` suffix for HTTP method scoping.
- Group by entity using subdirectories.
- Use `kebab-case` for file and folder names.

### 4.2 Server Utilities

**Pattern:** `server/utils/<name>.ts`

| File | Description |
|---|---|
| `server/utils/db.ts` | DynamoDB client helper |
| `server/utils/auth.ts` | Token verification helper |
| `server/utils/s3.ts` | S3 client helper |
| `server/utils/appsync.ts` | AppSync admin helper |
| `server/utils/logger.ts` | CloudWatch logger wrapper |

### 4.3 Server Middleware

**Pattern:** `server/middleware/<name>.ts`

| File | Description |
|---|---|
| `server/middleware/log.ts` | Request logging to CloudWatch |
| `server/middleware/cors.ts` | CORS headers |

---

## 5. Pinia Stores

**Pattern:** `use<Entity>Store.ts`

| File | Store ID | Description |
|---|---|---|
| `app/stores/useAuthStore.ts` | `auth` | Auth state (user, tokens) |
| `app/stores/useUserProfileStore.ts` | `user-profile` | User profile data |
| `app/stores/useUiStore.ts` | `ui` | UI state (sidebar, theme) |
| `app/stores/useNotificationStore.ts` | `notification` | Toast notifications |

Rules:
- Store ID: `kebab-case` (passed to `defineStore('store-id', ...)`).
- File and export name: `use<Entity>Store` in `camelCase`.
- One store per file.
- Prefer Setup Stores syntax (`defineStore('id', () => { ... })`) for consistency.

---

## 6. GraphQL (AppSync)

### 6.1 Schema Types

**Pattern:** `PascalCase`

```graphql
type UserProfile {
  id: ID!
  email: String!
  displayName: String!
  avatarUrl: String
  bio: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

input CreateUserProfileInput {
  email: String!
  displayName: String!
  bio: String
}

input UpdateUserProfileInput {
  displayName: String
  bio: String
  avatarUrl: String
}
```

Rules:
- Model types: `PascalCase` noun → `UserProfile`, `Post`, `Comment`.
- Input types: `<Action><Model>Input` → `CreateUserProfileInput`.
- Response types: `<Model>Connection` for paginated lists → `UserProfileConnection`.
- Enums: `UPPER_SNAKE_CASE` members → `enum Role { ADMIN, EDITOR, VIEWER }`.

### 6.2 Operations

| Type | Pattern | Example |
|---|---|---|
| Query (single) | `get<Entity>` | `getUserProfile(id: ID!): UserProfile` |
| Query (list) | `list<Entity>s` | `listUserProfiles(limit: Int): UserProfileConnection` |
| Mutation (create) | `create<Entity>` | `createUserProfile(input: CreateUserProfileInput!): UserProfile` |
| Mutation (update) | `update<Entity>` | `updateUserProfile(id: ID!, input: UpdateUserProfileInput!): UserProfile` |
| Mutation (delete) | `delete<Entity>` | `deleteUserProfile(id: ID!): UserProfile` |
| Subscription | `on<Action><Entity>` | `onCreateUserProfile: UserProfile` |

### 6.3 Client-Side Operation Files

**Pattern:** `graphql/<entity>/<operation>.ts`

```
graphql/
├── user-profile/
│   ├── queries.ts          # getUserProfile, listUserProfiles
│   ├── mutations.ts        # createUserProfile, updateUserProfile, deleteUserProfile
│   └── subscriptions.ts    # onCreateUserProfile
└── fragments/
    └── user-profile.ts     # Reusable fragments
```

---

## 7. AWS / Amplify Resources

### 7.1 Amplify Gen 2 Backend Files

**Pattern:** `amplify/<resource>/resource.ts`

```
amplify/
├── auth/
│   └── resource.ts         # Cognito configuration
├── data/
│   └── resource.ts         # AppSync + DynamoDB schema
├── storage/
│   └── resource.ts         # S3 bucket configuration
├── functions/              # Lambda functions (if needed)
│   └── <function-name>/
│       ├── resource.ts
│       └── handler.ts
└── backend.ts              # Root backend definition
```

### 7.2 Resource Naming (deployed)

All deployed AWS resources follow this pattern:

```
<project>-<env>-<service>-<resource>
```

| Resource | Pattern | Example (dev) | Example (prod) |
|---|---|---|---|
| Cognito User Pool | `<project>-<env>-auth-userpool` | `gc-dev-auth-userpool` | `gc-prod-auth-userpool` |
| Cognito Identity Pool | `<project>-<env>-auth-identitypool` | `gc-dev-auth-identitypool` | `gc-prod-auth-identitypool` |
| AppSync API | `<project>-<env>-api` | `gc-dev-api` | `gc-prod-api` |
| DynamoDB Table | `<project>-<env>-<entity>` | `gc-dev-user-profile` | `gc-prod-user-profile` |
| S3 Bucket | `<project>-<env>-storage-<purpose>` | `gc-dev-storage-uploads` | `gc-prod-storage-uploads` |
| CloudWatch Log Group | `/app/<project>/<env>` | `/app/gc/dev` | `/app/gc/prod` |
| Amplify App | `<project>-<env>` | `gc-dev` | `gc-prod` |

Environments: `dev`, `staging`, `prod`.

---

## 8. DynamoDB Tables

### 8.1 Table Naming

**Pattern:** `<project>-<env>-<entity>` using `kebab-case`.

| Table | Description |
|---|---|
| `gc-dev-user-profile` | User profiles |
| `gc-dev-post` | Posts |
| `gc-dev-comment` | Comments |

### 8.2 Key Schema

| Attribute | Convention | Example |
|---|---|---|
| Partition key | `PK` or `id` | `PK = "USER#<userId>"` |
| Sort key | `SK` | `SK = "PROFILE"` |
| GSI partition key | `GSI1PK` | `GSI1PK = "EMAIL#user@test.com"` |
| GSI sort key | `GSI1SK` | `GSI1SK = "2024-01-15"` |
| GSI name | `<table>-by-<attribute>` | `user-profile-by-email` |

### 8.3 Common Attributes

| Attribute | Type | Description |
|---|---|---|
| `id` | `String` | UUID primary identifier |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last update timestamp |
| `createdBy` | `String` | User ID of creator |
| `entityType` | `String` | Discriminator for single-table: `USER_PROFILE`, `POST` |
| `ttl` | `Number` | Unix epoch for TTL expiration |

---

## 9. S3 Buckets & Keys

### 9.1 Bucket Naming

**Pattern:** `<project>-<env>-storage-<purpose>`

| Bucket | Purpose |
|---|---|
| `gc-dev-storage-uploads` | User-uploaded files |
| `gc-dev-storage-assets` | App-generated assets |

### 9.2 Object Key Structure

**Pattern:** `<scope>/<entity-id>/<category>/<filename>`

| Key | Description |
|---|---|
| `users/<userId>/avatars/profile.jpg` | User avatar |
| `users/<userId>/documents/resume.pdf` | User document upload |
| `assets/reports/<reportId>/output.pdf` | App-generated report |
| `tmp/<uploadId>/raw.jpg` | Temporary upload (TTL lifecycle) |

Rules:
- Always use `/` as delimiter.
- Include entity ID in the path for access control.
- Use `tmp/` prefix for files awaiting processing (set S3 lifecycle rule to auto-delete).

---

## 10. Environment Variables

### 10.1 Naming

**Pattern:** `<CATEGORY>_<SERVICE>_<DETAIL>`

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_AWS_REGION` | AWS region (client-accessible) |
| `NUXT_PUBLIC_COGNITO_USER_POOL_ID` | Cognito User Pool ID |
| `NUXT_PUBLIC_COGNITO_CLIENT_ID` | Cognito App Client ID |
| `NUXT_PUBLIC_COGNITO_IDENTITY_POOL_ID` | Cognito Identity Pool ID |
| `NUXT_PUBLIC_APPSYNC_ENDPOINT` | AppSync GraphQL endpoint |
| `NUXT_PUBLIC_S3_BUCKET_UPLOADS` | S3 uploads bucket name |
| `NUXT_PUBLIC_S3_BUCKET_ASSETS` | S3 assets bucket name |
| `NUXT_AWS_SECRET_ACCESS_KEY` | AWS secret key (server-only) |
| `NUXT_APPSYNC_API_KEY` | AppSync API key (server-only) |

Rules:
- `NUXT_PUBLIC_*` → Exposed to the client (browser). **Never put secrets here.**
- `NUXT_*` (without `PUBLIC`) → Server-only, accessible via `useRuntimeConfig()`.
- Always `UPPER_SNAKE_CASE`.

### 10.2 Files

| File | Purpose | Git tracked? |
|---|---|---|
| `.env.example` | Template with empty values | Yes |
| `.env` | Local development values | **No** |
| `.env.development` | Dev environment overrides | **No** |
| `.env.production` | Prod environment overrides | **No** |

---

## 11. Tests

### 11.1 Unit Tests (Vitest)

**Pattern:** Mirror the source file path under `tests/unit/`.

| Source file | Test file |
|---|---|
| `composables/useAuth.ts` | `tests/unit/composables/useAuth.spec.ts` |
| `stores/useAuthStore.ts` | `tests/unit/stores/useAuthStore.spec.ts` |
| `server/utils/db.ts` | `tests/unit/server/utils/db.spec.ts` |
| `utils/format-date.ts` | `tests/unit/utils/format-date.spec.ts` |

Rules:
- Suffix: `.spec.ts` for unit tests.
- `describe` block: name of the function/composable/store.
- `it` block: starts with `should` → `it('should return null when user is not authenticated')`.

### 11.2 E2E Tests (Playwright)

**Pattern:** `tests/e2e/<feature>.spec.ts`

| File | Description |
|---|---|
| `tests/e2e/auth-login.spec.ts` | Login flow |
| `tests/e2e/auth-signup.spec.ts` | Signup flow |
| `tests/e2e/user-profile.spec.ts` | Profile CRUD |
| `tests/e2e/file-upload.spec.ts` | File upload flow |

Rules:
- Suffix: `.spec.ts`.
- Name by feature, not by page.
- Use `kebab-case`.

---

## 12. Git

### 12.1 Branch Naming

**Pattern:** `<type>/<short-description>`

| Branch | Description |
|---|---|
| `main` | Production branch |
| `develop` | Integration branch |
| `feature/user-profile` | New feature |
| `fix/login-redirect` | Bug fix |
| `chore/update-deps` | Maintenance |
| `refactor/auth-flow` | Code refactor |

### 12.2 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting (no logic change) |
| `refactor` | Code restructure (no feature/fix) |
| `test` | Adding or updating tests |
| `chore` | Build, deps, config |

Examples:
```
feat(auth): add Google social login
fix(api): handle expired token in user profile endpoint
docs(readme): add local development setup instructions
test(stores): add unit tests for useAuthStore
chore(deps): upgrade nuxt to 3.x.x
```

---

## Quick Reference Card

```
Component:     PascalCase          BaseButton.vue, UserProfileCard.vue
Page:          kebab-case          users/[id].vue
Composable:    use<Name>           useAuth.ts
Store:         use<Name>Store      useAuthStore.ts
API route:     entity/action.verb  server/api/users/[id].get.ts
Plugin:        nn.name             01.amplify.ts
Middleware:     kebab-case          auth.ts, role-guard.ts
GraphQL type:  PascalCase          UserProfile, CreateUserProfileInput
GraphQL op:    camelCase verb      getUserProfile, createUserProfile
DynamoDB:      project-env-entity  gc-dev-user-profile
S3 key:        scope/id/category   users/<id>/avatars/profile.jpg
Env var:       UPPER_SNAKE         NUXT_PUBLIC_COGNITO_USER_POOL_ID
Test unit:     mirror.spec.ts      tests/unit/composables/useAuth.spec.ts
Test e2e:      feature.spec.ts     tests/e2e/auth-login.spec.ts
Branch:        type/description    feature/user-profile
Commit:        type(scope): desc   feat(auth): add Google login
```
