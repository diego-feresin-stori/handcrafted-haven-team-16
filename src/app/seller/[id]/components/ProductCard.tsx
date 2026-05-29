"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/placeholder-products";
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

type ProductCardProps = {
  product: Product;
  sellerId: string;
};

export default function ProductCard({ product, sellerId }: ProductCardProps) {
  const [reviewTrigger, setReviewTrigger] = useState(0);

  return (
    <li className={styles.cardContainer}>
      <Link href={`/product/${product.id}`} className={styles.cardLink}>
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
                className={styles.productRating}
                aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
              >
                {product.rating.toFixed(1)} / 5
              </span>
            </div>
          </div>
        </article>
      </Link>

      <div className={styles.reviewsSection}>
        <ReviewForm
          productId={product.id}
          sellerId={sellerId}
          onReviewAdded={() => setReviewTrigger((t) => t + 1)}
        />
        <ReviewList productId={product.id} refreshTrigger={reviewTrigger} />
      </div>
    </li>
  );
}