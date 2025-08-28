# Nomad Life Platform

A unified platform for digital nomads, combining stays, flights, vehicles, drivers, and visa/immigration services.

## Architecture

This is a Turborepo + pnpm monorepo with the following structure:

- **apps/** - Frontend applications
  - web/ - Next.js 15 App Router (Stays + Flights + Vehicles + Drivers + Visa)
  - admin/ - Admin Next.js (content, moderation, rules, templates)
  - mobile/ - Expo React Native (Stays + Vehicles + Visa MVP)
  - my-drivers-flutter/ - Temporary Flutter app (until RN parity)

- **services/** - Backend services
  - api-booking/ - Stays listings/availability/pricing
  - api-flights/ - FlexHop flight orchestration
  - api-vehicles/ - Vehicles, calendar, airport rules
  - api-drivers/ - Drivers/rides/chat (+ Supabase compatibility)
  - api-immigration/ - Visa rules, wizards, forms, checklists
  - risk/ - Risk assessment service
  - ingest/ - Telemetry and data ingestion

- **packages/** - Shared packages
  - db/ - Prisma schema + client
  - ui/ - shadcn/ui design system
  - core/ - Shared domain logic
  - contracts/ - DTOs + OpenAPI/tRPC types
  - rules/ - Visa ruleset + airport configs + lease clauses
  - config/ - ESLint/TypeScript/Tailwind configs

## Getting Started

1. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Set up environment variables (copy .env.example to .env)

3. Run database migrations:
   \`\`\`bash
   pnpm db:generate
   pnpm db:migrate
   \`\`\`

4. Start development:
   \`\`\`bash
   pnpm dev
   \`\`\`

## Features

- **Stays**: 14-180 night bookings with NomadScore ratings
- **FlexHop Flights**: Flexible date windows with stopover options
- **Vehicles**: P2P rentals with airport compliance
- **Drivers**: Save/re-book trusted drivers with realtime presence
- **Visa & Immigration**: Practical guidance and automation (not legal advice)

## Tech Stack

- **Frontend**: Next.js 15, React Native, shadcn/ui
- **Backend**: NestJS, tRPC, Prisma
- **Database**: PostgreSQL
- **Cache/Queue**: Redis
- **Storage**: S3-compatible
- **Auth**: Auth.js v5
- **Payments**: Stripe + Stripe Connect
- **Monorepo**: Turborepo + pnpm

## License

This project contains code from multiple source repositories with different licenses. See individual package LICENSE files for details.
