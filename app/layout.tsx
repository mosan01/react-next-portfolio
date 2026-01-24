import type { Metadata } from "next";
import { JetBrains_Mono, M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import BackToTopButton from "./_components/BackToTopButton";
import DeviceClassSetter from "./_components/DeviceClassSetter";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";

const fontSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="ja" data-theme="light">
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
        <DeviceClassSetter />
        <SiteHeader />
        {children}
        <BackToTopButton />
        <SiteFooter />
      </body>
    </html>
  );
}
