import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiPhone, FiMail, FiArrowUp } from 'react-icons/fi'
import { useApp } from '../i18n.jsx'
import { SITE, SERVICES, waLink } from '../data.js'
export default function Footer() {
  const { t } = useApp(), [top, setTop] = useState(false)
  useEffect(() => { const f = () => setTop(window.scrollY > 600); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return (<>
    <footer className="foot" style={{ '--pat': 'url(/images/og/footer-pattern.jpg)' }}>
      <div className="container fg">
        <div><img className="flogo" src="/images/logo/logo-white.png" alt={t('brand')} /><p>{t('foot.desc')}</p></div>
        <div><h4>{t('foot.links')}</h4>{SERVICES.map(s => <Link key={s.slug} to={`/services/${s.slug}`}>{t(`services.items.${s.slug}.title`)}</Link>)}</div>
        <div><h4>{t('foot.contact')}</h4>
          <a href={waLink(t('waMsg'))} target="_blank" rel="noopener noreferrer"><FaWhatsapp /><span className="ltr">{SITE.waShow}</span></a>
          <a href={SITE.callHref}><FiPhone /><span className="ltr">{SITE.call}</span></a>
          <a href={`mailto:${SITE.email}`}><FiMail /><span className="ltr">{SITE.email}</span></a></div>
        <div><h4>{t('foot.hours')}</h4><p>{t('foot.h1')}<br />{t('foot.h2')}</p><h4>{t('foot.follow')}</h4>
          <div className="soc"><a href={SITE.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={SITE.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FaTiktok /></a></div></div>
      </div>
      <div className="copy">© {new Date().getFullYear()} {t('brand')}. {t('foot.rights')}</div>
    </footer>
    {top && <button className="totop" aria-label={t('tip.top')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FiArrowUp /></button>}
    <a className="wa-float" href={waLink(t('waMsg'))} target="_blank" rel="noopener noreferrer" aria-label={t('tip.wa')}><FaWhatsapp /></a></>)
}
