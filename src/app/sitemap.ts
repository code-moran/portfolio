import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/portfolio-content";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPortfolioContent();
  const baseUrl = getSiteUrl(content.site.url);
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/utilities", priority: 0.8, changeFrequency: "monthly" },
    { path: "/utilities/paye-calculator", priority: 0.7, changeFrequency: "monthly" },
    { path: "/utilities/compound-interest-calculator", priority: 0.7, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
