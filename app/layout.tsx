import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "模板体验方法展示｜公开版",
  description: "经脱敏处理的产品体验分析方法作品集样例。",
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
