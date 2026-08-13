import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { footerNote, nav, site } from '../content/site.js'

export default function SiteFooter() {
  const { lang, t } = useLanguage()
  const year = new Intl.DateTimeFormat(lang === 'es' ? 'es-PA' : 'en-US', { year: 'numeric' }).format(
    new Date(2026, 7, 13),
  )

  return (
    <footer className="border-t border-canopy-800 bg-canopy-950">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <p
            className="m-0 text-mist-50"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.3rem, 1rem + 1.1vw, 1.9rem)',
              letterSpacing: '-0.026em',
              lineHeight: 1.15,
            }}
          >
            {t(site.title)}
          </p>
          <p className="field-label mt-2 mb-0">
            {t(site.group)} · {t(site.place)}
          </p>
          <p className="measure mt-6 mb-0 text-[0.92rem] leading-relaxed text-mist-400">{t(footerNote)}</p>
        </div>

        <div>
          <p className="field-label m-0 mb-4">{lang === 'es' ? 'Secciones' : 'Sections'}</p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-[0.95rem] text-mist-200 no-underline transition-colors duration-200 hover:text-clay-300"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell hairline flex flex-wrap items-center justify-between gap-3 py-6">
        <p className="field-label m-0 text-[0.62rem]">
          © <span className="tabular">{year}</span> {t(site.group)}
        </p>
        <p className="field-label m-0 text-[0.62rem]" translate="no">
          {lang === 'es' ? site.coords : site.coordsEn}
        </p>
      </div>
    </footer>
  )
}
