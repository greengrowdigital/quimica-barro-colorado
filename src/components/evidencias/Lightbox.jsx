import { useCallback, useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import Photo from '../Photo.jsx'

/**
 * Visor a pantalla completa sobre `<dialog>`: el navegador aporta el
 * atrapado de foco, el cierre con Escape y la capa superior real.
 */
export default function Lightbox({ stops, index, onClose, onNavigate }) {
  const { lang, t } = useLanguage()
  const dialogRef = useRef(null)
  const open = index !== null
  const stop = open ? stops[index] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const go = useCallback(
    (delta) => {
      if (index === null) return
      onNavigate((index + delta + stops.length) % stops.length)
    },
    [index, stops.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className="m-0 h-full max-h-none w-full max-w-none overscroll-contain bg-transparent p-0 backdrop:bg-[color-mix(in_oklab,var(--color-canopy-950)_92%,transparent)]"
      aria-label={lang === 'es' ? 'Fotografía ampliada' : 'Enlarged photograph'}
    >
      {stop && (
        <div className="flex h-full w-full flex-col bg-canopy-950/95 p-[max(0.9rem,env(safe-area-inset-top))_0.9rem_max(0.9rem,env(safe-area-inset-bottom))]">
          <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
            <p className="field-label m-0">
              <span className="tabular text-clay-400">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-mist-600">/</span>
              <span className="tabular">{String(stops.length).padStart(2, '0')}</span>
              <span className="ml-3 text-mist-200 normal-case">{t(stop.title)}</span>
            </p>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-canopy-700 text-mist-200 transition-colors duration-200 hover:border-clay-400 hover:text-mist-50"
              aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
              style={{ touchAction: 'manipulation' }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 grow items-center justify-center">
            <Photo
              src={`/img/${stop.slug}.webp`}
              alt={t(stop.alt)}
              priority
              sizes="92vw"
              className="max-h-full w-auto max-w-full object-contain"
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 pt-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 items-center gap-2 rounded-full border border-canopy-700 px-4 text-[0.85rem] text-mist-200 transition-colors duration-200 hover:border-clay-400 hover:text-mist-50"
              aria-label={lang === 'es' ? 'Fotografía anterior' : 'Previous photograph'}
              style={{ touchAction: 'manipulation' }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {lang === 'es' ? 'Anterior' : 'Previous'}
            </button>

            <p className="m-0 hidden max-w-[46ch] text-center text-[0.85rem] leading-snug text-mist-400 sm:block">
              {t(stop.subtitle)}
            </p>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 items-center gap-2 rounded-full border border-canopy-700 px-4 text-[0.85rem] text-mist-200 transition-colors duration-200 hover:border-clay-400 hover:text-mist-50"
              aria-label={lang === 'es' ? 'Fotografía siguiente' : 'Next photograph'}
              style={{ touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Siguiente' : 'Next'}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
