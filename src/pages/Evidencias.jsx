import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  curiosidades,
  evidenciasConclusion,
  evidenciasIntro,
  stops,
  video,
} from '../content/evidencias.js'
import PageIntro from '../components/PageIntro.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import Lightbox from '../components/evidencias/Lightbox.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Evidencias() {
  const { lang, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  usePageTitle(
    lang === 'es' ? 'Evidencias de la gira — Barro Colorado' : 'Field Evidence — Barro Colorado',
  )

  return (
    <>
      <PageIntro
        kicker={evidenciasIntro.kicker}
        heading={evidenciasIntro.heading}
        lede={evidenciasIntro.lede}
        image="/img/helechos.webp"
        objectPosition="50% 45%"
        alt={{
          es: 'Helechos y vegetación densa del sotobosque fotografiados durante el recorrido.',
          en: 'Ferns and dense understory vegetation photographed along the trail.',
        }}
      />

      <main id="contenido">
        <section className="shell py-[clamp(3rem,8vh,5.5rem)]" aria-label={lang === 'es' ? 'Paradas del recorrido' : 'Stops along the trail'}>
          <ol className="relative m-0 list-none p-0">
            {/* El sendero */}
            <span
              className="absolute top-4 bottom-4 left-[0.44rem] hidden w-px bg-canopy-800 md:block"
              aria-hidden="true"
            />

            {stops.map((stop, i) => {
              const flipped = i % 2 === 1

              return (
                <li key={stop.id} className="relative pb-[clamp(3rem,7vh,5rem)] last:pb-0 md:pl-16">
                  <span
                    className="absolute top-[0.6rem] left-0 hidden h-[0.9rem] w-[0.9rem] rounded-full border-2 border-clay-500 bg-canopy-950 md:block"
                    aria-hidden="true"
                  />

                  <div
                    className={`grid items-start gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 ${
                      flipped ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <RevealMask from={flipped ? 'right' : 'left'}>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[3px] bg-canopy-900"
                        style={{ touchAction: 'manipulation' }}
                        aria-label={
                          lang === 'es'
                            ? `Ampliar fotografía: ${t(stop.title)}`
                            : `Enlarge photograph: ${t(stop.title)}`
                        }
                      >
                        <Photo
                          src={`/img/${stop.slug}.webp`}
                          alt={t(stop.alt)}
                          sizes="(max-width: 1024px) 92vw, 48vw"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                        />
                        <span
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              'linear-gradient(to top, color-mix(in oklab, var(--color-canopy-950) 70%, transparent), transparent 45%)',
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-clay-500 text-canopy-950 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="8.6" cy="8.6" r="5.4" />
                            <path d="M12.6 12.6L17 17M8.6 6.4v4.4M6.4 8.6h4.4" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </RevealMask>

                    <Reveal delay={0.08} className="lg:pt-2">
                      <div className="flex items-baseline gap-3">
                        <span
                          className="tabular text-clay-400"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="field-label text-[0.62rem]">{t(stop.tag)}</span>
                      </div>

                      <h2
                        className="mt-3 mb-0 max-w-[18ch] text-mist-50"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(1.5rem, 1.1rem + 1.6vw, 2.4rem)',
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {t(stop.title)}
                      </h2>
                      <p className="mt-1.5 mb-0 text-[1.02rem] text-clay-300">{t(stop.subtitle)}</p>
                      <p className="measure mt-5 mb-0 text-mist-200">{t(stop.body)}</p>
                    </Reveal>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Video de la gira */}
        <section className="defer-offscreen bg-canopy-900 py-[clamp(3.5rem,9vh,6rem)]" aria-labelledby="video-gira">
          <div className="shell grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-14">
            <Reveal>
              <h2
                id="video-gira"
                className="m-0 max-w-[14ch] text-mist-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.7rem, 1.15rem + 2.1vw, 2.7rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {t(video.heading)}
              </h2>
              <p className="measure mt-4 mb-0 text-mist-400">{t(video.body)}</p>
            </Reveal>

            <RevealMask>
              {/* Sin poster: así el navegador toma la relación real del archivo
                  y el bloque no impone un formato que el video no tiene. */}
              <div className="flex min-h-[16rem] items-center justify-center overflow-hidden rounded-[3px] bg-canopy-950">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="mx-auto max-h-[68svh] w-full"
                >
                  {lang === 'es'
                    ? 'Tu navegador no puede reproducir este video.'
                    : 'Your browser cannot play this video.'}
                </video>
              </div>
            </RevealMask>
          </div>
        </section>

        {/* Curiosidades */}
        <section className="defer-offscreen shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="curiosidades">
          <Reveal>
            <h2
              id="curiosidades"
              className="m-0 max-w-[16ch] text-mist-50"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 1.2rem + 2.3vw, 3rem)',
                letterSpacing: '-0.032em',
              }}
            >
              {t(curiosidades.heading)}
            </h2>
            <p className="measure mt-4 mb-0 text-mist-400">{t(curiosidades.body)}</p>
          </Reveal>

          <Stagger as="ul" className="mt-10 m-0 grid list-none gap-x-12 gap-y-0 p-0 md:grid-cols-2" step={0.045}>
            {curiosidades.items.map((item, i) => (
              <StaggerItem
                as="li"
                key={i}
                className="flex items-baseline gap-4 border-t border-canopy-800 py-5"
              >
                <span
                  className="tabular shrink-0 text-mist-600"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.99rem] leading-relaxed text-mist-200">{t(item)}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Conclusión */}
        <section className="defer-offscreen relative isolate overflow-hidden" aria-labelledby="conclusion-evidencias">
          <div className="absolute inset-0 -z-10">
            <Photo
              src="/img/dosel-cielo.webp"
              alt=""
              sizes="100vw"
              className="h-full w-full object-cover"
              objectPosition="50% 40%"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-canopy-950) 2%, color-mix(in oklab, var(--color-canopy-950) 90%, transparent) 40%, color-mix(in oklab, var(--color-canopy-950) 96%, transparent) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="shell grain py-[clamp(4rem,11vh,8rem)]">
            <Reveal>
              <h2
                id="conclusion-evidencias"
                className="m-0 max-w-[14ch] text-mist-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.9rem, 1.25rem + 2.5vw, 3.2rem)',
                  letterSpacing: '-0.032em',
                }}
              >
                {t(evidenciasConclusion.heading)}
              </h2>
              <p className="measure mt-7 mb-0 text-[1.06rem] leading-[1.75] text-mist-200">
                {t(evidenciasConclusion.body)}
              </p>
            </Reveal>
          </div>
        </section>

        <ChapterNav />
      </main>

      <Lightbox stops={stops} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  )
}
