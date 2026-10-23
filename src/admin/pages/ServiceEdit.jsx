import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowRight, FiTrash2 } from 'react-icons/fi'
import { supabase } from '../../lib/supabase.js'
import { removeFiles } from '../../lib/media.js'
import { useToast, useConfirm } from '../feedback.jsx'
import { move, nextOrder, saveOrder, withOrder, errMsg } from '../db.js'
import { uploadMany } from '../upload.js'
import ImageGrid from '../ImageGrid.jsx'
import UploadButton from '../UploadButton.jsx'
import { ServiceFields } from './Services.jsx'
import { card, btnPrimary, btnDanger, PageHead, Loading, ErrorBox, Spinner } from '../ui.jsx'

export default function ServiceEdit() {
  const { id } = useParams()
  const toast = useToast(), confirm = useConfirm(), nav = useNavigate()
  const [svc, setSvc] = useState(null)
  const [imgs, setImgs] = useState(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [progress, setProgress] = useState(null)

  const load = useCallback(async () => {
    setErr('')
    const [a, b] = await Promise.all([
      supabase.from('services').select('*').eq('id', id).maybeSingle(),
      supabase.from('service_images').select('id,path,sort_order,created_at').eq('service_id', id).order('sort_order').order('created_at'),
    ])
    if (a.error || b.error) return setErr(errMsg(a.error || b.error))
    if (!a.data) return setErr('القسم غير موجود')
    setSvc(a.data)
    setImgs(b.data)
  }, [id])
  useEffect(() => {
    load()
  }, [load])

  const save = async (e) => {
    e.preventDefault()
    const v = { title_ar: svc.title_ar.trim(), title_en: svc.title_en.trim(), items_ar: svc.items_ar, items_en: svc.items_en }
    if (!v.title_ar) return toast.error('اسم القسم بالعربي مطلوب')
    setSaving(true)
    const { error } = await supabase.from('services').update(v).eq('id', id)
    setSaving(false)
    if (error) return toast.error(errMsg(error))
    toast.ok('تم حفظ بيانات القسم')
  }

  const onFiles = async (files) => {
    setBusy(true)
    let order = nextOrder(imgs)
    const { added, failed } = await uploadMany(
      files,
      'services',
      async (path) => {
        const { data, error } = await supabase
          .from('service_images')
          .insert({ service_id: id, path, sort_order: order++ })
          .select('id,path,sort_order,created_at')
          .single()
        if (error) throw error
        return data
      },
      (a, b) => setProgress([a, b]),
    )
    setProgress(null)
    setBusy(false)
    if (added.length) {
      setImgs((l) => [...l, ...added])
      toast.ok(`تم رفع ${added.length} صورة`)
    }
    if (failed.length) toast.error(failed.join(' | '))
  }

  const onMove = async (from, to) => {
    const next = move(imgs, from, to)
    setBusy(true)
    try {
      await saveOrder('service_images', next)
      setImgs(withOrder(next))
    } catch (e) {
      toast.error(errMsg(e))
      load()
    }
    setBusy(false)
  }

  const onDeleteImg = async (i) => {
    const im = imgs[i]
    const ok = await confirm({ message: 'سيتم حذف الصورة نهائيًا من القسم ومن مساحة التخزين.', name: `صورة رقم ${i + 1}` })
    if (!ok) return
    setBusy(true)
    try {
      await removeFiles([im.path])
      const { error } = await supabase.from('service_images').delete().eq('id', im.id)
      if (error) throw error
      setImgs((l) => l.filter((x) => x.id !== im.id))
      toast.ok('تم الحذف نهائيًا')
    } catch (e) {
      toast.error(errMsg(e))
    }
    setBusy(false)
  }

  const onDeleteService = async () => {
    const ok = await confirm({
      message: `سيتم حذف القسم و${imgs.length} صورة تابعة له نهائيًا من الموقع ومن مساحة التخزين.`,
      name: svc.title_ar,
    })
    if (!ok) return
    setBusy(true)
    try {
      await removeFiles(imgs.map((x) => x.path))
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
      toast.ok('تم حذف القسم نهائيًا')
      nav('/admin/services', { replace: true })
    } catch (e) {
      toast.error(errMsg(e))
      setBusy(false)
    }
  }

  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!svc || !imgs) return <Loading />
  return (
    <>
      <Link to="/admin/services" className="mb-4 inline-flex items-center gap-2 font-bold text-brand-t">
        <FiArrowRight /> العودة للخدمات
      </Link>
      <PageHead title={svc.title_ar || 'قسم'} sub="تعديل بيانات القسم وإدارة صوره">
        <button className={btnDanger} disabled={busy} onClick={onDeleteService}>
          <FiTrash2 /> حذف القسم
        </button>
      </PageHead>

      <form onSubmit={save} className={`${card} mb-8 space-y-4`}>
        <ServiceFields f={svc} set={(k) => (e) => setSvc((x) => ({ ...x, [k]: e.target.value }))} />
        <div className="flex justify-end">
          <button className={btnPrimary} disabled={saving}>{saving ? <Spinner /> : 'حفظ بيانات القسم'}</button>
        </div>
      </form>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">صور القسم ({imgs.length})</h2>
          <p className="text-sm text-muted">أول صورة هي غلاف القسم في الصفحة الرئيسية. الصور بتتضغط تلقائيًا قبل الرفع.</p>
        </div>
        <UploadButton onFiles={onFiles} busy={busy} progress={progress} />
      </div>
      {imgs.length === 0 ? (
        <div className={`${card} text-center text-muted`}>مفيش صور في القسم ده.</div>
      ) : (
        <ImageGrid images={imgs} busy={busy} coverFirst onMove={onMove} onDelete={onDeleteImg} />
      )}
    </>
  )
}
