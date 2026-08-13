import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFound() {
  const { lang } = useLanguage()
  usePageTitle(lang === 'es' ? 'Página no encontrada — Barro Colorado' : 'Page not found — Barro Colorado')

  return (
    <main id="contenido" className="shell flex min-h-[70svh] flex-col justify-center pt-[var(--header-h)] pb-20">
      <p className="field-label m-0">404</p>
      <h1
        className="mt-4 mb-0 max-w-[16ch] text-mist-50"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 1.3rem + 3vw, 3.4rem)',
          letterSpacing: '-0.034em',
        }}
      >
        {lang === 'es' ? 'Ese sendero no existe' : 'That trail does not exist'}
      </h1>
      <p className="measure mt-5 mb-0 text-mist-400">
        {lang === 'es'
          ? 'La página que buscas no está en este proyecto. Vuelve al inicio para seguir el recorrido.'
          : 'The page you are looking for is not part of this project. Head back to the start to continue the tour.'}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-[2.9rem] w-fit items-center gap-2 rounded-full bg-clay-500 px-6 text-canopy-950 no-underline transition-[background-color,transform] duration-200 hover:bg-clay-400 active:scale-[0.98]"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, touchAction: 'manipulation' }}
      >
        {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
      </Link>
    </main>
  )
}
