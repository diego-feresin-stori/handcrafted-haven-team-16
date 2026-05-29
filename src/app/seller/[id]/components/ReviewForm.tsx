"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";

type ReviewFormProps = {
  productId: string;
  sellerId: string;
  onReviewAdded: () => void;
};

export default function ReviewForm({
  productId,
  sellerId,
  onReviewAdded,
}: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!author.trim()) {
      setError("Please enter your name");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          sellerId,
          rating,
          comment,
          author,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setAuthor("");
      setComment("");
      setRating(5);
      setIsOpen(false);
      onReviewAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.openButton}
        >
          Leave a review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3>Share your feedback</h3>

          <div className={styles.formGroup}>
            <label htmlFor="author">Your name</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating</label>
            <div className={styles.ratingSelect}>
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className={styles.starLabel}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  <span className={styles.starDisplay}>★</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Your comment (optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think..."
              maxLength={500}
              rows={4}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit review"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}