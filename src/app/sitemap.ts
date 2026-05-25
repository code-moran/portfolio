import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/portfolio-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPortfolioContent();
  const baseUrl = content.site.url.replace(/\/$/, "");

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-05-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
