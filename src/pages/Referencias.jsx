import { useLanguage } from '../i18n/LanguageContext.jsx'
import { credits, referencias, referenciasIntro } from '../content/referencias.js'
import { members } from '../content/site.js'
import ChapterNav from '../components/ChapterNav.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Referencias() {
  const { lang, t } = useLanguage()
  usePageTitle(lang === 'es' ? 'Referencias — Barro Colorado' : 'References — Barro Colorado')

  return (
    <main id="contenido" className="pt-[var(--header-h)]">
      <section className="shell pt-[clamp(3rem,8vh,5rem)] pb-[clamp(2.5rem,6vh,4rem)]">
        <Reveal>
          <h1
            className="m-0 max-w-[14ch] text-mist-50"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.1rem, 1.3rem + 3.4vw, 3.8rem)',
              letterSpacing: '-0.034em',
            }}
          >
            {t(referenciasIntro.heading)}
          </h1>
          <p className="lede measure mt-6 mb-0">{t(referenciasIntro.lede)}</p>
        </Reveal>
      </section>

      <section className="shell pb-[clamp(3.5rem,9vh,6rem)]" aria-label="APA 7">
        <Stagger as="ol" className="m-0 list-none p-0" step={0.05}>
          {referencias.map((entry, i) => (
            <StaggerItem
              as="li"
              key={entry.url}
              className="grid gap-2 border-t border-canopy-800 py-6 last:border-b sm:grid-cols-[3.5rem_1fr] sm:gap-6"
            >
              <span className="tabular text-[0.78rem] text-mist-600" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <p className="measure m-0 text-[1rem] leading-relaxed text-mist-200">
                  <span className="text-mist-50">{entry.author}</span> {entry.year}{' '}
                  <em className="text-mist-50 not-italic">{t(entry.title)}</em>{' '}
                  {entry.publisher && <span>{entry.publisher} </span>}
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline break-words text-clay-300 no-underline transition-colors duration-200 hover:text-clay-400"
                  >
                    {entry.url}
                  </a>
                </p>
                <p className="field-label mt-2 mb-0 text-[0.6rem]">
                  {lang === 'es' ? 'Usada en' : 'Used in'} — {t(entry.used)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-canopy-900 py-[clamp(3rem,8vh,5.5rem)]" aria-labelledby="creditos">
        <div className="shell">
          <Reveal>
            <h2
              id="creditos"
              className="m-0 text-mist-50"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 1.15rem + 1.8vw, 2.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {t(credits.heading)}
            </h2>
          </Reveal>

          <Stagger as="ul" className="mt-8 m-0 grid list-none gap-x-8 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
            {members.map((name, i) => (
              <StaggerItem
                as="li"
                key={name}
                className="flex items-baseline gap-4 border-t border-canopy-700 py-4"
              >
                <span className="tabular text-[0.76rem] text-clay-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.08rem',
                    letterSpacing: '-0.018em',
                  }}
                >
                  {name}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.08}>
            <p className="field-label mt-3 mb-0 text-[0.6rem]">{t(credits.membersLabel)}</p>
          </Reveal>

          <Stagger as="dl" className="mt-12 m-0 grid gap-6 md:grid-cols-3" step={0.06}>
            {credits.items.map((item) => (
              <StaggerItem key={item.label.es} className="border-t border-canopy-700 pt-4">
                <dt className="field-label m-0">{t(item.label)}</dt>
                <dd className="measure mt-2 mb-0 ml-0 text-[0.97rem] leading-relaxed text-mist-200">
                  {t(item.value)}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="measure mt-10 mb-0 text-[0.9rem] leading-relaxed text-mist-400">{t(credits.note)}</p>
          </Reveal>
        </div>
      </section>

      <ChapterNav />
    </main>
  )
}
