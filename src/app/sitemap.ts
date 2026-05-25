import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/portfolio-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPortfolioContent();
  const baseUrl = content.site.url.replace(/\/$/, "");
  const routes = [
    { path: "", priority: 1 },
    { path: "/utilities", priority: 0.8 },
    { path: "/utilities/paye-calculator", priority: 0.7 },
    { path: "/utilities/compound-interest-calculator", priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date("2026-05-25"),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
