import type { Metadata } from "next";
import type { PortfolioContent } from "@/types/portfolio";

export const SITE_FALLBACK_URL = "https://titusnjiru.com";
export const SITE_NAME = "Titus Njiru";
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Titus Njiru — Systems Development Consultant",
} as const;

export function getSiteUrl(contentUrl?: string) {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || contentUrl || SITE_FALLBACK_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/", contentUrl?: string) {
  const base = getSiteUrl(contentUrl);
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  keywords?: string[];
  siteName?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  siteName = SITE_NAME,
  imageAlt,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName,
      title,
      description,
      images: [
        {
          ...DEFAULT_OG_IMAGE,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildHomeJsonLd(content: PortfolioContent) {
  const baseUrl = getSiteUrl(content.site.url);
  const imageUrl = absoluteUrl(content.site.image, content.site.url);
  const locality = content.profile.location.split(",")[0]?.trim() || content.profile.location;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: content.site.name,
        description: content.site.description,
        inLanguage: "en-US",
        publisher: { "@id": `${baseUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: content.profile.name,
        url: baseUrl,
        image: imageUrl,
        jobTitle: content.profile.role,
        description: content.site.description,
        email: `mailto:${content.profile.email}`,
        telephone: content.profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: locality,
          addressCountry: "KE",
        },
        sameAs: [content.profile.github, content.profile.linkedin],
        knowsAbout: content.about.skills.flatMap((group) => group.skills),
        hasOccupation: {
          "@type": "Occupation",
          name: content.profile.role,
          occupationLocation: {
            "@type": "City",
            name: content.profile.location,
          },
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: `${content.profile.name} — ${content.profile.role}`,
        url: baseUrl,
        image: imageUrl,
        description: content.site.description,
        provider: { "@id": `${baseUrl}/#person` },
        areaServed: {
          "@type": "Country",
          name: "Kenya",
        },
        serviceType: content.about.services,
      },
    ],
  };
}

export function buildWebApplicationJsonLd({
  name,
  description,
  path,
  category = "FinanceApplication",
  siteUrl,
}: {
  name: string;
  description: string;
  path: string;
  category?: string;
  siteUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteUrl(path, siteUrl),
    applicationCategory: category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
  };
}
