import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const previewImage = `${origin}/og.png`;

  return {
    title: "Loopit 模板功能效果看板",
    description: "Loopit 模板效果历史数据展示。",
    metadataBase: new URL(origin),
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
}

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
