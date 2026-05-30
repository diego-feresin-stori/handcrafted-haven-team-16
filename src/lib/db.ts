import postgres from "postgres";

// Supabase/Vercel poolers do not support prepared statements (error 26000).
export const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  prepare: false,
});
