/** الألوان والخطوط من القسم 4 في project-spec.md، مربوطة بمتغيّرات الثيم في index.css */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: { extend: {
    colors: { bg: 'var(--bg)', surface: 'var(--surface)', ink: 'var(--text)', muted: 'var(--muted)', line: 'var(--border)',
      brand: 'var(--primary)', 'brand-h': 'var(--primary-h)', 'brand-t': 'var(--ptext)', onp: 'var(--onp)' },
    fontFamily: { ar: ['Cairo', 'system-ui', 'sans-serif'], en: ['Poppins', 'system-ui', 'sans-serif'] },
    spacing: { nav: '76px' },
    borderRadius: { card: '16px' },
    boxShadow: { card: 'var(--shadow)' },
    keyframes: {
      up: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'none' } },
      bob: { '50%': { transform: 'translateY(8px)' } },
      wa: { '0%': { boxShadow: '0 0 0 0 rgba(37,211,102,.5)' }, '70%,100%': { boxShadow: '0 0 0 18px rgba(37,211,102,0)' } } },
    animation: { up: 'up .9s ease both', bob: 'bob 1.8s infinite', wa: 'wa 3s infinite' } } },
}
