"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
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
  const [reviewTrigger, setReviewTrigger] = useState(0);

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
                {product.avg_rating !== null ? `${product.avg_rating.toFixed(1)} / 5` : "No ratings"}
              </span>
            </div>
          </div>
        </article>
      </Link>

      <div className={styles.reviewsSection}>
        <ReviewForm
          productId={product.id}
          onReviewAdded={() => setReviewTrigger((t) => t + 1)}
        />
        <ReviewList productId={product.id} refreshTrigger={reviewTrigger} />
      </div>
    </li>
  );
}