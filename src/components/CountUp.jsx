import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/** Cuenta hasta el valor cuando entra en pantalla. Formato según idioma. */
export default function CountUp({ value, duration = 1500, className, prefix = '', suffix = '' }) {
  const { lang } = useLanguage()
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return undefined
    }

    // Si el observador nunca dispara (captura, pestaña oculta), la cifra
    // real aparece igual: nunca se queda en cero.
    if (!inView) {
      const failsafe = window.setTimeout(() => setShown(value), 2500)
      return () => window.clearTimeout(failsafe)
    }

    let frame = 0
    let start = null

    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      // ease-out-quart: llega rápido y frena, sin rebote
      const eased = 1 - Math.pow(1 - progress, 4)
      setShown(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduced])

  const formatted = new Intl.NumberFormat(lang === 'es' ? 'es-PA' : 'en-US').format(shown)

  return (
    <span ref={ref} className={`tabular ${className ?? ''}`.trim()}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
