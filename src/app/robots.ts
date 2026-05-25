import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/portfolio-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getPortfolioContent();
  const baseUrl = content.site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
