import { sql } from "@/lib/db";

export type SearchProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  avg_rating: number | null;
};

const searchProductSelect = sql`
  SELECT
    p.id,
    p.name,
    c.name AS category,
    p.price,
    p.image_url,
    ROUND(AVG(r.rating)::numeric, 1)::float8 AS avg_rating
  FROM products p
  JOIN categories c ON c.id = p.category_id
  LEFT JOIN reviews r ON r.product_id = p.id
`;

const searchProductGroupBy = sql`
  GROUP BY p.id, p.name, c.name, p.price, p.image_url, p.created_at
  ORDER BY p.name ASC
`;

export async function searchProducts(query?: string): Promise<SearchProduct[]> {
  const trimmed = query?.trim() ?? "";

  if (trimmed) {
    const pattern = `%${trimmed}%`;
    return sql<SearchProduct[]>`
      ${searchProductSelect}
      WHERE
        p.name ILIKE ${pattern}
        OR c.name ILIKE ${pattern}
        OR COALESCE(p.description, '') ILIKE ${pattern}
      ${searchProductGroupBy}
    `;
  }

  return sql<SearchProduct[]>`
    ${searchProductSelect}
    ${searchProductGroupBy}
  `;
}
