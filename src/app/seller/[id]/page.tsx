import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProducts } from "@/lib/placeholder-products";
import styles from "./sellerProfile.module.css";

type SellerProfile = {
  name: string;
  title: string;
  location: string;
  memberSince: string;
  responseTime: string;
  story: string;
  specialties: string[];
  values: string[];
  initials: string;
};

const sellerProfiles: Record<string, SellerProfile> = {
  "1": {
    name: "Elena Marrow",
    title: "Ceramic artist and home fragrance maker",
    location: "Provo, Utah",
    memberSince: "8 years creating by hand",
    responseTime: "Replies within 1 business day",
    story:
      "I build small-batch pieces that are meant to live with people every day. My studio focuses on wheel-thrown ceramics and calm, grounded scents that bring warmth to the table, shelf, and entryway.",
    specialties: [
      "Wheel-thrown ceramics",
      "Small-batch candles",
      "Warm modern home goods",
    ],
    values: [
      "Low-waste packaging",
      "Functional craftsmanship",
      "Thoughtful finishing",
    ],
    initials: "EM",
  },
  "2": {
    name: "Marcus Vale",
    title: "Leather artisan and textile finisher",
    location: "Boise, Idaho",
    memberSince: "6 years creating by hand",
    responseTime: "Replies within 12 hours",
    story:
      "I make everyday carry goods with careful stitching, natural materials, and a focus on durability. I also finish textile pieces so each item feels personal, tactile, and ready to be used for years.",
    specialties: [
      "Hand-stitched leather goods",
      "Natural fiber accessories",
      "Everyday carry essentials",
    ],
    values: [
      "Durable materials",
      "Repair-friendly construction",
      "Personalized details",
    ],
    initials: "MV",
  },
  "3": {
    name: "Asha Linden",
    title: "Basket weaver and woodworker",
    location: "Logan, Utah",
    memberSince: "10 years creating by hand",
    responseTime: "Replies within 1 business day",
    story:
      "My work blends woven storage with carved home pieces so each object feels useful and quietly sculptural. I favor natural finishes and patient craftsmanship that highlights the material instead of hiding it.",
    specialties: [
      "Woven storage",
      "Olive wood homeware",
      "Natural material finishes",
    ],
    values: ["Heirloom quality", "Organic textures", "Honest material stories"],
    initials: "AL",
  },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

type SellerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatPrice(price: number) {
  return currencyFormatter.format(price);
}

function getSellerProducts(sellerId: string) {
  return featuredProducts.filter((product) => product.sellerId === sellerId);
}

export function generateStaticParams() {
  return Object.keys(sellerProfiles).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: SellerPageProps): Promise<Metadata> {
  const { id } = await params;
  const seller = sellerProfiles[id];

  if (!seller) {
    return {
      title: "Seller profile not found",
    };
  }

  return {
    title: `${seller.name} | Seller profile`,
    description: `${seller.title}. ${seller.story}`,
  };
}

export default async function SellerProfilePage({ params }: SellerPageProps) {
  const { id } = await params;
  const seller = sellerProfiles[id];

  if (!seller) {
    notFound();
  }

  const sellerProducts = getSellerProducts(id);

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="seller-profile-heading">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroLayout}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Seller profile</p>
            <h1 id="seller-profile-heading" className={styles.title}>
              {seller.name}
            </h1>
            <p className={styles.tagline}>{seller.title}</p>
            <p className={styles.story}>{seller.story}</p>

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
            <div className={styles.avatar} aria-hidden="true">
              <span>{seller.initials}</span>
            </div>

            <dl className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <dt>Location</dt>
                <dd>{seller.location}</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Experience</dt>
                <dd>{seller.memberSince}</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Response time</dt>
                <dd>{seller.responseTime}</dd>
              </div>
              <div className={styles.summaryItem}>
                <dt>Style focus</dt>
                <dd>{seller.specialties[0]}</dd>
              </div>
            </dl>

            <div className={styles.valueBlock}>
              <h2 className={styles.valueHeading}>Craft values</h2>
              <ul className={styles.values}>
                {seller.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
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
                These products are filtered directly from the shared product data using this seller ID.
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
                <li key={product.id} className={styles.card}>
                  <article className={styles.cardArticle}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={product.image}
                        alt={product.alt}
                        width={400}
                        height={320}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.category}>{product.category}</p>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <div className={styles.meta}>
                        <span className={styles.price}>{formatPrice(product.price)}</span>
                        <span
                          className={styles.rating}
                          aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
                        >
                          {product.rating.toFixed(1)} / 5
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState} role="status" aria-live="polite">
              <h3>No products are listed yet.</h3>
              <p>
                This seller profile is ready, but the mock product data does not have any items assigned
                to this seller ID yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}