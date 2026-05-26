import Image from "next/image";
import { featuredProducts } from "@/lib/placeholder-products";
import styles from "./FeaturedProducts.module.css";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedProducts() {
  return (
    <section
      id="shop"
      className={`section ${styles.section}`}
      aria-labelledby="shop-heading"
    >
      <div className="container">
        <h2 id="shop-heading" className="sectionTitle">
          Featured handcrafted finds
        </h2>
        <p className="sectionSubtitle">
          A glimpse of the one-of-a-kind pieces waiting to be discovered on
          Handcrafted Haven.
        </p>
        <ul className={styles.grid}>
          {featuredProducts.map((product) => (
            <li key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={400}
                  height={320}
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <p className={styles.category}>{product.category}</p>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.meta}>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                  <span className={styles.rating} aria-label={`Rated ${product.rating} out of 5`}>
                    ★ {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
