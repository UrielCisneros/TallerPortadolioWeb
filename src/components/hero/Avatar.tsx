import { FONT_HEADING, V } from '@/theme';

export function Avatar({ initial }: { initial: string }) {
  return (
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
        fontFamily: FONT_HEADING,
        letterSpacing: '-0.02em',
        boxShadow: `0 0 0 3px rgba(8,8,8,0.6), 0 0 0 5px rgba(139,92,246,0.5), 0 12px 40px rgba(139,92,246,0.4)`,
        animation: 'pulse-ring 3s ease-in-out infinite',
      }}>
        {initial}
      </div>
    </div>
  );
}
