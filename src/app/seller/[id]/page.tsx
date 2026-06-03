import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import ProductCard from "./components/ProductCard";
import styles from "./sellerProfile.module.css";

type SellerRow = {
  id: string;
  name: string;
  bio: string | null;
  story: string | null;
  image_url: string | null;
  location: string | null;
  avg_rating: number | null;
  review_count: number;
};

type SellerProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  avg_rating: number | null;
};

type SellerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

async function getSellerById(sellerId: string): Promise<SellerRow | null> {
  const rows = await sql<SellerRow[]>`
    SELECT
      sp.id,
      u.name,
      sp.bio,
      sp.story,
      sp.image_url,
      NULL::text AS location,
      ROUND(AVG(r.rating)::numeric, 1)::float8 AS avg_rating,
      COUNT(r.id)::int AS review_count
    FROM seller_profiles sp
    JOIN users u ON u.id = sp.user_id
    LEFT JOIN products p ON p.seller_id = sp.id
    LEFT JOIN reviews r ON r.product_id = p.id
    WHERE sp.id = ${sellerId}
    GROUP BY sp.id, u.name, sp.bio, sp.story, sp.image_url
    LIMIT 1
  `;

  return rows[0] ?? null;
}

async function getSellerProducts(sellerId: string): Promise<SellerProduct[]> {
  return sql<SellerProduct[]>`
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
    WHERE p.seller_id = ${sellerId}
    GROUP BY p.id, p.name, c.name, p.price, p.image_url, p.created_at
    ORDER BY p.created_at DESC
  `;
}

export async function generateMetadata({
  params,
}: SellerPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const seller = await getSellerById(id);

    if (!seller) {
      return { title: "Seller profile not found" };
    }

    return {
      title: `${seller.name} | Seller profile`,
      description: seller.story || seller.bio || `Profile for artisan ${seller.name}`,
    };
  } catch {
    return { title: "Seller profile" };
  }
}

export default async function SellerProfilePage({ params }: SellerPageProps) {
  const { id } = await params;

  let seller: SellerRow | null = null;
  let sellerProducts: SellerProduct[] = [];

  try {
    const [sellerResult, productsResult] = await Promise.all([
      getSellerById(id),
      getSellerProducts(id),
    ]);

    seller = sellerResult;
    sellerProducts = productsResult;
  } catch {
    notFound();
  }

  if (!seller) {
    notFound();
  }

  const ratingLabel =
    seller.avg_rating !== null
      ? `${seller.avg_rating.toFixed(1)} (${seller.review_count} reviews)`
      : "No ratings yet";

  return (
    <main id="main-content" className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#sellers">Artisans</Link>
          <span>/</span>
          <span className={styles.current}>{seller.name}</span>
        </div>
      </nav>

      <section className={styles.hero} aria-labelledby="seller-profile-heading">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Seller profile</p>
            <h1 id="seller-profile-heading" className={styles.title}>
              {seller.name}
            </h1>
            <p className={styles.tagline}>{seller.bio ?? "Independent artisan"}</p>
            <p className={styles.story}>
              {seller.story ?? "This artisan has not added a full story yet."}
            </p>

            <div className={styles.actions}>
              <Link href="/#shop" className="buttonPrimary">
                Browse all products
              </Link>
              <Link href="/#sellers" className="buttonSecondary">
                See artisan stories
              </Link>
            </div>
          </div>

          <aside
            className={styles.summaryCard}
            aria-label={`${seller.name} profile summary`}
          >
            {seller.image_url ? (
              <div className={styles.avatarImageWrap}>
                <Image
                  src={seller.image_url}
                  alt={`${seller.name} profile image`}
                  width={76}
                  height={76}
                  className={styles.avatarImage}
                />
              </div>
            ) : (
              <div className={styles.avatar} aria-hidden="true">
                <span>{getInitials(seller.name)}</span>
              </div>
            )}

            <div className={styles.ratingBlock}>
              <span className={styles.stars}>★★★★★</span>
              <p className={styles.ratingText}>{ratingLabel}</p>
            </div>

            <dl className={styles.summaryGrid}>
              {seller.location && (
                <div className={styles.summaryItem}>
                  <dt>Location</dt>
                  <dd>{seller.location}</dd>
                </div>
              )}
              <div className={styles.summaryItem}>
                <dt>Products</dt>
                <dd>{sellerProducts.length}</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Rating</dt>
                <dd>{seller.avg_rating !== null ? seller.avg_rating.toFixed(1) : "N/A"}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        className={`section ${styles.productsSection}`}
        aria-labelledby="products-heading"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionKicker}>Handmade collection</p>
              <h2 id="products-heading" className="sectionTitle">
                Products by {seller.name}
              </h2>
              <p className="sectionSubtitle">
                Products and ratings are loaded from the shared PostgreSQL database.
              </p>
            </div>
            <p
              className={styles.productCount}
              aria-label={`${sellerProducts.length} products listed`}
            >
              {sellerProducts.length} listed products
            </p>
          </div>

          {sellerProducts.length > 0 ? (
            <ul className={styles.grid} aria-label={`${seller.name} products`}>
              {sellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState} role="status" aria-live="polite">
              <h3>No products are listed yet.</h3>
              <p>This seller profile exists, but there are no products assigned yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}