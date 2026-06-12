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
      setIsLoading(true);

      try {
        const response = await fetch(`/api/reviews?productId=${productId}`);
        if (response.ok) {
          const data = (await response.json()) as Review[];
          setReviews(
            data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          );
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

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Customer Reviews</h3>
        <div className={styles.stats}>
          <span className={styles.average}>{avgRating.toFixed(1)} / 5</span>
          <span className={styles.count}>
            ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
          </span>
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
              <div className={styles.rating} aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={i < review.rating ? styles.starFilled : styles.starEmpty}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
            </div>
            {review.comment && <p className={styles.comment}>{review.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}