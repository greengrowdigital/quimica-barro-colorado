import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { inventory } from '../../content/home.js'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal.jsx'
import CountUp from '../CountUp.jsx'
import { Figure } from '../Photo.jsx'

/**
 * Inventario de especies presentado como un registro de campo: nombre,
 * guía punteada y cifra alineada. Nada de tarjetas con iconos.
 */
export default function Inventory() {
  const { lang, t } = useLanguage()

  return (
    <section className="shell py-[clamp(4rem,10vh,7.5rem)]" aria-labelledby="importancia">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <h2
              id="importancia"
              className="m-0 max-w-[15ch] text-mist-50"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 1.2rem + 2.6vw, 3.3rem)',
                letterSpacing: '-0.032em',
              }}
            >
              {t(inventory.heading)}
            </h2>
            <p className="measure mt-5 mb-0 text-mist-200">{t(inventory.body)}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="measure mt-6 mb-0 text-[0.97rem] leading-relaxed text-mist-400">{t(inventory.walk)}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-canopy-700 pt-6">
              <span
                className="tabular text-clay-400"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.2rem,1.6rem+2vw,3.4rem)', lineHeight: 1 }}
              >
                <CountUp value={100} duration={1700} prefix="~" />
              </span>
              <span className="text-[0.97rem] text-mist-200">
                {lang === 'es'
                  ? 'años de datos climáticos continuos sobre el mismo bosque'
                  : 'years of continuous climate data on the same forest'}
              </span>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="field-label m-0 mb-5">
              {lang === 'es' ? 'Especies registradas en la isla' : 'Species recorded on the island'}
            </p>
          </Reveal>

          <Stagger as="ul" className="m-0 list-none p-0" step={0.06}>
            {inventory.rows.map((row) => (
              <StaggerItem
                as="li"
                key={row.label.es}
                className="flex items-baseline gap-3 border-b border-canopy-800 py-3.5 last:border-b-0"
              >
                <span className="shrink-0 text-[0.98rem] text-mist-200">{t(row.label)}</span>
                <span
                  className="min-w-6 grow translate-y-[-0.2em] border-b border-dotted border-canopy-600"
                  aria-hidden="true"
                />
                <span
                  className="shrink-0 text-mist-50"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.32rem', letterSpacing: '-0.02em' }}
                >
                  <CountUp value={row.value} prefix={row.prefix ?? ''} />
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="field-label mt-4 mb-0 text-[0.62rem]">{t(inventory.source)}</p>
          </Reveal>

          <Reveal delay={0.14}>
            <Figure
              className="mt-10"
              src="/img/dosel-cielo.webp"
              alt={
                lang === 'es'
                  ? 'Dosel del bosque visto desde abajo, con las copas abriéndose contra un cielo azul con nubes.'
                  : 'The forest canopy seen from below, with treetops opening against a blue sky with clouds.'
              }
              caption={
                lang === 'es'
                  ? 'Buena parte de la biodiversidad está sobre nosotros, en el dosel.'
                  : 'A good share of the biodiversity is above us, in the canopy.'
              }
              sizes="(max-width: 1024px) 92vw, 40vw"
              imgClassName="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
