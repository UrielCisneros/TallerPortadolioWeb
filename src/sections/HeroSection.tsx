import { HeroCorners, ScrollHero, ScrollIndicator } from '@/components/hero';
import { MailIcon } from '@/components/icons';
import { Avatar, Button, StatusPill } from '@/components/ui';
import { heroCopy, projectsCopy } from '@/data/copy';
import { HOME_ID, navSections } from '@/data/navigation';
import { profile } from '@/data/profile';
import { linkProps } from '@/lib/links';

export function HeroSection() {
  const corners = (
    <HeroCorners
      topLeft={
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 font-display text-xs font-bold text-white">
            {profile.initial}
          </span>
          <span>{heroCopy.brand}</span>
        </div>
      }
      topRight={
        <nav className="flex gap-5">
          {navSections.slice(1).map(item => (
            <a key={item.href} {...linkProps(item.href)} className="transition-colors hover:text-white">{item.label}</a>
          ))}
        </nav>
      }
      bottomLeft={
        <>
          <p className="text-white">{profile.role}</p>
          <p>{profile.focus}</p>
        </>
      }
      bottomRight={<ScrollIndicator label={heroCopy.scrollLabel} />}
    />
  );

  return (
    <ScrollHero id={HOME_ID} title={profile.name} image={profile.heroImage} corners={corners} intro={false}>
      <Avatar initial={profile.initial} className="mb-7" />
      <StatusPill>{profile.status}</StatusPill>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">
        {profile.name} — {profile.role}
      </p>

      <p data-split className="mt-4 font-display text-[clamp(34px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
        {profile.headline}
      </p>

      <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">{profile.bio}</p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Button href={`mailto:${profile.email}`} icon={<MailIcon size={16} />}>{heroCopy.contactLabel}</Button>
        <Button href={`#${projectsCopy.id}`} variant="ghost" iconEnd="↓">{heroCopy.workLabel}</Button>
      </div>
    </ScrollHero>
  );
}
