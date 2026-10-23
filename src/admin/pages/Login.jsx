import { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'
import { card, input, btnPrimary, btnGhost, Field, Spinner, Loading } from '../ui.jsx'

export default function Login() {
  const { loading, session, isAdmin, signIn, signOut, configured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const fails = useRef({ n: 0, until: 0 })

  if (loading) return <Loading />
  if (session && isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    const f = fails.current
    if (Date.now() < f.until) {
      setError('محاولات كتير. استنى نصف دقيقة وجرّب تاني.')
      return
    }
    setBusy(true)
    setError('')
    const { error: err } = await signIn(email, password)
    setBusy(false)
    if (err) {
      f.n += 1
      if (f.n >= 5) {
        f.n = 0
        f.until = Date.now() + 30000
      }
      setError('الإيميل أو كلمة المرور غير صحيحة.')
    }
  }

  return (
    <div className="grid min-h-svh place-items-center px-4 py-10">
      <div className={`${card} w-full max-w-md p-7`}>
        <img className="mx-auto mb-5 h-14 w-auto" src="/images/logo/logo-orange.png" alt="مربع الفكرة" />
        <h1 className="mb-1 text-center text-2xl font-extrabold">لوحة التحكم</h1>
        <i className="mx-auto mb-6 block h-1 w-14 rounded bg-brand" />
        {!configured ? (
          <p className="text-center font-bold text-red-600">
            إعدادات Supabase ناقصة. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env
          </p>
        ) : session && !isAdmin ? (
          <div className="text-center">
            <p className="mb-4 font-bold text-red-600">هذا الحساب ليس لديه صلاحية الدخول.</p>
            <button className={btnGhost} onClick={() => signOut()}>
              تسجيل الخروج
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <Field label="البريد الإلكتروني">
              <input className={input} type="email" dir="ltr" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="كلمة المرور">
              <input className={input} type="password" dir="ltr" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            {error && (
              <p className="text-sm font-bold text-red-600" role="alert">
                {error}
              </p>
            )}
            <button className={`${btnPrimary} w-full`} disabled={busy}>
              {busy ? <Spinner /> : 'دخول'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
