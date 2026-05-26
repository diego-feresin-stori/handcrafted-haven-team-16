import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Independent artisans, one-of-a-kind finds</p>
          <h1 id="hero-heading" className={styles.title}>
            Connect with unique handcrafted products made by independent artisans.
          </h1>
          <p className={styles.description}>
            Browse curated handmade goods, discover the stories behind each piece,
            and support makers who pour heart into every creation.
          </p>
          <div className={styles.actions}>
            <a href="#shop" className="buttonPrimary">
              Browse Products
            </a>
            <a href="#sellers" className="buttonSecondary">
              Become a Seller
            </a>
          </div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.card}>
            <span className={styles.cardLabel}>Handmade</span>
            <span className={styles.cardTitle}>Crafted with care</span>
          </div>
          <div className={`${styles.card} ${styles.cardAccent}`}>
            <span className={styles.cardLabel}>Community</span>
            <span className={styles.cardTitle}>Stories that matter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
