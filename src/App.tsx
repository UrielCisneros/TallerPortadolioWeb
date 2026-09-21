import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { Hero } from '@/components/hero/Hero';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { SocialLinks } from '@/components/social/SocialLinks';
import { FONT_BODY } from '@/theme';

export default function App() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', fontFamily: FONT_BODY }}>
      <ScrollProgress />
      <Hero />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <SocialLinks />
        <ExperienceSection />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
}
