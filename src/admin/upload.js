import { uploadImage, removeFiles } from '../lib/media.js'

// يرفع الصور واحدة واحدة (ضغط ثم رفع ثم إدراج الصف). لو إدراج الصف فشل يتحذف الملف.
export async function uploadMany(files, folder, insertFn, onProgress) {
  const added = []
  const failed = []
  const list = Array.from(files)
  for (let i = 0; i < list.length; i++) {
    onProgress?.(i + 1, list.length)
    try {
      const path = await uploadImage(list[i], folder)
      try {
        added.push(await insertFn(path, i))
      } catch (e) {
        await removeFiles([path]).catch(() => {})
        throw e
      }
    } catch (e) {
      failed.push(`${list[i].name}: ${e.message}`)
    }
  }
  return { added, failed }
}
