import Link from "next/link";

import styles from "./contact.module.css";

export const metadata = {
  title: "Contact",
  description: "連絡先（応募用情報）",
};

export default function ContactPage() {
  const email = "ktc25a31k0003@edu.kyoto-tech.ac.jp";
  const github = "https://github.com/mosan01";

  return (
    <main className={styles.page}>
      <div className={styles.heroBg} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.sub}>連絡先・応募用の情報まとめ</p>
      </header>

      <section className={styles.section} aria-label="連絡先">
        <div className={styles.card}>
          <div className={styles.row}>
            <div className={styles.label}>Email</div>
            <a className={styles.valueLink} href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>GitHub</div>
            <a className={styles.valueLink} href={github} target="_blank" rel="noreferrer">
              {github}
            </a>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Blog</div>
            <Link className={styles.valueLink} href="/blog">
              /blog
            </Link>
          </div>
        </div>
        <p className={styles.note}>
          自己紹介・スキル・趣味は <Link href="/about">About</Link> にまとめています。TOPは <Link href="/">こちら</Link>。
        </p>
      </section>
    </main>
  );
}
