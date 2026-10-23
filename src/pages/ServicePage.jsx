import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useApp } from '../i18n.jsx'
import { useSite } from '../context/SiteData.jsx'
import { mediaUrl } from '../lib/media.js'
import { pick, lines } from '../lib/text.js'
import { C, btnP, btnW, H2, sec } from '../ui.js'
export default function ServicePage() {
  const { slug } = useParams(), { t, lang } = useApp(), { services, loading, contact } = useSite(), [lb, setLb] = useState(null)
  const s = services.find(x => x.slug === slug)
  if (loading) return <main className="min-h-[70vh]" aria-busy="true" />
  if (!s) return (<main className={`${C} min-h-[70vh] pb-20 pt-[calc(theme(spacing.nav)+80px)] text-center`}>
    <h1 className="mb-5 text-3xl font-extrabold">{t('nf')}</h1><Link className={btnP} to="/">{t('nav.home')}</Link></main>)
  const title = pick(s.title_ar, s.title_en, lang), urls = s.images.map(x => mediaUrl(x.path)),
    alts = s.images.map((x, i) => pick(x.alt_ar, x.alt_en, lang) || `${title} ${i + 1}`)
  return (<main>
    <section className="bg-[#141416] pb-11 pt-[calc(theme(spacing.nav)+40px)] text-white"><div className={C}>
      <Link to={{ pathname: '/', hash: '#services' }} className="inline-flex items-center gap-2 font-bold text-[#ffb089]"><FiArrowRight className="rtl:-scale-x-100" /> {t('services.back')}</Link>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-tight">{title}</h1>
      <p className="text-neutral-400">{s.images.length} {t('services.photos')}</p>
      <div className="mt-4 flex flex-wrap gap-2.5">{lines(pick(s.items_ar, s.items_en, lang)).map((x, i) => <span key={i} className="rounded-full border border-white/30 px-3.5 py-1 text-sm">{x}</span>)}</div></div></section>
    <section className={sec}><div className={C}>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">{urls.map((src, i) =>
        <Reveal key={s.images[i].id} className="mb-4 break-inside-avoid"><button className="group block w-full overflow-hidden rounded-card bg-surface shadow-card" onClick={() => setLb(i)}>
          <img className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" src={src} alt={alts[i]} loading={i < 4 ? 'eager' : 'lazy'} /></button></Reveal>)}</div>
      <Lightbox items={urls} index={lb} setIndex={setLb} alts={alts} /></div></section>
    <section className="bg-brand py-11 text-center text-onp"><div className={C}><h2 className={H2}>{t('services.ask')}</h2>
      <div className="mt-7 flex justify-center"><a className={btnW} href={contact.wa(t('waSvc') + title)} target="_blank" rel="noopener noreferrer"><FaWhatsapp />{t('cta.wa')}</a></div></div></section>
    <section className={`${sec} bg-surface`}><div className={C}><h3 className="mb-3 text-xl font-bold">{t('services.more')}</h3>
      <div className="flex flex-wrap gap-2.5">{services.filter(x => x.slug !== slug).map(x => <Link key={x.slug} to={`/services/${x.slug}`}
        className="rounded-xl border border-line bg-bg px-5 py-2.5 font-bold transition hover:border-brand hover:text-brand">{pick(x.title_ar, x.title_en, lang)}</Link>)}</div></div></section>
  </main>)
}
