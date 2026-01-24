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
      "Python / HTML / CSS / Lua を中心に制作しています。できる限り使いやすく、子供心ある作品を制作していきたいです",
  };

  const skills = [
    "Next.js",
    "HTML / CSS",
    "Python",
    "Lua",
  ] as const;

  const hobbies = [
    "ゲーム（FPS）",
    "音楽鑑賞",
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

      <section className={styles.section} aria-label="お気に入りの曲">
        <h2 className={styles.h2}>お気に入りの曲</h2>
        <div className={styles.mediaEmbed}>
          <iframe
            className={styles.mediaFrame}
            src="https://www.youtube.com/embed/xefpHEg5UIA?start=1&rel=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <a
          className={styles.mediaLink}
          href="https://www.youtube.com/watch?v=xefpHEg5UIA&list=RDxefpHEg5UIA&start_radio=1"
          target="_blank"
          rel="noreferrer"
        >
          YouTubeで開く
        </a>
      </section>
    </main>
  );
}
