# AGENTS.md

## 🧭 Project Overview
- **Amplication-generated monorepo** with three independently deployable services under `apps/` (see [README.md](README.md)).
- **`ecommerce-server`** (NestJS + Prisma + PostgreSQL) publishes Kafka messages for order and product lifecycle events via topics such as `order.create.v1` and `product.update.v1` ([README.md](README.md)).
- **`logistic-server`** (NestJS + Prisma + MySQL) consumes the same Kafka topics using the broker's receive pattern and authenticates via HTTP Basic ([README.md](README.md)).
- **`ecommerce-admin`** is a React + react-admin dashboard that ships with forms, routing, and authentication pre-wired to the backend ([apps/ecommerce-admin/README.md](apps/ecommerce-admin/README.md)).

## 🗂️ Repository Structure
| Path | Contents | Notes |
| --- | --- | --- |
| `/README.md` | High-level description of all services and broker topics | Use it for quick capability reminders. |
| `/apps/ecommerce-server` | NestJS backend with Prisma schema, Kafka integration, Jest tests, Docker assets | Service README documents env vars and scripts. |
| `/apps/logistic-server` | NestJS backend mirroring the ecommerce patterns but targeting MySQL and HTTP Basic auth | Includes identical script surface for parity. |
| `/apps/ecommerce-admin` | Vite-powered React Admin frontend with resource components under `src/` | Scripts for dev server, build, lint, and container packaging. |

## 🛠️ Development Guidelines
### Backend services (`ecommerce-server`, `logistic-server`)
- Manage configuration exclusively via each service's `.env` as outlined in their READMEs (e.g., `DB_URL`, `JWT_SECRET_KEY`, `PORT`).
- Keep Node.js, npm, and Docker installed before running scripts; run `npm install` followed by `npm run prisma:generate` prior to local development ([apps/ecommerce-server/README.md](apps/ecommerce-server/README.md), [apps/logistic-server/README.md](apps/logistic-server/README.md)).
- Generated resources live in `src/<entity>/base`; extend them in sibling files (see `apps/ecommerce-server/src/product/product.service.ts`).

### Messaging
- Kafka wiring is centralized in `apps/ecommerce-server/src/kafka/`, where `kafka.module.ts` declares a global module that creates a client via `ClientProxyFactory` and exports `KafkaProducerService`.
- Topic names are fixed (`order.create.v1`, `order.update.v1`, `product.create.v1`, `product.update.v1`) and must stay aligned with partner services (root [README.md](README.md)).

### Prisma & Database workflow
- Use `npm run prisma:generate` whenever schema files change (script defined in each backend `package.json`).
- Database lifecycle scripts (`db:migrate-save`, `db:migrate-up`, `db:clean`, `db:init`) orchestrate migrations and seeding; `db:init` chains migration creation, deployment, and `seed` (per backend `package.json`).

### Frontend (React Admin)
- Components follow react-admin patterns: e.g., `ProductList` composes `<List>` + `<Datagrid>` with a shared `Pagination` component and 50-item pages ([apps/ecommerce-admin/src/product/ProductList.tsx](apps/ecommerce-admin/src/product/ProductList.tsx)).
- Environment relies on `PORT` (default 3001) and `REACT_APP_SERVER_URL` pointing to the running backend ([apps/ecommerce-admin/README.md](apps/ecommerce-admin/README.md)).

## 📐 Code Patterns
- **Service customization**: `ProductService` extends `ProductServiceBase` and injects `PrismaService`, illustrating how to add logic without touching generated files (`apps/ecommerce-server/src/product/product.service.ts`).
- **Kafka module**: `kafka.module.ts` is marked `@Global()` and registers a `KAFKA_CLIENT` provider plus `KafkaProducerService`, enabling broker usage across modules without repeated wiring.
- **Testing**: Jest specs live under `apps/ecommerce-server/src/tests/`; the JWT strategy spec asserts that unauthenticated users trigger `UnauthorizedException` (`apps/ecommerce-server/src/tests/auth/jwt/jwt.strategy.spec.ts`).
- **Frontend resources**: Each entity directory (e.g., `src/product`) holds `List`, `Create`, `Edit`, `Show`, and `Title` components following the pattern shown in `ProductList`.
- **Containers**: Backends expose `docker:dev`, `compose:up`, and `package:container` scripts for local infrastructure and image builds (per backend `package.json`). The frontend also offers `package:container` (per `apps/ecommerce-admin/package.json`).

## ✅ Quality Standards & Critical Rules
1. **Environment parity**: Never hard-code credentials—update `.env` variables documented in each service README before booting a service.
2. **Generated code safety**: Do not edit files under `src/<entity>/base`; extend them as shown in `product.service.ts` to keep Amplication upgrades painless.
3. **Authentication defaults**: Each server ships with an `admin/admin` user, and the admin UI expects the same credentials; change these via seeding before production ([apps/ecommerce-server/README.md](apps/ecommerce-server/README.md), [apps/logistic-server/README.md](apps/logistic-server/README.md), [apps/ecommerce-admin/README.md](apps/ecommerce-admin/README.md)).
4. **Broker contract**: Maintain the documented Kafka topic names so `logistic-server` continues to receive events emitted by `ecommerce-server` (root [README.md](README.md)).
5. **Testing discipline**: Extend Jest coverage within `apps/*/src/tests/` and keep expectations aligned with existing strategy tests (`jwt.strategy.spec.ts`).

## 🔁 Common Tasks
### 1. Bootstrap a backend (either server)
```bash
cd apps/ecommerce-server   # or apps/logistic-server
npm install
npm run prisma:generate
```

### 2. Run local backend with a fresh database
```bash
cd apps/ecommerce-server
npm run docker:dev      # spins up Postgres/MySQL per service config
npm run db:init         # create initial migration, apply, seed
npm run start           # launches NestJS on port 3000
```
(Commands mirrored in `apps/logistic-server`, per each README.)

### 3. Manage Prisma migrations & seeding
```bash
cd apps/ecommerce-server
npm run db:migrate-save -- --name "feature-name"
npm run db:migrate-up
npm run seed            # reruns scripts/seed.ts
npm run db:clean        # resets the schema when needed
```
(Script names identical in `apps/logistic-server/package.json`.)

### 4. Execute backend tests
```bash
cd apps/ecommerce-server
npm run test
```
This runs Jest using the configuration declared in `package.json`. Repeat inside `apps/logistic-server` to validate its services.

### 5. Start the admin UI
```bash
cd apps/ecommerce-admin
npm install
npm run start           # Vite dev server on http://localhost:3001
```
Set `REACT_APP_SERVER_URL` to the reachable backend before running (per `apps/ecommerce-admin/README.md`).

### 6. Build & lint the admin UI
```bash
cd apps/ecommerce-admin
npm run build           # production assets under dist/
npm run type-check
npm run lint
```
Use `npm run package:container` here (and in backends) to build Docker images.

### 7. Container-based backend development
```bash
cd apps/ecommerce-server
npm run compose:up      # or docker:dev for DB-only
# ... work ...
npm run compose:down    # remove containers and volumes
```
Identical scripts exist in `apps/logistic-server` for consistent workflows.

## 📚 Reference Examples
| File | Why it matters |
| --- | --- |
| `apps/ecommerce-admin/src/product/ProductList.tsx` | Shows the canonical react-admin list pattern with shared pagination and field declarations. |
| `apps/ecommerce-server/src/product/product.service.ts` | Demonstrates extending generated base services while injecting `PrismaService`. |
| `apps/ecommerce-server/src/kafka/kafka.module.ts` | Illustrates the global Kafka module that provisions the broker client and producer service. |
| `apps/ecommerce-server/src/tests/auth/jwt/jwt.strategy.spec.ts` | Provides a Jest example validating authentication flows and error handling. |

## 🔗 Additional Resources
- [apps/ecommerce-server/README.md](apps/ecommerce-server/README.md)
- [apps/logistic-server/README.md](apps/logistic-server/README.md)
- [apps/ecommerce-admin/README.md](apps/ecommerce-admin/README.md)
