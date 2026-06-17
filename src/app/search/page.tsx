import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchProducts, type SearchProduct } from "@/lib/products";
import styles from "./search.module.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function formatPrice(price: number) {
  return currencyFormatter.format(Number(price));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();

  if (query) {
    return {
      title: `Search results for "${query}"`,
      description: `Browse handcrafted products matching "${query}" on Handcrafted Haven.`,
    };
  }

  return {
    title: "Search products",
    description: "Browse all handcrafted products on Handcrafted Haven.",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let results: SearchProduct[] = [];
  let hasError = false;

  try {
    results = await searchProducts(query);
  } catch {
    hasError = true;
  }

  return (
    <>
      <Header />
      <main id="main-content" className={`section ${styles.page}`}>
        <div className="container">
          <h1 className="sectionTitle">
            {query ? `Search results for "${q}"` : "All products"}
          </h1>

          <p className={`sectionSubtitle ${styles.subtitle}`} aria-live="polite">
            {hasError
              ? "Unable to load products right now."
              : `Found ${results.length} product${results.length !== 1 ? "s" : ""}`}
          </p>

          {hasError ? (
            <div className={styles.error} role="alert">
              <p>Something went wrong while searching the catalog. Please try again later.</p>
            </div>
          ) : results.length === 0 ? (
            <div className={styles.empty} role="status">
              <p>
                {query
                  ? `No products found for "${q}". Try different keywords.`
                  : "No products are listed yet."}
              </p>
            </div>
          ) : (
            <ul className={styles.grid} aria-label="Search results">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className={styles.cardLink}
                    aria-label={`View ${product.name}`}
                  >
                    <article className={styles.card}>
                      <div className={styles.imageWrap}>
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={400}
                          height={320}
                          className={styles.image}
                        />
                      </div>

                      <div className={styles.details}>
                        <p className={styles.category}>{product.category}</p>
                        <h2 className={styles.name}>{product.name}</h2>

                        <div className={styles.meta}>
                          <span className={styles.price}>{formatPrice(product.price)}</span>
                          <span
                            className={styles.rating}
                            aria-label={
                              product.avg_rating !== null
                                ? `Rated ${product.avg_rating.toFixed(1)} out of 5`
                                : "No ratings yet"
                            }
                          >
                            {product.avg_rating !== null
                              ? `★ ${product.avg_rating.toFixed(1)}`
                              : "No ratings"}
                          </span>
                        </div>

                        <span className={styles.viewLink} aria-hidden="true">
                          View details →
                        </span>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
