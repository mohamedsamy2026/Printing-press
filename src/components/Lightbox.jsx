import { useEffect } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useApp } from '../i18n.jsx'
export default function Lightbox({ items, index, setIndex, alts }) {
  const { t } = useApp(), open = index !== null, n = items.length
  const go = (d) => setIndex((index + d + n) % n)
  useEffect(() => {
    if (!open) return
    const k = (e) => { if (e.key === 'Escape') setIndex(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  })
  if (!open) return null
  return (
    <div className="lb" role="dialog" aria-modal="true" onClick={() => setIndex(null)}>
      <button className="lb-b lb-x" aria-label={t('close')} onClick={() => setIndex(null)}><FiX /></button>
      <button className="lb-b lb-l" aria-label={t('prev')} onClick={(e) => { e.stopPropagation(); go(-1) }}><FiChevronLeft /></button>
      <img src={items[index]} alt={alts[index]} onClick={(e) => e.stopPropagation()} />
      <button className="lb-b lb-r" aria-label={t('next')} onClick={(e) => { e.stopPropagation(); go(1) }}><FiChevronRight /></button>
      <span className="lb-c" dir="ltr">{index + 1} / {n}</span>
    </div>)
}
