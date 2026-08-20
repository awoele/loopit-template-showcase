import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = "/loopit-template-showcase";

test("exports a complete GitHub Pages artifact under the repository base path", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(
    html,
    new RegExp(`<iframe[^>]+src="${basePath}/dashboard/index\\.html"`, "i"),
  );
  assert.match(
    html,
    new RegExp(`(?:href|src)="${basePath}/_next/static/`, "i"),
  );
  assert.match(
    html,
    /https:\/\/awoele\.github\.io\/loopit-template-showcase\/og\.png/i,
  );
  assert.doesNotMatch(
    html,
    /(?:href|src)="\/(?:_next|dashboard)\//i,
  );

  await Promise.all([
    access(new URL("../out/dashboard/index.html", import.meta.url)),
    access(new URL("../out/dashboard/data/dashboard.js", import.meta.url)),
    access(new URL("../out/dashboard/data/dashboard.json", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/robots.txt", import.meta.url)),
  ]);
});
