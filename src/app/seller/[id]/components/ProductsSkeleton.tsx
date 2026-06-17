import styles from "../sellerProfile.module.css";

export default function ProductsSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={styles.skeletonCard}
        />
      ))}
    </div>
  );
}