"use client";

import { useEffect, useState } from "react";

import styles from "./themeToggle.module.css";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);
    setTheme("light");
    applyTheme("light");
  }, []);

  const label = mounted ? (theme === "dark" ? "Dark" : "Light") : "Theme";

  return (
    <button
      type="button"
      aria-label="テーマ切替"
      className={styles.button}
      data-current={mounted ? theme : undefined}
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
      }}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
