import { useLanguage } from '../../i18n/LanguageContext.jsx'

function Term({ coef, formula, name, tone }) {
  return (
    <span className="inline-flex flex-col items-center">
      <span
        className="whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          fontSize: 'clamp(1.15rem, 0.85rem + 1.5vw, 2.1rem)',
          color: tone === 'product' ? 'var(--color-leaf-400)' : 'var(--color-mist-50)',
          lineHeight: 1.2,
        }}
        translate="no"
      >
        {coef && <span className="text-mist-400">{coef}</span>}
        {formula}
      </span>
      <span className="mt-1.5 text-center text-[0.74rem] leading-tight text-mist-400">{name}</span>
    </span>
  )
}

function Operator({ children }) {
  return (
    <span
      className="self-start pt-[0.12em] text-mist-600"
      style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 0.8rem + 1vw, 1.6rem)' }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

/** La reacción que sostiene el bosque, tratada como pieza gráfica. */
export default function PhotosynthesisEquation({ equation }) {
  const { t } = useLanguage()

  return (
    <figure className="relative m-0 overflow-hidden border border-canopy-700 bg-canopy-900 px-[clamp(1rem,3vw,2.75rem)] py-[clamp(2rem,5vh,3.5rem)]">
      {/* La luz que impulsa la reacción, latiendo muy despacio */}
      <span
        className="pointer-events-none absolute -top-28 left-1/2 h-52 w-[72%] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in oklab, var(--color-sun-400) 24%, transparent), transparent 70%)',
          filter: 'blur(18px)',
          animation: 'eq-glow 9s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-wrap items-start justify-center gap-x-3 gap-y-6 sm:gap-x-5">
        {equation.reactants.map((term, i) => (
          <span key={term.formula} className="flex items-start gap-3 sm:gap-5">
            {i > 0 && <Operator>+</Operator>}
            <Term {...term} name={t(term.name)} />
          </span>
        ))}

        <span className="flex flex-col items-center self-start pt-[0.1em]">
          <span
            className="text-[0.68rem] tracking-[0.14em] text-sun-400 uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {t(equation.driver)}
          </span>
          <svg viewBox="0 0 90 16" className="mt-1 h-4 w-[4.5rem] sm:w-[6rem]" fill="none" aria-hidden="true">
            <path
              d="M2 8h82M78 3l6 5-6 5"
              stroke="var(--color-clay-400)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle r="2.2" fill="var(--color-sun-400)" style={{ animation: 'eq-travel 4.2s ease-in-out infinite' }}>
              <animate attributeName="opacity" values="0;1;1;0" dur="4.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>

        {equation.products.map((term, i) => (
          <span key={term.formula} className="flex items-start gap-3 sm:gap-5">
            {i > 0 && <Operator>+</Operator>}
            <Term {...term} name={t(term.name)} tone="product" />
          </span>
        ))}
      </div>

      <figcaption className="mt-8 text-center text-[0.86rem] text-mist-400">{t(equation.caption)}</figcaption>

      <style>{`
        @keyframes eq-glow { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        @keyframes eq-travel { 0% { transform: translate(4px, 8px) } 100% { transform: translate(80px, 8px) } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes eq-glow { from, to { opacity: .8 } }
          @keyframes eq-travel { from, to { transform: translate(42px, 8px) } }
        }
      `}</style>
    </figure>
  )
}
