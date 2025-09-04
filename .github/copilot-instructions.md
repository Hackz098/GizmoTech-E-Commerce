# Copilot Instructions for ECOM (Next.js E-Commerce Store)

## Project Overview
- **Frameworks:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (custom palette: neon blue, black, white, gray)
- **Database:** SQLite via Prisma ORM
- **Structure:**
  - `app/` — Main app directory (Next.js 14)
    - `api/` — API routes (RESTful endpoints for products, AI products)
    - `admin/` — Admin panel for product management
    - `products/` — Dynamic product pages
  - `prisma/` — Database schema and migrations

## Key Workflows
- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Start Production Server:** `npm start`
- **Database Setup:**
  - Generate Prisma client: `npm run db:generate`
  - Migrate DB: `npm run db:migrate`
  - Push schema: `npm run db:push`
  - Prisma Studio: `npm run db:studio`

## API & Data Flow
- **API routes:**
  - Located in `app/api/products/` and `app/api/ai-products/`
  - Use RESTful conventions for CRUD operations
  - Communicate with Prisma ORM for DB access
- **Product Model:** See `prisma/schema.prisma` for fields (`id`, `name`, `description`, `price`, `imageUrl`, timestamps)
- **Admin Panel:**
  - Accessible at `/admin`
  - Form for adding products (validates name, description, price > 0, valid image URL)

## Patterns & Conventions
- **TypeScript:** Strict typing throughout
- **Tailwind CSS:** Utility-first, custom colors in `tailwind.config.js`
- **File Naming:**
  - API routes: `route.ts` for endpoints
  - Dynamic routes: `[id]/page.tsx` for product details
- **Error Handling:**
  - API routes return JSON with status codes
  - Common errors: DB connection, type mismatches

## Integration Points
- **Prisma:**
  - All DB access via Prisma client
  - Migrations tracked in `prisma/migrations/`
- **External:**
  - No external payment or auth by default
  - Images stored in `/images/`

## Troubleshooting
- **DB errors:** Ensure Prisma client is generated and migrations are run
- **Build errors:** Clear `.next` and `node_modules`, reinstall dependencies
- **TypeScript errors:** Regenerate Prisma types

## Examples
- **Add product API:** See `app/api/products/add/route.ts`
- **Product details page:** See `app/products/[id]/page.tsx`
- **Admin form:** See `app/admin/page.tsx`

---

**For AI agents:**
- Use provided scripts for all DB and build operations
- Follow file naming and routing conventions
- Reference `README.md` for additional context
- Prefer Prisma for all DB access; do not use raw SQL
- Use Tailwind classes for styling; avoid inline styles
