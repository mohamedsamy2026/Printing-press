import { useCallback, useEffect, useState } from 'react'
import { FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiSave } from 'react-icons/fi'
import { supabase } from '../../lib/supabase.js'
import { isEmail, isHttpUrl } from '../../lib/text.js'
import { isValidPhone } from '../../lib/phone.js'
import { PLATFORMS, platformOf } from '../../lib/socials.js'
import { useToast, useConfirm } from '../feedback.jsx'
import { move, nextOrder, saveOrder, withOrder, errMsg } from '../db.js'
import { card, input, btnPrimary, iconBtn, iconBtnDanger, Field, PageHead, Loading, ErrorBox, Spinner } from '../ui.jsx'

const EMPTY = { call_number: '', wa_number: '', email: '', hours_ar: '', hours_en: '' }

function SocialRow({ row, index, total, busy, onMove, onDelete, onSaved }) {
  const toast = useToast()
  const [platform, setPlatform] = useState(row.platform)
  const [url, setUrl] = useState(row.url)
  const [saving, setSaving] = useState(false)
  const dirty = platform !== row.platform || url !== row.url
  const P = platformOf(platform)
  const save = async () => {
    const u = url.trim()
    if (!isHttpUrl(u)) return toast.error('الرابط لازم يبدأ بـ https://')
    setSaving(true)
    const { error } = await supabase.from('social_links').update({ platform, url: u }).eq('id', row.id)
    setSaving(false)
    if (error) return toast.error(errMsg(error))
    onSaved({ ...row, platform, url: u })
    toast.ok('تم الحفظ')
  }
  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-line bg-bg p-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-lg text-onp">{P && <P.Icon />}</span>
      <select className={`${input} !w-40`} value={platform} onChange={(e) => setPlatform(e.target.value)} aria-label="المنصة">
        {PLATFORMS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>
      <input className={`${input} min-w-0 flex-1`} dir="ltr" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" aria-label="الرابط" />
      {dirty && (
        <button className={btnPrimary} disabled={saving} onClick={save}>{saving ? <Spinner /> : <><FiSave /> حفظ</>}</button>
      )}
      <button className={iconBtn} disabled={busy || index === 0} onClick={() => onMove(index, index - 1)} aria-label="تقديم"><FiArrowUp /></button>
      <button className={iconBtn} disabled={busy || index === total - 1} onClick={() => onMove(index, index + 1)} aria-label="تأخير"><FiArrowDown /></button>
      <button className={iconBtnDanger} disabled={busy} onClick={() => onDelete(row)} aria-label="حذف نهائي"><FiTrash2 /></button>
    </div>
  )
}

export default function Settings() {
  const toast = useToast(), confirm = useConfirm()
  const [f, setF] = useState(null)
  const [socials, setSocials] = useState(null)
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)
  const [busy, setBusy] = useState(false)
  const [add, setAdd] = useState({ platform: 'instagram', url: '' })

  const load = useCallback(async () => {
    setErr('')
    const [a, b] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('social_links').select('*').order('sort_order').order('created_at'),
    ])
    if (a.error || b.error) return setErr(errMsg(a.error || b.error))
    setF({ ...EMPTY, ...(a.data || {}) })
    setSocials(b.data)
  }, [])
  useEffect(() => {
    load()
  }, [load])

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    const v = {
      call_number: f.call_number.trim(),
      wa_number: f.wa_number.trim(),
      email: f.email.trim(),
      hours_ar: f.hours_ar.trim(),
      hours_en: f.hours_en.trim(),
    }
    if (v.call_number && !isValidPhone(v.call_number)) return toast.error('رقم الاتصال غير صحيح')
    if (v.wa_number && !isValidPhone(v.wa_number)) return toast.error('رقم الواتساب غير صحيح')
    if (v.email && !isEmail(v.email)) return toast.error('الإيميل غير صحيح')
    setSaving(true)
    const { error } = await supabase.from('site_settings').upsert({ id: 1, ...v, updated_at: new Date().toISOString() })
    setSaving(false)
    if (error) return toast.error(errMsg(error))
    try { localStorage.removeItem('site-cache-v1') } catch {}
    toast.ok('تم الحفظ. التغيير ظاهر في كل الموقع.')
  }

  const addSocial = async () => {
    const u = add.url.trim()
    if (!isHttpUrl(u)) return toast.error('الرابط لازم يبدأ بـ https://')
    setBusy(true)
    const { data, error } = await supabase.from('social_links').insert({ platform: add.platform, url: u, sort_order: nextOrder(socials) }).select('*').single()
    setBusy(false)
    if (error) return toast.error(errMsg(error))
    setSocials((l) => [...l, data])
    setAdd((x) => ({ ...x, url: '' }))
    toast.ok('تمت الإضافة')
  }

  const onMove = async (from, to) => {
    const next = move(socials, from, to)
    setBusy(true)
    try {
      await saveOrder('social_links', next)
      setSocials(withOrder(next))
    } catch (e) {
      toast.error(errMsg(e))
      load()
    }
    setBusy(false)
  }

  const onDelete = async (r) => {
    const ok = await confirm({ message: 'سيتم حذف الرابط نهائيًا من الفوتر.', name: `${platformOf(r.platform)?.label || r.platform} — ${r.url}` })
    if (!ok) return
    setBusy(true)
    const { error } = await supabase.from('social_links').delete().eq('id', r.id)
    setBusy(false)
    if (error) return toast.error(errMsg(error))
    setSocials((l) => l.filter((x) => x.id !== r.id))
    toast.ok('تم الحذف نهائيًا')
  }

  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!f || !socials) return <Loading />
  return (
    <>
      <PageHead title="التواصل والفوتر" sub="أي تغيير هنا بيظهر تلقائيًا في كل أماكن الموقع" />
      <form onSubmit={save} className={`${card} mb-8 space-y-4`}>
        <h2 className="text-xl font-extrabold">بيانات التواصل</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="رقم الاتصال" hint="مثال: 0540330205 أو +966540330205">
            <input className={input} dir="ltr" inputMode="tel" maxLength={40} value={f.call_number} onChange={set('call_number')} />
          </Field>
          <Field label="رقم الواتساب" hint="مثال: +966 54 033 0205 (لازم يكون رقم واتساب شغال)">
            <input className={input} dir="ltr" inputMode="tel" maxLength={40} value={f.wa_number} onChange={set('wa_number')} />
          </Field>
        </div>
        <Field label="البريد الإلكتروني">
          <input className={input} dir="ltr" type="email" maxLength={120} value={f.email} onChange={set('email')} />
        </Field>
        <h2 className="pt-2 text-xl font-extrabold">أوقات الدوام</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="أوقات الدوام (عربي)" hint="سطر لكل فترة">
            <textarea className={`${input} min-h-24`} maxLength={300} value={f.hours_ar} onChange={set('hours_ar')} />
          </Field>
          <Field label="أوقات الدوام (إنجليزي)" hint="اختياري">
            <textarea className={`${input} min-h-24`} dir="ltr" maxLength={300} value={f.hours_en} onChange={set('hours_en')} />
          </Field>
        </div>
        <div className="flex justify-end">
          <button className={btnPrimary} disabled={saving}>{saving ? <Spinner /> : 'حفظ بيانات التواصل'}</button>
        </div>
      </form>

      <section className={`${card} space-y-3`}>
        <h2 className="text-xl font-extrabold">روابط السوشيال ميديا</h2>
        <p className="text-sm text-muted">اختر المنصة وحط الرابط. المنصة بدون رابط ما بتظهرش.</p>
        {socials.length === 0 && <p className="text-muted">مفيش روابط حاليًا.</p>}
        {socials.map((r, i) => (
          <SocialRow key={r.id} row={r} index={i} total={socials.length} busy={busy} onMove={onMove} onDelete={onDelete} onSaved={(n) => setSocials((l) => l.map((x) => (x.id === n.id ? n : x)))} />
        ))}
        <div className="flex flex-wrap items-center gap-2.5 border-t border-line pt-4">
          <select className={`${input} !w-40`} value={add.platform} onChange={(e) => setAdd((x) => ({ ...x, platform: e.target.value }))} aria-label="المنصة">
            {PLATFORMS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <input className={`${input} min-w-0 flex-1`} dir="ltr" placeholder="https://" value={add.url} onChange={(e) => setAdd((x) => ({ ...x, url: e.target.value }))} aria-label="الرابط" />
          <button className={btnPrimary} disabled={busy} onClick={addSocial}><FiPlus /> إضافة</button>
        </div>
      </section>
    </>
  )
}
