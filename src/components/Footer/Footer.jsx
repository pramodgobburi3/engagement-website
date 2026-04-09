function LotusRow() {
  return (
    <div className="flex justify-center gap-4 mb-6 text-marigold/40 text-sm" aria-hidden="true">
      {['✿', '✦', '❀', '✦', '✿'].map((sym, i) => (
        <span key={i}>{sym}</span>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-warmBrown-dark text-cream py-16 px-6 text-center">
      <LotusRow />

      <p className="font-script text-marigold text-3xl mb-1">Snigdha &amp; Pramod</p>

      <p className="font-serif italic text-cream/60 text-base mb-8">
        With love &amp; joy
      </p>

      <div className="h-px w-24 bg-marigold/30 mx-auto mb-8" />

      <p className="font-sans font-light text-cream/30 text-xs tracking-widest uppercase">
        &copy; 2026 Snigdha Madiraju &amp; Pramod Gobburi
      </p>
    </footer>
  )
}
