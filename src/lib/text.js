// اختيار النص حسب اللغة: لو الإنجليزي فاضي يرجع العربي
export const pick = (ar, en, lang) =>
  lang === 'en' && en && String(en).trim() ? en : ar || ''

// نص بسطر لكل بند → مصفوفة
export const lines = (s) =>
  String(s || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean)

// يسمح بروابط http/https فقط (حماية من javascript: وغيره)
export const safeUrl = (u) => (/^https?:\/\//i.test(String(u || '').trim()) ? String(u).trim() : '#')
export const isHttpUrl = (u) => /^https?:\/\/\S+$/i.test(String(u || '').trim())
export const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim())
