import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLayers, FiImage, FiMessageSquare, FiPhone, FiDownload } from 'react-icons/fi'
import { supabase } from '../../lib/supabase.js'
import { card, btnPrimary, PageHead, Loading, ErrorBox } from '../ui.jsx'

const count = async (table) => {
  const { count: n, error } = await supabase.from(table).select('id', { count: 'exact', head: true })
  if (error) throw error
  return n || 0
}

export default function Home() {
  const [c, setC] = useState(null)
  const [err, setErr] = useState('')
  const load = () => {
    setErr('')
    Promise.all([count('services'), count('works'), count('reviews'), count('social_links')])
      .then(([services, works, reviews, socials]) => setC({ services, works, reviews, socials }))
      .catch((e) => setErr(e.message))
  }
  useEffect(load, [])
  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!c) return <Loading />
  const tiles = [
    ['/admin/services', 'الخدمات', `${c.services} قسم`, FiLayers, 'إضافة وتعديل وحذف الأقسام وصورها'],
    ['/admin/works', 'معرض الأعمال', `${c.works} صورة`, FiImage, 'إضافة وحذف وترتيب صور المعرض'],
    ['/admin/reviews', 'آراء العملاء', `${c.reviews} رأي`, FiMessageSquare, 'إضافة وتعديل وحذف الآراء'],
    ['/admin/settings', 'التواصل والفوتر', `${c.socials} رابط سوشيال`, FiPhone, 'الأرقام والإيميل وأوقات الدوام والسوشيال'],
  ]
  const empty = !c.services && !c.works && !c.reviews
  return (
    <>
      <PageHead title="أهلًا بك 👋" sub="اختر القسم اللي عايز تعدّله" />
      {empty && (
        <div className={`${card} mb-6 flex flex-wrap items-center justify-between gap-4 border-brand`}>
          <div>
            <h2 className="text-lg font-extrabold">استيراد محتوى الموقع الحالي</h2>
            <p className="text-sm text-muted">الجداول فاضية. اضغط مرة واحدة لنقل الخدمات والصور والآراء الحالية لقاعدة البيانات.</p>
          </div>
          <Link to="/admin/import" className={btnPrimary}>
            <FiDownload /> ابدأ الاستيراد
          </Link>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {tiles.map(([to, title, n, Icon, d]) => (
          <Link key={to} to={to} className={`${card} group flex items-center gap-4 transition hover:-translate-y-1 hover:border-brand`}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-2xl text-onp">
              <Icon />
            </span>
            <span className="min-w-0">
              <b className="block text-lg">{title}</b>
              <span className="block text-sm text-brand-t">{n}</span>
              <span className="block text-sm text-muted">{d}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
