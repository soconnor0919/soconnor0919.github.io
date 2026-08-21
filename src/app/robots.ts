import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/briefs/",
        "/cvs",
        "/executive-summary",
        "/landscape",
        "/login",
        "/walgreens",
      ],
    },
  };
}
