# AGENTS Guide

## Project Overview
- **Purpose:** Sample Amplication monorepo showcasing full-stack ecommerce + logistics workflows.
- **Services:**
  - `apps/ecommerce-server`: NestJS backend using PostgreSQL, Kafka "send" pattern, JWT auth via Passport.
  - `apps/ecommerce-admin`: React + React Admin client built with Vite.
  - `apps/logistic-server`: NestJS backend using MySQL, Kafka "receive" pattern with NATS bridge, HTTP Basic auth.
- **Core stack:** TypeScript, NestJS, React, React Admin, Prisma, Kafka, Docker, Jest.

| Service | Database | Messaging | Auth | Highlights |
| --- | --- | --- | --- | --- |
| ecommerce-server | PostgreSQL via Prisma | Kafka (producer) | JWT / Passport | Generated CRUD modules, send events downstream |
| ecommerce-admin | N/A (GraphQL client) | N/A | JWT client auth | React Admin resources per entity |
| logistic-server | MySQL via Prisma | Kafka (consumer) + NATS | HTTP Basic | Receives ecommerce events, bridges to logistics systems |

## Repository Structure
```
apps/
  ecommerce-server/
    prisma/          # schema.prisma, migrations, seed scripts
    src/
      <entity>/
        base/        # generated DTOs/services/resolvers (do NOT edit)
        <custom>.ts  # extend the base classes
  ecommerce-admin/
    src/
      <entity>/      # React Admin CRUD screens
      data-provider/ # GraphQL data provider + client config
      auth-provider/ # Auth hooks for React Admin
  logistic-server/   # mirrors ecommerce-server conventions
README.md            # high-level monorepo overview
```
- **Naming conventions:**
  - Backend entities follow `module/service/resolver` pattern; generated files live in `src/<entity>/base` and must not be modified directly.
  - Frontend components follow `<Entity><Create|Edit|List|Show|Title>.tsx`.
  - Config files use kebab-case; TypeScript files use PascalCase for classes/components.

## Development Guidelines & Workflows
### Environment & Configuration
- Each service ships `.env`, `Dockerfile`, `docker-compose.yml`, and `docker-compose.dev.yml` for local infra.
- Populate `.env` from the corresponding README tables; avoid committing secrets.
- Use `npm install` inside each service directory (no workspace-level install).

### Per-Service Scripts
| Directory | Script | Purpose |
| --- | --- | --- |
| `apps/ecommerce-server` & `apps/logistic-server` | `npm run prisma:generate` | Generate Prisma client + DTO scaffolding |
|  | `npm run docker:dev` | Launch backing services via Docker Compose |
|  | `npm run db:init` | Apply Prisma migrations + seed data |
|  | `npm run start` | Start NestJS server (watch mode) |
|  | `npm run compose:up` | Bring up service container set |
|  | `npm run test` | Execute Jest suite |
| `apps/ecommerce-admin` | `npm run start` | Start Vite dev server |
|  | `npm run build` | Production build |
|  | `npm run type-check` | Run `tsc --noEmit` |
|  | `npm run lint` / `npm run format` | ESLint + Prettier |
|  | `npm run package:container` | Build container image |

### Workflow Notes
- Backend changes typically require `prisma:generate` after editing `prisma/schema.prisma`.
- Prefer Docker (`docker:dev`, `compose:up`) for reproducible infra when running Kafka/Postgres/MySQL.
- React Admin relies on the GraphQL API exposed by ecommerce-server; ensure backend is running before testing UI.

## Code Patterns & Best Practices
- **Generated base classes:** Extend services/resolvers/controllers via the non-base files; regenerate via Prisma to keep DTOs aligned. Never edit `*.base.ts`.
- **Backend layering:** Modules import shared helpers under `src/kafka`, `src/providers`, `src/auth`, etc. Place custom guards/interceptors there.
- **Frontend CRUD:** Each resource implements all CRUD screens; leverage shared hooks from `src/data-provider` and `src/auth-provider`.
- **Messaging:** Use provided Kafka helpers (send pattern in ecommerce, receive pattern + NATS bridge in logistic). Update topic names in service-specific config files.
- **Authentication:**
  - Ecommerce server uses JWT + Passport; update strategies in `src/auth`.
  - Logistic server enforces HTTP Basic; credentials sourced from `.env`.
- **Testing:** Jest is configured per service (`apps/*/jest.config.ts`). Add specs under `src/tests/` or alongside modules ending with `.spec.ts`.
- **Formatting/Linting:** Respect Prettier + ESLint configs shipped per service.

## Common Tasks
### Run ecommerce-server locally
```bash
cd apps/ecommerce-server
cp .env.example .env   # customize secrets
npm install
npm run docker:dev     # start Postgres + Kafka
npm run prisma:generate
npm run db:init
npm run start
```

### Generate Prisma client after schema updates
```bash
cd apps/<service>-server
npm run prisma:generate
npm run db:init
```

### Start the admin client
```bash
cd apps/ecommerce-admin
npm install
npm run start
```

### Run tests (example: logistic-server)
```bash
cd apps/logistic-server
npm test
```

## Reference Examples
| Scenario | File/Folder |
| --- | --- |
| Simple backend module | `apps/ecommerce-server/src/address/` |
| Complex backend module | `apps/ecommerce-server/src/order/` |
| Frontend resource pattern | `apps/ecommerce-admin/src/customer/` |
| Shared frontend utilities | `apps/ecommerce-admin/src/data-provider/` and `apps/ecommerce-admin/src/auth-provider/` |
| Infra & schema configuration | `apps/ecommerce-server/prisma/schema.prisma`, `apps/logistic-server/prisma/schema.prisma`, `apps/*/docker-compose.dev.yml` |

## Critical Rules & Tips
- **Do not edit generated base files.** Extend them in sibling files and rerun generators when Prisma schema changes.
- **Keep env files out of version control.** Use `.env.example` as the authoritative template.
- **Follow README patterns.** Any new module or service should carry the same sections (Intro, Config, Scripts).
- **Respect messaging contracts.** Topic names, payload DTOs, and NATS subjects are shared assumptions between services.
- **Document new scripts.** Update service README tables when adding npm scripts or env vars.

## Additional Resources
- [Ecommerce Server README](apps/ecommerce-server/README.md)
- [Ecommerce Admin README](apps/ecommerce-admin/README.md)
- [Logistic Server README](apps/logistic-server/README.md)
- Amplication Docs: <https://docs.amplication.com>
