import { seedDatabase } from "@/lib/seed";

// TODO: remove before production deploy
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Seed disabled in production" }, { status: 403 });
  }

  const seedSecret = process.env.SEED_SECRET;
  if (seedSecret) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("secret") !== seedSecret) {
      return Response.json({ error: "Invalid or missing seed secret" }, { status: 401 });
    }
  }

  try {
    const counts = await seedDatabase();
    return Response.json({ ok: true, counts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
