# SQL Setup — Handcrafted Haven

Scripts to create and seed the PostgreSQL database on Supabase.

## Before you start

1. Copy connection variables into `.env` (see `.env.example`).
2. Review the schema diagram in [`erd.md`](./erd.md).

## Step 1: Create tables

Open the **Supabase SQL Editor** and run:

[`01-create-tables.sql`](./01-create-tables.sql)

This drops existing tables (if any) and recreates the schema.

## Step 2: Load seed data

Choose one option:

### Option A — Next.js endpoint (recommended for dev)

```bash
pnpm dev
curl "http://localhost:3000/seed"
```

If `SEED_SECRET` is set in `.env`, include it:

```bash
curl "http://localhost:3000/seed?secret=YOUR_SECRET"
```

### Option B — SQL script

Run [`02-seed-data.sql`](./02-seed-data.sql) in the Supabase SQL Editor.

## Verify

```sql
SELECT COUNT(*) FROM products;
SELECT p.name, c.name AS category, ROUND(AVG(r.rating), 1) AS avg_rating
FROM products p
JOIN categories c ON c.id = p.category_id
LEFT JOIN reviews r ON r.product_id = p.id
GROUP BY p.id, p.name, c.name;
```

## Files

| File | Purpose |
|------|---------|
| `erd.md` | Entity relationship diagram |
| `01-create-tables.sql` | Tables, constraints, indexes |
| `02-seed-data.sql` | Reference seed INSERTs |
