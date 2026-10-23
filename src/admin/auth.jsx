import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [state, setState] = useState({ loading: true, session: null, isAdmin: false })

  useEffect(() => {
    if (!supabase) {
      setState({ loading: false, session: null, isAdmin: false })
      return
    }
    let alive = true
    const check = async (session) => {
      if (!session) {
        alive && setState({ loading: false, session: null, isAdmin: false })
        return
      }
      const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      alive && setState({ loading: false, session, isAdmin: !error && !!data })
    }
    supabase.auth.getSession().then(({ data }) => check(data.session))
    // مهم: مفيش await لطلبات supabase جوه الـ callback مباشرة (بيعمل deadlock)
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setTimeout(() => check(session), 0))
    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = (email, password) => supabase.auth.signInWithPassword({ email: email.trim(), password })
  const signOut = () => supabase.auth.signOut()

  return <Ctx.Provider value={{ ...state, signIn, signOut, configured: !!supabase }}>{children}</Ctx.Provider>
}
