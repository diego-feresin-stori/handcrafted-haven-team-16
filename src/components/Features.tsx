import styles from "./Features.module.css";

const features = [
  {
    title: "Browse handcrafted products",
    description:
      "Explore a curated marketplace of unique items made by independent artisans.",
  },
  {
    title: "Filter by category and price",
    description:
      "Find exactly what you are looking for with simple, intuitive browsing tools.",
  },
  {
    title: "Seller profile pages",
    description:
      "Meet the makers behind each piece and learn the stories that inspire their craft.",
  },
  {
    title: "Reviews and ratings",
    description:
      "Shop with confidence using community feedback from fellow handcrafted lovers.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className={`section ${styles.features}`}
      aria-labelledby="features-heading"
    >
      <div className="container">
        <h2 id="features-heading" className="sectionTitle">
          Built for makers and mindful shoppers
        </h2>
        <p className="sectionSubtitle">
          Handcrafted Haven brings together clean design, accessibility, and a
          product-focused experience on every device.
        </p>
        <ul className={styles.grid}>
          {features.map((feature) => (
            <li key={feature.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
