# 🤖 AGENTS GUIDE FOR `amplication/sample-app`

## 1. Project Overview
- **Monorepo scope:** Houses three independently runnable services under `apps/`: a React Admin client (`ecommerce-admin`) plus two NestJS GraphQL backends (`ecommerce-server` for ecommerce workflows and `logistic-server` for logistics and fulfillment).
- **Tech highlights:** Node.js + npm, TypeScript everywhere, React 18 with React Admin 5 on the frontend, NestJS 10 with Apollo GraphQL, Prisma 5 for database access, KafkaJS and NATS for messaging, Jest/ts-jest for automated tests, ESLint + Prettier for linting/formatting, and Docker/Docker Compose for container workflows.
- **Infrastructure baseline:** Each service ships its own `.env`, `Dockerfile`, and `docker-compose.dev.yml`, enabling per-service local development or container packaging.

## 2. Repository Structure
| Path | Purpose |
| --- | --- |
| `apps/ecommerce-admin/` | Vite-powered React Admin UI with Apollo Client data access, custom auth/data providers, theming, and per-entity resource modules under `src/`. |
| `apps/ecommerce-server/` | NestJS ecommerce backend with modules such as `src/order/`, `src/product/`, `src/user/`, shared infrastructure (`kafka/`, `auth/`, `validators/`) plus Prisma schema/migrations under `prisma/`. |
| `apps/logistic-server/` | NestJS logistics backend mirroring the ecommerce layout, adding messaging consumers in `src/kafka/` and `src/nats/`, domain modules like `src/shipment/` and `src/warehouse/`, and shared Prisma utilities. |
| Root `README.md` | High-level service summary and messaging topics (e.g., `order.*`, `product.*`). |
| (New) `AGENTS.md` | This guide—keep it aligned with actual repo state. |

## 3. Development Guidelines
1. **Work inside the relevant app folder.** Install dependencies (`npm install`) per service; there is no shared root package.json.
2. **Respect service-specific scripts:**
   - Admin client (`apps/ecommerce-admin/package.json`): `npm run start` (Vite dev server), `npm run build`, `npm run type-check`, `npm run lint`, `npm run format`, `npm run package:container`.
   - NestJS servers (`apps/ecommerce-server` and `apps/logistic-server`): `npm run start`, `start:watch`, `start:debug`, `build`, `test`, `seed`, `db:migrate-save`, `db:migrate-up`, `db:clean`, `db:init`, `prisma:generate`, `docker:dev`, `package:container`, `compose:up`, `compose:down`.
3. **Database changes:** Edit Prisma schema under each service’s `prisma/` directory, then run `npm run prisma:generate` followed by the relevant `db:*` scripts.
4. **Messaging hooks:** When extending Kafka or NATS flows, follow existing patterns in `apps/ecommerce-server/src/kafka/` and `apps/logistic-server/src/{kafka,nats}/` (topics referenced in root README).
5. **Configuration artifacts:** Keep `.env` examples updated when adding required variables; mirror changes in service README tables.

## 4. Code & Architecture Patterns
- **Frontend (React Admin):** Each entity resides under `apps/ecommerce-admin/src/<entity>/` (e.g., `user/`, `product/`, `order/`) with Create/Edit/List/Show components that consume the shared Apollo GraphQL data provider from `src/data-provider/`. Authentication flows live in `src/auth-provider/` with forms in `LoginForm.tsx` and styling in `login.scss`.
- **Backends (NestJS):** Domain modules are split across directories like `src/order/`, `src/product/`, `src/customer/`, `src/shipment/`, `src/warehouse/`, each bundling controllers/resolvers, services, DTOs, and access-control decorators. Cross-cutting infrastructure sits in `auth/`, `filters/`, `interceptors/`, `providers/`, and messaging adapters in `kafka/` or `nats/`.
- **Prisma utilities:** Shared helpers such as `apps/ecommerce-server/src/prisma.util.ts` and corresponding specs demonstrate best practices for seeding, soft deletes, and relation handling.
- **Swagger & GraphQL:** Bootstrapped through `src/swagger/` and GraphQL modules defined in `app.module.ts`, leveraging `@nestjs/apollo` and `@apollo/server`.

## 5. Quality & Tooling Standards
- **Type safety:** Maintain strict TypeScript configs; run `npm run type-check` (admin) or rely on Nest build to validate backend types.
- **Lint & formatting:** Use `npm run lint`/`npm run format` scripts before committing. ESLint configs target `.ts/.tsx`, with Prettier handling style consistency.
- **Testing:** Execute `npm test` within each NestJS service (Jest + ts-jest). Reference tests live in `apps/ecommerce-server/src/prisma.util.spec.ts` and mirrored files in `logistic-server`.
- **Documentation:** Update `README.md` files adjacent to any service touched, plus this `AGENTS.md` when workflows or structures change.
- **Containers:** `Dockerfile` and `docker-compose*.yml` files per service are the source of truth for runtime expectations; keep them in sync with code and scripts.

## 6. Critical Rules for Agents
1. **Do not invent structure.** Only cite directories/files verified in this repo (use `apps/ecommerce-admin/src/user/`, `apps/ecommerce-server/src/order/`, etc.).
2. **Keep services isolated.** Changes to one app must not break others; avoid introducing shared dependencies without coordination.
3. **Preserve messaging contracts.** Topic names and payload structures referenced in code/README must remain backward-compatible unless explicitly coordinated.
4. **Update Prisma + migrations together.** Never modify schema without generating migrations and updating seeds/tests.
5. **Document and lint before PRs.** Run lint/format/test scripts relevant to the service and summarize any new scripts in the service README if added.

## 7. Common Tasks & How-To
| Task | Steps |
| --- | --- |
| Run admin UI locally | `cd apps/ecommerce-admin && npm install && npm run start` (Vite serves on default port; uses env from `.env`). |
| Build admin UI | `npm run build` then `npm run serve` for preview. |
| Start ecommerce backend (watch) | `cd apps/ecommerce-server && npm install && npm run start:watch`. |
| Apply ecommerce DB migrations | `npm run db:migrate-save -- --name <change>` → `npm run db:migrate-up` → `npm run seed` if needed. |
| Start logistic backend with Docker | `cd apps/logistic-server && npm run docker:dev` (uses `docker-compose.dev.yml`). |
| Generate Prisma client | Run `npm run prisma:generate` inside each backend after schema edits. |

## 8. Reference Examples
- **React Admin resource:** `apps/ecommerce-admin/src/user/` contains representative Create/Edit/List components wired to shared hooks.
- **NestJS domain module:** `apps/ecommerce-server/src/order/` shows module wiring, DTOs, service logic, and Kafka publishers.
- **Messaging adapters:** `apps/logistic-server/src/kafka/` (Kafka consumers) and `apps/logistic-server/src/nats/` (NATS event handling) illustrate receive-pattern integrations.
- **Testing template:** `apps/ecommerce-server/src/prisma.util.spec.ts` demonstrates Jest patterns for Prisma utilities.
- **Container setup:** `apps/ecommerce-server/Dockerfile` and `apps/ecommerce-server/docker-compose.dev.yml` (plus equivalents in other services) detail build contexts and environment expectations.

## 9. Additional Resources
- Service-specific READMEs under each app root cover environment variables, default credentials, and Docker usage—consult them whenever updating configs.
- Root `README.md` outlines cross-service messaging topics and plugin usage; keep it synchronized with any new Kafka/NATS channels or service additions.
- Prisma schema files (`apps/*/prisma/schema.prisma`) and `scripts/seed.ts` provide authoritative definitions for data models and example seed data.

_Keep this document aligned with real repository state. When adding new services, directories, or workflows, update the relevant sections above in the same style._
