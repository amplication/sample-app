# 🤖 AGENTS Guide for `amplication/sample-app`

## 📦 Project Overview
Amplication generated this multi-service workspace to demonstrate an ecommerce domain split into two NestJS backends and a React admin UI. Each service is self-contained under `apps/`, but they share conventions: modular NestJS layers (`*.module.ts`, `*.service.ts`, etc.), Prisma-managed data models, Kafka (and optional NATS) messaging utilities, Jest testing, and Docker workflows for local infrastructure. Default interactive credentials across services are `admin` / `admin`.

## 🗂️ Repository Structure
```
apps/
├─ ecommerce-server/      # NestJS + PostgreSQL backend emitting Kafka events
│  ├─ src/                # Domain modules (see src/order/ for reference)
│  ├─ prisma/             # schema.prisma, migrations, Prisma scripts
│  ├─ kafka/              # messaging helpers for send pattern
│  └─ docker-compose*.yml # local containers & brokers
├─ logistic-server/       # NestJS + MySQL backend consuming Kafka/NATS
│  ├─ src/
│  ├─ prisma/
│  ├─ kafka/ & nats/
│  └─ docker-compose*.yml
└─ ecommerce-admin/       # React + Vite + react-admin dashboard
   └─ src/ (LoginForm.tsx, resources, theme)
```

## 🛠️ Development & Tooling
- **Runtime expectations:** Node.js 16+, npm, Docker (for databases/brokers), and service-specific `.env` files defining DB credentials, JWT secrets, broker URLs, and ports before running scripts.
- **Prisma data layer:** Each backend supplies `prisma/` assets plus scripts for generating clients (`npm run prisma:generate`), saving migrations, initializing (`npm run db:init`), cleaning, and seeding. Running Prisma commands requires the corresponding database container/connection to be available.
- **Messaging modules:** `kafka/` directories wire Kafka topics; `nats/` is present in the logistics app for optional NATS consumption. Respect the established send/receive semantics from the README when extending topics.
- **Docker workflows:** Prefer the provided scripts (`npm run docker:dev`, `compose:up`, `compose:down`, `package:container`) instead of ad hoc commands. They encapsulate required broker and database containers per service.
- **Frontend tooling:** The admin app uses Vite. Scripts (`start`, `build`, `serve`, `type-check`, `lint`, `format`) expect `REACT_APP_SERVER_URL` and optional `PORT` (defaults to 3001) defined in `.env`.

## 🧩 Service Playbooks
### 🧾 `apps/ecommerce-server/`
- **Purpose & stack:** Order management API (NestJS + GraphQL) backed by PostgreSQL and Kafka to emit product/order lifecycle events.
- **Key directories:** `src/order/` (baseline domain module), `prisma/` (see `schema.prisma`), `kafka/`, `scripts/`, Docker compose manifests.
- **Environment vars:** PostgreSQL DSN, Kafka broker URLs, JWT secret, HTTP port, and admin credentials stored in `.env`.
- **Messaging topics (send pattern):** `order.create.v1`, `order.update.v1`, `product.create.v1`, `product.update.v1`.
- **NPM scripts:**
  - `start`, `start:watch`, `start:debug`
  - `build`
  - `test`
  - `seed`
  - `db:migrate-save`
  - `db:migrate-up`
  - `db:clean`
  - `db:init`
  - `prisma:generate`
  - `docker:dev`
  - `package:container`
  - `compose:up`
  - `compose:down`

### 🚚 `apps/logistic-server/`
- **Purpose & stack:** Warehouse/shipment backend (NestJS + GraphQL) using MySQL, Kafka consumers, and optional NATS connectors to react to ecommerce events.
- **Key directories:** Domain modules in `src/`, `prisma/` schema + migrations, `kafka/` and `nats/` adapters, Docker compose assets (`docker-compose.dev.yml`).
- **Environment vars:** MySQL DSN, Kafka/NATS endpoints, HTTP Basic or JWT secrets, HTTP port, service credentials.
- **Messaging topics (receive pattern):** `order.create.v1`, `order.update.v1`, `product.create.v1`, `product.update.v1`.
- **NPM scripts:**
  - `start`, `start:watch`, `start:debug`
  - `build`
  - `test`
  - `seed`
  - `db:migrate-save`
  - `db:migrate-up`
  - `db:clean`
  - `db:init`
  - `prisma:generate`
  - `docker:dev`
  - `package:container`
  - `compose:up`
  - `compose:down`

### 🖥️ `apps/ecommerce-admin/`
- **Purpose & stack:** React-admin dashboard (React 18 + Vite + Apollo Client) consuming the ecommerce-server GraphQL endpoint.
- **Key directories:** `src/` (resources, forms, `LoginForm.tsx`), `src/api/` hooks, `src/theme/` styling assets.
- **Environment vars:** `REACT_APP_SERVER_URL` pointing to the ecommerce-server GraphQL URL; `PORT` (defaults to 3001) for the Vite dev server.
- **Messaging topics:** None directly—this UI consumes GraphQL responses already shaped by the backend events.
- **NPM scripts:**
  - `start`
  - `build`
  - `serve`
  - `type-check`
  - `lint`
  - `format`
  - `package:container`

## 🧱 Code & Data Patterns
- NestJS modules follow Amplication conventions: each domain folder contains entity DTOs, controllers, services, resolvers, and guards with consistent naming.
- Prisma schemas live in `apps/*/prisma/schema.prisma` with migrations managed through `node_modules/.bin/prisma`. Agents should reuse the provided scripts rather than invoking Prisma directly.
- Messaging glue lives under `kafka/` (and `nats/` for logistics) with standardized publisher/subscriber services.
- React-admin resources mirror backend entities; forms/pages adopt PascalCase files and central GraphQL query definitions.

## 🧪 Quality & Validation
- Backend testing uses Jest (`npm run test`). Ensure databases or mocks are set appropriately before executing suites.
- Frontend type safety relies on `npm run type-check`; static analysis and formatting are enforced through `npm run lint` and `npm run format`.
- Container build validation is handled through `npm run package:container` in each app to confirm Dockerfiles remain functional.

## ⚠️ Critical Rules
- Never invent or seed new sample data outside the sanctioned Prisma seed scripts; extend `scripts/seed.ts` if adjustments are required.
- Treat `.env` secrets and database credentials as sensitive—do not commit or expose values when automating.
- Respect message topic names verbatim (`order.create.v1`, etc.); renaming or inventing topics will break cross-service contracts.
- Align with README formatting cues (underlined section headers, explicit broker topic lists) when extending documentation or UX copy.

## ✅ Common Tasks
1. **Install dependencies:**
   ```bash
   cd apps/<service>
npm install
   ```
2. **Bootstrap databases via Docker:** use `npm run docker:dev` (per backend) or `npm run compose:up` / `npm run compose:down` to orchestrate the DB + broker containers defined in the service.
3. **Generate Prisma client & migrations:** `npm run prisma:generate`, then `npm run db:migrate-save`, `npm run db:migrate-up`, and `npm run db:init` to apply the baseline (`db:clean` resets when needed).
4. **Seed data:** `npm run seed` after migrations (leverages `scripts/seed.ts`).
5. **Start services:** `npm run start` (NestJS) or `npm run start` (Vite) with `.env` loaded; ecommerce-admin dev server defaults to http://localhost:3001 unless `PORT` overrides.
6. **Run tests & checks:** backends use `npm run test`; frontend uses `npm run type-check`, `npm run lint`, and `npm run format`.
7. **Build or package containers:** `npm run build` (NestJS) or `npm run build` (Vite) followed by `npm run package:container` for image validation.

## 📚 Reference Examples
- UI auth flow: `apps/ecommerce-admin/src/LoginForm.tsx`.
- Domain module baseline: `apps/ecommerce-server/src/order/`.
- Canonical Prisma schema: `apps/ecommerce-server/prisma/schema.prisma`.
- Local infrastructure template: `apps/logistic-server/docker-compose.dev.yml`.

## 🔗 Additional Resources
- Root [`README.md`](README.md) for service descriptions, underlined headings, and message topic summaries keyed to the broker patterns.
- [Amplication documentation](https://docs.amplication.com/guides/getting-started) for deeper guidance on generated NestJS modules, plugins, and recommended workflows.
