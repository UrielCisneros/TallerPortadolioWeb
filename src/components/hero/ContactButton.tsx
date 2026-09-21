import { MailIcon } from '@/components/icons';
import { V } from '@/theme';

export function ContactButton({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
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
        const el = e.currentTarget;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = `0 10px 36px rgba(139,92,246,0.65)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = `0 4px 24px rgba(139,92,246,0.5)`;
      }}
    >
      <MailIcon size={16} />
      Contact Me
    </a>
  );
}
