import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase.js'
import { removeFiles } from '../../lib/media.js'
import { useToast, useConfirm } from '../feedback.jsx'
import { move, nextOrder, saveOrder, withOrder, errMsg } from '../db.js'
import { uploadMany } from '../upload.js'
import ImageGrid from '../ImageGrid.jsx'
import UploadButton from '../UploadButton.jsx'
import { card, PageHead, Loading, ErrorBox } from '../ui.jsx'

export default function Works() {
  const toast = useToast(), confirm = useConfirm()
  const [rows, setRows] = useState(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(null)

  const load = useCallback(async () => {
    setErr('')
    const { data, error } = await supabase.from('works').select('id,path,sort_order,created_at').order('sort_order').order('created_at')
    if (error) setErr(errMsg(error))
    else setRows(data)
  }, [])
  useEffect(() => {
    load()
  }, [load])

  const onFiles = async (files) => {
    setBusy(true)
    let order = nextOrder(rows)
    const { added, failed } = await uploadMany(
      files,
      'works',
      async (path) => {
        const { data, error } = await supabase.from('works').insert({ path, sort_order: order++ }).select('id,path,sort_order,created_at').single()
        if (error) throw error
        return data
      },
      (a, b) => setProgress([a, b]),
    )
    setProgress(null)
    setBusy(false)
    if (added.length) setRows((r) => [...r, ...added])
    if (added.length) toast.ok(`تم رفع ${added.length} صورة`)
    if (failed.length) toast.error(failed.join(' | '))
  }

  const onMove = async (from, to) => {
    const next = move(rows, from, to)
    setBusy(true)
    try {
      await saveOrder('works', next)
      setRows(withOrder(next))
    } catch (e) {
      toast.error(errMsg(e))
      load()
    }
    setBusy(false)
  }

  const onDelete = async (i) => {
    const w = rows[i]
    const ok = await confirm({ message: 'سيتم حذف الصورة نهائيًا من المعرض ومن مساحة التخزين.', name: `صورة رقم ${i + 1}` })
    if (!ok) return
    setBusy(true)
    try {
      await removeFiles([w.path])
      const { error } = await supabase.from('works').delete().eq('id', w.id)
      if (error) throw error
      setRows((r) => r.filter((x) => x.id !== w.id))
      toast.ok('تم الحذف نهائيًا')
    } catch (e) {
      toast.error(errMsg(e))
    }
    setBusy(false)
  }

  if (err) return <ErrorBox message={err} onRetry={load} />
  if (!rows) return <Loading />
  return (
    <>
      <PageHead title="معرض الأعمال" sub={`${rows.length} صورة. الصور بتتضغط تلقائيًا قبل الرفع.`}>
        <UploadButton onFiles={onFiles} busy={busy} progress={progress} />
      </PageHead>
      {rows.length === 0 ? (
        <div className={`${card} text-center text-muted`}>مفيش صور في المعرض. اضغط «رفع صور» لإضافة أول صورة.</div>
      ) : (
        <ImageGrid images={rows} busy={busy} onMove={onMove} onDelete={onDelete} />
      )}
    </>
  )
}
