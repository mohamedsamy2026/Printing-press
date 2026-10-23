import { FiLoader } from 'react-icons/fi'

export const card = 'rounded-card border border-line bg-surface p-5'
export const input =
  'w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand'
export const labelCls = 'mb-1.5 block text-sm font-bold'
const b =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50'
export const btnPrimary = `${b} bg-brand text-onp hover:bg-brand-h`
export const btnGhost = `${b} border border-line bg-bg hover:border-brand hover:text-brand`
export const btnDanger = `${b} bg-red-600 text-white hover:bg-red-700`
export const iconBtn =
  'grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg text-lg transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40'
export const iconBtnDanger =
  'grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-bg text-lg text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'

export const Spinner = ({ className = '' }) => <FiLoader className={`animate-spin ${className}`} aria-hidden="true" />

export const PageHead = ({ title, sub, children }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
      {sub && <p className="mt-1 text-muted">{sub}</p>}
      <i className="mt-3 block h-1 w-16 rounded bg-brand" />
    </div>
    {children && <div className="flex flex-wrap gap-3">{children}</div>}
  </div>
)

export const Field = ({ label, hint, required, children }) => (
  <label className="block">
    <span className={labelCls}>
      {label} {required && <b className="text-brand-t">*</b>}
    </span>
    {children}
    {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
  </label>
)

export const Loading = () => (
  <div className="grid min-h-[40vh] place-items-center text-3xl text-brand">
    <Spinner />
  </div>
)

export const ErrorBox = ({ message, onRetry }) => (
  <div className={`${card} text-center`}>
    <p className="mb-3 font-bold text-red-600">{message || 'حصل خطأ غير متوقع'}</p>
    {onRetry && (
      <button className={btnGhost} onClick={onRetry}>
        إعادة المحاولة
      </button>
    )}
  </div>
)

export const Modal = ({ title, onClose, children, wide }) => (
  <div
    className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/70 p-4"
    role="dialog"
    aria-modal="true"
    aria-label={title}
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className={`w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} rounded-card border border-line bg-surface p-6 shadow-card`}>
      <h2 className="mb-5 text-xl font-extrabold">{title}</h2>
      {children}
    </div>
  </div>
)
