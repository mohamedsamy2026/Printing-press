import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ServicePage from './pages/ServicePage.jsx'
import { useApp } from './i18n.jsx'
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80); return () => clearTimeout(t) }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
function NotFound() { const { t } = useApp(); return <main className="container nf"><h1>{t('nf')}</h1><Link className="btn btn-p" to="/">{t('nav.home')}</Link></main> }
export default function App() {
  return (<><ScrollToTop /><Navbar />
    <Routes><Route path="/" element={<Home />} /><Route path="/services/:slug" element={<ServicePage />} /><Route path="*" element={<NotFound />} /></Routes>
    <Footer /></>)
}
