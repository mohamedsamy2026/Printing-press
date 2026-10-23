import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { FALLBACK } from '../fallback.js'
import { telHref, waHref } from '../lib/phone.js'

const CACHE_KEY = 'site-cache-v1'
const Ctx = createContext(null)
export const useSite = () => useContext(Ctx)

const byOrder = (a, b) =>
  (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.created_at || '').localeCompare(String(b.created_at || ''))

const readCache = () => {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    return c && c.services && c.works && c.reviews && c.settings ? c : null
  } catch {
    return null
  }
}
const writeCache = (d) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(d))
  } catch {}
}

async function fetchAll() {
  const [s, soc, svc, w, r] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
    supabase.from('social_links').select('*').order('sort_order').order('created_at'),
    supabase
      .from('services')
      .select('*, service_images(id,path,alt_ar,alt_en,sort_order,created_at)')
      .order('sort_order')
      .order('created_at'),
    supabase.from('works').select('id,path,alt_ar,alt_en,sort_order,created_at').order('sort_order').order('created_at'),
    supabase.from('reviews').select('*').order('sort_order').order('created_at'),
  ])
  for (const x of [s, soc, svc, w, r]) if (x.error) throw x.error
  const services = (svc.data || []).map(({ service_images, ...row }) => ({
    ...row,
    images: (service_images || []).slice().sort(byOrder),
  }))
  const works = w.data || [],
    reviews = r.data || []
  // مشروع جديد لسه متملاش (قبل الاستيراد): نعرض المحتوى الاحتياطي
  const fresh = !services.length && !works.length && !reviews.length
  return {
    settings: s.data || FALLBACK.settings,
    socials: soc.data || [],
    services: fresh ? FALLBACK.services : services,
    works: fresh ? FALLBACK.works : works,
    reviews: fresh ? FALLBACK.reviews : reviews,
  }
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(() => (supabase ? readCache() : FALLBACK))
  const [failed, setFailed] = useState(!supabase)

  useEffect(() => {
    if (!supabase) return
    let alive = true
    fetchAll()
      .then((d) => {
        if (!alive) return
        setData(d)
        setFailed(false)
        writeCache(d)
      })
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(() => {
    const d = data || (failed ? FALLBACK : null)
    const settings = d?.settings || FALLBACK.settings
    return {
      loading: !d,
      settings,
      socials: d?.socials?.length || !failed ? d?.socials || [] : FALLBACK.socials,
      services: d?.services || [],
      works: d?.works || [],
      reviews: d?.reviews || [],
      // مصدر واحد لبيانات التواصل في كل الموقع
      contact: {
        callShow: settings.call_number,
        callHref: telHref(settings.call_number),
        waShow: settings.wa_number,
        wa: (text) => waHref(settings.wa_number, text),
        email: settings.email,
      },
    }
  }, [data, failed])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
