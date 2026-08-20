import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    "https://awoele.github.io/loopit-template-showcase/",
);
const previewImage = new URL("og.png", siteUrl).toString();

export const metadata: Metadata = {
  title: "Loopit 模板功能效果看板",
  description: "Loopit 模板效果历史数据展示。",
  metadataBase: siteUrl,
  openGraph: {
    title: "Loopit 模板功能效果看板",
    description: "模板从使用、创作到作品反馈与创作者留存的完整表现。",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1731,
        height: 909,
        alt: "Loopit 模板功能效果看板预览",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loopit 模板功能效果看板",
    description: "模板从使用、创作到作品反馈与创作者留存的完整表现。",
    images: [previewImage],
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
