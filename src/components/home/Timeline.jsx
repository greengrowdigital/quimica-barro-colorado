import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { historyIntro, timeline } from '../../content/home.js'
import { Reveal } from '../motion/Reveal.jsx'
import { Figure } from '../Photo.jsx'

/**
 * Cronología de la isla. Los números son años reales en secuencia, no
 * ornamento: la línea se dibuja a medida que el lector avanza.
 */
export default function Timeline() {
  const { t } = useLanguage()
  const reduced = useReducedMotion()
  const trackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 78%', 'end 62%'],
  })
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section className="relative bg-canopy-900 py-[clamp(4rem,10vh,7.5rem)]" aria-labelledby="historia">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <Reveal>
            <h2
              id="historia"
              className="m-0 max-w-[14ch] text-mist-50"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 1.2rem + 2.6vw, 3.3rem)',
                letterSpacing: '-0.032em',
              }}
            >
              {t(historyIntro.heading)}
            </h2>
            <p className="measure mt-5 mb-0 text-mist-200">{t(historyIntro.body)}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="measure m-0 border-l border-clay-500 pl-5 text-[0.95rem] leading-relaxed text-mist-400">
              {t(historyIntro.note)}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16">
          {historyIntro.photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.08}>
              <Figure
                src={photo.src}
                alt={t(photo.alt)}
                caption={t(photo.caption)}
                sizes="(max-width: 640px) 92vw, 42vw"
                imgClassName="aspect-[4/5] w-full object-cover"
              />
            </Reveal>
          ))}
        </div>

        <ol ref={trackRef} className="relative mt-16 m-0 list-none p-0 lg:mt-24">
          {/* Riel de la cronología */}
          <span
            className="absolute top-2 bottom-2 left-[0.4rem] w-px bg-canopy-700 sm:left-[5.6rem]"
            aria-hidden="true"
          />
          {!reduced && (
            <motion.span
              className="absolute top-2 bottom-2 left-[0.4rem] w-px origin-top bg-clay-500 sm:left-[5.6rem]"
              style={{ scaleY: drawn }}
              aria-hidden="true"
            />
          )}

          {timeline.map((entry, i) => (
            <li key={entry.year} className="relative pb-11 pl-8 last:pb-0 sm:pl-[7.5rem]">
              <span
                className="absolute top-[0.55rem] left-0 block h-[0.85rem] w-[0.85rem] rounded-full border-2 border-clay-500 bg-canopy-900 sm:left-[5.2rem]"
                aria-hidden="true"
              />

              <span
                className="tabular absolute top-0 left-0 hidden text-clay-400 sm:block"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1.02rem', letterSpacing: '0.02em' }}
              >
                {entry.year}
              </span>

              <Reveal delay={0.04} y={16}>
                <span
                  className="tabular mb-1 block text-clay-400 sm:hidden"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem' }}
                >
                  {entry.year}
                </span>
                <h3
                  className="m-0 text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.15rem, 0.95rem + 0.7vw, 1.5rem)',
                    letterSpacing: '-0.022em',
                  }}
                >
                  {t(entry.title)}
                </h3>
                <p className="measure mt-2 mb-0 text-[0.97rem] leading-relaxed text-mist-400">{t(entry.body)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
