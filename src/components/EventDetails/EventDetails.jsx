// Inline SVG icons
function CalendarIcon() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function AttireIcon() {
  return (
    <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L8 6H4l2 4-3 12h18L18 10l2-4h-4L12 2z" />
    </svg>
  )
}

// Mandala watermark SVG
function MandalaWatermark() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none select-none"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={angle}
          cx="200"
          cy="200"
          rx="60"
          ry="160"
          stroke="#C1692A"
          strokeWidth="1"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={`outer-${angle}`}
          cx="200"
          cy="200"
          rx="90"
          ry="190"
          stroke="#E8A020"
          strokeWidth="0.5"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="30" stroke="#C1692A" strokeWidth="1" />
      <circle cx="200" cy="200" r="60" stroke="#C1692A" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="120" stroke="#E8A020" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="180" stroke="#E8A020" strokeWidth="0.5" />
    </svg>
  )
}

function DetailCard({ icon: Icon, title, lines }) {
  return (
    <div className="relative bg-cream-light rounded-lg p-8 text-center group hover:shadow-lg transition-shadow duration-300" style={{ borderTop: '3px solid #C1692A' }}>
      {/* Corner ornaments */}
      <span className="absolute top-2 left-2 text-marigold opacity-40 text-lg leading-none">✦</span>
      <span className="absolute top-2 right-2 text-marigold opacity-40 text-lg leading-none">✦</span>

      <div className="flex justify-center mb-4 text-terracotta">
        <Icon />
      </div>
      <h3 className="font-serif text-xl text-warmBrown mb-3 tracking-wide">{title}</h3>
      <div className="w-8 h-px bg-marigold mx-auto mb-4 opacity-60" />
      {lines.map((line, i) => (
        <p key={i} className={`font-sans text-warmBrown/80 leading-relaxed ${i === 0 ? 'font-normal text-base' : 'font-light text-sm'}`}>
          {line}
        </p>
      ))}
    </div>
  )
}

export default function EventDetails() {
  return (
    <section id="details" className="relative py-24 px-6 bg-cream overflow-hidden">
      <MandalaWatermark />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-script text-terracotta text-2xl mb-2">You Are Invited</p>
          <h2 className="font-serif text-4xl md:text-5xl text-warmBrown mb-4">
            Join Us
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-marigold opacity-50" />
            <span className="text-marigold text-xl">✦</span>
            <div className="h-px w-16 bg-marigold opacity-50" />
          </div>
          <p className="font-serif italic text-warmBrown/70 mt-4 max-w-lg mx-auto leading-relaxed text-lg">
            As two families come together in joy, we would be honoured by your presence
            to bless this new beginning.
          </p>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <DetailCard
            icon={CalendarIcon}
            // title="Date &amp; Time"
            title="Date"
            lines={['May 2nd, 2026', 'Saturday']}
          />
          <DetailCard
            icon={LocationIcon}
            title="Venue"
            lines={['Madiraju Residence', '22445 Conservancy Dr', 'Ashburn, VA, 20148']}
          />
          <DetailCard
            icon={AttireIcon}
            title="Dress Code"
            lines={['Indian Traditional', 'or Western Semi-Formal']}
          />
        </div>

        {/* Floral note */}
        <p className="text-center font-sans font-light text-warmBrown/50 text-xs tracking-widest uppercase mt-12">
          ✦ &nbsp; An auspicious celebration &nbsp; ✦
        </p>
      </div>
    </section>
  )
}
