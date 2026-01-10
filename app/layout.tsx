import type { Metadata } from "next";
import "./globals.css";
import BackToTopButton from "./_components/BackToTopButton";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "森岡知也（専門学生）のポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        {children}
        <BackToTopButton />
        <SiteFooter />
      </body>
    </html>
  );
}
