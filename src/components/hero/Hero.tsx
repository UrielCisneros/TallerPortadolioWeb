import { useRef } from 'react';
import { profile } from '@/data/profile';
import { useMotion } from '@/hooks/useMotion';
import { gsap, SplitText } from '@/lib/gsap';
import { FONT_HEADING } from '@/theme';
import { Avatar } from './Avatar';
import { ContactButton } from './ContactButton';
import { HeroBackground } from './HeroBackground';
import { ScrollIndicator } from './ScrollIndicator';
import { StatusPill } from './StatusPill';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useMotion(() => {
    // Entrance
    const split = SplitText.create(nameRef.current, { type: 'chars' });
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('[data-hero="bg"]', { scale: 1.25, duration: 1.8, ease: 'power2.out' }, 0)
      .from('[data-hero="pill"]', { y: -20, opacity: 0, duration: 0.6 }, 0.2)
      .from('[data-hero="avatar"]', { scale: 0, rotate: -90, opacity: 0, duration: 0.9, ease: 'back.out(1.7)' }, 0.3)
      .from(split.chars, { yPercent: 110, opacity: 0, rotateX: -80, stagger: 0.06, duration: 0.8 }, 0.5)
      .from('[data-hero="text"]', { y: 24, opacity: 0, stagger: 0.12, duration: 0.7 }, 0.8)
      .from('[data-hero="cta"]', { y: 20, opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(2)' }, 1.05)
      .from('[data-hero="scroll"]', { opacity: 0, duration: 0.6 }, 1.3);

    // Parallax while scrolling past the hero
    const scrub = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero="bg"]', { yPercent: 25, ease: 'none', scrollTrigger: scrub });
    gsap.to('[data-hero="content"]', { y: -120, opacity: 0, ease: 'none', scrollTrigger: { ...scrub, end: '80% top' } });
  }, sectionRef);

  return (
    <section ref={sectionRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <HeroBackground src={profile.heroImage} />

      <div data-hero="content" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 560 }}>
        <div data-hero="pill"><StatusPill>{profile.status}</StatusPill></div>
        <div data-hero="avatar"><Avatar initial={profile.initial} /></div>

        <h1 ref={nameRef} style={{
          margin: '0 0 10px',
          fontSize: 'clamp(44px, 9vw, 72px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#fff',
          fontFamily: FONT_HEADING,
          lineHeight: 1.0,
          textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          perspective: 400,
        }}>
          {profile.name}
        </h1>

        <p data-hero="text" style={{
          margin: '0 0 22px',
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {profile.role}
        </p>

        <p data-hero="text" style={{
          margin: '0 auto 36px',
          fontSize: 16,
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.65)',
          maxWidth: 420,
        }}>
          {profile.bio}
        </p>

        {/* Wrapper so GSAP's transform doesn't fight the button's hover transform */}
        <div data-hero="cta"><ContactButton email={profile.email} /></div>
        <div data-hero="scroll"><ScrollIndicator /></div>
      </div>
    </section>
  );
}
