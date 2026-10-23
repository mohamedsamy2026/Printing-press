import { FiArrowRight, FiArrowLeft, FiTrash2, FiStar } from 'react-icons/fi'
import { mediaUrl } from '../lib/media.js'
import { iconBtn, iconBtnDanger } from './ui.jsx'

// الأدمن RTL دائمًا: الأقدم (الأول) على اليمين
export default function ImageGrid({ images, onMove, onDelete, busy, coverFirst }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((im, i) => (
        <div key={im.id} className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="relative aspect-square bg-bg">
            <img className="h-full w-full object-cover" src={mediaUrl(im.path)} alt={`صورة ${i + 1}`} loading="lazy" />
            <span className="absolute start-2 top-2 rounded-lg bg-black/70 px-2 py-0.5 text-xs font-bold text-white">{i + 1}</span>
            {coverFirst && i === 0 && (
              <span className="absolute end-2 top-2 rounded-lg bg-brand px-2 py-0.5 text-xs font-bold text-onp">الغلاف</span>
            )}
          </div>
          <div className="flex justify-between gap-1.5 p-2">
            <div className="flex gap-1.5">
              <button className={iconBtn} disabled={busy || i === 0} onClick={() => onMove(i, i - 1)} title="تقديم" aria-label="تقديم">
                <FiArrowRight />
              </button>
              <button className={iconBtn} disabled={busy || i === images.length - 1} onClick={() => onMove(i, i + 1)} title="تأخير" aria-label="تأخير">
                <FiArrowLeft />
              </button>
              <button className={iconBtn} disabled={busy || i === 0} onClick={() => onMove(i, 0)} title="نقل للأول" aria-label="نقل للأول">
                <FiStar />
              </button>
            </div>
            <button className={iconBtnDanger} disabled={busy} onClick={() => onDelete(i)} title="حذف نهائي" aria-label="حذف نهائي">
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
