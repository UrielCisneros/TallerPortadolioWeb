export function HeroBackground({ src }: { src: string }) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        data-hero="bg"
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
    </>
  );
}
