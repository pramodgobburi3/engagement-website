import { lazy, Suspense } from 'react'

const PetalScene = lazy(() => import('./PetalScene'))

// Decorative lotus SVG divider
function LotusDevider() {
  return (
    <svg
      aria-hidden="true"
      className="w-32 h-8 mx-auto my-6 opacity-60"
      viewBox="0 0 128 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="16" x2="44" y2="16" stroke="#E8A020" strokeWidth="0.75" />
      <line x1="84" y1="16" x2="128" y2="16" stroke="#E8A020" strokeWidth="0.75" />
      {/* Lotus petals */}
      <ellipse cx="64" cy="16" rx="6" ry="14" fill="none" stroke="#E8A020" strokeWidth="0.75" transform="rotate(0 64 16)" />
      <ellipse cx="64" cy="16" rx="6" ry="14" fill="none" stroke="#E8A020" strokeWidth="0.75" transform="rotate(30 64 16)" />
      <ellipse cx="64" cy="16" rx="6" ry="14" fill="none" stroke="#E8A020" strokeWidth="0.75" transform="rotate(-30 64 16)" />
      <ellipse cx="64" cy="16" rx="6" ry="14" fill="none" stroke="#E8A020" strokeWidth="0.75" transform="rotate(60 64 16)" />
      <ellipse cx="64" cy="16" rx="6" ry="14" fill="none" stroke="#E8A020" strokeWidth="0.75" transform="rotate(-60 64 16)" />
      <circle cx="64" cy="16" r="3" fill="#E8A020" opacity="0.7" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#2C1A0E' }}
    >
      {/* 3D particle scene — lazy loaded so page renders immediately */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <PetalScene />
        </Suspense>
      </div>

      {/* Gradient overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(44,26,14,0.1) 0%, rgba(44,26,14,0.55) 100%)',
        }}
      />

      {/* Hero text */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="font-script text-marigold text-xl md:text-2xl mb-2 tracking-wide text-shadow-warm">
          Together We Begin
        </p>

        <h1 className="font-serif text-cream text-shadow-warm" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1.1 }}>
          Snigdha
          <span className="block font-script text-marigold" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', margin: '0.65em 0.15em 0 0' }}>
            &amp;
          </span>
          Pramod
        </h1>

        <LotusDevider />

        <p className="font-serif italic text-cream/80 text-lg md:text-xl leading-relaxed text-shadow-warm">
          cordially invite you to celebrate their engagement
        </p>

        <div className="mt-4 mb-8">
          <p className="font-sans font-light text-cream/60 text-sm tracking-[0.2em] uppercase">
            Please join us for this auspicious occasion
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#details"
            className="inline-block font-serif tracking-widest text-sm uppercase border border-marigold/60 text-marigold px-8 py-3 rounded-full hover:bg-marigold/10 transition-all duration-300"
          >
            View Details
          </a>
          <a
            href="#rsvp"
            className="inline-block font-serif tracking-widest text-sm uppercase bg-terracotta text-cream px-8 py-3 rounded-full hover:bg-terracotta-dark transition-all duration-300"
          >
            RSVP Now
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40">
        <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cream/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
