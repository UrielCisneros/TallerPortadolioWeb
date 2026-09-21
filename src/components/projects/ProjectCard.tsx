import { useState } from 'react';
import { FONT_HEADING, V } from '@/theme';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
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
        background: `linear-gradient(135deg, ${project.from} 0%, ${project.to} 100%)`,
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
          {project.tags.map(tag => (
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
        <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 500, color: V, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{project.subtitle}</p>
        <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 700, color: '#f0f0ee', letterSpacing: '-0.02em', fontFamily: FONT_HEADING }}>{project.title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#7a7a78' }}>{project.description}</p>
      </div>
    </div>
  );
}
