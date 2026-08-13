import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Quimica from './pages/Quimica.jsx'
import Investigacion from './pages/Investigacion.jsx'
import Evidencias from './pages/Evidencias.jsx'
import Referencias from './pages/Referencias.jsx'
import NotFound from './pages/NotFound.jsx'

/** Cada ruta empieza arriba; los anclajes internos conservan su destino. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quimica" element={<Quimica />} />
        <Route path="/investigacion" element={<Investigacion />} />
        <Route path="/evidencias" element={<Evidencias />} />
        <Route path="/referencias" element={<Referencias />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
