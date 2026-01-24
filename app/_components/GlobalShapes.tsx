import styles from "./globalShapes.module.css";

export default function GlobalShapes() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <span className={`${styles.shape} ${styles.circle} ${styles.s1}`} />
      <span className={`${styles.shape} ${styles.square} ${styles.s2}`} />
      <span className={`${styles.shape} ${styles.triangle} ${styles.s3}`} />
    </div>
  );
}
