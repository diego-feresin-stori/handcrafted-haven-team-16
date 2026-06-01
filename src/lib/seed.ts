import { sql } from "./db";
import {
  categories,
  products,
  reviews,
  sellerProfiles,
  users,
} from "./seed-data";

export type SeedResult = {
  users: number;
  seller_profiles: number;
  categories: number;
  products: number;
  reviews: number;
};

async function ensureTablesExist() {
  const result = await sql<{ exists: string | null }[]>`
    SELECT to_regclass('public.products') AS exists
  `;

  if (!result[0]?.exists) {
    throw new Error(
      "Database tables not found. Run sql-setup/01-create-tables.sql in Supabase first.",
    );
  }
}

export async function seedDatabase(): Promise<SeedResult> {
  await ensureTablesExist();

  await sql`
    TRUNCATE reviews, products, categories, seller_profiles, users
    RESTART IDENTITY CASCADE
  `;

  for (const user of users) {
    await sql`
      INSERT INTO users (id, name, email, password, role)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password}, ${user.role})
    `;
  }

  for (const profile of sellerProfiles) {
    await sql`
      INSERT INTO seller_profiles (id, user_id, bio, story, image_url)
      VALUES (
        ${profile.id},
        ${profile.user_id},
        ${profile.bio},
        ${profile.story},
        ${profile.image_url}
      )
    `;
  }

  for (const category of categories) {
    await sql`
      INSERT INTO categories (id, name)
      VALUES (${category.id}, ${category.name})
    `;
  }

  for (const product of products) {
    await sql`
      INSERT INTO products (id, seller_id, category_id, name, description, price, image_url)
      VALUES (
        ${product.id},
        ${product.seller_id},
        ${product.category_id},
        ${product.name},
        ${product.description},
        ${product.price},
        ${product.image_url}
      )
    `;
  }

  for (const review of reviews) {
    await sql`
      INSERT INTO reviews (id, product_id, user_id, rating, comment)
      VALUES (
        ${review.id},
        ${review.product_id},
        ${review.user_id},
        ${review.rating},
        ${review.comment}
      )
    `;
  }

  return {
    users: users.length,
    seller_profiles: sellerProfiles.length,
    categories: categories.length,
    products: products.length,
    reviews: reviews.length,
  };
}
