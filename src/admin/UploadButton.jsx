import { useRef } from 'react'
import { FiUpload } from 'react-icons/fi'
import { btnPrimary, Spinner } from './ui.jsx'

export default function UploadButton({ onFiles, busy, progress, label = 'رفع صور' }) {
  const ref = useRef(null)
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        hidden
        onChange={(e) => {
          const f = Array.from(e.target.files || [])
          e.target.value = ''
          if (f.length) onFiles(f)
        }}
      />
      <button className={btnPrimary} disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? <Spinner /> : <FiUpload />}
        {busy && progress ? `جاري الرفع ${progress[0]}/${progress[1]}` : label}
      </button>
    </>
  )
}
