# Handcrafted Haven — Entity Relationship Diagram

Simple PostgreSQL schema for users, seller profiles, categories, products, and reviews.

## Diagram

```mermaid
erDiagram
  users ||--o| seller_profiles : has
  users ||--o{ reviews : writes
  categories ||--o{ products : contains
  seller_profiles ||--o{ products : sells
  products ||--o{ reviews : receives

  users {
    uuid id PK
    varchar name
    varchar email UK
    varchar password
    varchar role
    timestamptz created_at
  }

  seller_profiles {
    uuid id PK
    uuid user_id FK UK
    text bio
    text story
    varchar image_url
  }

  categories {
    uuid id PK
    varchar name UK
  }

  products {
    uuid id PK
    uuid seller_id FK
    uuid category_id FK
    varchar name
    text description
    numeric price
    varchar image_url
    timestamptz created_at
  }

  reviews {
    uuid id PK
    uuid product_id FK
    uuid user_id FK
    smallint rating
    text comment
    timestamptz created_at
  }
```

## Relationships

| From | To | Type | Notes |
|------|----|------|-------|
| `users` | `seller_profiles` | 1:1 | Only users with `role = seller` have a profile |
| `users` | `reviews` | 1:N | Customers write reviews |
| `seller_profiles` | `products` | 1:N | Each product belongs to one seller |
| `categories` | `products` | 1:N | Used for browse/filter by category |
| `products` | `reviews` | 1:N | One review per user per product (`UNIQUE`) |

## Notes

- **Product rating** is calculated with `AVG(reviews.rating)`, not stored on `products`.
- **`users.role`** accepts `customer`, `seller`, or `admin`.
- **`reviews.rating`** must be between 1 and 5.
- Passwords in seed data are plain text for development only; hash before production auth.

## Related files

- [`01-create-tables.sql`](./01-create-tables.sql) — DDL
- [`02-seed-data.sql`](./02-seed-data.sql) — sample INSERTs
- [`../src/lib/definitions.ts`](../src/lib/definitions.ts) — TypeScript types
