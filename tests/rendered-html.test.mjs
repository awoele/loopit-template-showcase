import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the dashboard shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Loopit 模板功能效果看板<\/title>/i);
  assert.match(html, /<iframe[^>]+src="\/dashboard\/index\.html"/i);
  assert.match(html, /name="robots"[^>]+content="noindex, nofollow, noarchive"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("ships the complete interactive static dashboard", async () => {
  const [dashboardHtml, dashboardJs, dashboardJson, robots, previewImage] =
    await Promise.all([
    readFile(new URL("../public/dashboard/index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/dashboard/data/dashboard.js", import.meta.url), "utf8"),
    readFile(new URL("../public/dashboard/data/dashboard.json", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(dashboardHtml, /<script src="data\/dashboard\.js"><\/script>/i);
  assert.match(dashboardHtml, /fetch\("data\/dashboard\.json"/i);
  assert.match(dashboardHtml, /name="robots" content="noindex, nofollow, noarchive"/i);
  assert.match(dashboardJs, /window\.__LOOPIT_DASHBOARD_DATA__/);
  assert.doesNotThrow(() => JSON.parse(dashboardJson));
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Disallow:\s*\//i);
  assert.ok(previewImage.length > 100_000);
});

test("keeps the GitHub Pages static-export contract", async () => {
  const [page, layout, nextConfig, packageJson, workflow, pagesTsconfig] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
      readFile(new URL("../tsconfig.pages.json", import.meta.url), "utf8"),
    ]);

  assert.match(page, /publicAsset\("\/dashboard\/index\.html"\)/);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(nextConfig, /assetPrefix:\s*basePath/);
  assert.match(packageJson, /"build:pages":\s*"next build"/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH:\s*\/loopit-template-showcase/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.doesNotThrow(() => JSON.parse(pagesTsconfig));
});
