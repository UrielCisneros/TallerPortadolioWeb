import { profile } from '@/data/profile';
import { smoothScrollTo } from '@/lib/gsap';
import { Avatar } from './Avatar';
import { ContactButton } from './ContactButton';
import { StatusPill } from './StatusPill';

/** The final frame, revealed once the image fills the screen. */
export function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="flex max-w-2xl flex-col items-center text-center">
        <div data-hero="reveal"><Avatar initial={profile.initial} /></div>
        <div data-hero="reveal"><StatusPill>{profile.status}</StatusPill></div>

        <p data-hero="reveal" className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">
          {profile.name} — {profile.role}
        </p>

        <p
          data-hero="headline"
          className="mt-4 font-display text-[clamp(34px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.035em] text-white"
        >
          {profile.headline}
        </p>

        <p data-hero="reveal" className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
          {profile.bio}
        </p>

        <div data-hero="reveal" className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ContactButton email={profile.email} />
          <a
            href="#projects"
            onClick={smoothScrollTo}
            className="group inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            View work
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </div>
    </div>
  );
}
