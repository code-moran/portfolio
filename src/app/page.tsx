import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

