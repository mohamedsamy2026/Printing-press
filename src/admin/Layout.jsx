import { NavLink, Outlet, Link } from 'react-router-dom'
import { FiSun, FiMoon, FiLogOut, FiExternalLink } from 'react-icons/fi'
import { useApp } from '../i18n.jsx'
import { useAuth } from './auth.jsx'
import { C } from '../ui.js'

const LINKS = [
  ['/admin', 'الرئيسية', true],
  ['/admin/services', 'الخدمات'],
  ['/admin/works', 'معرض الأعمال'],
  ['/admin/reviews', 'آراء العملاء'],
  ['/admin/settings', 'التواصل والفوتر'],
]
const ic = 'grid h-10 w-10 place-items-center rounded-xl text-xl transition hover:bg-neutral-500/20'

export default function Layout() {
  const { theme, toggleTheme } = useApp()
  const { signOut } = useAuth()
  const dark = theme === 'dark'
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md">
        <div className={`${C} flex h-16 items-center justify-between gap-3`}>
          <Link to="/admin" aria-label="الرئيسية">
            <img className="h-11 w-auto" src={`/images/logo/logo-${dark ? 'white' : 'orange'}.png`} alt="مربع الفكرة" />
          </Link>
          <div className="flex items-center gap-1">
            <a className={ic} href="/" target="_blank" rel="noopener noreferrer" title="عرض الموقع" aria-label="عرض الموقع">
              <FiExternalLink />
            </a>
            <button className={ic} onClick={toggleTheme} aria-label={dark ? 'الوضع الفاتح' : 'الوضع الداكن'}>
              {dark ? <FiSun /> : <FiMoon />}
            </button>
            <button className={ic} onClick={() => signOut()} title="تسجيل الخروج" aria-label="تسجيل الخروج">
              <FiLogOut />
            </button>
          </div>
        </div>
        <nav className={`${C} flex gap-1 overflow-x-auto pb-2`} aria-label="أقسام لوحة التحكم">
          {LINKS.map(([to, label, end]) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition ${isActive ? 'bg-brand text-onp' : 'hover:bg-neutral-500/20'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={`${C} py-8`}>
        <Outlet />
      </main>
    </>
  )
}
