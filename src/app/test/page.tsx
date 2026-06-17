import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Database Test</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}