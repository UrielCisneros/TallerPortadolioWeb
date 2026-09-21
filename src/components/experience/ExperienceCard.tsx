import { useState } from 'react';
import { FONT_HEADING, V, V_DIM } from '@/theme';
import type { Experience } from '@/types';

export function ExperienceCard({ experience }: { experience: Experience }) {
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
        <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#f0f0ee', letterSpacing: '-0.01em', fontFamily: FONT_HEADING }}>{experience.title}</h3>
        <p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 500, color: V }}>{experience.company}</p>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: '#7a7a78' }}>{experience.description}</p>
      </div>
      <span style={{
        fontSize: 12,
        color: '#4a4a48',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        paddingTop: 2,
        letterSpacing: '0.01em',
      }}>{experience.dates}</span>
    </div>
  );
}
