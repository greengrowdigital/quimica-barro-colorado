import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * El contenido arranca visible. Sólo se oculta si, al montar, el elemento
 * está claramente por debajo del pliegue y el navegador puede observarlo.
 * Así una captura, una impresión o un render sin IntersectionObserver
 * nunca terminan con secciones en blanco.
 */
function useRevealState() {
  const ref = useRef(null)
  const [state, setState] = useState('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReduced()) return undefined

    // El rectángulo lo entrega la propia entrada del observador. Medirlo con
    // `getBoundingClientRect` desde un efecto forzaba un layout síncrono de toda
    // la página por cada bloque, y en un equipo lento eso bloqueaba el primer
    // pintado más de un segundo.
    let settled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
          settled = true
          return
        }
        if (!settled) {
          settled = true
          const root = entry.rootBounds
          if (root && entry.boundingClientRect.top >= root.bottom) setState('hidden')
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.12 },
    )
    observer.observe(el)

    // Red de seguridad: si el observador no dispara, el bloque aparece igual.
    const failsafe = window.setTimeout(() => {
      setState('shown')
      observer.disconnect()
    }, 1500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return [ref, state]
}

export function Reveal({ children, delay = 0, y = 22, className, as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  const style =
    state === 'idle'
      ? undefined
      : {
          opacity: state === 'hidden' ? 0 : 1,
          transform: state === 'hidden' ? `translate3d(0, ${y}px, 0)` : 'translate3d(0,0,0)',
          transition: `opacity 680ms ${EASE} ${delay}s, transform 680ms ${EASE} ${delay}s`,
          willChange: state === 'hidden' ? 'opacity, transform' : undefined,
        }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

/** Barrido para imágenes: la foto se descubre como una placa que se revela. */
export function RevealMask({ children, delay = 0, className, from = 'bottom', as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  const closed =
    from === 'left' ? 'inset(0 100% 0 0)' : from === 'right' ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)'

  const style =
    state === 'idle'
      ? undefined
      : {
          clipPath: state === 'hidden' ? closed : 'inset(0% 0 0 0)',
          opacity: state === 'hidden' ? 0.35 : 1,
          transition: `clip-path 1050ms ${EASE} ${delay}s, opacity 700ms ${EASE} ${delay}s`,
        }

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

/**
 * Lista escalonada. El retardo se inyecta por índice (~45 ms), dentro del
 * rango que se percibe como una sola secuencia y no como espera.
 */
export function Stagger({ children, className, step = 0.045, as: Tag = 'div' }) {
  const [ref, state] = useRevealState()

  return (
    <Tag ref={ref} className={className} data-reveal={state}>
      {Children.map(children, (child, i) =>
        isValidElement(child) ? cloneElement(child, { __revealState: state, __revealDelay: i * step }) : child,
      )}
    </Tag>
  )
}

export function StaggerItem({
  children,
  className,
  as: Tag = 'div',
  y = 16,
  __revealState = 'idle',
  __revealDelay = 0,
}) {
  const style =
    __revealState === 'idle'
      ? undefined
      : {
          opacity: __revealState === 'hidden' ? 0 : 1,
          transform: __revealState === 'hidden' ? `translate3d(0, ${y}px, 0)` : 'translate3d(0,0,0)',
          transition: `opacity 560ms ${EASE} ${__revealDelay}s, transform 560ms ${EASE} ${__revealDelay}s`,
        }

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}
