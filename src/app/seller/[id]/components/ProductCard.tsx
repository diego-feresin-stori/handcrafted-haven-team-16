import Image from "next/image";
import Link from "next/link";
import styles from "../sellerProfile.module.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function formatPrice(price: number) {
  return currencyFormatter.format(price);
}

type SellerProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  avg_rating: number | null;
};

type ProductCardProps = {
  product: SellerProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <li className={styles.cardContainer}>
      <Link href={`/product/${product.id}`} className={styles.cardLink}>
        <article className={styles.cardArticle}>
          <div className={styles.imageWrap}>
            <Image
              src={product.image_url}
              alt={product.name}
              width={400}
              height={320}
              className={styles.image}
              loading="eager"
            />
          </div>
          <div className={styles.cardBody}>
            <p className={styles.category}>{product.category}</p>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.meta}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              <span
                className={styles.productRating}
                aria-label={
                  product.avg_rating !== null
                    ? `Rated ${product.avg_rating.toFixed(1)} out of 5`
                    : "No ratings yet"
                }
              >
                {product.avg_rating !== null
                  ? `${product.avg_rating.toFixed(1)} / 5`
                  : "No ratings"}
              </span>
            </div>
            <span className={styles.reviewsLink}>View reviews →</span>
          </div>
        </article>
      </Link>
    </li>
  );
}