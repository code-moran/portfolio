import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running the seed.");
}

const contentPath = path.join(process.cwd(), "content", "portfolio-content.json");
const content = JSON.parse(await fs.readFile(contentPath, "utf8"));
const passwordHash = await bcrypt.hash(adminPassword, 12);

await prisma.user.upsert({
  where: { email: adminEmail },
  update: {
    passwordHash,
    role: "ADMIN",
  },
  create: {
    email: adminEmail,
    name: "Portfolio Admin",
    passwordHash,
    role: "ADMIN",
  },
});

await prisma.portfolioContent.upsert({
  where: { id: "singleton" },
  update: { data: content },
  create: {
    id: "singleton",
    data: content,
  },
});

await prisma.$disconnect();

console.log(`Seeded admin user ${adminEmail} and portfolio content.`);
