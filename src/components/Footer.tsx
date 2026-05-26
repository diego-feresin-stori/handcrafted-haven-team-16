import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Handcrafted Haven</p>
          <p className={styles.tagline}>
            Connecting customers with unique handcrafted products from independent
            artisans.
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href="#shop">Shop</a>
          <a href="#sellers">Sellers</a>
          <a href="#features">About</a>
        </nav>
        <p className={styles.copyright}>
          © {year} Handcrafted Haven · Team 16 · WDD430
        </p>
      </div>
    </footer>
  );
}
