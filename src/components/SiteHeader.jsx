import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav, site } from '../content/site.js'

function LeafMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true">
      <path
        d="M16 3c6 3.4 10 7.9 10 13.4C26 22.6 21.6 27.1 16 29 10.4 27.1 6 22.6 6 16.4 6 10.9 10 6.4 16 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 4.6v23.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 11.5l5.4-3.1M16 17l6.2-3.6M16 22.6l5.4-3.1M16 11.5l-5.4-3.1M16 17l-6.2-3.6M16 22.6l-5.4-3.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".7"
      />
      <circle cx="16" cy="6.4" r="1.9" fill="currentColor" />
    </svg>
  )
}

export default function SiteHeader() {
  const { lang, toggle, t } = useLanguage()
  const location = useLocation()
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a[href]')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const onHome = location.pathname === '/'

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-clay-500 focus:px-5 focus:py-2.5 focus:text-canopy-950 focus:no-underline"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      {/* Por encima del panel móvil: si no, el propio botón de cerrar queda tapado. */}
      <header
        className="fixed inset-x-0 top-0 z-[80] transition-colors duration-500"
        style={{
          backgroundColor: scrolled || !onHome || menuOpen ? 'var(--color-canopy-950)' : 'transparent',
          borderBottom: `1px solid ${scrolled || !onHome || menuOpen ? 'color-mix(in oklab, var(--color-canopy-700) 70%, transparent)' : 'transparent'}`,
        }}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 text-mist-50 no-underline"
            aria-label={lang === 'es' ? 'Inicio — La química de Barro Colorado' : 'Home — The Chemistry of Barro Colorado'}
          >
            <span className="text-leaf-400 transition-transform duration-500 group-hover:rotate-[8deg]">
              <LeafMark />
            </span>
            <span className="leading-tight">
              <span
                className="block text-[0.86rem] tracking-tight sm:text-[1.02rem]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {t(site.title)}
              </span>
              <span className="field-label hidden text-[0.62rem] sm:block">{t(site.groupShort)}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={lang === 'es' ? 'Principal' : 'Main'}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative rounded-full px-3.5 py-2 text-[0.88rem] no-underline transition-colors duration-200',
                    isActive ? 'text-mist-50' : 'text-mist-400 hover:text-mist-50',
                  ].join(' ')
                }
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {({ isActive }) => (
                  <>
                    {t(item.label)}
                    {isActive && (
                      <motion.span
                        layoutId={reduced ? undefined : 'nav-active'}
                        className="absolute inset-x-3 -bottom-px h-px bg-clay-400"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex h-11 min-w-11 items-center justify-center rounded-full border border-canopy-700 px-3 text-[0.74rem] text-mist-200 transition-colors duration-200 hover:border-clay-400 hover:text-mist-50"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', touchAction: 'manipulation' }}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              {/* En pantallas estrechas basta con mostrar a dónde lleva. */}
              <span className="sm:hidden">{lang === 'es' ? 'EN' : 'ES'}</span>
              <span className="hidden sm:inline">
                <span className={lang === 'es' ? 'text-mist-50' : 'text-mist-600'}>ES</span>
                <span className="mx-1 text-mist-600" aria-hidden="true">
                  /
                </span>
                <span className={lang === 'en' ? 'text-mist-50' : 'text-mist-600'}>EN</span>
              </span>
            </button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-canopy-700 text-mist-200 transition-colors duration-200 hover:border-clay-400 hover:text-mist-50 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={
                menuOpen
                  ? lang === 'es'
                    ? 'Cerrar menú'
                    : 'Close menu'
                  : lang === 'es'
                    ? 'Abrir menú'
                    : 'Open menu'
              }
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3.5 8h17" strokeLinecap="round" />
                    <path d="M3.5 16h17" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          className="h-px origin-left bg-clay-500"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-canopy-950 pt-[var(--header-h)] lg:hidden"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex min-h-full flex-col justify-between pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <nav aria-label={lang === 'es' ? 'Principal' : 'Main'}>
                <ul className="m-0 list-none space-y-1 p-0">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                          [
                            'flex items-baseline justify-between gap-4 border-b border-canopy-800 py-4 no-underline transition-colors duration-200',
                            isActive ? 'text-clay-400' : 'text-mist-50 hover:text-clay-300',
                          ].join(' ')
                        }
                      >
                        <span
                          className="text-[1.45rem] leading-tight"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}
                        >
                          {t(item.label)}
                        </span>
                        <span className="field-label shrink-0 text-[0.6rem]">{t(item.blurb)}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <p className="field-label mt-10 mb-0 text-[0.62rem]">
                {t(site.group)} · {t(site.place)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
