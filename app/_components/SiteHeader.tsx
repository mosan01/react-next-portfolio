"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "./siteHeader.module.css";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const pathname = usePathname();

  const isActive = (href: (typeof NAV_ITEMS)[number]["href"]) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="Homeへ">
          <span className={styles.brandIcon} aria-hidden="true">
            <span className={styles.brandIconInner} />
          </span>
          <span className={styles.brandName}>
            T<span className={styles.brandDot} aria-hidden="true">
              .
            </span>
Morioka
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="サイトメニュー">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className={styles.desktopNavLink}
              href={item.href}
              data-active={isActive(item.href) ? "true" : "false"}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.menuButton}
            aria-label="メニュー"
            aria-expanded={isOpen}
            aria-controls="site-menu"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="メニューを閉じる"
          onClick={close}
        />
      ) : null}

      {isOpen ? (
        <nav id="site-menu" className={styles.mobileNavOpen} aria-label="サイトメニュー">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className={styles.mobileNavLink}
              href={item.href}
              onClick={close}
              data-active={isActive(item.href) ? "true" : "false"}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
