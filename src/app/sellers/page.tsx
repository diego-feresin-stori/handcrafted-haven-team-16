import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sql } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./sellers.module.css";

export const metadata: Metadata = {
  title: "Meet Our Artisans | Handcrafted Haven",
  description:
    "Discover the independent artisans behind every handmade piece on Handcrafted Haven.",
};

type SellerRow = {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  avg_rating: number | null;
  review_count: number;
  product_count: number;
};

async function getAllSellers(): Promise<SellerRow[]> {
  return sql<SellerRow[]>`
    SELECT
      sp.id,
      u.name,
      sp.bio,
      sp.image_url,
      ROUND(AVG(r.rating)::numeric, 1)::float8 AS avg_rating,
      COUNT(DISTINCT r.id)::int AS review_count,
      COUNT(DISTINCT p.id)::int AS product_count
    FROM seller_profiles sp
    JOIN users u ON u.id = sp.user_id
    LEFT JOIN products p ON p.seller_id = sp.id
    LEFT JOIN reviews r ON r.product_id = p.id
    GROUP BY sp.id, u.name, sp.bio, sp.image_url
    ORDER BY u.name ASC
  `;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function SellersPage() {
  let sellers: SellerRow[] = [];

  try {
    sellers = await getAllSellers();
  } catch {
    // render empty state on DB error
  }

  return (
    <>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="sellers-heading">
          <div className="container">
            <p className={styles.eyebrow}>Our community</p>
            <h1 id="sellers-heading" className={styles.title}>
              Meet the artisans
            </h1>
            <p className={styles.subtitle}>
              Every piece on Handcrafted Haven is made by an independent creator.
              Browse our community of makers and find the story behind the craft.
            </p>
          </div>
        </section>

        <section className={`section ${styles.grid_section}`} aria-label="Artisan profiles">
          <div className="container">
            {sellers.length === 0 ? (
              <div className={styles.empty} role="status">
                <p>No artisan profiles found yet.</p>
              </div>
            ) : (
              <>
                <p className={styles.count} aria-live="polite">
                  {sellers.length} artisan{sellers.length !== 1 ? "s" : ""}
                </p>
                <ul className={styles.grid} aria-label="All artisan profiles">
                  {sellers.map((seller) => (
                    <li key={seller.id}>
                      <Link
                        href={`/seller/${seller.id}`}
                        className={styles.card}
                        aria-label={`View profile for ${seller.name}`}
                      >
                        <div className={styles.avatarWrap}>
                          {seller.image_url ? (
                            <Image
                              src={seller.image_url}
                              alt={`${seller.name} profile`}
                              width={72}
                              height={72}
                              className={styles.avatarImg}
                            />
                          ) : (
                            <div className={styles.avatarInitials} aria-hidden="true">
                              {getInitials(seller.name)}
                            </div>
                          )}
                        </div>

                        <div className={styles.cardBody}>
                          <h2 className={styles.sellerName}>{seller.name}</h2>
                          {seller.bio && (
                            <p className={styles.bio}>{seller.bio}</p>
                          )}
                          <div className={styles.meta}>
                            <span className={styles.metaItem}>
                              <strong>{seller.product_count}</strong> product
                              {seller.product_count !== 1 ? "s" : ""}
                            </span>
                            {seller.avg_rating !== null ? (
                              <span className={styles.metaItem}>
                                <span className={styles.star}>★</span>
                                <strong>{seller.avg_rating.toFixed(1)}</strong>
                                <span className={styles.reviewCount}>
                                  ({seller.review_count})
                                </span>
                              </span>
                            ) : (
                              <span className={styles.metaItem}>No ratings yet</span>
                            )}
                          </div>
                        </div>

                        <span className={styles.viewLink} aria-hidden="true">
                          View profile →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}