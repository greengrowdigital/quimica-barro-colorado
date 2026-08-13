import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { manifesto } from '../../content/home.js'
import { Reveal } from '../motion/Reveal.jsx'

/**
 * El párrafo donde el grupo dice dónde encontró la química. Cada fragmento
 * está anclado a una fotografía real; señalar una resalta la otra. La
 * información completa se ve siempre, el resaltado sólo la conecta.
 */
export default function Manifesto() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(null)

  return (
    <section className="shell py-[clamp(4rem,10vh,7.5rem)]">
      <Reveal>
        <p
          className="m-0 max-w-[24ch] text-mist-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.65rem, 1.1rem + 2.2vw, 3rem)',
            lineHeight: 1.14,
            letterSpacing: '-0.03em',
          }}
        >
          {t(manifesto.lead)}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <p
          className="mt-8 mb-0 max-w-[34ch] text-mist-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 0.9rem + 1.1vw, 1.75rem)',
            lineHeight: 1.4,
          }}
        >
          {lang === 'es' ? 'Estaba en ' : 'It was in '}
          {manifesto.places.map((place, i) => (
            <span key={place.img}>
              <span
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-default transition-colors duration-300"
                style={{
                  color: active === i ? 'var(--color-clay-300)' : 'inherit',
                  boxShadow:
                    active === i
                      ? 'inset 0 -2px 0 var(--color-clay-400)'
                      : 'inset 0 -1px 0 color-mix(in oklab, var(--color-canopy-600) 90%, transparent)',
                }}
              >
                {t(place.text)}
              </span>
              {i < manifesto.places.length - 1 ? (i === manifesto.places.length - 2 ? (lang === 'es' ? ' y ' : ' and ') : ', ') : ' '}
            </span>
          ))}
          {t(manifesto.tail)}
        </p>
      </Reveal>

      <ul className="mt-12 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 md:grid-cols-4 md:gap-6">
        {manifesto.places.map((place, i) => (
          <li key={place.img}>
            <figure
              className="m-0"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className="overflow-hidden rounded-[2px] transition-[filter,opacity] duration-500"
                style={{
                  filter: active === null || active === i ? 'saturate(1)' : 'saturate(0.35)',
                  opacity: active === null || active === i ? 1 : 0.55,
                }}
              >
                <img
                  src={place.img}
                  alt={t(place.alt)}
                  width="570"
                  height="760"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: active === i ? 'scale(1.04)' : 'scale(1)' }}
                />
              </div>
              <figcaption
                className="mt-2.5 text-[0.82rem] leading-snug transition-colors duration-300"
                style={{ color: active === i ? 'var(--color-clay-300)' : 'var(--color-mist-400)' }}
              >
                {t(place.text)}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
