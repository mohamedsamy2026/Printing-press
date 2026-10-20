import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaWhatsapp, FaStar, FaQuoteRight } from 'react-icons/fa'
import { FiPhone, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import Reveal from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useApp } from '../i18n.jsx'
import { SITE, SERVICES, WORKS, waLink } from '../data.js'
import { altFor } from '../alts.js'
const Head = ({ k, title, sub }) => (<Reveal className="head"><span className="kick">{k}</span><h2>{title}</h2>{sub && <p>{sub}</p>}<i className="bar" /></Reveal>)
const Btns = ({ t }) => (<div className="btns">
  <a className="btn btn-p" href={waLink(t('waMsg'))} target="_blank" rel="noopener noreferrer"><FaWhatsapp />{t('cta.wa')}</a>
  <a className="btn btn-o" href={SITE.callHref}><FiPhone />{t('cta.call')}</a></div>)
export default function Home() {
  const { t, lang } = useApp(), [lb, setLb] = useState(null)
  return (<main>
    <section id="home" className="hero" style={{ '--hero': 'url(/images/hero/hero-storefront.jpg)' }}>
      <div className="container hero-in">
        <span className="kick lt">{t('short')}</span><h1>{t('hero.title')}</h1><p>{t('hero.p')}</p><Btns t={t} />
      </div>
      <a className="down" href="#about" aria-label={t('nav.about')} onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}><FiChevronDown /></a>
    </section>

    <section id="about" className="sec"><div className="container two">
      <Reveal><span className="kick">{t('about.k')}</span><h2>{t('about.title')}</h2><i className="bar st" /><p>{t('about.p1')}</p><p>{t('about.p2')}</p>
        <div className="feats">{t('about.f').map(([a, b], i) => <div key={i} className="feat"><b>{a}</b><span>{b}</span></div>)}</div></Reveal>
      <Reveal delay={120} className="pic"><img src="/images/pap/pap-13-made.jpg" alt={t('brand')} loading="lazy" /></Reveal>
    </div></section>

    <section id="services" className="sec alt"><div className="container">
      <Head k={t('services.k')} title={t('services.title')} />
      <div className="cards">{SERVICES.map((s, i) => (
        <Reveal key={s.slug} delay={i * 80}><Link to={`/services/${s.slug}`} className="card">
          <div className="ph"><img src={s.images[0]} alt={altFor(s.dir, 0, lang)} loading="lazy" /></div>
          <div className="cb"><h3>{t(`services.items.${s.slug}.title`)}</h3><p>{t(`services.items.${s.slug}.list`).join(' – ')}</p>
            <span className="more">{t('cta.view')} <FiArrowRight className="flip" /></span></div></Link></Reveal>))}</div>
      <Btns t={t} />
    </div></section>

    <section id="portfolio" className="sec"><div className="container">
      <Head k={t('works.k')} title={t('works.title')} sub={t('works.sub')} />
      <Swiper key={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} modules={[Navigation, Autoplay, Keyboard]} navigation keyboard loop spaceBetween={20}
        autoplay={{ delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }}
        breakpoints={{ 0: { slidesPerView: 1.15 }, 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 }, 1440: { slidesPerView: 3.5 } }}>
        {WORKS.map((src, i) => <SwiperSlide key={src}><button className="work" onClick={() => setLb(i)}>
          <img src={src} alt={altFor('works', i, lang)} loading={i < 3 ? 'eager' : 'lazy'} /></button></SwiperSlide>)}
      </Swiper>
      <Lightbox items={WORKS} index={lb} setIndex={setLb} alts={WORKS.map((_, i) => altFor('works', i, lang))} />
    </div></section>

    <section id="process" className="sec alt"><div className="container">
      <Head k={t('process.k')} title={t('process.title')} />
      <div className="steps">{t('process.steps').map(([a, b], i) => <Reveal key={i} delay={i * 80}><div className="step"><em>{i + 1}</em><h3>{a}</h3><p>{b}</p></div></Reveal>)}</div>
    </div></section>

    <section id="testimonials" className="sec"><div className="container">
      <Head k={t('rev.k')} title={t('rev.title')} />
      <div className="revs">{t('rev.list').map((r, i) => <Reveal key={i} delay={(i % 3) * 80}><figure className="rev">
        <div className="stars" aria-label="5/5">{[...Array(5)].map((_, j) => <FaStar key={j} />)}</div>
        <blockquote>{r.t}</blockquote><figcaption>{r.n}</figcaption><FaQuoteRight className="q" /></figure></Reveal>)}</div>
    </div></section>

    <section id="contact" className="band"><div className="container"><Reveal><h2>{t('band.title')}</h2><p>{t('band.p')}</p><Btns t={t} /></Reveal></div></section>
  </main>)
}
