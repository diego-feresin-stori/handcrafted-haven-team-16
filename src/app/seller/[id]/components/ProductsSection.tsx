import ProductCard from "./ProductCard";
import { sql } from "@/lib/db";
import styles from "../sellerProfile.module.css";

type SellerProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  avg_rating: number | null;
};

async function getSellerProducts(
  sellerId: string,
  category?: string,
  sort?: string
): Promise<SellerProduct[]> {

  const orderSql =
    sort === "price_asc"
      ? sql`ORDER BY p.price ASC`
      : sort === "price_desc"
      ? sql`ORDER BY p.price DESC`
      : sql`ORDER BY p.created_at DESC`;

  return sql<SellerProduct[]>`
    SELECT
      p.id,
      p.name,
      c.name AS category,
      p.price,
      p.image_url,
      ROUND(AVG(r.rating)::numeric,1)::float8 AS avg_rating

    FROM products p
    JOIN categories c
      ON c.id = p.category_id

    LEFT JOIN reviews r
      ON r.product_id = p.id

    WHERE
      p.seller_id = ${sellerId}
      ${category ? sql`AND c.id = ${category}` : sql``}

    GROUP BY
      p.id,
      p.name,
      c.name,
      p.price,
      p.image_url,
      p.created_at

    ${orderSql}
  `;
}

export default async function ProductsSection({
  sellerId,
  sellerName,
  category,
  sort,
}: {
  sellerId: string;
  sellerName: string;
  category?: string;
  sort?: string;
}) {

  const sellerProducts =
    await getSellerProducts(
      sellerId,
      category,
      sort
    );

  return (
    <>
      <div className={styles.productsTop}>
        <p className={styles.productCount}>
          {sellerProducts.length} listed products
        </p>
      </div>

      {sellerProducts.length > 0 ? (
        <ul
          className={styles.grid}
          aria-label={`${sellerName} products`}
        >
          {sellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.emptyState}>
          <h3>No products are listed yet.</h3>
          <p>
            This seller profile exists,
            but there are no products assigned yet.
          </p>
        </div>
      )}
    </>
  );
}