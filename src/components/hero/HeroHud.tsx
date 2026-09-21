import { profile } from '@/data/profile';
import { smoothScrollTo } from '@/lib/gsap';
import { ScrollIndicator } from './ScrollIndicator';

const NAV = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

/** Editorial corner labels shown on the opening frame. */
export function HeroHud() {
  return (
    <div
      data-hero="hud"
      className="pointer-events-none absolute inset-0 z-30 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 motion-reduce:hidden"
    >
      <div className="absolute left-6 top-6 flex items-center gap-3 md:left-10 md:top-8">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 font-display text-xs font-bold text-white">
          {profile.initial}
        </span>
        <span>Portfolio — ©2026</span>
      </div>

      <nav className="pointer-events-auto absolute right-6 top-6 flex gap-5 md:right-10 md:top-8">
        {NAV.map(item => (
          <a key={item.href} href={item.href} onClick={smoothScrollTo} className="transition-colors hover:text-white">
            {item.label}
          </a>
        ))}
        <a href={`mailto:${profile.email}`} className="hidden transition-colors hover:text-white sm:inline">
          Contact
        </a>
      </nav>

      <div className="absolute bottom-6 left-6 max-w-[220px] leading-relaxed md:bottom-8 md:left-10">
        <p className="text-white">{profile.role}</p>
        <p>{profile.focus}</p>
      </div>

      <div className="absolute bottom-6 right-6 hidden sm:block md:bottom-8 md:right-10">
        <ScrollIndicator />
      </div>
    </div>
  );
}
