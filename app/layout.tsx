import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loopit 模板功能效果看板",
  description: "保留原有看板交互的公开模拟数据样例。",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
