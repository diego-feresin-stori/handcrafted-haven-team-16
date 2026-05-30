#  Handcrafted Haven

Handcrafted Haven is a web application that connects customers with unique handcrafted products made by independent artisans. The platform allows users to browse, filter, and explore handmade items while giving sellers a space to showcase their craftsmanship and stories.

---

##  Project Overview

This project is being developed as part of a group assignment. The main goal is to design and build a responsive e-commerce platform focused on handcrafted goods, emphasizing clean UI, accessibility, and user experience.

---

##  Team Members

- Diego Miguel Feresin  
- Haroldo Moises Gonzalez Benavente  
- Lok Yin Arthur Leung  
- Rocio Maryorie Apaza Paricahua  
- Percy Brandot Yarleque Jara  

---

##  Features (Planned)

- Browse handcrafted products
- Filter products by category and price
- Seller profile pages
- Product listings with images, ratings, and pricing
- User reviews and ratings system
- Responsive design for mobile and desktop
- Accessible UI following best practices

---

##  Design Theme

### Colors
- Warm Beige: `#F5E6D3`
- Sage Green: `#7A9E7E`
- Terracotta: `#C97B63`
- Dark Brown: `#4B3832`
- Cream White: `#FFFDF8`

### Typography
- Headings: Poppins
- Body: Open Sans

### UI Style
- Minimal and clean layout
- Responsive grid system
- Product-focused interface
- Simple and intuitive navigation

---

##  User Stories

- As a customer, I want to browse handcrafted products so I can discover unique items.
- As a customer, I want to filter products by category and price.
- As a seller, I want to create a profile to showcase my work.
- As a seller, I want to upload product images and descriptions.
- As a customer, I want to leave reviews and ratings.
- As a user, I want the website to work on mobile devices.
- As an administrator, I want to manage product listings.
- As a user, I want clear navigation across the platform.

---

##  Getting Started

This project uses [Next.js](https://nextjs.org) with TypeScript, ESLint, and the App Router (`src/` directory). Tailwind CSS is not included yet and can be added later if the team chooses.

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io)

### Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Other Commands

```bash
pnpm lint    # Run ESLint
pnpm build   # Create a production build
pnpm start   # Serve the production build
```

### Landing Page Sections

- **Hero** — project tagline and primary calls to action
- **Features** — planned platform capabilities from the team design
- **Featured Products** — sample product cards with placeholder artwork
- **Seller Spotlight** — introduction for independent artisans
- **Call to Action** — closing prompt to explore handcrafted goods

---

## Database Setup

The app uses PostgreSQL via Supabase. Schema scripts and the entity relationship diagram live in [`sql-setup/`](sql-setup/).

See [`sql-setup/erd.md`](sql-setup/erd.md) for the data model (users, seller profiles, categories, products, reviews).

### 1. Environment variables

Copy `.env.example` to `.env` and fill in your Supabase connection values (at minimum `POSTGRES_URL`).

### 2. Create tables

Run [`sql-setup/01-create-tables.sql`](sql-setup/01-create-tables.sql) in the Supabase SQL Editor.

### 3. Seed development data

```bash
pnpm dev
curl http://localhost:3000/seed
```

If `SEED_SECRET` is set in `.env`:

```bash
curl "http://localhost:3000/seed?secret=YOUR_SECRET"
```

Alternatively, run [`sql-setup/02-seed-data.sql`](sql-setup/02-seed-data.sql) directly in Supabase.

Full instructions: [`sql-setup/README.md`](sql-setup/README.md)

---

##  Work in Progress

- Repository setup and team onboarding
- ~~Project structure initialization (Next.js)~~
- ~~Initial landing page implementation~~
- ~~PostgreSQL schema and seed endpoint~~
- UI design planning for product and seller pages
- Connect landing page to database queries

---

##  Status

The project has moved into **early development**. The Next.js application is initialized and the initial responsive landing page is in place using the team design theme (colors, typography, and layout).