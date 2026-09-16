import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "模板体验方法展示｜公开版",
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
