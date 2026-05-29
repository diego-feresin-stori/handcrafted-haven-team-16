import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const reviewsFile = path.join(dataDir, "reviews.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {
    // Directory already exists
  }
}

async function getReviews() {
  try {
    const content = await fs.readFile(reviewsFile, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function saveReviews(reviews: unknown[]) {
  await ensureDataDir();
  await fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  const reviews = await getReviews();

  if (productId) {
    const filtered = reviews.filter(
      (r: { productId: string }) => r.productId === productId
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, sellerId, rating, comment, author } = body;

    if (!productId || !rating || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reviews = await getReviews();
    const newReview = {
      id: Date.now().toString(),
      productId,
      sellerId,
      rating: Math.min(5, Math.max(1, parseInt(rating))),
      comment: comment || "",
      author,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    await saveReviews(reviews);

    return NextResponse.json(newReview, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}