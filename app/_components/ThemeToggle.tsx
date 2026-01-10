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

function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem("theme");
    if (value === "light" || value === "dark") return value;
    return null;
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    // Follow system preference by default (no data-theme)
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    setTheme(prefersDark ? "dark" : "light");
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
