"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";

type ReviewFormProps = {
  productId: string;
  onReviewAdded: () => void;
};

const RATING_LABELS = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

export default function ReviewForm({ productId, onReviewAdded }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [poppingStars, setPoppingStars] = useState<Set<number>>(new Set());
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (star: number) => {
    setRating(star);
    setPoppingStars(new Set([star]));
    setTimeout(() => setPoppingStars(new Set()), 400);
  };

  const activeLevel = hovered || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!author.trim()) {
      setError("Please enter your name");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment, author }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to submit review");
      }

      setAuthor("");
      setComment("");
      setRating(0);
      setHovered(0);
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
        <button onClick={() => setIsOpen(true)} className={styles.openButton}>
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
            <label id="rating-label">Rating</label>
            <div
              className={styles.ratingSelect}
              role="radiogroup"
              aria-labelledby="rating-label"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} star${star > 1 ? "s" : ""} — ${RATING_LABELS[star - 1]}`}
                  className={[
                    styles.starBtn,
                    star <= activeLevel ? styles.starActive : "",
                    poppingStars.has(star) ? styles.starPop : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => handleStarClick(star)}
                >
                  <svg
                    className={styles.starSvg}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </button>
              ))}

              {activeLevel > 0 && (
                <span className={styles.ratingLabel} aria-live="polite">
                  {RATING_LABELS[activeLevel - 1]}
                </span>
              )}
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