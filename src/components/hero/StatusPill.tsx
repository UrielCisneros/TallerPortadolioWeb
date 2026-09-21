export function StatusPill({ children }: { children: string }) {
  return (
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
        {children}
      </span>
    </div>
  );
}
