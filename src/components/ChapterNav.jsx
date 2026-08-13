import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav } from '../content/site.js'

const PREVIEW = {
  '/': '/img/lago-gatun-sm.webp',
  '/quimica': '/img/agua-follaje-sm.webp',
  '/investigacion': '/img/laboratorio-jaula-sm.webp',
  '/evidencias': '/img/ev-08-mono-aullador-sm.webp',
  '/referencias': '/img/panel-mapa-isla-sm.webp',
}

/**
 * Índice de capítulos: filas a todo lo ancho en vez de una rejilla de
 * tarjetas iguales. Al pasar el cursor, la fila trae su propia fotografía.
 */
export default function ChapterNav({ heading, exclude = [] }) {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)

  const items = nav.filter((item) => item.to !== location.pathname && !exclude.includes(item.to))

  return (
    <nav
      className="shell relative py-[clamp(3.5rem,8vh,6rem)]"
      aria-label={lang === 'es' ? 'Otras secciones' : 'Other sections'}
    >
      <p className="field-label m-0 mb-7">{heading ?? (lang === 'es' ? 'Seguir leyendo' : 'Keep reading')}</p>

      <ul className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onMouseEnter={() => setActive(item.to)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(item.to)}
              onBlur={() => setActive(null)}
              className="group relative flex items-baseline justify-between gap-6 border-t border-canopy-800 py-6 no-underline transition-colors duration-300 last:border-b hover:border-clay-500/60"
            >
              <span className="flex items-baseline gap-4 sm:gap-6">
                <span className="field-label tabular shrink-0 pt-1 text-[0.62rem] text-mist-600 transition-colors duration-300 group-hover:text-clay-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span
                    className="block text-mist-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 'clamp(1.35rem, 0.95rem + 1.6vw, 2.35rem)',
                      letterSpacing: '-0.028em',
                      lineHeight: 1.12,
                    }}
                  >
                    {t(item.label)}
                  </span>
                  <span className="mt-1 block text-[0.86rem] text-mist-400">{t(item.blurb)}</span>
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-4">
                {!reduced && (
                  <motion.span
                    className="hidden h-20 w-28 overflow-hidden rounded-[2px] md:block"
                    initial={false}
                    animate={{
                      opacity: active === item.to ? 1 : 0,
                      clipPath: active === item.to ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  >
                    <img
                      src={PREVIEW[item.to]}
                      alt=""
                      width="570"
                      height="760"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </motion.span>
                )}
                <span className="text-mist-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-clay-400">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
