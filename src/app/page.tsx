import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getPortfolioContent } from "@/lib/portfolio-content";
import { buildHomeJsonLd, buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const content = await getPortfolioContent();

  return buildPageMetadata({
    title: content.site.title,
    description: content.site.description,
    path: "/",
    absoluteTitle: true,
    keywords: content.site.keywords,
    siteName: content.site.name,
    imageAlt: `${content.profile.name} portfolio preview`,
  });
}

export default async function Home() {
  const content = await getPortfolioContent();
  const jsonLd = buildHomeJsonLd(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation profile={content.profile} />
      <main id="main-content" className="min-h-screen">
        <div id="home">
          <HeroSection hero={content.hero} profile={content.profile} />
        </div>
        <AboutSection about={content.about} />
        <ProjectsSection section={content.projectsSection} projects={content.projects} />
        <ContactSection contact={content.contact} profile={content.profile} />
      </main>
      <Footer profile={content.profile} footer={content.footer} />
    </>
  );
}
