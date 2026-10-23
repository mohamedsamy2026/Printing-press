import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { supabase } from '../../lib/supabase.js'
import { mediaUrl, removeFiles } from '../../lib/media.js'
import { lines } from '../../lib/text.js'
import { useToast, useConfirm } from '../feedback.jsx'
import { move, nextOrder, saveOrder, withOrder, errMsg } from '../db.js'
import { card, input, btnPrimary, btnGhost, iconBtn, iconBtnDanger, Field, Modal, PageHead, Loading, ErrorBox, Spinner } from '../ui.jsx'

const newSlug = () => 's-' + Math.random().toString(36).slice(2, 8)

export const ServiceFields = ({ f, set }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="اسم القسم (عربي)" required>
        <input className={input} maxLength={80} value={f.title_ar} onChange={set('title_ar')} />
      </Field>
      <Field label="اسم القسم (إنجليزي)" hint="اختياري">
        <input className={input} dir="ltr" maxLength={80} value={f.title_en} onChange={set('title_en')} />
      </Field>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="بنود القسم (عربي)" hint="بند في كل سطر. بتظهر تحت صورة القسم">
        <textarea className={`${input} min-h-28`} maxLength={1000} value={f.items_ar} onChange={set('items_ar')} />
      </Field>
      <Field label="بنود القسم (إنجليزي)" hint="اختياري">
        <textarea className={`${input} min-h-28`} dir="ltr" maxLength={1000} value={f.items_en} onChange={set('items_en')} />
      </Field>
    </div>
  </>
)

export default function Services() {
  const toast = useToast(), confirm = useConfirm(), nav = useNavigate()
  const [rows, setRows] = useState(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState(null)
  const [formErr, setFormErr] = useState('')

  const load = useCallback(async () => {
    setErr('')
    const { data, error } = await supabase
      .from('services')
      .select('*, service_images(id,path,sort_order,created_at)')
      .order('sort_order')
      .order('created_at')
    if (error) return setErr(errMsg(error))
    setRows(
      data.map(({ service_images, ...r }) => ({
        ...r,
        images: (service_images || []).slice().sort((a, b) => a.sort_order - b.sort_order || String(a.created_at).localeCompare(String(b.created_at))),
      })),
    )
  }, [])
  useEffect(() => {
    load()
  }, [load])

  const create = async (e) => {
    e.preventDefault()
    const v = { ...form, title_ar: form.title_ar.trim(), title_en: form.title_en.trim() }
    if (!v.title_ar) return setFormErr('اسم القسم بالعربي مطلوب')
    setBusy(true)
    setFormErr('')
    const { data, error } = await supabase
      .from('services')
      .insert({ ...v, slug: newSlug(), sort_order: nextOrder(rows) })
      .select('id')
      .single()
    setBusy(false)
    if (error) return setFormErr(errMsg(error))
    toast.ok('تم إنشاء القسم. أضف صوره الآن.')
    nav(`/admin/services/${data.id}`)
  }

  const onMove = async (from, to) => {
    const next = move(rows, from, to)
    setBusy(true)
    try {
      await saveOrder('services', next)
      setRows(withOrder(next))
    } catch (e) {
      toast.error(errMsg(e))
      load()
    }
    setBusy(false)
  }

  const onDelete = async (s) => {
    const ok = await confirm({
      message: `سيتم حذف القسم و${s.images.length} صورة تابعة له نهائيًا من الموقع ومن مساحة التخزين.`,
      name: s.title_ar,
    })
    if (!ok) return
    setBusy(true)
    try {
      // نجيب أحدث قائمة صور من القاعدة قبل الحذف
      const { data, error: e1 } = await supabase.from('service_images').select('path').eq('service_id', s.id)
      if (e1) throw e1
      await removeFiles((data || []).map((x) => x.path))
      const { error } = await supabase.from('services').delete().eq('id', s.id)
      if (error) throw error
      setRows((l) => l.filter((x) => x.id !== s.id))
      toast.ok('تم حذف القسم نهائيًا')
    } catch (e) {
      toast.error(errMsg(e))
    }
    setBusy(false)
  }

  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!rows) return <Loading />
  return (
    <>
      <PageHead title="الخدمات" sub={`${rows.length} قسم`}>
        <button className={btnPrimary} onClick={() => { setFormErr(''); setForm({ title_ar: '', title_en: '', items_ar: '', items_en: '' }) }}>
          <FiPlus /> إضافة قسم
        </button>
      </PageHead>
      {rows.length === 0 && <div className={`${card} text-center text-muted`}>مفيش أقسام. اضغط «إضافة قسم».</div>}
      <div className="space-y-3">
        {rows.map((s, i) => (
          <div key={s.id} className={`${card} flex flex-wrap items-center gap-4 !p-4`}>
            <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-bg">
              {s.images[0] && <img className="h-full w-full object-cover" src={mediaUrl(s.images[0].path)} alt="" loading="lazy" />}
            </div>
            <div className="min-w-0 flex-1">
              <b className="block text-lg">{s.title_ar}</b>
              <span className="block truncate text-sm text-muted">{lines(s.items_ar).join(' – ') || 'بدون بنود'}</span>
              <span className="text-sm text-brand-t">{s.images.length} صورة</span>
            </div>
            <div className="flex gap-1.5">
              <button className={iconBtn} disabled={busy || i === 0} onClick={() => onMove(i, i - 1)} aria-label="تقديم"><FiArrowUp /></button>
              <button className={iconBtn} disabled={busy || i === rows.length - 1} onClick={() => onMove(i, i + 1)} aria-label="تأخير"><FiArrowDown /></button>
              <Link to={`/admin/services/${s.id}`} className={iconBtn} aria-label="تعديل وإدارة الصور" title="تعديل وإدارة الصور"><FiEdit2 /></Link>
              <button className={iconBtnDanger} disabled={busy} onClick={() => onDelete(s)} aria-label="حذف نهائي"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
      {form && (
        <Modal title="إضافة قسم جديد" onClose={() => setForm(null)} wide>
          <form onSubmit={create} className="space-y-4">
            <ServiceFields f={form} set={(k) => (e) => setForm((x) => ({ ...x, [k]: e.target.value }))} />
            {formErr && <p className="text-sm font-bold text-red-600" role="alert">{formErr}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" className={btnGhost} onClick={() => setForm(null)}>إلغاء</button>
              <button className={btnPrimary} disabled={busy}>{busy ? <Spinner /> : 'إنشاء وإضافة الصور'}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
