import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const EASE = [0.16, 1, 0.3, 1]
const RAIN = [96, 132, 168, 204, 240, 276, 312]
const VAPOR = [470, 520, 570, 620]

/**
 * Diagrama del ciclo del agua sobre la isla. Cada etapa se puede resaltar;
 * el texto de apoyo siempre está visible, el diagrama sólo lo ilustra.
 */
export default function WaterCycle({ stages }) {
  const { lang, t } = useLanguage()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)

  const isOn = (key) => active === null || active === key
  const dim = (key) => (isOn(key) ? 1 : 0.22)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
      <figure className="m-0 overflow-hidden rounded-[3px] border border-canopy-700 bg-canopy-900">
        <svg
          viewBox="0 0 760 440"
          className="block h-auto w-full"
          role="img"
          aria-label={
            lang === 'es'
              ? 'Diagrama del ciclo del agua en la Isla Barro Colorado: la lluvia cae sobre el bosque, parte del agua se infiltra en el suelo, otra corre hacia el Lago Gatún y las plantas devuelven vapor a la atmósfera.'
              : 'Diagram of the water cycle on Barro Colorado Island: rain falls on the forest, part of the water infiltrates the soil, part runs off into Gatun Lake, and plants return vapour to the atmosphere.'
          }
        >
          <defs>
            <linearGradient id="wc-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-canopy-850)" />
              <stop offset="100%" stopColor="var(--color-canopy-900)" />
            </linearGradient>
            <linearGradient id="wc-lake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--color-leaf-500) 34%, var(--color-canopy-800))" />
              <stop offset="100%" stopColor="var(--color-canopy-950)" />
            </linearGradient>
            <linearGradient id="wc-island" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--color-clay-600) 40%, var(--color-canopy-800))" />
              <stop offset="100%" stopColor="var(--color-canopy-850)" />
            </linearGradient>
          </defs>

          <rect width="760" height="440" fill="url(#wc-sky)" />

          {/* Nubes */}
          <g opacity={dim('precipitacion')} style={{ transition: 'opacity 400ms' }}>
            <path
              d="M120 62c0-16 13-28 29-28 6 0 12 2 17 6 6-14 20-24 36-24 20 0 37 14 41 33 15 2 26 15 26 30 0 17-14 31-31 31H126c-16 0-29-13-29-29 0-8 3-15 9-20z"
              fill="color-mix(in oklab, var(--color-mist-600) 26%, transparent)"
            />
            <path
              d="M470 76c0-13 11-24 24-24 5 0 10 2 14 5 5-12 17-20 30-20 17 0 31 12 34 28 13 2 22 13 22 25 0 15-12 27-27 27H475c-14 0-24-11-24-25 0-7 3-13 7-16z"
              fill="color-mix(in oklab, var(--color-mist-600) 18%, transparent)"
            />
          </g>

          {/* Lluvia */}
          <g opacity={dim('precipitacion')} style={{ transition: 'opacity 400ms' }}>
            {RAIN.map((x, i) => (
              <line
                key={x}
                x1={x}
                y1="118"
                x2={x - 7}
                y2="146"
                stroke="color-mix(in oklab, var(--color-leaf-400) 62%, transparent)"
                strokeWidth="2.4"
                strokeLinecap="round"
                style={
                  reduced
                    ? undefined
                    : {
                        animation: `wc-rain 1.5s linear ${i * 0.17}s infinite`,
                      }
                }
              />
            ))}
          </g>

          {/* Lago */}
          <path d="M0 300h760v140H0z" fill="url(#wc-lake)" />
          {[318, 340, 362].map((y, i) => (
            <path
              key={y}
              d={`M0 ${y}q40-9 80 0t80 0 80 0 80 0 80 0 80 0 80 0 80 0 80 0`}
              fill="none"
              stroke="color-mix(in oklab, var(--color-mist-600) 22%, transparent)"
              strokeWidth="1.4"
              style={reduced ? undefined : { animation: `wc-wave ${7 + i * 2}s ease-in-out ${i * 0.6}s infinite` }}
            />
          ))}

          {/* Isla */}
          <path d="M150 300c30-78 80-118 160-118s140 42 172 118z" fill="url(#wc-island)" />

          {/* Bosque sobre la isla */}
          <g fill="color-mix(in oklab, var(--color-leaf-500) 52%, var(--color-canopy-900))">
            {[
              [212, 262, 20],
              [252, 246, 25],
              [300, 232, 29],
              [352, 228, 31],
              [404, 240, 26],
              [446, 258, 21],
            ].map(([cx, cy, r]) => (
              <g key={cx}>
                <rect x={cx - 2.5} y={cy} width="5" height={300 - cy} fill="color-mix(in oklab, var(--color-canopy-950) 60%, transparent)" />
                <circle cx={cx} cy={cy} r={r} />
              </g>
            ))}
          </g>

          {/* Infiltración */}
          <g opacity={dim('infiltracion')} style={{ transition: 'opacity 400ms' }}>
            {[280, 330, 380].map((x, i) => (
              <path
                key={x}
                d={`M${x} 252v42`}
                stroke="var(--color-sun-400)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 7"
                style={reduced ? undefined : { animation: `wc-seep 2.6s linear ${i * 0.5}s infinite` }}
              />
            ))}
            <path d="M330 296l-5-8h10z" fill="var(--color-sun-400)" />
          </g>

          {/* Escorrentía */}
          <g opacity={dim('escorrentia')} style={{ transition: 'opacity 400ms' }}>
            <path
              d="M470 258q34 20 56 42"
              fill="none"
              stroke="var(--color-clay-400)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="9 8"
              style={reduced ? undefined : { animation: 'wc-flow 1.9s linear infinite' }}
            />
            <path d="M527 302l-11-3 5-9z" fill="var(--color-clay-400)" />
          </g>

          {/* Transpiración */}
          <g opacity={dim('transpiracion')} style={{ transition: 'opacity 400ms' }}>
            {VAPOR.map((x, i) => (
              <path
                key={x}
                d={`M${x} 232c-9-16 9-24 0-40s9-24 0-40`}
                fill="none"
                stroke="color-mix(in oklab, var(--color-mist-200) 55%, transparent)"
                strokeWidth="2"
                strokeLinecap="round"
                style={reduced ? undefined : { animation: `wc-rise ${4 + i * 0.7}s ease-in-out ${i * 0.5}s infinite` }}
              />
            ))}
          </g>

          {/* Etiquetas del terreno */}
          <text
            x="330"
            y="196"
            textAnchor="middle"
            fill="var(--color-mist-400)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.1em' }}
          >
            {lang === 'es' ? 'ISLA' : 'ISLAND'}
          </text>
          <text
            x="640"
            y="392"
            textAnchor="middle"
            fill="var(--color-mist-400)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.1em' }}
          >
            {lang === 'es' ? 'LAGO GATÚN' : 'GATUN LAKE'}
          </text>
        </svg>
      </figure>

      <ul className="m-0 list-none p-0">
        {stages.map((stage, i) => {
          const on = active === stage.key
          return (
            <li key={stage.key}>
              <button
                type="button"
                onMouseEnter={() => setActive(stage.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(stage.key)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : stage.key)}
                aria-pressed={on}
                className="flex w-full items-baseline gap-4 border-b border-canopy-800 py-4 text-left transition-colors duration-300 last:border-b-0 hover:border-clay-500/60"
                style={{ touchAction: 'manipulation' }}
              >
                <span
                  className="tabular shrink-0 transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: on ? 'var(--color-clay-400)' : 'var(--color-mist-600)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <motion.span
                    className="block"
                    animate={{ color: on ? 'var(--color-clay-300)' : 'var(--color-mist-50)' }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1.08rem',
                      letterSpacing: '-0.018em',
                    }}
                  >
                    {t(stage.label)}
                  </motion.span>
                  <span className="mt-1 block text-[0.92rem] leading-relaxed text-mist-400">{t(stage.note)}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <style>{`
        @keyframes wc-rain { 0% { transform: translateY(-14px); opacity: 0 } 18% { opacity: .95 } 100% { transform: translateY(150px); opacity: 0 } }
        @keyframes wc-seep { to { stroke-dashoffset: -24 } }
        @keyframes wc-flow { to { stroke-dashoffset: -34 } }
        @keyframes wc-rise { 0%,100% { transform: translateY(0); opacity: .35 } 50% { transform: translateY(-14px); opacity: .85 } }
        @keyframes wc-wave { 0%,100% { transform: translateX(0) } 50% { transform: translateX(-26px) } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes wc-rain { from, to { transform: none; opacity: .9 } }
          @keyframes wc-rise { from, to { transform: none; opacity: .6 } }
        }
      `}</style>
    </div>
  )
}
