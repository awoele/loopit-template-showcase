import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ??
  "loopit-template-showcase";
const basePath = isGitHubPagesBuild ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
        typescript: { tsconfigPath: "tsconfig.pages.json" },
      }
    : {}),
};

export default nextConfig;
