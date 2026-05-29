"use client";

import { useEffect, useState } from "react";
import styles from "./ReviewList.module.css";

type Review = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
};

type ReviewListProps = {
  productId: string;
  refreshTrigger?: number;
};

export default function ReviewList({
  productId,
  refreshTrigger,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.sort(
            (a: Review, b: Review) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshTrigger]);

  if (isLoading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Customer Reviews</h3>
        <div className={styles.stats}>
          <span className={styles.average}>
            {avgRating.toFixed(1)} / 5
          </span>
          <span className={styles.count}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
        </div>
      </div>

      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div>
                <p className={styles.author}>{review.author}</p>
                <p className={styles.date}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className={styles.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < review.rating ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {review.comment && (
              <p className={styles.comment}>{review.comment}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}