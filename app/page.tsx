import type { Metadata } from "next";

const assetBase = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const publicAsset = (path: string) => `${assetBase}${path}`;

export const metadata: Metadata = {
  title: "Loopit 模板功能效果看板",
  description: "Loopit 模板使用、创作、作品反馈与创作者留存效果展示。",
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
        title="Loopit 模板功能效果看板"
        allow="fullscreen"
      />
    </main>
  );
}
