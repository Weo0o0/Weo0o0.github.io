import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Weo0o0-Note",
    template: "%s | Weo0o0-Note",
  },
  description: "다양한 프로젝트 소개 및 개발하는 블로그",
  metadataBase: new URL("https://weo0o0.github.io"),
  openGraph: {
    title: "Weo0o0-Note",
    description: "다양한 프로젝트 소개 및 개발하는 블로그",
    url: "https://weo0o0.github.io",
    siteName: "Weo0o0-Note",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    other: {
      "naver-site-verification": "4937a1906b8e16613ea3b0dd1b941a2a4f60319e",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>
        <div className="noise-bg" />
        <Header />
        <main className="relative z-10 pt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
