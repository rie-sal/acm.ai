import { Header } from '../components/header'
import { LandingSection } from '../components/landing-section'
import { AboutSection } from '../components/about-section'
import { EventsSection } from '../components/events-section'
import { CoursesSection } from '../components/courses-section'
import { ResourcesSection } from '../components/resources-section'
import { GallerySection } from '../components/gallery-section'
import { TeamSection } from '../components/team-section'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <LandingSection />
        <AboutSection />
        <EventsSection />
        <CoursesSection />
        <ResourcesSection />
        <GallerySection />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}
