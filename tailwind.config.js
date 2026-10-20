/** ألوان وخطوط من القسم 4 في project-spec.md، مربوطة بنفس متغيّرات الثيم */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  corePlugins: { preflight: false },
  theme: { extend: {
    colors: { bg: 'var(--bg)', surface: 'var(--surface)', ink: 'var(--text)', muted: 'var(--muted)', line: 'var(--border)', brand: 'var(--primary)', 'brand-h': 'var(--primary-h)', 'brand-t': 'var(--ptext)' },
    fontFamily: { ar: ['Cairo', 'system-ui', 'sans-serif'], en: ['Poppins', 'system-ui', 'sans-serif'] },
    borderRadius: { card: '16px' } } },
}
