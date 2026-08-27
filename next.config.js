/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import("next").NextConfig} */
const config = {
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  images: {
    qualities: [75, 92],
    unoptimized: isGitHubPages,
  },
};

export default config;
