/** The image "window". Full-bleed by default; GSAP starts it as a small rounded frame. */
export function HeroImage({ src }: { src: string }) {
  return (
    <div data-hero="window" className="absolute inset-0 overflow-hidden will-change-[clip-path]">
      <img
        data-hero="img"
        src={src}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
        style={{ filter: 'brightness(0.6) saturate(1.2)' }}
      />
      {/* Shade that makes the final content readable */}
      <div data-hero="shade" className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#080808]/50 via-[#080808]/40 to-[#080808]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18)_0%,transparent_65%)]" />
      </div>
    </div>
  );
}
