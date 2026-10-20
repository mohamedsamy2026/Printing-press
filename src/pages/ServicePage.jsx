import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useApp } from '../i18n.jsx'
import { SERVICES, waLink } from '../data.js'
import { altFor } from '../alts.js'
export default function ServicePage() {
  const { slug } = useParams(), { t, lang } = useApp(), [lb, setLb] = useState(null)
  const s = SERVICES.find(x => x.slug === slug)
  if (!s) return <main className="container nf"><h1>{t('nf')}</h1><Link className="btn btn-p" to="/">{t('nav.home')}</Link></main>
  const title = t(`services.items.${slug}.title`)
  return (<main>
    <section className="phead"><div className="container">
      <Link to={{ pathname: '/', hash: '#services' }} className="back"><FiArrowRight className="flip" /> {t('services.back')}</Link>
      <h1>{title}</h1><p className="cnt">{s.images.length} {t('services.photos')}</p>
      <div className="chips">{t(`services.items.${slug}.list`).map(x => <span key={x}>{x}</span>)}</div></div></section>
    <section className="sec"><div className="container"><div className="masonry">
      {s.images.map((src, i) => <Reveal key={src} className="mi"><button onClick={() => setLb(i)}><img src={src} alt={altFor(s.dir, i, lang)} loading={i < 4 ? 'eager' : 'lazy'} /></button></Reveal>)}</div>
      <Lightbox items={s.images} index={lb} setIndex={setLb} alts={s.images.map((_, i) => altFor(s.dir, i, lang))} /></div></section>
    <section className="band sm"><div className="container"><h2>{t('services.ask')}</h2>
      <div className="btns"><a className="btn btn-w" href={waLink(t('waSvc') + title)} target="_blank" rel="noopener noreferrer"><FaWhatsapp />{t('cta.wa')}</a></div></div></section>
    <section className="sec alt"><div className="container"><h3 className="moreh">{t('services.more')}</h3>
      <div className="chips big">{SERVICES.filter(x => x.slug !== slug).map(x => <Link key={x.slug} to={`/services/${x.slug}`}>{t(`services.items.${x.slug}.title`)}</Link>)}</div></div></section>
  </main>)
}
