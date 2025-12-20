import styles from "./page.module.css";

export default function Home() {
  const profile = {
    name: "森岡知也",
    headline: "作れる学生。伝わる形で。",
    role: "専門学生 / Web Developer",
    summary:
      "Python / HTML / CSS / Lua を中心に制作しています。見た目だけで終わらせず、使いやすさと分かりやすさを意識して実装します。",
    links: {
      github: "https://github.com/mosan01",
      x: "",
      email: "",
    },
  };

  const projects = [
    {
      title: "Project One",
      description:
        "課題→仮説→実装→検証を最短で回す。成果が伝わるプロダクトを意識して制作。",
      highlights: ["Next.js", "TypeScript", "UI/UX"],
      href: "#",
    },
    {
      title: "Project Two",
      description:
        "表示速度と見た目の両立。コンポーネント設計とアクセシビリティを重視。",
      highlights: ["React", "Design", "A11y"],
      href: "#",
    },
    {
      title: "Project Three",
      description:
        "“使われる”を作る。手戻りを減らすための仕様整理と実装の筋道を大切に。",
      highlights: ["Implementation", "Refactor", "DX"],
      href: "#",
    },
  ] as const;

  const skills = [
    "Python",
    "HTML",
    "CSS",
    "Lua",
    "Next.js",
    "React",
  ] as const;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="トップへ">
            <span className={styles.brandMark} aria-hidden="true" />
            <span className={styles.brandText}>{profile.name}</span>
          </a>
          <nav className={styles.nav} aria-label="サイト内リンク">
            <a className={styles.navLink} href="/blog">
              Blog
            </a>
            <a className={styles.navLink} href="#projects">
              Projects
            </a>
            <a className={styles.navLink} href="#skills">
              Skills
            </a>
            <a className={styles.navLink} href="#about">
              About
            </a>
            <a className={styles.navLink} href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

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
            <p className={styles.lead}>{profile.summary}</p>

            <div className={styles.ctaRow}>
              <a
                className={styles.primaryCta}
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHubを見る
              </a>
              <a className={styles.secondaryCta} href="#projects">
                作品を見る
              </a>
              <a className={styles.secondaryCta} href="/blog">
                Blogを見る
              </a>
              {profile.links.x ? (
                <a
                  className={styles.secondaryCta}
                  href={profile.links.x}
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              ) : null}
            </div>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Focus</span>
                <span className={styles.metaValue}>UI / Speed / Quality</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Now</span>
                <span className={styles.metaValue}>Next.js App Router</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className={styles.section} aria-label="制作物">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <p className={styles.sectionDesc}>
              “見た目”だけじゃなく、成果が伝わる形に。
            </p>
          </div>

          <div className={styles.cards}>
            {projects.map((p) => (
              <a
                key={p.title}
                className={styles.card}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <div className={styles.cardTop}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </div>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.chips} aria-label="使用技術">
                  {p.highlights.map((h) => (
                    <span key={h} className={styles.chip}>
                      {h}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="skills" className={styles.section} aria-label="スキル">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <p className={styles.sectionDesc}>
              “すぐ作れる”と“ちゃんと作れる”の両方。
            </p>
          </div>

          <div className={styles.skillGrid}>
            {skills.map((s) => (
              <div key={s} className={styles.skill}>
                {s}
              </div>
            ))}
          </div>
        </section>

        <section id="about" className={styles.section} aria-label="自己紹介">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.sectionDesc}>
              迷わせないUI、落ちない実装、速い改善。
            </p>
          </div>
          <div className={styles.aboutBox}>
            <p className={styles.aboutText}>
              まず目的を言語化して、必要な情報設計に落とします。次に、再利用しやすい
              コンポーネントで実装し、最後に計測・改善で仕上げます。
            </p>
            <div className={styles.aboutStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>01</span>
                <span className={styles.statLabel}>Design to Code</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>02</span>
                <span className={styles.statLabel}>Performance Mindset</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>03</span>
                <span className={styles.statLabel}>Ship & Iterate</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.section} aria-label="連絡先">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <p className={styles.sectionDesc}>一言でも大丈夫です。気軽にどうぞ。</p>
          </div>
          <div className={styles.contactBox}>
            {profile.links.email ? (
              <a className={styles.contactMail} href={`mailto:${profile.links.email}`}>
                {profile.links.email}
              </a>
            ) : (
              <a
                className={styles.contactMail}
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub: mosan01
              </a>
            )}
            <div className={styles.contactLinks}>
              <a
                className={styles.contactLink}
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              {profile.links.x ? (
                <a
                  className={styles.contactLink}
                  href={profile.links.x}
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </footer>
      </main>
    </div>
  );
}
