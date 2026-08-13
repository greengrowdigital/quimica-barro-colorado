import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { Stagger, StaggerItem } from '../motion/Reveal.jsx'

/**
 * Celdas de elemento inspiradas en una tabla periódica: símbolo grande,
 * nombre y función. Estructura de tabla real, no tarjetas decorativas.
 */
export default function ElementGrid({ items, className = '' }) {
  const { t } = useLanguage()

  return (
    <Stagger
      as="ul"
      className={`m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2 p-0 ${className}`.trim()}
      step={0.05}
    >
      {items.map((item) => (
        <StaggerItem
          as="li"
          key={item.symbol}
          className="group relative border border-canopy-700 bg-canopy-900 p-4 transition-colors duration-300 hover:border-clay-500"
        >
          <span
            className="block text-mist-50 transition-colors duration-300 group-hover:text-clay-300"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              fontSize: 'clamp(1.5rem, 1.2rem + 0.9vw, 2rem)',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
            }}
            translate="no"
          >
            {item.symbol}
          </span>
          <span className="mt-2 block text-[0.92rem] text-mist-200">{t(item.name)}</span>
          {item.role && (
            <span className="mt-1 block text-[0.8rem] leading-snug text-mist-400">{t(item.role)}</span>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  )
}
