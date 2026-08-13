import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Photo from './Photo.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Cabecera de las páginas interiores. Una banda de foto a media altura,
 * distinta al hero de portada para que cada página tenga su propio aire.
 */
export default function PageIntro({ kicker, heading, lede, image, alt, objectPosition = '50% 50%' }) {
  const { t } = useLanguage()
  const reduced = useReducedMotion()

  return (
    <header className="relative isolate overflow-hidden pt-[var(--header-h)]">
      <div className="absolute inset-0 -z-10">
        <Photo
          src={image}
          alt={alt ? t(alt) : ''}
          priority
          className="h-full w-full object-cover"
          objectPosition={objectPosition}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--color-canopy-950) 6%, color-mix(in oklab, var(--color-canopy-950) 88%, transparent) 46%, color-mix(in oklab, var(--color-canopy-950) 62%, transparent) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="shell grain relative flex min-h-[clamp(21rem,52svh,30rem)] flex-col justify-end pt-16 pb-[clamp(2.5rem,6vh,4.5rem)]">
        <motion.p
          className="field-label m-0 text-clay-300"
          initial={reduced ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {t(kicker)}
        </motion.p>

        <h1
          className="mt-3 mb-0 max-w-[18ch] text-mist-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.1rem, 1.1rem + 4.3vw, 4.1rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.032em',
          }}
        >
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span
              className="block leading-[1.04]"
              initial={reduced ? false : { y: '106%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.16 }}
            >
              {t(heading)}
            </motion.span>
          </span>
        </h1>

        {lede && (
          <motion.p
            className="lede measure mt-6 mb-0"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.42 }}
          >
            {t(lede)}
          </motion.p>
        )}
      </div>
    </header>
  )
}
