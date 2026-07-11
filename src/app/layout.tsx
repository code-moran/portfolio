import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://titusnjiru.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Titus Njiru | Systems Development Consultant',
    template: '%s | Titus Njiru',
  },
  description: 'Systems Development Consultant building reliable web, mobile, and data products.',
  keywords: [
    'Titus Njiru',
    'Systems Development Consultant',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Nairobi Software Consultant',
  ],
  authors: [{ name: 'Titus Njiru' }],
  creator: 'Titus Njiru',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Titus Njiru',
    title: 'Titus Njiru | Systems Development Consultant',
    description: 'Systems Development Consultant building reliable web, mobile, and data products.',
    images: [
      {
        url: '/workspace.jpg',
        width: 1200,
        height: 900,
        alt: 'A clean developer workspace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titus Njiru | Systems Development Consultant',
    description: 'Systems Development Consultant building reliable web, mobile, and data products.',
    images: ['/workspace.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-slate-50 text-slate-950">
        {children}
      </body>
    </html>
  )
}

