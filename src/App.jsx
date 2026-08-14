import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'

/* La portada viaja en el paquete inicial porque es la primera que se abre. El
   resto se pide al entrar en cada ruta: en un equipo lento, descargar y
   compilar el JavaScript de las cinco páginas de golpe retrasa el primer
   pintado sin que nadie lo aproveche. */
const Quimica = lazy(() => import('./pages/Quimica.jsx'))
const Investigacion = lazy(() => import('./pages/Investigacion.jsx'))
const Evidencias = lazy(() => import('./pages/Evidencias.jsx'))
const Referencias = lazy(() => import('./pages/Referencias.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

/** Cada ruta empieza arriba; los anclajes internos conservan su destino. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

/* Hueco del alto de la ventana mientras llega el trozo de la ruta: evita que el
   pie salte hasta arriba durante el instante de carga. */
function RouteFallback() {
  return <div className="min-h-svh" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quimica" element={<Quimica />} />
          <Route path="/investigacion" element={<Investigacion />} />
          <Route path="/evidencias" element={<Evidencias />} />
          <Route path="/referencias" element={<Referencias />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  )
}
