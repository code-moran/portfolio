import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, isAdminSession } from "@/lib/auth";
import { getPortfolioContent, savePortfolioContent } from "@/lib/portfolio-content";
import type { PortfolioContent } from "@/types/portfolio";

export async function GET() {
  const content = await getPortfolioContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!isAdminSession(session)) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const content = (await request.json()) as PortfolioContent;

  if (!isPortfolioContent(content)) {
    return NextResponse.json({ message: "Invalid portfolio content payload." }, { status: 400 });
  }

  await savePortfolioContent(content);
  return NextResponse.json({ ok: true, content });
}

function isPortfolioContent(content: PortfolioContent) {
  return Boolean(
    content?.site?.title &&
      content.site.description &&
      content.profile?.name &&
      content.profile.email &&
      content.hero?.headline &&
      content.about?.headline &&
      Array.isArray(content.about.skills) &&
      Array.isArray(content.projects) &&
      content.contact?.headline &&
      content.footer?.summary,
  );
}
