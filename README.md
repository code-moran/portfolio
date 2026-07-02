# Titus Njiru Portfolio

Next.js portfolio with a compact utilities section, SEO metadata, an authenticated admin CMS, Prisma, and PostgreSQL support.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="replace-with-a-strong-password"
```

3. Generate Prisma Client, run migrations, and seed the first admin user plus portfolio content:

```bash
npm run prisma:generate
npm run db:migrate -- --name initial_backend
npm run db:seed
```

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Admin login is available at `/admin/login`. The admin panel at `/admin` uses NextAuth credentials authentication and stores editable portfolio content in PostgreSQL through Prisma. When `DATABASE_URL` is not configured, public portfolio content falls back to `content/portfolio-content.json` so local builds still work.

## Scripts

- `npm run dev` starts Next.js.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint.
- `npm run prisma:generate` generates Prisma Client.
- `npm run db:migrate` runs Prisma migrations.
- `npm run db:seed` creates the initial admin user and content row.
