import { supabase } from '../lib/supabase.js'

export const move = (arr, from, to) => {
  const a = arr.slice()
  const [x] = a.splice(from, 1)
  a.splice(to, 0, x)
  return a
}

export const nextOrder = (rows) => (rows.length ? Math.max(...rows.map((r) => r.sort_order || 0)) + 1 : 0)

// يحفظ الترتيب الجديد: sort_order = رقم الموضع، ويحدّث الصفوف اللي اتغيرت بس
export async function saveOrder(table, orderedRows) {
  const changed = orderedRows.map((r, i) => ({ id: r.id, i, old: r.sort_order })).filter((x) => x.old !== x.i)
  const res = await Promise.all(changed.map((x) => supabase.from(table).update({ sort_order: x.i }).eq('id', x.id)))
  const bad = res.find((r) => r.error)
  if (bad) throw bad.error
}

export const withOrder = (rows) => rows.map((r, i) => ({ ...r, sort_order: i }))
export const errMsg = (e) => (e && (e.message || e.error_description)) || 'حصل خطأ غير متوقع'
