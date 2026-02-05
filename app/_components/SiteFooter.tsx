import styles from "./siteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}></div>
        <div className={styles.right}>© {new Date().getFullYear()} 森岡知也</div>
      </div>
    </footer>
  );
}
