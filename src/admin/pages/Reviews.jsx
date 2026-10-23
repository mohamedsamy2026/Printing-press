import { useCallback, useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { supabase } from '../../lib/supabase.js'
import { useToast, useConfirm } from '../feedback.jsx'
import { move, nextOrder, saveOrder, withOrder, errMsg } from '../db.js'
import { card, input, btnPrimary, btnGhost, iconBtn, iconBtnDanger, Field, Modal, PageHead, Loading, ErrorBox, Spinner } from '../ui.jsx'

const EMPTY = { name_ar: '', name_en: '', text_ar: '', text_en: '', rating: 5 }

function ReviewForm({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    const v = { ...f, name_ar: f.name_ar.trim(), text_ar: f.text_ar.trim(), name_en: f.name_en.trim(), text_en: f.text_en.trim() }
    if (!v.name_ar || !v.text_ar) return setErr('الاسم والرأي بالعربي مطلوبين')
    setBusy(true)
    setErr('')
    try {
      await onSave(v)
    } catch (e2) {
      setErr(errMsg(e2))
      setBusy(false)
    }
  }
  return (
    <Modal title={initial.id ? 'تعديل رأي' : 'إضافة رأي جديد'} onClose={onClose} wide>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="اسم العميل (عربي)" required>
            <input className={input} maxLength={80} value={f.name_ar} onChange={set('name_ar')} />
          </Field>
          <Field label="اسم العميل (إنجليزي)" hint="اختياري">
            <input className={input} dir="ltr" maxLength={80} value={f.name_en} onChange={set('name_en')} />
          </Field>
        </div>
        <Field label="الرأي (عربي)" required>
          <textarea className={`${input} min-h-24`} maxLength={600} value={f.text_ar} onChange={set('text_ar')} />
        </Field>
        <Field label="الرأي (إنجليزي)" hint="اختياري. لو فاضي بيظهر العربي في النسخة الإنجليزية">
          <textarea className={`${input} min-h-24`} dir="ltr" maxLength={600} value={f.text_en} onChange={set('text_en')} />
        </Field>
        <Field label="التقييم">
          <div className="flex gap-1.5" role="radiogroup" aria-label="التقييم">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={f.rating === n}
                aria-label={`${n}`}
                onClick={() => setF((x) => ({ ...x, rating: n }))}
                className={`text-2xl transition ${n <= f.rating ? 'text-[#f5a623]' : 'text-line'}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
        </Field>
        {err && <p className="text-sm font-bold text-red-600" role="alert">{err}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" className={btnGhost} onClick={onClose}>إلغاء</button>
          <button className={btnPrimary} disabled={busy}>{busy ? <Spinner /> : 'حفظ'}</button>
        </div>
      </form>
    </Modal>
  )
}

export default function Reviews() {
  const toast = useToast(), confirm = useConfirm()
  const [rows, setRows] = useState(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState(null)

  const load = useCallback(async () => {
    setErr('')
    const { data, error } = await supabase.from('reviews').select('*').order('sort_order').order('created_at')
    if (error) setErr(errMsg(error))
    else setRows(data)
  }, [])
  useEffect(() => {
    load()
  }, [load])

  const save = async (v) => {
    const { id, created_at, sort_order, ...fields } = v
    if (id) {
      const { data, error } = await supabase.from('reviews').update(fields).eq('id', id).select('*').single()
      if (error) throw error
      setRows((r) => r.map((x) => (x.id === id ? data : x)))
    } else {
      const { data, error } = await supabase.from('reviews').insert({ ...fields, sort_order: nextOrder(rows) }).select('*').single()
      if (error) throw error
      setRows((r) => [...r, data])
    }
    setForm(null)
    toast.ok('تم الحفظ')
  }

  const onMove = async (from, to) => {
    const next = move(rows, from, to)
    setBusy(true)
    try {
      await saveOrder('reviews', next)
      setRows(withOrder(next))
    } catch (e) {
      toast.error(errMsg(e))
      load()
    }
    setBusy(false)
  }

  const onDelete = async (r) => {
    const ok = await confirm({ message: 'سيتم حذف هذا الرأي نهائيًا.', name: r.name_ar })
    if (!ok) return
    setBusy(true)
    const { error } = await supabase.from('reviews').delete().eq('id', r.id)
    setBusy(false)
    if (error) return toast.error(errMsg(error))
    setRows((l) => l.filter((x) => x.id !== r.id))
    toast.ok('تم الحذف نهائيًا')
  }

  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!rows) return <Loading />
  return (
    <>
      <PageHead title="آراء العملاء" sub={`${rows.length} رأي`}>
        <button className={btnPrimary} onClick={() => setForm(EMPTY)}>
          <FiPlus /> إضافة رأي
        </button>
      </PageHead>
      {rows.length === 0 && <div className={`${card} text-center text-muted`}>مفيش آراء. اضغط «إضافة رأي».</div>}
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={r.id} className={`${card} flex flex-wrap items-center justify-between gap-4 !p-4`}>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <b>{r.name_ar}</b>
                <span className="flex text-sm text-[#f5a623]" aria-label={`${r.rating}/5`}>
                  {[...Array(r.rating)].map((_, j) => <FaStar key={j} />)}
                </span>
              </div>
              <p className="break-words text-sm text-muted">{r.text_ar}</p>
            </div>
            <div className="flex gap-1.5">
              <button className={iconBtn} disabled={busy || i === 0} onClick={() => onMove(i, i - 1)} aria-label="تقديم"><FiArrowUp /></button>
              <button className={iconBtn} disabled={busy || i === rows.length - 1} onClick={() => onMove(i, i + 1)} aria-label="تأخير"><FiArrowDown /></button>
              <button className={iconBtn} disabled={busy} onClick={() => setForm(r)} aria-label="تعديل"><FiEdit2 /></button>
              <button className={iconBtnDanger} disabled={busy} onClick={() => onDelete(r)} aria-label="حذف نهائي"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
      {form && <ReviewForm initial={form} onSave={save} onClose={() => setForm(null)} />}
    </>
  )
}
