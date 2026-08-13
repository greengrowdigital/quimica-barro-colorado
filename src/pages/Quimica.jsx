import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  agua,
  bosque,
  calidad,
  ciclo,
  quimicaConclusion,
  quimicaIntro,
  suelo,
} from '../content/quimica.js'
import PageIntro from '../components/PageIntro.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import ElementGrid from '../components/quimica/ElementGrid.jsx'
import PhotosynthesisEquation from '../components/quimica/PhotosynthesisEquation.jsx'
import WaterCycle from '../components/quimica/WaterCycle.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import Photo, { Figure } from '../components/Photo.jsx'
import CountUp from '../components/CountUp.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function SectionHead({ n, title, id }) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span
          className="tabular shrink-0 text-clay-400"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem' }}
        >
          {n}
        </span>
        <h2
          id={id}
          className="m-0 max-w-[18ch] text-mist-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.7rem, 1.15rem + 2.1vw, 2.9rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </h2>
      </div>
    </Reveal>
  )
}

export default function Quimica() {
  const { lang, t } = useLanguage()
  usePageTitle(
    lang === 'es'
      ? 'La química del ecosistema — Barro Colorado'
      : 'Chemistry of the Ecosystem — Barro Colorado',
  )

  return (
    <>
      <PageIntro
        kicker={quimicaIntro.kicker}
        heading={quimicaIntro.heading}
        lede={quimicaIntro.lede}
        image="/img/agua-follaje.webp"
        objectPosition="50% 60%"
        alt={{
          es: 'Superficie del agua verde del Lago Gatún con hierbas emergentes y el reflejo del bosque.',
          en: 'The green water surface of Gatun Lake with emergent grasses and the reflection of the forest.',
        }}
      />

      <main id="contenido">
        {/* 2.1 Agua */}
        <section className="shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="agua">
          <SectionHead n={agua.n} id={agua.id} title={t(agua.title)} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              {agua.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className={`measure mb-0 text-mist-200 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                </Reveal>
              ))}

              <Reveal delay={0.14}>
                <p className="field-label mt-10 mb-4">
                  {lang === 'es' ? 'Iones disueltos frecuentes' : 'Common dissolved ions'}
                </p>
              </Reveal>
              <ElementGrid items={agua.ions} />

              <Stagger as="dl" className="mt-8 m-0 grid gap-4 sm:grid-cols-2" step={0.06}>
                {agua.measures.map((measure) => (
                  <StaggerItem key={measure.label.es ?? measure.label} className="border-t border-canopy-700 pt-3">
                    <dt
                      className="m-0 text-mist-50"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem' }}
                    >
                      {t(measure.label)}
                    </dt>
                    <dd className="mt-1 mb-0 ml-0 text-[0.9rem] leading-relaxed text-mist-400">{t(measure.note)}</dd>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <RevealMask>
              <Figure
                src="/img/lago-gatun.webp"
                alt={t(ciclo.figures[0].alt)}
                caption={
                  lang === 'es'
                    ? 'El Lago Gatún rodea la isla: agua dulce formada durante la construcción del Canal.'
                    : 'Gatun Lake surrounds the island — fresh water created during the construction of the Canal.'
                }
                sizes="(max-width: 1024px) 92vw, 42vw"
                imgClassName="aspect-[4/5] w-full object-cover"
              />
            </RevealMask>
          </div>
        </section>

        {/* 2.2 Suelo */}
        <section className="bg-canopy-900 py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="suelo">
          <div className="shell">
            <SectionHead n={suelo.n} id={suelo.id} title={t(suelo.title)} />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <RevealMask from="left" className="lg:order-2">
                <Figure
                  src={suelo.photo.src}
                  alt={t(suelo.photo.alt)}
                  caption={t(suelo.photo.caption)}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  imgClassName="aspect-[3/4] w-full object-cover"
                />
              </RevealMask>

              <div className="lg:order-1">
                {suelo.body.map((paragraph, i) => (
                  <Reveal key={i}>
                    <p className="measure mt-0 mb-0 text-mist-200">{t(paragraph)}</p>
                  </Reveal>
                ))}

                <Reveal delay={0.1}>
                  <p className="field-label mt-10 mb-4">
                    {lang === 'es' ? 'Nutrientes del suelo' : 'Soil nutrients'}
                  </p>
                </Reveal>
                <ElementGrid items={suelo.nutrients} />

                <Reveal delay={0.12}>
                  <p className="measure mt-6 mb-0 text-[0.95rem] leading-relaxed text-mist-400">
                    {t(suelo.nutrientNote)}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2.3 Bosque */}
        <section className="shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="bosque">
          <SectionHead n={bosque.n} id={bosque.id} title={t(bosque.title)} />

          <div className="mt-8 max-w-[46rem]">
            {bosque.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={`measure mb-0 text-mist-200 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <PhotosynthesisEquation equation={bosque.equation} />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <h3
                  className="m-0 text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.3rem, 1rem + 1.1vw, 1.9rem)',
                    letterSpacing: '-0.026em',
                  }}
                >
                  {t(bosque.decomposition.title)}
                </h3>
              </Reveal>

              <Stagger as="ol" className="mt-6 m-0 list-none p-0" step={0.07}>
                {bosque.decomposition.steps.map((step, i) => (
                  <StaggerItem as="li" key={i} className="flex items-baseline gap-4 py-2.5">
                    <span
                      className="tabular shrink-0 text-clay-400"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.02rem] text-mist-200">{t(step)}</span>
                    {i < bosque.decomposition.steps.length - 1 && (
                      <span className="ml-auto text-canopy-600" aria-hidden="true">
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <path d="M8 3v10M4.5 9.5L8 13l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <RevealMask>
              <div className="overflow-hidden rounded-[3px] bg-canopy-900">
                <Photo
                  src={bosque.decomposition.photo.src}
                  alt={t(bosque.decomposition.photo.alt)}
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </RevealMask>
          </div>
        </section>

        {/* 2.4 Ciclo del agua */}
        <section className="bg-canopy-900 py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="ciclo-del-agua">
          <div className="shell">
            <SectionHead n={ciclo.n} id={ciclo.id} title={t(ciclo.title)} />

            <Reveal>
              <p className="measure mt-8 mb-12 text-mist-200">{t(ciclo.body[0])}</p>
            </Reveal>

            <WaterCycle stages={ciclo.stages} />

            <Reveal delay={0.08}>
              <div className="mt-14 flex flex-wrap items-end gap-x-6 gap-y-3 border-t border-canopy-700 pt-8">
                <span
                  className="tabular text-clay-400"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(2.6rem, 1.8rem + 3vw, 4.6rem)',
                    lineHeight: 0.92,
                    letterSpacing: '-0.035em',
                  }}
                >
                  <CountUp value={ciclo.rainfall.value} duration={1900} />
                  <span className="ml-1 text-[0.4em] text-mist-400" translate="no">
                    {ciclo.rainfall.unit}
                  </span>
                </span>
                <p className="measure m-0 max-w-[40ch] text-[0.97rem] leading-relaxed text-mist-200">
                  <span className="text-mist-50">{t(ciclo.rainfall.label)}. </span>
                  {t(ciclo.rainfall.note)}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {ciclo.figures.map((figure, i) => (
                <RevealMask key={figure.src} delay={i * 0.1}>
                  <Figure
                    src={figure.src}
                    alt={t(figure.alt)}
                    caption={t(figure.caption)}
                    sizes="(max-width: 640px) 92vw, 44vw"
                    imgClassName="aspect-[4/3] w-full object-cover"
                  />
                </RevealMask>
              ))}
            </div>
          </div>
        </section>

        {/* 2.5 Calidad ambiental */}
        <section className="shell py-[clamp(3.5rem,9vh,6.5rem)]" aria-labelledby="calidad-ambiental">
          <SectionHead n={calidad.n} id={calidad.id} title={t(calidad.title)} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              {calidad.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={`measure mb-0 text-mist-200 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <p className="field-label m-0 mb-4">
                  {lang === 'es' ? 'Variables que se miden' : 'Variables measured'}
                </p>
              </Reveal>
              <Stagger as="ul" className="m-0 flex list-none flex-wrap gap-2 p-0" step={0.05}>
                {calidad.variables.map((variable) => (
                  <StaggerItem
                    as="li"
                    key={variable.es}
                    className="rounded-full border border-canopy-700 px-4 py-2 text-[0.9rem] text-mist-200 transition-colors duration-300 hover:border-clay-500 hover:text-mist-50"
                  >
                    {t(variable)}
                  </StaggerItem>
                ))}
              </Stagger>
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
                {t(quimicaConclusion.heading)}
              </h2>
              <p className="measure mt-5 mb-0 text-mist-200">{t(quimicaConclusion.body)}</p>
            </div>
          </Reveal>
        </section>

        <ChapterNav />
      </main>
    </>
  )
}
