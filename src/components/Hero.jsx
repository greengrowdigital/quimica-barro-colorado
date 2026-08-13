import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { members, site } from '../content/site.js'

const EASE = [0.16, 1, 0.3, 1]

const HEADLINE = {
  es: ['La química', 'de Barro', 'Colorado'],
  en: ['The Chemistry', 'of Barro', 'Colorado'],
}

/* Posiciones fijas: esporas reproducibles, sin Math.random en render. */
const SPORES = [
  { left: 8, top: 78, size: 3, dur: 15, delay: 0 },
  { left: 17, top: 92, size: 2, dur: 19, delay: 2.4 },
  { left: 26, top: 68, size: 4, dur: 13, delay: 5.1 },
  { left: 34, top: 88, size: 2, dur: 21, delay: 1.2 },
  { left: 43, top: 75, size: 3, dur: 17, delay: 6.8 },
  { left: 52, top: 95, size: 2, dur: 14, delay: 3.6 },
  { left: 61, top: 71, size: 4, dur: 20, delay: 0.8 },
  { left: 69, top: 86, size: 2, dur: 16, delay: 4.9 },
  { left: 78, top: 79, size: 3, dur: 18, delay: 2.1 },
  { left: 86, top: 93, size: 2, dur: 22, delay: 7.4 },
  { left: 93, top: 72, size: 3, dur: 15, delay: 5.6 },
  { left: 12, top: 60, size: 2, dur: 24, delay: 8.2 },
  { left: 48, top: 62, size: 2, dur: 23, delay: 9.5 },
  { left: 74, top: 58, size: 3, dur: 26, delay: 6.1 },
]

export default function Hero() {
  const { lang, t } = useLanguage()
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  const lines = HEADLINE[lang] ?? HEADLINE.es

  return (
    <section
      ref={sectionRef}
      className="grain relative isolate flex h-[100svh] min-h-[34rem] flex-col justify-end overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Placa fotográfica */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: plateY }}
      >
        <motion.img
          src="/img/dosel-ceiba.webp"
          width="1200"
          height="1600"
          alt={
            lang === 'es'
              ? 'Tronco de un árbol gigante visto desde el suelo del bosque hacia el dosel, con la luz filtrándose entre las hojas.'
              : 'The trunk of a giant tree seen from the forest floor up toward the canopy, with light filtering through the leaves.'
          }
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 42%' }}
          initial={reduced ? false : { scale: 1.09 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />

        {/* Revelado: el duotono se retira y deja pasar el color real. */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--color-canopy-900)', mixBlendMode: 'color' }}
          initial={reduced ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.15 }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--color-clay-600)', mixBlendMode: 'overlay' }}
          initial={reduced ? { opacity: 0 } : { opacity: 0.62 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.6, ease: EASE, delay: 0.15 }}
          aria-hidden="true"
        />

        {/* Legibilidad: verde profundo desde abajo, nunca negro plano. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--color-canopy-950) 4%, color-mix(in oklab, var(--color-canopy-950) 84%, transparent) 36%, color-mix(in oklab, var(--color-canopy-950) 26%, transparent) 68%, color-mix(in oklab, var(--color-canopy-950) 62%, transparent) 100%)',
          }}
          aria-hidden="true"
        />
        {/* El texto vive a la izquierda; ahí el bosque se cierra. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, color-mix(in oklab, var(--color-canopy-950) 88%, transparent) 0%, color-mix(in oklab, var(--color-canopy-950) 55%, transparent) 38%, transparent 72%)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Luz que entra por el dosel */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {[
            { left: '14%', width: '17rem', rotate: '13deg', dur: '17s', delay: '0s', opacity: 0.4 },
            { left: '46%', width: '11rem', rotate: '-9deg', dur: '23s', delay: '-6s', opacity: 0.3 },
            { left: '73%', width: '20rem', rotate: '17deg', dur: '29s', delay: '-13s', opacity: 0.26 },
          ].map((shaft) => (
            <span
              key={shaft.left}
              className="absolute -top-1/4 block h-[150%]"
              style={{
                left: shaft.left,
                width: shaft.width,
                opacity: shaft.opacity,
                transform: `rotate(${shaft.rotate})`,
                filter: 'blur(34px)',
                mixBlendMode: 'screen',
                background:
                  'linear-gradient(to bottom, color-mix(in oklab, var(--color-sun-400) 55%, transparent), transparent 72%)',
                animation: `shaft-sway ${shaft.dur} ease-in-out ${shaft.delay} infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Esporas en suspensión */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {SPORES.map((spore) => (
            <span
              key={`${spore.left}-${spore.top}`}
              className="absolute block rounded-full"
              style={{
                left: `${spore.left}%`,
                top: `${spore.top}%`,
                width: spore.size,
                height: spore.size,
                background: 'color-mix(in oklab, var(--color-sun-400) 70%, white)',
                boxShadow: '0 0 6px color-mix(in oklab, var(--color-sun-400) 60%, transparent)',
                opacity: 0.55,
                animation: `drift-up ${spore.dur}s linear ${spore.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="shell relative z-10 pb-[clamp(2.5rem,7vh,5rem)]"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        {/* Etiqueta de espécimen: una sola vez en todo el sitio. */}
        <motion.div
          className="mb-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-l border-clay-400 pl-3"
          initial={reduced ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
        >
          <span className="field-label text-clay-300">{t(site.place)}</span>
          <span className="field-label" translate="no">
            {lang === 'es' ? site.coords : site.coordsEn}
          </span>
        </motion.div>

        <h1
          id="hero-title"
          className="m-0 max-w-[16ch] text-mist-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.35rem, 1.1rem + 4.5vw, 4.75rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
          }}
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block leading-[1.02]"
                initial={reduced ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, ease: EASE, delay: 0.45 + i * 0.11 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="lede measure mt-5 mb-0 max-w-[46ch]"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        >
          {t(site.subtitle)}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.02 }}
        >
          <Link
            to="/quimica"
            className="inline-flex min-h-[2.9rem] items-center gap-2 rounded-full bg-clay-500 px-6 text-canopy-950 no-underline transition-[background-color,transform] duration-200 hover:bg-clay-400 active:scale-[0.98]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, touchAction: 'manipulation' }}
          >
            {lang === 'es' ? 'Empezar por la química' : 'Start with the chemistry'}
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            to="/evidencias"
            className="inline-flex min-h-[2.9rem] items-center rounded-full border border-canopy-600 px-6 text-mist-200 no-underline transition-colors duration-200 hover:border-mist-400 hover:text-mist-50"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500, touchAction: 'manipulation' }}
          >
            {lang === 'es' ? 'Ver las evidencias' : 'See the evidence'}
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 max-w-[56rem] border-t border-canopy-600/70 pt-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.18 }}
        >
          <p className="field-label m-0 mb-2 text-[0.6rem]">
            {lang === 'es' ? 'Integrantes' : 'Group members'}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
            {members.map((name) => (
              <li
                key={name}
                className="text-[0.94rem] whitespace-nowrap text-mist-200"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[var(--shell-x)] bottom-[clamp(2.5rem,7vh,5rem)] hidden items-center gap-3 md:flex"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        aria-hidden="true"
      >
        <span className="field-label text-[0.6rem]">{lang === 'es' ? 'Baja' : 'Scroll'}</span>
        <span className="relative block h-14 w-px bg-canopy-600">
          <motion.span
            className="absolute inset-x-0 top-0 block h-4 bg-clay-400"
            animate={reduced ? undefined : { y: [0, 40, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  )
}
