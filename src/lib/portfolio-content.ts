import { promises as fs } from "fs";
import path from "path";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { getPrisma } from "@/lib/db";
import type { PortfolioContent } from "@/types/portfolio";

const contentPath = path.join(process.cwd(), "content", "portfolio-content.json");
const contentTag = "portfolio-content";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  "use cache";

  cacheTag(contentTag);
  cacheLife("hours");

  const prisma = getPrisma();

  if (prisma) {
    const content = await prisma.portfolioContent.findUnique({
      where: { id: "singleton" },
    });

    if (content) {
      return content.data as PortfolioContent;
    }
  }

  const fileContent = await readFileContent();

  if (prisma) {
    await prisma.portfolioContent.upsert({
      where: { id: "singleton" },
      update: { data: fileContent },
      create: {
        id: "singleton",
        data: fileContent,
      },
    });
  }

  return fileContent;
}

export async function savePortfolioContent(content: PortfolioContent) {
  const prisma = getPrisma();

  if (prisma) {
    await prisma.portfolioContent.upsert({
      where: { id: "singleton" },
      update: { data: content },
      create: {
        id: "singleton",
        data: content,
      },
    });
  }

  await writeFileContent(content);
  revalidateTag(contentTag, "max");
}

async function readFileContent() {
  const file = await fs.readFile(contentPath, "utf8");
  return JSON.parse(file) as PortfolioContent;
}

async function writeFileContent(content: PortfolioContent) {
  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
