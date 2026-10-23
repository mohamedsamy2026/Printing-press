import { supabase, SUPABASE_URL, BUCKET } from './supabase.js'

// مسار محلي (يبدأ بـ /) يرجع زي ما هو، ومسار Storage يتحول لرابط عام
export const mediaUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('/') || path.startsWith('http')) return path
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}

export const MAX_INPUT_MB = 15
export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIDE = 1200
const QUALITY = 0.8
const MAX_PIXELS = 80_000_000

export function validateImage(file) {
  if (!file || !ALLOWED_TYPES.includes(file.type)) return 'نوع الملف غير مدعوم (jpg / png / webp فقط)'
  if (file.size > MAX_INPUT_MB * 1024 * 1024) return `حجم الصورة أكبر من ${MAX_INPUT_MB}MB`
  return ''
}

async function decode(file) {
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      /* نكمل بالطريقة التانية */
    }
  }
  const url = URL.createObjectURL(file)
  try {
    return await new Promise((res, rej) => {
      const img = new Image()
      img.onload = () => res(img)
      img.onerror = () => rej(new Error('تعذر قراءة الصورة'))
      img.src = url
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

const toBlob = (canvas, type, q) => new Promise((res) => canvas.toBlob(res, type, q))

// ضغط الصورة: أقصى بُعد 1200px، جودة 80، WebP (أو JPEG لو المتصفح مش بيدعم WebP)
export async function compressImage(file) {
  const err = validateImage(file)
  if (err) throw new Error(err)
  const src = await decode(file)
  const w0 = src.width, h0 = src.height
  if (!w0 || !h0 || w0 * h0 > MAX_PIXELS) throw new Error('أبعاد الصورة غير مناسبة')
  const scale = Math.min(1, MAX_SIDE / Math.max(w0, h0))
  const w = Math.max(1, Math.round(w0 * scale)), h = Math.max(1, Math.round(h0 * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(src, 0, 0, w, h)
  if (src.close) src.close()
  let blob = await toBlob(canvas, 'image/webp', QUALITY)
  if (!blob || blob.type !== 'image/webp') {
    // Safari القديم: بيرجع PNG بدل WebP → نستخدم JPEG بخلفية بيضاء
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)
    blob = await toBlob(canvas, 'image/jpeg', QUALITY)
  }
  if (!blob) throw new Error('فشل ضغط الصورة')
  return blob
}

const extOf = (blob) => (blob.type === 'image/webp' ? 'webp' : 'jpg')

// يضغط ويرفع، ويرجع مسار الملف داخل الـ bucket
export async function uploadImage(file, folder) {
  const blob = await compressImage(file)
  const path = `${folder}/${crypto.randomUUID()}.${extOf(blob)}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: blob.type,
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw new Error('فشل رفع الصورة: ' + error.message)
  return path
}

// حذف نهائي للملفات من Storage (أي خطأ يوقف العملية)
export async function removeFiles(paths) {
  const list = (paths || []).filter((p) => p && !p.startsWith('/'))
  if (!list.length) return
  const { error } = await supabase.storage.from(BUCKET).remove(list)
  if (error) throw new Error('فشل حذف الملفات: ' + error.message)
}
