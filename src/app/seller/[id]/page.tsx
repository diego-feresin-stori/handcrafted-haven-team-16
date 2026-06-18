import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import styles from "./sellerProfile.module.css";
import { Suspense } from "react";
import ProductsSection from "./components/ProductsSection";
import ProductsSkeleton from "./components/ProductsSkeleton";



type SellerRow = {
  id: string;
  name: string;
  bio: string | null;
  story: string | null;
  image_url: string | null;
  location: string | null;
  product_count: number;
  avg_rating: number | null;
  review_count: number;
};

type SellerCategory = {
  id: string;
  name: string;
};


type SellerPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
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
      COUNT(DISTINCT p.id)::int AS product_count,
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
async function getCategoriesBySellerId(sellerId: string): Promise<SellerCategory[]> {
  return sql<SellerCategory[]>`
    SELECT DISTINCT
      c.id,
      c.name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.seller_id = ${sellerId}
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

export default async function SellerProfilePage({ params, searchParams }: SellerPageProps) {
  const { id } = await params;
  const { category, sort } = await searchParams;
  const categories = await getCategoriesBySellerId(id);



  let seller: SellerRow | null = null;


  try {
    const [sellerResult,] = await Promise.all([
      getSellerById(id),
    ]);

    seller = sellerResult;

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
                <dd>
                  {seller.product_count} product
                  {seller.product_count !== 1 ? "s" : ""}
                </dd>
              </div>

              <div className={styles.summaryItem}>
                <dt>Rating</dt>
                <dd>
                  {seller.avg_rating !== null
                    ? seller.avg_rating.toFixed(1)
                    : "N/A"}
                </dd>
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
            <div className={styles.toolbar}>

              <form className={styles.filters}>

                <select
                  name="category"
                  defaultValue={category ?? ""}
                  
                >
                  <option value="">
                    All categories
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}

                </select>

                <select
                  name="sort"
                  defaultValue={sort ?? ""}
                >
                  <option value="">
                    Sort by Price
                  </option>

                  <option value="price_asc">
                    Low to High
                  </option>

                  <option value="price_desc">
                    High to Low
                  </option>

                </select>

                <button type="submit">
                  Apply filters
                </button>

              </form>

            </div>
          </div>
          <Suspense
            key={`${category}-${sort}`}
            fallback={<ProductsSkeleton />}
          >
            <ProductsSection
              sellerId={id}
              sellerName={seller.name}
              category={category}
              sort={sort}
            />
          </Suspense>

        </div>
      </section>
    </main>
  );
}
