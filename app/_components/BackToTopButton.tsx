"use client";

import { useEffect, useState } from "react";

import styles from "./backToTopButton.module.css";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="ページ上部へ戻る"
      onClick={() => {
        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      }}
    >
      Top
    </button>
  );
}
