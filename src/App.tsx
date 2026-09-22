import { useState } from 'react';
import { Footer } from '@/components/layout';
import { PageLoader } from '@/components/loader';
import { ScrollProgress } from '@/components/motion';
import { Dock, SocialLinks } from '@/components/navigation';
import { Container } from '@/components/ui';
import { footerCopy, heroCopy, loaderCopy } from '@/data/copy';
import { navSections } from '@/data/navigation';
import { profile } from '@/data/profile';
import { socials } from '@/data/socials';
import { ExperienceSection, HeroSection, ProjectsSection } from '@/sections';

export default function App() {
  // true cuando el loader ya se fue y la página está a la vista
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-canvas font-sans">
      <PageLoader
        title={loaderCopy.title}
        images={[profile.heroImage]}
        topLeft={heroCopy.brand}
        topRight={profile.name}
        bottomLeft={profile.role}
        onDone={() => setLoaded(true)}
      />
      <ScrollProgress />
      <HeroSection />

      <Container as="main">
        <SocialLinks items={socials} className="mb-20 pt-16" />
        <ExperienceSection />
        <ProjectsSection />
        <Footer left={`© 2026 ${profile.name}`} right={footerCopy.credits} />
      </Container>

      {/* Rendered last so its ScrollTriggers see the hero's pin spacing.
          Se monta cuando el loader termina, así su animación de entrada sí se ve */}
      {loaded && <Dock groups={[navSections, socials]} position="right" enterDelay={0.2} />}
    </div>
  );
}
