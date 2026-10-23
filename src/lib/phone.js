// كود الدولة الافتراضي للأرقام اللي بتبدأ بـ 0 (رقم محلي). غيّره لو الدولة اتغيرت.
const DEFAULT_CC = '966'

// رابط الاتصال tel:
export function telHref(n) {
  let d = String(n || '').replace(/[^\d+]/g, '')
  if (!d) return '#'
  if (d.startsWith('00')) d = '+' + d.slice(2)
  else if (d.startsWith('0')) d = '+' + DEFAULT_CC + d.slice(1)
  else if (!d.startsWith('+')) d = '+' + d
  return 'tel:' + d
}

// أرقام الواتساب بصيغة دولية بدون + (للرابط wa.me)
export function waDigits(n) {
  let d = String(n || '').replace(/[^\d]/g, '')
  if (!d) return ''
  if (d.startsWith('00')) d = d.slice(2)
  else if (d.startsWith('0')) d = DEFAULT_CC + d.slice(1)
  return d
}

export function waHref(n, text = '') {
  const d = waDigits(n)
  if (!d) return '#'
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const isValidPhone = (n) => String(n || '').replace(/\D/g, '').length >= 7
