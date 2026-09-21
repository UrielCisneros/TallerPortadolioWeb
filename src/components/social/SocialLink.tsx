import { V, V_PILL } from '@/theme';
import type { Social } from '@/types';

export function SocialLink({ social }: { social: Social }) {
  const { label, href, icon: Icon } = social;
  return (
    <a
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
        const el = e.currentTarget;
        el.style.color = V;
        el.style.borderColor = 'rgba(139,92,246,0.35)';
        el.style.backgroundColor = V_PILL;
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.color = '#5a5a58';
        el.style.borderColor = '#1e1e1e';
        el.style.backgroundColor = '#111';
        el.style.transform = 'translateY(0)';
      }}
    >
      <Icon />
    </a>
  );
}
