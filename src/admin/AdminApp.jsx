import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth.jsx'
import { ToastProvider, ConfirmProvider } from './feedback.jsx'
import Layout from './Layout.jsx'
import { Loading } from './ui.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'
import Services from './pages/Services.jsx'
import ServiceEdit from './pages/ServiceEdit.jsx'
import Works from './pages/Works.jsx'
import Reviews from './pages/Reviews.jsx'
import Import from './pages/Import.jsx'

function RequireAdmin() {
  const { loading, session, isAdmin } = useAuth()
  if (loading) return <Loading />
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />
  return <Layout />
}

export default function AdminApp() {
  // الصفحة مخفية عن محركات البحث
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex, nofollow'
    document.head.appendChild(m)
    const old = document.title
    document.title = 'لوحة التحكم | مربع الفكرة'
    return () => {
      m.remove()
      document.title = old
    }
  }, [])
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <div dir="rtl" className="min-h-svh bg-bg font-ar text-ink">
            <Routes>
              <Route path="login" element={<Login />} />
              <Route element={<RequireAdmin />}>
                <Route index element={<Home />} />
                <Route path="settings" element={<Settings />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:id" element={<ServiceEdit />} />
                <Route path="works" element={<Works />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="import" element={<Import />} />
              </Route>
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
