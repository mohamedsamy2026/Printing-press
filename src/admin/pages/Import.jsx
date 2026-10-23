import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import { supabase } from '../../lib/supabase.js'
import { uploadImage, removeFiles } from '../../lib/media.js'
import { FALLBACK } from '../../fallback.js'
import { errMsg } from '../db.js'
import { card, btnPrimary, PageHead, Loading, Spinner } from '../ui.jsx'

const total = FALLBACK.services.reduce((n, s) => n + s.images.length, 0) + FALLBACK.works.length + FALLBACK.reviews.length

async function uploadLocal(path, folder) {
  const res = await fetch(path)
  if (!res.ok) throw new Error('تعذر قراءة الصورة المحلية: ' + path)
  const blob = await res.blob()
  const file = new File([blob], path.split('/').pop(), { type: blob.type || 'image/jpeg' })
  return uploadImage(file, folder)
}

async function runImport(onStep) {
  const made = { paths: [], services: [], works: [], reviews: [] }
  let done = 0
  const step = () => onStep(++done)
  try {
    for (const [si, s] of FALLBACK.services.entries()) {
      const { data: svc, error } = await supabase
        .from('services')
        .insert({ slug: s.slug, title_ar: s.title_ar, title_en: s.title_en, items_ar: s.items_ar, items_en: s.items_en, sort_order: si })
        .select('id')
        .single()
      if (error) throw error
      made.services.push(svc.id)
      for (const [i, im] of s.images.entries()) {
        const path = await uploadLocal(im.path, 'services')
        made.paths.push(path)
        const { error: e2 } = await supabase.from('service_images').insert({ service_id: svc.id, path, alt_ar: im.alt_ar, alt_en: im.alt_en, sort_order: i })
        if (e2) throw e2
        step()
      }
    }
    for (const [i, w] of FALLBACK.works.entries()) {
      const path = await uploadLocal(w.path, 'works')
      made.paths.push(path)
      const { data, error } = await supabase.from('works').insert({ path, alt_ar: w.alt_ar, alt_en: w.alt_en, sort_order: i }).select('id').single()
      if (error) throw error
      made.works.push(data.id)
      step()
    }
    const rows = FALLBACK.reviews.map(({ id, ...r }) => r)
    const { data, error } = await supabase.from('reviews').insert(rows).select('id')
    if (error) throw error
    made.reviews = data.map((x) => x.id)
    onStep(total)
  } catch (e) {
    // تراجع: نحذف كل اللي اتعمل في المحاولة دي
    await removeFiles(made.paths).catch(() => {})
    if (made.services.length) await supabase.from('services').delete().in('id', made.services)
    if (made.works.length) await supabase.from('works').delete().in('id', made.works)
    if (made.reviews.length) await supabase.from('reviews').delete().in('id', made.reviews)
    throw e
  }
}

export default function Import() {
  const [empty, setEmpty] = useState(null)
  const [busy, setBusy] = useState(false)
  const [n, setN] = useState(0)
  const [state, setState] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    Promise.all(['services', 'works', 'reviews'].map((t) => supabase.from(t).select('id', { count: 'exact', head: true })))
      .then((r) => setEmpty(r.every((x) => !x.error && !x.count)))
      .catch(() => setEmpty(false))
  }, [])

  const start = async () => {
    setBusy(true)
    setErr('')
    try {
      await runImport(setN)
      try { localStorage.removeItem('site-cache-v1') } catch {}
      setState('done')
    } catch (e) {
      setErr(errMsg(e) + ' — تم التراجع عن كل ما اتعمل. جرّب تاني.')
    }
    setBusy(false)
  }

  if (empty === null) return <Loading />
  return (
    <>
      <PageHead title="استيراد محتوى الموقع الحالي" sub="خطوة تتعمل مرة واحدة بس" />
      <div className={`${card} space-y-4`}>
        {state === 'done' ? (
          <>
            <p className="font-bold text-emerald-600">تم الاستيراد بنجاح ✅ ({total} عنصر).</p>
            <Link to="/admin" className={btnPrimary}>الرجوع للرئيسية</Link>
          </>
        ) : !empty ? (
          <>
            <p className="text-muted">الجداول فيها بيانات بالفعل، فالاستيراد متقفل عشان ما يتكررش المحتوى.</p>
            <Link to="/admin" className={btnPrimary}>الرجوع للرئيسية</Link>
          </>
        ) : (
          <>
            <p>هيتم نقل الخدمات الأربعة وصورها، ومعرض الأعمال، وآراء العملاء الحالية إلى Supabase. الصور بتتضغط وبتترفع تلقائيًا.</p>
            <p className="text-sm text-muted">ممكن ياخد دقيقة أو اتنين. متقفلش الصفحة. لو حصل خطأ بيتم التراجع تلقائيًا.</p>
            {err && <p className="text-sm font-bold text-red-600" role="alert">{err}</p>}
            <button className={btnPrimary} disabled={busy} onClick={start}>
              {busy ? <><Spinner /> جاري الاستيراد {n}/{total}</> : <><FiDownload /> ابدأ الاستيراد</>}
            </button>
          </>
        )}
      </div>
    </>
  )
}
