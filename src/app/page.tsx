import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { getPortfolioContent } from '@/lib/portfolio-content'

export async function generateMetadata() {
  const content = await getPortfolioContent()

  return {
    title: content.site.title,
    description: content.site.description,
    keywords: content.site.keywords,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: content.site.title,
      description: content.site.description,
      url: '/',
      siteName: content.site.name,
      images: [
        {
          url: content.site.image,
          width: 1200,
          height: 900,
          alt: `${content.profile.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.site.title,
      description: content.site.description,
      images: [content.site.image],
    },
  }
}

export default async function Home() {
  const content = await getPortfolioContent()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.profile.name,
    jobTitle: content.profile.role,
    email: content.profile.email,
    telephone: content.profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: content.profile.location,
    },
    url: content.site.url,
    sameAs: [content.profile.github, content.profile.linkedin],
    knowsAbout: content.about.skills.flatMap((group) => group.skills),
    hasOccupation: {
      '@type': 'Occupation',
      name: content.profile.role,
    },
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation profile={content.profile} />
      <div id="home">
        <HeroSection hero={content.hero} profile={content.profile} />
      </div>
      <AboutSection about={content.about} />
      <ProjectsSection section={content.projectsSection} projects={content.projects} />
      <ContactSection contact={content.contact} profile={content.profile} />
      <Footer profile={content.profile} footer={content.footer} />
    </main>
  )
}

