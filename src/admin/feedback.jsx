import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FiCheck, FiAlertTriangle } from 'react-icons/fi'
import { Modal, btnGhost, btnDanger } from './ui.jsx'

const ToastCtx = createContext(null)
const ConfirmCtx = createContext(null)
export const useToast = () => useContext(ToastCtx)
export const useConfirm = () => useContext(ConfirmCtx)

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const push = useCallback((kind, text) => {
    const id = Math.random().toString(36).slice(2)
    setItems((l) => [...l, { id, kind, text }])
    setTimeout(() => setItems((l) => l.filter((x) => x.id !== id)), kind === 'error' ? 6000 : 3500)
  }, [])
  const api = useRef({ ok: (t) => push('ok', t), error: (t) => push('error', t) }).current
  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[120] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {items.map((x) => (
          <div
            key={x.id}
            className={`pointer-events-auto flex max-w-md items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-card ${x.kind === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}
          >
            {x.kind === 'error' ? <FiAlertTriangle /> : <FiCheck />}
            {x.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

// نافذة تأكيد الحذف النهائي (إجبارية قبل أي حذف)
export function ConfirmProvider({ children }) {
  const [req, setReq] = useState(null)
  const cancelRef = useRef(null)
  const confirm = useCallback(
    (opts) =>
      new Promise((resolve) => {
        setReq({ ...opts, resolve })
      }),
    [],
  )
  const close = (v) => {
    req?.resolve(v)
    setReq(null)
  }
  useEffect(() => {
    if (!req) return
    cancelRef.current?.focus()
    const k = (e) => e.key === 'Escape' && close(false)
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  })
  return (
    <ConfirmCtx.Provider value={confirm}>
      {children}
      {req && (
        <Modal title={req.title || 'تأكيد الحذف النهائي'} onClose={() => close(false)}>
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-600/40 bg-red-600/10 p-3.5 text-sm">
            <FiAlertTriangle className="mt-0.5 shrink-0 text-xl text-red-600" />
            <p>
              {req.message || 'سيتم الحذف نهائيًا ولا يمكن التراجع عنه.'}
              {req.name && (
                <>
                  <br />
                  <b className="mt-1 inline-block break-words">{req.name}</b>
                </>
              )}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button ref={cancelRef} className={btnGhost} onClick={() => close(false)}>
              إلغاء
            </button>
            <button className={btnDanger} onClick={() => close(true)}>
              {req.confirmLabel || 'حذف نهائي'}
            </button>
          </div>
        </Modal>
      )}
    </ConfirmCtx.Provider>
  )
}
