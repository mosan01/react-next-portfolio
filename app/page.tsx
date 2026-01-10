import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const profile = {
    name: "森岡知也",
    headline: "ようこそ。ポートフォリオへ",
    role: "専門学生 / Web Developer",
    summary:
      "Python / HTML / CSS / Lua を中心に制作しています。見た目だけで終わらせず、使いやすさと分かりやすさを意識して実装します。",
    links: {
      github: "https://github.com/mosan01",
      x: "",
      email: "",
    },
  };

  return (
    <div className={styles.page}>
      <main id="top" className={styles.main}>
        <section className={styles.hero} aria-label="ヒーロー">
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{profile.role}</p>
            <h1 className={styles.title}>
              {profile.headline}
              <span className={styles.titleAccent} aria-hidden="true">
                .
              </span>
            </h1>
            <p className={styles.lead}>
              {profile.name} / {profile.summary}
            </p>

            <div className={styles.ctaRow}>
              <Link className={styles.secondaryCta} href="/about">
                About（プロフィール）
              </Link>
              <Link className={styles.secondaryCta} href="/blog">
                Blog（記事一覧）
              </Link>
              <Link className={styles.primaryCta} href="/contact">
                Contact（連絡先）
              </Link>
              <a
                className={styles.secondaryCta}
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
