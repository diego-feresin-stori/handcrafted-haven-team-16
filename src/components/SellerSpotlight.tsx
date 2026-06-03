import Link from "next/link";
import styles from "./SellerSpotlight.module.css";

export default function SellerSpotlight() {
  return (
    <section
      id="sellers"
      className={`section ${styles.section}`}
      aria-labelledby="sellers-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h2 id="sellers-heading" className="sectionTitle">
            Meet independent artisans
          </h2>
          <p className={styles.description}>
            Every seller on Handcrafted Haven has a story. Create a profile to
            showcase your craftsmanship, upload product images, and connect with
            customers who value handmade quality.
          </p>
          <ul className={styles.highlights}>
            <li>Share your craft story and studio photos</li>
            <li>List products with images, pricing, and descriptions</li>
            <li>Build trust through reviews and ratings</li>
          </ul>
          <div className={styles.actions}>
            <Link href="/sellers" className="buttonPrimary">
              Browse all artisans
            </Link>
          </div>
        </div>
        <aside className={styles.quote} aria-label="Seller testimonial">
          <blockquote>
            <p>
              &ldquo;Handcrafted Haven gave my small pottery studio a home where
              customers can discover the care behind every piece.&rdquo;
            </p>
            <footer>— Elena M., Ceramic Artist</footer>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}