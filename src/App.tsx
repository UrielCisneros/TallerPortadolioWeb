import { Footer } from '@/components/layout';
import { ScrollProgress } from '@/components/motion';
import { Dock, SocialLinks } from '@/components/navigation';
import { Container } from '@/components/ui';
import { navSections } from '@/data/navigation';
import { profile } from '@/data/profile';
import { socials } from '@/data/socials';
import { ExperienceSection, HeroSection, ProjectsSection } from '@/sections';

export default function App() {
  return (
    <div className="min-h-screen bg-canvas font-sans">
      <ScrollProgress />
      <HeroSection />

      <Container as="main">
        <SocialLinks items={socials} className="mb-20 pt-16" />
        <ExperienceSection />
        <ProjectsSection />
        <Footer left={`© 2026 ${profile.name}`} right="Built with React & Vite" />
      </Container>

      {/* Rendered last so its ScrollTriggers see the hero's pin spacing */}
      <Dock groups={[navSections, socials]} position="right" enterDelay={1.2} />
    </div>
  );
}
