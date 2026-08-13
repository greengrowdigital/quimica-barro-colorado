import { useLanguage } from '../i18n/LanguageContext.jsx'
import { intro } from '../content/home.js'
import Hero from '../components/Hero.jsx'
import Manifesto from '../components/home/Manifesto.jsx'
import Timeline from '../components/home/Timeline.jsx'
import Inventory from '../components/home/Inventory.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import { Reveal, RevealMask } from '../components/motion/Reveal.jsx'
import Photo from '../components/Photo.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Home() {
  const { lang, t } = useLanguage()
  usePageTitle(
    lang === 'es'
      ? 'La química de Barro Colorado — Grupo de Química'
      : 'The Chemistry of Barro Colorado — Chemistry Group',
  )

  return (
    <>
      <Hero />

      <main id="contenido">
        <section className="shell py-[clamp(4rem,10vh,7.5rem)]" aria-labelledby="presentacion">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
            <div>
              <Reveal>
                <h2
                  id="presentacion"
                  className="m-0 max-w-[16ch] text-mist-50"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.9rem, 1.2rem + 2.6vw, 3.3rem)',
                    letterSpacing: '-0.032em',
                  }}
                >
                  {t(intro.heading)}
                </h2>
              </Reveal>

              {intro.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.06 + i * 0.06}>
                  <p className={`measure mb-0 text-mist-200 ${i === 0 ? 'mt-7' : 'mt-5'}`}>{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>

            <RevealMask className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <figure className="m-0">
                <div className="overflow-hidden rounded-[3px] bg-canopy-900">
                  <Photo
                    src={intro.photo.src}
                    alt={t(intro.photo.alt)}
                    sizes="(max-width: 1024px) 92vw, 44vw"
                    className="aspect-[4/5] w-full object-cover"
                    objectPosition="50% 55%"
                  />
                </div>
                <figcaption className="mt-3 max-w-[46ch] text-[0.86rem] leading-relaxed text-mist-400">
                  {lang === 'es'
                    ? 'La isla solo se alcanza por agua: la gira empezó cruzando el Lago Gatún.'
                    : 'The island can only be reached by water — the trip began by crossing Gatun Lake.'}
                </figcaption>
              </figure>
            </RevealMask>
          </div>
        </section>

        <Manifesto />
        <Timeline />
        <Inventory />
        <ChapterNav heading={lang === 'es' ? 'Las secciones del proyecto' : 'Sections of the project'} />
      </main>
    </>
  )
}
