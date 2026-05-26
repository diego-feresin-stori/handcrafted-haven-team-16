import styles from "./CallToAction.module.css";

export default function CallToAction() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="cta-heading">
      <div className={`container ${styles.inner}`}>
        <h2 id="cta-heading" className={styles.title}>
          Start exploring handmade treasures today
        </h2>
        <p className={styles.description}>
          Join a community that celebrates craftsmanship, supports independent
          makers, and makes thoughtful shopping feel effortless.
        </p>
        <a href="#shop" className={`buttonPrimary ${styles.button}`}>
          Shop Handcrafted Goods
        </a>
      </div>
    </section>
  );
}
