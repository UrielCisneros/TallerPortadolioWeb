import { useState } from 'react';

const V = '#8b5cf6';          // violet accent
const V_DIM = '#6d28d9';
const V_GLOW = 'rgba(139,92,246,0.18)';
const V_PILL = 'rgba(139,92,246,0.12)';

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Stripe',
    dates: '2022 – Present',
    description:
      'Led development of a real-time payment reconciliation system processing $2B+ monthly. Designed a distributed event pipeline in Go that reduced latency by 40% and eliminated manual reconciliation work.',
  },
  {
    title: 'Software Engineer',
    company: 'Vercel',
    dates: '2020 – 2021',
    description:
      'Built core infrastructure for the Edge Network handling 50M+ daily requests. Improved serverless function cold-start by 60% via a custom module caching layer written in Rust.',
  },
  {
    title: 'Frontend Engineer',
    company: 'Linear',
    dates: '2018 – 2020',
    description:
      'Shipped the real-time collaborative issue editor using CRDTs, the dark mode system, and the keyboard-shortcut framework now used across the entire product surface.',
  },
];

const projects = [
  {
    title: 'Plex',
    subtitle: 'Type-safe SQL query builder',
    description: 'Zero-overhead query builder for TypeScript. Generates fully-typed results from raw schema definitions without a build step.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    hue: '250deg',
    from: '#6366f1',
    to: '#8b5cf6',
  },
  {
    title: 'Beacon',
    subtitle: 'Uptime monitoring',
    description: 'Self-hosted multi-region uptime checks with Slack/email alerts, incident timelines, and a public status page.',
    tags: ['React', 'Go', 'Redis'],
    hue: '320deg',
    from: '#ec4899',
    to: '#a855f7',
  },
  {
    title: 'Forge',
    subtitle: 'Local CI runner',
    description: 'Mirrors GitHub Actions workflows locally before pushing to remote — catches failures before they hit CI and saves build minutes.',
    tags: ['Rust', 'Docker', 'CLI'],
    hue: '190deg',
    from: '#06b6d4',
    to: '#3b82f6',
  },
  {
    title: 'Nomad',
    subtitle: 'AI trip planner',
    description: 'Generates budget-aware travel itineraries from personal preferences and syncs them directly to Google Calendar.',
    tags: ['Next.js', 'OpenAI', 'Prisma'],
    hue: '160deg',
    from: '#10b981',
    to: '#06b6d4',
  },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.257 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:uriel@example.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: V,
        fontFamily: "'Inter', sans-serif",
      }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(139,92,246,0.3), transparent)' }} />
    </div>
  );
}

function ProjectCard({ p }: { p: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#111',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.35)' : '#1e1e1e'}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)` : 'none',
      }}
    >
      {/* Gradient swatch */}
      <div style={{
        height: 120,
        background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px 20px',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.15)',
        }} />
        <div style={{ position: 'relative', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              padding: '3px 8px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.15)',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 22px 24px' }}>
        <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 500, color: V, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{p.subtitle}</p>
        <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: '#f0f0ee', letterSpacing: '-0.02em', fontFamily: "'Sora', sans-serif" }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#7a7a78' }}>{p.description}</p>
      </div>
    </div>
  );
}

function ExpCard({ e }: { e: typeof experiences[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '0 24px',
        backgroundColor: '#111',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.3)' : '#1e1e1e'}`,
        borderRadius: 14,
        padding: '24px 28px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: hovered ? `linear-gradient(to bottom, ${V}, ${V_DIM})` : 'transparent',
        borderRadius: '14px 0 0 14px',
        transition: 'background 0.2s',
      }} />
      <div>
        <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#f0f0ee', letterSpacing: '-0.01em', fontFamily: "'Sora', sans-serif" }}>{e.title}</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 500, color: V }}>{e.company}</p>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: '#7a7a78' }}>{e.description}</p>
      </div>
      <span style={{
        fontSize: 12,
        color: '#4a4a48',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        paddingTop: 2,
        letterSpacing: '0.01em',
      }}>{e.dates}</span>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Hero with background image ── */}
      <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?w=1600&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.55) saturate(1.2)',
          }}
        />
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.7) 80%, #080808 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 65%)' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', animation: 'fadeUp 0.7s ease both', maxWidth: 560 }}>

          {/* Status pill */}
          <div style={{ marginBottom: 32 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 12,
              fontWeight: 500,
              color: '#c4b5fd',
              background: 'rgba(139,92,246,0.18)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 20,
              padding: '5px 14px',
              letterSpacing: '0.03em',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)', display: 'inline-block' }} />
              Available for opportunities
            </span>
          </div>

          {/* Avatar */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${V} 0%, #6366f1 50%, #3b82f6 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: '#fff',
              fontFamily: "'Sora', sans-serif",
              letterSpacing: '-0.02em',
              boxShadow: `0 0 0 3px rgba(8,8,8,0.6), 0 0 0 5px rgba(139,92,246,0.5), 0 12px 40px rgba(139,92,246,0.4)`,
              animation: 'pulse-ring 3s ease-in-out infinite',
            }}>
              U
            </div>
          </div>

          <h1 style={{
            margin: '0 0 10px',
            fontSize: 'clamp(44px, 9vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#fff',
            fontFamily: "'Sora', sans-serif",
            lineHeight: 1.0,
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}>
            Uriel
          </h1>

          <p style={{
            margin: '0 0 22px',
            fontSize: 14,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Software Engineer
          </p>

          <p style={{
            margin: '0 auto 36px',
            fontSize: 16,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 420,
          }}>
            I build reliable, fast, and delightful software. Focused on developer tooling and distributed systems. Previously at Stripe and Vercel.
          </p>

          <a
            href="mailto:uriel@example.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `linear-gradient(135deg, ${V} 0%, #6366f1 100%)`,
              color: '#fff',
              padding: '13px 30px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: `0 4px 24px rgba(139,92,246,0.5)`,
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = `0 10px 36px rgba(139,92,246,0.65)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = `0 4px 24px rgba(139,92,246,0.5)`;
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Contact Me
          </a>

          {/* Scroll indicator */}
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              opacity: 0.4,
            }}>
              <span style={{ fontSize: 11, letterSpacing: '0.08em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeWidth="1.5" />
                <circle cx="8" cy="7" r="2.5" fill="white" style={{ animation: 'fadeUp 1.5s ease-in-out infinite' }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Social Links ── */}
        <section style={{ paddingTop: 64, marginBottom: 80, display: 'flex', justifyContent: 'center', gap: 10 }}>
          {socials.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 42,
                height: 42,
                borderRadius: 10,
                backgroundColor: '#111',
                border: '1px solid #1e1e1e',
                color: '#5a5a58',
                textDecoration: 'none',
                transition: 'color 0.15s, border-color 0.15s, transform 0.15s, background-color 0.15s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = V;
                el.style.borderColor = 'rgba(139,92,246,0.35)';
                el.style.backgroundColor = V_PILL;
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#5a5a58';
                el.style.borderColor = '#1e1e1e';
                el.style.backgroundColor = '#111';
                el.style.transform = 'translateY(0)';
              }}
            >
              {icon}
            </a>
          ))}
        </section>

        {/* ── Experience ── */}
        <section style={{ marginBottom: 80 }}>
          <SectionLabel>Experience</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experiences.map((e, i) => <ExpCard key={i} e={e} />)}
          </div>
        </section>

        {/* ── Projects ── */}
        <section style={{ marginBottom: 100 }}>
          <SectionLabel>Projects</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 14,
          }}>
            {projects.map((p, i) => <ProjectCard key={i} p={p} />)}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: '1px solid #1a1a1a',
          padding: '28px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <p style={{ margin: 0, fontSize: 12.5, color: '#3a3a38' }}>© 2026 Uriel</p>
          <p style={{ margin: 0, fontSize: 12.5, color: '#3a3a38' }}>Built with React & Vite</p>
        </footer>

      </main>
    </div>
  );
}
