import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  conservacion,
  instalaciones,
  investigacionConclusion,
  investigacionIntro,
  monitoreo,
} from '../content/investigacion.js'
import PageIntro from '../components/PageIntro.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import Photo from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

/** Parcela permanente: 50 ha dibujadas como la cuadrícula que realmente es. */
function PlotGrid() {
  const { lang } = useLanguage()
  const cells = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div>
      <Stagger as="div" className="grid grid-cols-10 gap-[3px]" step={0.012}>
        {cells.map((cell) => (
          <StaggerItem
            key={cell}
            className="aspect-square border border-canopy-600 bg-canopy-800 transition-colors duration-500 hover:border-clay-400 hover:bg-canopy-700"
          />
        ))}
      </Stagger>
      <p className="field-label mt-4 mb-0 text-[0.62rem]">
        {lang === 'es'
          ? '1 cuadro = 1 hectárea · censo continuo desde 1980'
          : '1 square = 1 hectare · continuous census since 1980'}
      </p>
    </div>
  )
}

export default function Investigacion() {
  const { lang, t } = useLanguage()
  usePageTitle(
    lang === 'es'
      ? 'Investigación científica — Barro Colorado'
      : 'Scientific Research — Barro Colorado',
  )

  return (
    <>
      <PageIntro
        kicker={investigacionIntro.kicker}
        heading={investigacionIntro.heading}
        lede={investigacionIntro.lede}
        image="/img/sendero-escalera.webp"
        objectPosition="50% 42%"
        alt={{
          es: 'Escalera de madera que sube desde el muelle hacia la estación de investigación, rodeada de vegetación.',
          en: 'Wooden stairway climbing from the dock to the research station, surrounded by vegetation.',
        }}
      />

      <main id="contenido">
        {/* Monitoreo a largo plazo */}
        <section className="shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="monitoreo">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2
                  id="monitoreo"
                  className="m-0 max-w-[16ch] text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 1.2rem + 2.3vw, 3rem)',
                    letterSpacing: '-0.032em',
                  }}
                >
                  {t(monitoreo.heading)}
                </h2>
                <p className="measure mt-6 mb-0 text-mist-200">{t(monitoreo.body)}</p>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Reveal delay={0.06}>
                  <div className="border-t border-canopy-700 pt-5">
                    <p
                      className="tabular m-0 text-clay-400"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(2rem,1.5rem+1.8vw,3rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      <CountUp value={monitoreo.plot.hectares} />
                      <span className="ml-1 text-[0.42em] text-mist-400" translate="no">
                        ha
                      </span>
                    </p>
                    <p className="mt-2 mb-0 text-[0.92rem] leading-relaxed text-mist-400">
                      {t(monitoreo.plot.caption)}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="border-t border-canopy-700 pt-5">
                    <p
                      className="tabular m-0 text-clay-400"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(2rem,1.5rem+1.8vw,3rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      <CountUp value={monitoreo.climate.years} prefix="~" />
                      <span className="ml-1 text-[0.42em] text-mist-400">
                        {lang === 'es' ? 'años' : 'yrs'}
                      </span>
                    </p>
                    <p className="mt-2 mb-0 text-[0.92rem] leading-relaxed text-mist-400">
                      {t(monitoreo.climate.caption)}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1}>
              <PlotGrid />
              <RevealMask className="mt-10">
                <div className="overflow-hidden rounded-[3px] bg-canopy-900">
                  <Photo
                    src={investigacionIntro.photo.src}
                    alt={t(investigacionIntro.photo.alt)}
                    sizes="(max-width: 1024px) 92vw, 42vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </RevealMask>
            </Reveal>
          </div>
        </section>

        {/* Instalaciones */}
        <section className="bg-canopy-900 py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="instalaciones">
          <div className="shell">
            <Reveal>
              <h2
                id="instalaciones"
                className="m-0 max-w-[18ch] text-mist-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 1.2rem + 2.3vw, 3rem)',
                  letterSpacing: '-0.032em',
                }}
              >
                {t(instalaciones.heading)}
              </h2>
              <p className="measure mt-6 mb-0 text-mist-200">{t(instalaciones.body)}</p>
            </Reveal>

            <Stagger as="ul" className="mt-12 m-0 list-none p-0" step={0.05}>
              {instalaciones.items.map((item, i) => (
                <StaggerItem
                  as="li"
                  key={item.name.es}
                  className="grid items-center gap-4 border-t border-canopy-800 py-6 last:border-b sm:grid-cols-[7rem_1fr_auto] sm:gap-8"
                >
                  <span
                    className="tabular text-[0.78rem] text-mist-600"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span>
                    <span
                      className="block text-mist-50"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 'clamp(1.1rem, 0.95rem + 0.6vw, 1.45rem)',
                        letterSpacing: '-0.022em',
                      }}
                    >
                      {t(item.name)}
                    </span>
                    <span className="measure mt-1.5 block text-[0.94rem] leading-relaxed text-mist-400">
                      {t(item.note)}
                    </span>
                  </span>

                  {item.img ? (
                    <span className="block h-44 w-full overflow-hidden rounded-[2px] sm:h-24 sm:w-36">
                      <img
                        src={item.img}
                        alt={t(item.alt)}
                        width="570"
                        height="760"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                      />
                    </span>
                  ) : (
                    <span className="hidden sm:block sm:w-36" aria-hidden="true" />
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Química aplicada a la conservación */}
        <section className="shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="conservacion">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2
                  id="conservacion"
                  className="m-0 max-w-[17ch] text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 1.2rem + 2.3vw, 3rem)',
                    letterSpacing: '-0.032em',
                  }}
                >
                  {t(conservacion.heading)}
                </h2>
              </Reveal>

              {conservacion.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="measure mt-6 mb-0 text-mist-200">{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <p className="field-label m-0 mb-6">
                  {lang === 'es' ? 'De la muestra a la decisión' : 'From sample to decision'}
                </p>
              </Reveal>

              <Stagger as="ol" className="relative m-0 list-none p-0" step={0.08}>
                <span className="absolute top-3 bottom-3 left-[0.42rem] w-px bg-canopy-700" aria-hidden="true" />
                {conservacion.chain.map((step, i) => (
                  <StaggerItem as="li" key={i} className="relative pb-7 pl-8 last:pb-0">
                    <span
                      className="absolute top-[0.5rem] left-0 block h-[0.85rem] w-[0.85rem] rounded-full border-2 border-clay-500 bg-canopy-950"
                      aria-hidden="true"
                    />
                    <span className="text-[1.02rem] text-mist-200">{t(step)}</span>
                  </StaggerItem>
                ))}
              </Stagger>

              <RevealMask className="mt-10">
                <figure className="m-0">
                  <div className="overflow-hidden rounded-[3px] bg-canopy-900">
                    <Photo
                      src="/img/coleccion-craneo-2.webp"
                      alt={
                        lang === 'es'
                          ? 'Cráneos de mamífero conservados en la colección de referencia de la estación.'
                          : 'Mammal skulls preserved in the station’s reference collection.'
                      }
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 max-w-[46ch] text-[0.86rem] leading-relaxed text-mist-400">
                    {lang === 'es'
                      ? 'Las colecciones de referencia permiten comparar e identificar especies durante décadas.'
                      : 'Reference collections make it possible to compare and identify species across decades.'}
                  </figcaption>
                </figure>
              </RevealMask>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 border-t border-canopy-700 pt-10">
              <h2
                className="m-0 text-mist-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.4rem, 1.1rem + 1.2vw, 2.05rem)',
                  letterSpacing: '-0.028em',
                }}
              >
                {t(investigacionConclusion.heading)}
              </h2>
              <p className="measure mt-5 mb-0 text-mist-200">{t(investigacionConclusion.body)}</p>
            </div>
          </Reveal>
        </section>

        <ChapterNav />
      </main>
    </>
  )
}
