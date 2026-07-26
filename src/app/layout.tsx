import type { Metadata, Viewport } from "next";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Systems Development Consultant`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Systems Development Consultant building reliable web, mobile, and data products for teams and organizations.",
  keywords: [
    "Titus Njiru",
    "Systems Development Consultant",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Nairobi Software Consultant",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Systems Development Consultant`,
    description:
      "Systems Development Consultant building reliable web, mobile, and data products for teams and organizations.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Systems Development Consultant`,
    description:
      "Systems Development Consultant building reliable web, mobile, and data products for teams and organizations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-slate-50 text-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
