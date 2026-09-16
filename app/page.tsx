import type { Metadata } from "next";

const assetBase = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const publicAsset = (path: string) => `${assetBase}${path}`;

export const metadata: Metadata = {
  title: "模板体验方法展示｜公开版",
  description: "经脱敏处理的产品体验分析方法作品集样例。",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function Home() {
  return (
    <main>
      <iframe
        src={publicAsset("/dashboard/index.html")}
        title="模板体验方法展示｜公开版"
        allow="fullscreen"
      />
    </main>
  );
}
