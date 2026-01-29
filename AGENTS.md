# AGENTS Guide for `amplication/sample-app`

## 📦 Project Overview
- **Repository type:** Amplication-generated mixed monorepo rooted at `apps/` with three independent services: `apps/ecommerce-server/`, `apps/logistic-server/`, and `apps/ecommerce-admin/`. Each service keeps its own `package.json`, `Dockerfile`, `docker-compose*.yml`, `.env`, and nested `prisma/`, `scripts/`, and `src/` directories.
- **Shared patterns:** Per-service isolation with Amplication-generated NestJS backends that share Prisma + Kafka scaffolding, and a React Admin frontend whose `src/` mirrors resource-based folders. Every service relies on env-driven configuration and its own `docker-compose.dev.yml` to provision databases, Kafka, and (for logistics) NATS locally.
- **Regeneration safety:** Amplication-generated artifacts live under `src/<module>/base/*`; extend or override behavior in sibling files so regenerations never overwrite custom logic.
- **Technologies in use:** NestJS 10, Prisma 5, TypeScript 5, PostgreSQL, MySQL, KafkaJS, NATS, React 18, React Admin 5, Vite 4, Apollo Client, Sass, Jest/ts-jest, ESLint, Prettier, Docker Compose.
  - **ecommerce-server:** NestJS backend publishing Kafka topics for order/product lifecycle using PostgreSQL storage.
  - **logistic-server:** NestJS backend consuming the same Kafka topics, persisting to MySQL, and bridging to NATS for downstream logistics workflows.
  - **ecommerce-admin:** React Admin UI built with Vite that targets the ecommerce API via `VITE_REACT_APP_SERVER_URL`.
- Toolchain versions (from the app-level `package.json` files):
  - Backends run on NestJS `10.2.x`, Prisma `5.4.x`, TypeScript `5.4.x`, KafkaJS `2.2.x`, npm-run-all `4.1.x`, and (logistics) NATS `2.17.x`.
  - The admin UI uses React `18.3.x`, React Admin `5.1.x`, Apollo Client `3.6.x`, Vite `4.3.x`, and TypeScript `5.1.x`.

## 🗂️ Repository Layout
- Root stays minimal with `README.md`, `AGENTS.md`, and the `apps/` directory; all tooling, Prisma schemas, and scripts live within each service folder.
- Each backend service exposes a consistent structure: `Dockerfile`, `docker-compose*.yml`, `.env`, `package.json`, `prisma/schema.prisma`, `scripts/seed.ts`, and `src/` modules (auth, domain resources like `order/`, messaging folders like `kafka/` or `nats/`, and `tests/`).
- The admin app includes Vite config (`vite.config.ts`), `src/` resources (e.g., `order/`, `product/`, `pages/Dashboard.tsx`), and utility folders (`auth-provider/`, `data-provider/`, `theme/`).

```
.
├── README.md
├── AGENTS.md
└── apps/
    ├── ecommerce-server/
    │   ├── README.md, package.json, Dockerfile, docker-compose*.yml
    │   ├── prisma/schema.prisma & scripts/{seed.ts, customSeed.ts}
    │   └── src/(order/, product/, auth/, kafka/, tests/, ...)
    ├── logistic-server/
    │   ├── README.md, package.json, Dockerfile, docker-compose*.yml
    │   ├── prisma/schema.prisma & scripts/seed.ts
    │   └── src/(shipment/, warehouse/, auth/, kafka/, nats/, tests/, ...)
    └── ecommerce-admin/
        ├── README.md, package.json, Dockerfile, vite.config.ts
        └── src/(address/, order/, pages/Dashboard.tsx, data-provider/, auth-provider/, ...)
```

## 🧩 Service Profiles
### 🧮 ecommerce-server (`apps/ecommerce-server`)
- **Role:** Order & product management API with JWT auth, PostgreSQL persistence, and Kafka producer integrations (`src/kafka/`).
- **Core stack:** NestJS 10.2.x + Prisma 5.4.x, TypeScript 5.4.x, PostgreSQL, KafkaJS 2.2.x producer, Swagger, Jest.
- **Local infra:** `docker-compose.dev.yml` launches PostgreSQL plus Kafka+Zookeeper+kafka-ui; `npm run docker:dev` wraps it.
- **Credentials:** Default `admin` / `admin` account for dev/testing (documented in `apps/ecommerce-server/README.md`).
- **Secrets management:** `src/providers/secrets/` ships `SecretsManagerModule`/`SecretsManagerService`, letting `auth/jwt/jwtSecretFactory.ts` pull `JWT_SECRET_KEY` via `ConfigService` (see `apps/ecommerce-server/src/providers/secrets/secretsManager.module.ts`).

| Name | Description | Default / Notes | Source |
| --- | --- | --- | --- |
| `BCRYPT_SALT` | Salt used for hashing | `[random-string]` | `apps/ecommerce-server/README.md` |
| `COMPOSE_PROJECT_NAME` | Compose stack prefix | `amp_[service-identifier]` | same |
| `PORT` | HTTP port | `3000` | same |
| `DB_URL` | Prisma connection URL | `[provider]://[user]:[password]@localhost:[port]/[db]` | same |
| `DB_PORT` | Database host port | provider-specific (`5432` default) | same |
| `DB_USER` | Database user | `[username]` | same |
| `DB_PASSWORD` | Database password | `[password]` | same |
| `DB_NAME` | Database name | `[service-name]` | same |
| `JWT_SECRET_KEY` | JWT signing secret | `[secret]` | same |
| `JWT_EXPIRATION` | JWT TTL | `2d` | same |
| `KAFKA_BROKERS` | Comma-separated Kafka bootstrap broker addresses. | `localhost:9092` | same |
| `KAFKA_CLIENT_ID` | Client ID used by ecommerce-server when connecting to Kafka. | `ecommerce` | same |
| `KAFKA_GROUP_ID` | Kafka consumer group ID for this service. | `ecommerce` | same |
| `KAFKA_ENABLE_SSL` | Toggle (`true`/`false`) controlling SSL usage for Kafka connections. | `false` | same |
| `GRAPHQL_PLAYGROUND` | Enables the GraphQL Playground UI when truthy. | `false` (set `true` locally) | `apps/ecommerce-server/src/app.module.ts` |
| `GRAPHQL_INTROSPECTION` | Lets schema introspection stay on even when Playground is off. | `false` | `apps/ecommerce-server/src/app.module.ts` |

- **Prisma workflow:** After editing `prisma/schema.prisma`, always run `npm run prisma:generate` ➜ `npm run db:migrate-save -- --name <change>` ➜ `npm run db:migrate-up` ➜ `npm run seed` to keep the client, migrations, and fixtures in sync.

### 🚚 logistic-server (`apps/logistic-server`)
- **Role:** Warehouse & shipment service secured with HTTP Basic auth, using MySQL storage, Kafka consumers, and NATS-based logistics messaging (`src/nats/`).
- **Core stack:** NestJS 10.2.x + Prisma 5.4.x, MySQL, KafkaJS 2.2.x consumer, NATS 2.17.x client, Swagger, Jest.
- **Local infra:** `docker-compose.dev.yml` provisions MySQL, Adminer, Kafka stack, kafka-ui, and an explicit `nats` container.
- **Credentials:** Shares the generated `admin` / `admin` dev credentials; adjust Basic Auth secrets before production.
- **Secrets management:** `src/providers/secrets/` mirrors the ecommerce service so `auth/jwt/jwtSecretFactory.ts` resolves the JWT secret from `SecretsManagerService` (`apps/logistic-server/src/providers/secrets/secretsManager.module.ts`).

| Name | Description | Default / Notes | Source |
| --- | --- | --- | --- |
| `BCRYPT_SALT` | Salt used for hashing | `[random-string]` | `apps/logistic-server/README.md` |
| `COMPOSE_PROJECT_NAME` | Compose stack prefix | `amp_[service-identifier]` | same |
| `PORT` | HTTP port | `3000` | same |
| `DB_URL` | Prisma connection URL | `[provider]://[user]:[password]@localhost:[port]/[db]` | same |
| `DB_PORT` | Database host port | provider-specific (`3306` default) | same |
| `DB_USER` | Database user | `[username]` | same |
| `DB_PASSWORD` | Database password | `[password]` | same |
| `DB_NAME` | Database name | `[service-name]` | same |
| `JWT_SECRET_KEY` | Token secret (used by guards) | `[secret]` | same |
| `JWT_EXPIRATION` | Token TTL | `2d` | same |
| `KAFKA_BROKERS` | Comma-separated Kafka bootstrap broker addresses. | `localhost:9092` | `apps/logistic-server/.env` |
| `KAFKA_CLIENT_ID` | Client ID used by logistic-server when connecting to Kafka. | `logistic` | `apps/logistic-server/.env` |
| `KAFKA_GROUP_ID` | Kafka consumer group ID for this service. | `logistic` | `apps/logistic-server/.env` |
| `KAFKA_ENABLE_SSL` | Toggle (`true`/`false`) controlling SSL usage for Kafka connections. | `false` | `apps/logistic-server/.env` |
| `NATS_SERVERS` | Comma-separated NATS server endpoints. Default `.env` value is `localhost:4222`, but the NATS factory consumes the string as-is—provide fully qualified entries like `nats://host:4222` when not using the compose default. | `localhost:4222` | `apps/logistic-server/.env` (mirrors `docker-compose.dev.yml`) |

- **Prisma workflow:** Mirror the backend cadence: `npm run prisma:generate` ➜ `npm run db:migrate-save -- --name <change>` ➜ `npm run db:migrate-up` ➜ `npm run seed` whenever the schema or seed data evolves.

### 🖥️ ecommerce-admin (`apps/ecommerce-admin`)
- **Role:** React Admin dashboard consuming the ecommerce GraphQL API; uses Vite for dev/build and React Admin resources under `src/<resource>/`.
- **Core stack:** React, React Admin, Apollo Client, Vite, TypeScript, ESLint, Prettier, Sass.
- **Core stack versions:** React 18.3.x / React Admin 5.1.x / Vite 4.3.x / TypeScript 5.1.x.
- **Local infra:** Expects the ecommerce server running; `VITE_REACT_APP_SERVER_URL` must point to that host/port.
- **Env naming:** All frontend env vars follow the Vite convention (`VITE_...`), so rely on `apps/ecommerce-admin/package.json` / `.env` as the source of truth and ignore legacy Create React App wording.

| Name | Description | Default / Notes | Source |
| --- | --- | --- | --- |
| `PORT` | Frontend dev server port | `3001` | `apps/ecommerce-admin/README.md` |
| `VITE_REACT_APP_SERVER_URL` | Public URL of ecommerce-server consumed by the admin UI. | `http://localhost:[server-port]` | same |

## 🛠️ Tooling & Scripts
### Backend services (`apps/ecommerce-server`, `apps/logistic-server`)
- **Prereq:** Bring up the Dockerized infra first (`npm run docker:dev`) so PostgreSQL/MySQL, Kafka, kafka-ui, and (for logistics) NATS are available before any Prisma/migration/test command.

| Script | Purpose | File |
| --- | --- | --- |
| `npm run start` / `start:watch` / `start:debug` | Run NestJS server (optionally watch/debug). | `apps/*-server/package.json` |
| `npm run build` | Compile via Nest CLI. | same |
| `npm run test` | Execute Jest test suite (`ts-jest` preset). | same |
| `npm run prisma:generate` | Generate Prisma client from `prisma/schema.prisma`. | same |
| `npm run db:migrate-save` | Create a new Prisma migration (dev). | same |
| `npm run db:migrate-up` | Apply migrations (deploy). | same |
| `npm run db:clean` | Reset database via Prisma. | same |
| `npm run db:init` | First-time bootstrap helper chaining `db:migrate-save -- --name "initial version"`, `db:migrate-up`, then `seed`; for later changes run `db:migrate-save -- --name <migration>` followed by `db:migrate-up`. | same |
| `npm run seed` | Execute `scripts/seed.ts` (can be customized via `scripts/customSeed.ts`). | same |
| `npm run docker:dev` | Start service-specific infra from `docker-compose.dev.yml`. | same |
| `npm run compose:up` / `compose:down` | Run/tear down Dockerized app stack. | same |
| `npm run package:container` | Build service Docker image via `Dockerfile`. | same |

### Frontend (`apps/ecommerce-admin`)
| Script | Purpose | File |
| --- | --- | --- |
| `npm run start` | Launch Vite dev server on `PORT`. | `apps/ecommerce-admin/package.json` |
| `npm run build` | Production build output under `dist/`. | same |
| `npm run serve` | Preview built assets with Vite preview. | same |
| `npm run type-check` | Run TypeScript compiler without emit. | same |
| `npm run lint` | Lint & auto-fix `src/` via ESLint. | same |
| `npm run format` | Format `src/` via Prettier. | same |
| `npm run package:container` | Build dashboard container image. | same |

## 🚀 Development Workflow
1. **Pick a service directory** (e.g., `cd apps/ecommerce-server`) and copy/adjust the provided `.env` file; never share sensitive overrides.
2. **Install dependencies** with `npm install` inside that service.
3. **Prisma workflow (backends):** When schemas or seeds change, run `npm run prisma:generate` ➜ `npm run db:migrate-save -- --name <change>` ➜ `npm run db:migrate-up` ➜ `npm run seed` to keep clients, migrations, and fixtures aligned.
4. **Provision local infra** with `npm run docker:dev` **before** any migrations, seeds, or Jest runs so PostgreSQL/MySQL, Kafka, and (for logistics) NATS/Adminer are online.
5. **Initialize data** using `npm run db:init` only for first-time bootstrap (chains the Prisma workflow with a default migration name); for later changes stick to the workflow above with descriptive migration names.
6. **Start the service** with `npm run start` (servers) or `npm run start` from `apps/ecommerce-admin` after ensuring `VITE_REACT_APP_SERVER_URL` points at the running API.
7. **Alternative container path:** `npm run compose:up` builds & runs the service container using the provided `Dockerfile` and compose file.

## 🔗 Messaging & Integrations
- **Kafka topics (from `README.md`):** `order.create.v1`, `order.update.v1`, `product.create.v1`, `product.update.v1`.
  - `apps/ecommerce-server` **produces** these events via `src/kafka/kafka.producer.service.ts`.
  - `apps/logistic-server` **consumes** the same topics with `src/kafka/kafka.service.ts` and forwards logistics updates downstream through its NATS bridge (`src/nats/`).
- **NATS (logistics):** `apps/logistic-server/docker-compose.dev.yml` defines a `nats` container, and the service publishes/handles topics from `src/nats/topics.ts` via `nats.module.ts` / `nats.service.ts` to propagate the Kafka-derived events. Kafka and NATS clients are wired together in `src/connectMicroservices.ts`.

## ✅ Testing & Quality
- **Backends:** Run `npm run test` inside each server to execute Jest suites configured via `ts-jest` (`package.json > jest`). Domain-focused specs live under `apps/ecommerce-server/src/tests/` and `apps/logistic-server/src/tests/` (e.g., `auth/token.service.spec.ts`, `auth/basic/basic.strategy.spec.ts`, `prisma.util.spec.ts`). Always keep the `npm run docker:dev` stack running first so the PostgreSQL/MySQL/Kafka/NATS dependencies are available to the tests.
- **Frontend:** While no standalone `test` script is declared, quality gates rely on `npm run type-check`, `npm run lint`, `npm run format`, and `npm run build`. The Vite/React Testing Library setup is scaffolded in `src/setupTests.ts` should you add tests.
- **Data prep:** Use `npm run seed` (servers) for deterministic fixtures before running suites; ensure Dockerized databases and brokers are already healthy.

## ⚠️ Critical Rules & Security
- `.env` files in each service contain generated secrets (hash salts, DB passwords, JWT keys); **never commit real credentials**. Follow README guidance to migrate secrets into a secure vault for production deployments.
- Never modify files under `src/**/base/`; Amplication regenerates them and any customizations will be overwritten. Extend behavior in sibling modules/services/controllers instead.
- Backends require their databases, Kafka, and (for logistics) NATS to be running before executing `npm run start`, `npm run test`, or any migrations—`docker:dev` is mandatory.
- Default `admin` / `admin` credentials exist purely for local testing; rotate before exposing any environment publicly.
- When editing Prisma schemas or seed scripts, regenerate the Prisma client and re-run migrations to avoid drift.

## 📋 Common Tasks
### Ecommerce-server dev loop
1. `cd apps/ecommerce-server`
2. `npm install`
3. `npm run prisma:generate`
4. `npm run docker:dev`
5. `npm run db:init`
6. `npm run start`

### Logistic-server consumer stack
1. `cd apps/logistic-server`
2. `npm install`
3. `npm run prisma:generate`
4. `npm run docker:dev` (brings up MySQL, Adminer, Kafka, kafka-ui, NATS)
5. `npm run db:init`
6. `npm run start`

### Ecommerce-admin dashboard
1. `cd apps/ecommerce-admin`
2. Configure `.env` with the active backend URL (`VITE_REACT_APP_SERVER_URL=http://localhost:3000` by default)
3. `npm install`
4. `npm run start` (uses Vite on port `3001`)
5. For a production preview: `npm run build && npm run serve`

### Database migrations & seeds (either backend)
```sh
cd apps/<service>-server
npm run db:migrate-save -- --name "add-new-model"
npm run db:migrate-up
npm run seed
```

### Tear down Docker resources
```sh
cd apps/<service>-server
npm run compose:down
# or stop only dev infra
docker-compose -f docker-compose.dev.yml down --volumes
```

## 📚 Reference Examples
| Path | Why it matters |
| --- | --- |
| `apps/ecommerce-admin/src/pages/Dashboard.tsx` | Simple React Admin dashboard page that demonstrates the baseline UI/layout conventions. |
| `apps/logistic-server/src/nats/` | Complex integration surface showing how the logistics service wires NATS modules, services, and topics. |
| `apps/ecommerce-server/src/order/` | Representative NestJS resource generated by Amplication, including controllers, services, resolvers, and `base/` files. |
| `apps/ecommerce-server/src/tests/auth/token.service.spec.ts` | Canonical Jest spec illustrating how to test generated auth services with ts-jest and mocks. |
| `apps/logistic-server/docker-compose.dev.yml` | Infrastructure blueprint for local logistics development (MySQL, Adminer, Kafka stack, kafka-ui, dedicated NATS container). |

## 🔗 Additional Resources
- [Root README](README.md) — high-level summary plus Kafka topic definitions.
- [Amplication documentation](https://docs.amplication.com/guides/getting-started) — covers generated architecture expectations.
- [ecommerce-server README](apps/ecommerce-server/README.md)
- [logistic-server README](apps/logistic-server/README.md)
- [ecommerce-admin README](apps/ecommerce-admin/README.md)
- [ecommerce-server docker-compose.dev.yml](apps/ecommerce-server/docker-compose.dev.yml)
- [logistic-server docker-compose.dev.yml](apps/logistic-server/docker-compose.dev.yml)
