import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// لو المتغيرات مش موجودة، الموقع يشتغل بالبيانات الاحتياطية (fallback.js)
export const SUPABASE_URL = url ? url.replace(/\/+$/, '') : ''
export const supabase = url && key ? createClient(SUPABASE_URL, key) : null
export const BUCKET = 'media'
