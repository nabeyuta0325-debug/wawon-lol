import type { Metadata } from "next";
import "./globals.css";

const siteName = "RIFT NOTE | LoL攻略";

export const metadata: Metadata = {
  metadataBase: new URL("https://rift-note.jp"),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: "League of Legends（LoL）の初心者〜中級者向け攻略サイト。チャンピオン、ロール別の立ち回り、パッチ情報をわかりやすく解説。",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ja_JP", siteName, title: siteName, description: "迷ったら、すぐ答えが見つかるLoL攻略。" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
