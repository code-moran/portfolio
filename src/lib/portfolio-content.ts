import { promises as fs } from "fs";
import path from "path";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import type { PortfolioContent } from "@/types/portfolio";

const contentPath = path.join(process.cwd(), "content", "portfolio-content.json");
const contentTag = "portfolio-content";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  "use cache";

  cacheTag(contentTag);
  cacheLife("hours");

  const file = await fs.readFile(contentPath, "utf8");
  return JSON.parse(file) as PortfolioContent;
}

export async function savePortfolioContent(content: PortfolioContent) {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  revalidateTag(contentTag, "max");
}
