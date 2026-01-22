import styles from "./about.module.css";

export const metadata = {
  title: "About",
  description: "プロフィール / スキル / 趣味",
};

export default function AboutPage() {
  const profile = {
    name: "森岡知也",
    role: "専門学生 / Web Developer",
    summary:
      "Python / HTML / CSS / Lua を中心に制作しています。見た目だけで終わらせず、使いやすさと分かりやすさを意識して実装します。",
  };

  const skills = [
    "Next.js（App Router）",
    "React / TypeScript",
    "HTML / CSS",
    "Python",
    "Lua",
    "microCMS連携",
  ] as const;

  const hobbies = [
    "（追記予定：例）ゲーム / 音楽 / 読書 など",
  ] as const;

  return (
    <main className={styles.page}>
      <div className={styles.heroBg} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.sub}>{profile.role}</p>
      </header>

      <section className={styles.section} aria-label="プロフィール">
        <h2 className={styles.h2}>プロフィール</h2>
        <div className={styles.card}>
          <div className={styles.nameRow}>
            <div className={styles.name}>{profile.name}</div>
          </div>
          <p className={styles.text}>{profile.summary}</p>
        </div>
      </section>

      <section className={styles.section} aria-label="スキル">
        <h2 className={styles.h2}>スキル</h2>
        <div className={styles.grid}>
          {skills.map((item) => (
            <div key={item} className={styles.pill}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="趣味">
        <h2 className={styles.h2}>趣味</h2>
        <div className={styles.grid}>
          {hobbies.map((item) => (
            <div key={item} className={styles.pill}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
