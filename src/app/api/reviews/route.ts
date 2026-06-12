import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

type ReviewResponse = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
};

function normalizeAuthor(input: string) {
  return input.trim().replace(/\s+/g, " ");
}

function toEmailSlug(input: string) {
  const slug = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");

  return slug || "customer";
}

function buildTempEmail(author: string) {
  const slug = toEmailSlug(author);
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  return `${slug}.${unique}@handcraftedhaven.local`;
}

async function getOrCreateReviewerId(author: string) {
  const existing = await sql<{ id: string }[]>`
    SELECT id
    FROM users
    WHERE lower(name) = lower(${author})
    ORDER BY created_at ASC
    LIMIT 1
  `;

  if (existing[0]?.id) {
    return existing[0].id;
  }

  const inserted = await sql<{ id: string }[]>`
    INSERT INTO users (name, email, password, role)
    VALUES (${author}, ${buildTempEmail(author)}, ${"reviewer-placeholder"}, ${"customer"})
    RETURNING id
  `;

  return inserted[0].id;
}

async function fetchReviewsByProductId(productId: string) {
  return sql<ReviewResponse[]>`
    SELECT
      r.id,
      r.product_id AS "productId",
      r.rating,
      COALESCE(r.comment, '') AS comment,
      u.name AS author,
      r.created_at AS "createdAt"
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.product_id = ${productId}
    ORDER BY r.created_at DESC
  `;
}

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Missing productId query param" },
        { status: 400 }
      );
    }

    const reviews = await fetchReviewsByProductId(productId);
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json(
      { error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productId = typeof body?.productId === "string" ? body.productId : "";
    const authorRaw = typeof body?.author === "string" ? body.author : "";
    const commentRaw = typeof body?.comment === "string" ? body.comment : "";
    const ratingRaw = body?.rating;

    const author = normalizeAuthor(authorRaw);
    const comment = commentRaw.trim();
    const rating = Number.parseInt(String(ratingRaw), 10);

    if (!productId || !author || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid input. Required: productId, author, rating (1-5)." },
        { status: 400 }
      );
    }

    const product = await sql<{ id: string }[]>`
      SELECT id
      FROM products
      WHERE id = ${productId}
      LIMIT 1
    `;

    if (!product[0]?.id) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userId = await getOrCreateReviewerId(author);

    const upserted = await sql<{ id: string }[]>`
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES (${productId}, ${userId}, ${rating}, ${comment || null})
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET
        rating = EXCLUDED.rating,
        comment = EXCLUDED.comment,
        created_at = NOW()
      RETURNING id
    `;

    const reviewId = upserted[0]?.id;
    if (!reviewId) {
      return NextResponse.json(
        { error: "Failed to create review" },
        { status: 500 }
      );
    }

    const created = await sql<ReviewResponse[]>`
      SELECT
        r.id,
        r.product_id AS "productId",
        r.rating,
        COALESCE(r.comment, '') AS comment,
        u.name AS author,
        r.created_at AS "createdAt"
      FROM reviews r
      JOIN users u ON u.id = r.user_id
      WHERE r.id = ${reviewId}
      LIMIT 1
    `;

    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}