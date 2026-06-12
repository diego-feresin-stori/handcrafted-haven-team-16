import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewSection from "./components/ReviewSection";
import styles from "./productReview.module.css";

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string;
  seller_id: string;
  seller_name: string;
  avg_rating: number | null;
  review_count: number;
};

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(productId: string): Promise<ProductRow | null> {
  const rows = await sql<ProductRow[]>`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.image_url,
      c.name AS category,
      sp.id AS seller_id,
      u.name AS seller_name,
      ROUND(AVG(r.rating)::numeric, 1)::float8 AS avg_rating,
      COUNT(r.id)::int AS review_count
    FROM products p
    JOIN categories c ON c.id = p.category_id
    JOIN seller_profiles sp ON sp.id = p.seller_id
    JOIN users u ON u.id = sp.user_id
    LEFT JOIN reviews r ON r.product_id = p.id
    WHERE p.id = ${productId}
    GROUP BY p.id, p.name, p.description, p.price, p.image_url, c.name, sp.id, u.name
    LIMIT 1
  `;
  return rows[0] ?? null;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    if (!product) return { title: "Product not found" };
    return {
      title: `${product.name} — Reviews | Handcrafted Haven`,
      description: product.description ?? `Reviews for ${product.name}`,
    };
  } catch {
    return { title: "Product Reviews" };
  }
}

export default async function ProductReviewPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product: ProductRow | null = null;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const ratingLabel =
    product.avg_rating !== null
      ? `${product.avg_rating.toFixed(1)} / 5 (${product.review_count} review${product.review_count !== 1 ? "s" : ""})`
      : "No ratings yet";

  return (
    <>
      <Header />
      <main id="main-content" className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className="container">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/seller/${product.seller_id}`}>{product.seller_name}</Link>
            <span>/</span>
            <span className={styles.current}>{product.name}</span>
          </div>
        </nav>

        <section className={styles.productHero} aria-label="Product information">
          <div className={`container ${styles.heroLayout}`}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image_url}
                alt={product.name}
                width={480}
                height={380}
                className={styles.productImage}
                priority
              />
            </div>

            <div className={styles.productInfo}>
              <p className={styles.category}>{product.category}</p>
              <h1 className={styles.productName}>{product.name}</h1>

              <div className={styles.ratingRow} aria-label={`Rating: ${ratingLabel}`}>
                <span className={styles.stars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        product.avg_rating !== null && i < Math.round(product.avg_rating)
                          ? styles.starFilled
                          : styles.starEmpty
                      }
                    >
                      ★
                    </span>
                  ))}
                </span>
                <span className={styles.ratingText}>{ratingLabel}</span>
              </div>

              <p className={styles.price}>
                {currencyFormatter.format(product.price)}
              </p>

              {product.description && (
                <p className={styles.description}>{product.description}</p>
              )}

              <div className={styles.sellerLink}>
                <span>By</span>
                <Link href={`/seller/${product.seller_id}`} className={styles.sellerName}>
                  {product.seller_name}
                </Link>
              </div>

              <Link href={`/seller/${product.seller_id}`} className="buttonPrimary">
                View seller profile
              </Link>
            </div>
          </div>
        </section>

        <section className={`section ${styles.reviewSection}`} aria-labelledby="reviews-heading">
          <div className="container">
            <h2 id="reviews-heading" className={`sectionTitle ${styles.reviewsTitle}`}>
              Customer reviews
            </h2>
            <ReviewSection productId={product.id} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}