import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useApp } from '../i18n.jsx'
import { waLink } from '../data.js'
const IDS = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact']
export default function Navbar() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp()
  const [scrolled, setScrolled] = useState(false), [open, setOpen] = useState(false), [active, setActive] = useState('home')
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40); f()
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    const t0 = setTimeout(() => IDS.forEach(id => { const el = document.getElementById(id); el && io.observe(el) }), 300)
    return () => { clearTimeout(t0); io.disconnect() }
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  const logo = theme === 'dark' || (!scrolled && location.pathname === '/') ? 'white' : 'orange'
  const links = IDS.map(id => <Link key={id} to={{ pathname: '/', hash: '#' + id }} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{t('nav.' + id)}</Link>)
  const tools = (<>
    <button className="ic" onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? t('tip.light') : t('tip.dark')}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button>
    <button className="ic txt" onClick={toggleLang}>{t('tip.lang')}</button></>)
  return (
    <header className={`nav ${scrolled || open ? 'sc' : ''}`}>
      <div className="container nav-in">
        <Link to="/" className="logo" aria-label={t('brand')}><img src={`/images/logo/logo-${open ? 'orange' : logo}.png`} alt={t('brand')} /></Link>
        <nav className="links">{links}</nav>
        <div className="tools">{tools}<a className="btn btn-p sm" href={waLink(t('waMsg'))} target="_blank" rel="noopener noreferrer">{t('cta.order')}</a>
          <button className="ic burger" aria-label={t('tip.menu')} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
      </div>
      {open && <div className="drawer"><nav>{links}</nav><div className="dt">{tools}</div>
        <a className="btn btn-p" href={waLink(t('waMsg'))} target="_blank" rel="noopener noreferrer">{t('cta.order')}</a></div>}
    </header>)
}
