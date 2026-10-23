# ملف نظام المشروع — مربع الفكرة للدعاية والإعلان

> ## ⚠️ تحديث مهم (مرحلة الداش بورد)
> المحتوى الديناميكي بقى في **Supabase**، مش في الكود. الأقسام دي في الملف ده **اتلغى العمل بيها**، والمرجع الحالي هو `admin-spec.md`:
> - **بيانات الشركة (القسم 3)، وكروت/صور الخدمات (7.4، 9)، ومعرض الأعمال (7.5)، وآراء العملاء (7.7)، وأوقات الدوام وروابط السوشيال (7.9):** كلها بتتقرأ من Supabase عبر `src/context/SiteData.jsx`.
> - `src/data.js` و`src/alts.js` اتحذفوا. البيانات الاحتياطية (لو Supabase مش متصل أو الجداول فاضية) في `src/fallback.js`.
> - نصوص النافبار والهيرو وماذا عنا وكيف نشتغل والـ CTA وأزرار الواجهة لسه ثابتة في `src/i18n.jsx`.
> - أرقام الاتصال والواتساب والإيميل **مصدر واحد** (جدول `site_settings`) ومفيش أي رقم مكتوب في الكود.
> - الداش بورد على المسار `/admin` (محمي بتسجيل دخول وRLS). شوف `admin-spec.md` و`README-SETUP.md`.


> ده المرجع الوحيد للمشروع. أي قرار تصميم أو نص أو لون أو سلوك مكتوب هنا. لو حاجة مش مكتوبة، اسأل قبل ما تفترض.

---

## 1) نظرة عامة

| البند | القيمة |
|---|---|
| النشاط | مطبعة ودعاية وإعلان |
| نوع المشروع | Landing page طويلة (صفحة رئيسية) + صفحات فرعية لمعارض الصور (4 صفحات) |
| اللغات | عربي (الافتراضي، RTL) + إنجليزي (LTR) — زر تبديل |
| الثيمات | فاتح + داكن — زر تبديل |
| الدومين | Murbalifkra.com |
| النشر | Vercel |
| الهدف | الزائر يشوف شغل الشركة ويتواصل واتساب أو اتصال بأقل خطوات |

---

## 2) التقنيات

- **Vite + React 18**
- **React Router v6** (`BrowserRouter`) + ملف `vercel.json` للـ rewrites
- **Tailwind CSS** + CSS variables للثيم (مفيش Bootstrap ولا jQuery)
- **Swiper** لمعرض الأعمال
- **react-icons** (واتساب، إنستجرام، تيك توك، اتصال، إيميل، سهم، شمس/قمر)
- **i18n بسيط بدون مكتبة:** `Context` + ملفين `ar.js` و`en.js`
- مفيش مكتبات أنيميشن تقيلة. الأنيميشن بـ CSS + `IntersectionObserver`.

```
src/
  components/ Navbar, Hero, About, Services, Portfolio, Testimonials, Process, CtaBand, Footer,
              WhatsAppFloat, ThemeToggle, LangToggle, Lightbox, Reveal, ScrollToTop
  pages/      Home.jsx, ServicePage.jsx, NotFound.jsx
  i18n/       ar.js, en.js, LangContext.jsx
  data/       services.js, works.js, reviews.js, site.js
  styles/     index.css  (tokens + base)
public/images/ (الهيكل في القسم 9)
vercel.json
```

`vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## 3) بيانات الشركة (مصدر واحد: `data/site.js`)

| الحقل | القيمة |
|---|---|
| الاسم عربي | مربع الفكرة للدعاية والإعلان |
| الاسم المختصر | وكالة مربع الفكرة |
| الاسم إنجليزي | Murabba Al-Fikra Advertising & Printing |
| Slogan عربي | نطبع أفكارك بجودة ترى وتدوم |
| Slogan إنجليزي | We print your ideas with quality you can see, and that lasts. |
| رقم الاتصال | `0540330205` → `tel:+966540330205` |
| رقم الواتساب | `+966 54 033 0205` → `https://wa.me/966540330205` |
| الإيميل | m.alebttkar@gmail.com → `mailto:` |
| إنستجرام | `SOCIAL.instagram = "#"` ← محمد هيحط الرابط بعدين |
| تيك توك | `SOCIAL.tiktok = "#"` ← محمد هيحط الرابط بعدين |
| ساعات الدوام | السبت – الخميس: 10 ص – 7 م، الجمعة: إجازة |
| العنوان | **مفيش عنوان عن قصد.** لا خريطة ولا عنوان في أي مكان ولا في الـ SEO |

**قواعد:**
- رقم الاتصال ورقم الواتساب **مختلفين**. الأزرار بتاعة الاتصال تستخدم رقم الاتصال، وأزرار واتساب تستخدم رقم الواتساب.
- أي أيقونة سوشيال رابطها `#` تفضل ظاهرة، وتتغير من ملف واحد بس.
- أرقام الهاتف تتعرض دايمًا **LTR** حتى في الصفحة العربية: `dir="ltr"` مع `unicode-bidi: isolate`، وإلا تتقلب (`+966` تظهر في الآخر).
- رسالة الواتساب الجاهزة (`?text=`):
  - عربي: `السلام عليكم، أرغب في الاستفسار عن خدماتكم.`
  - إنجليزي: `Hello, I'd like to inquire about your services.`
  - من صفحة قسم: تضيف اسم القسم، مثال `...عن خدمة: الاستيكرات.`

---

## 4) الهوية البصرية

**البراند:** برتقالي + أبيض + أسود. الشعار مربع بزوايا دائرية. الشعار نفسه فيه كلمة "مربع الفكرة للدعاية والإعلان" جنبه.

### ملفات اللوجو
| الملف | الاستخدام |
|---|---|
| `logo-orange.png` | الثيم الفاتح (النافبار) |
| `logo-white.png` | الثيم الداكن + الفوتر + فوق الصور |
| `logo-original.png` | احتياطي |

بدّل اللوجو تلقائيًا حسب الثيم. الفافيكون: **اقتطع المربع البرتقالي لوحده كصورة مربعة** (`favicon.svg`/`.png` + `apple-touch-icon` 180px). ده مش موجود حاليًا، يتعمل من اللوجو.

### الألوان (CSS variables على `:root` و`[data-theme="dark"]`)

| Token | فاتح | داكن |
|---|---|---|
| `--bg` | `#FFFFFF` | `#0E0E10` |
| `--surface` | `#F7F4F0` | `#18181B` |
| `--surface-2` | `#EFEAE4` | `#222226` |
| `--text` | `#161616` | `#F4F4F5` |
| `--text-muted` | `#5E5A55` | `#A1A1A8` |
| `--border` | `#E6E0D9` | `#2E2E33` |
| `--primary` | `#F15A22` | `#FF6A2F` |
| `--primary-hover` | `#D94A14` | `#FF8350` |
| `--primary-text` (نص برتقالي صغير) | `#C2410C` | `#FF8350` |
| `--on-primary` | `#FFFFFF` | `#111111` |
| `--whatsapp` | `#25D366` | `#25D366` |
| `--shadow` | `0 10px 30px rgba(0,0,0,.08)` | `0 10px 30px rgba(0,0,0,.5)` |

**ملاحظات تباين:** الأبيض على `#F15A22` تباينه حدّي، فاستخدمه في الأزرار الكبيرة بخط عريض بس. النص الصغير البرتقالي في الفاتح يستخدم `--primary-text`. في الداكن نص الزرار الأساسي أسود `--on-primary` لو التباين أحسن، وإلا أبيض. قيس بالأدوات وخد الأعلى تباينًا.

### الخطوط (Google Fonts، `display=swap`)
- **عربي:** `Cairo` (400/600/700/800)
- **إنجليزي:** `Poppins` (400/500/600/700)
- الخط يتبدل حسب `html[lang]`. Fallback: `system-ui, sans-serif`.

### الشكل العام
- زوايا دائرية متسقة (`--radius: 16px`، الأزرار `12px`) تتماشى مع شكل اللوجو.
- مساحات بيضاء كبيرة، عناوين أقسام: كلمة صغيرة برتقالية فوق + عنوان كبير + خط برتقالي قصير تحته.
- لمسة البراند: مربعات دائرية الزوايا كعنصر زخرفي خفيف في الخلفيات (شفافية 5–8%).
- الهيرو والفوتر داكنين في الثيمين (فوق صور) والنص أبيض دايمًا فيهم.

---

## 5) الثيم (فاتح / داكن)

- زر في النافبار (شمس/قمر) بأيقونة تتحول بأنيميشن دوران خفيف.
- **الأولوية:** اختيار المستخدم المحفوظ (`localStorage: "theme"`) ← وإلا `prefers-color-scheme` ← وإلا فاتح.
- التطبيق عن طريق `document.documentElement.dataset.theme = "light" | "dark"`.
- **منع الوميض (FOUC):** سكريبت inline صغير في `<head>` في `index.html` يقرأ التفضيل ويضبط `data-theme` قبل رسم الصفحة.
- `<meta name="color-scheme" content="light dark">` و`<meta name="theme-color">` بيتغير مع الثيم.
- انتقال ناعم للألوان: `transition: background-color .3s, color .3s, border-color .3s` على العناصر الرئيسية فقط.
- الصور: الشعار بيتبدل. الصور الفوتوغرافية ما تتغيرش. أي كارت أبيض لازم يتحول لـ `--surface` في الداكن.
- الظلال أخف وأعمق في الداكن. الحدود (`--border`) أوضح.
- `aria-label` و`aria-pressed` على الزر، وعناوينه تتبدل مع اللغة.

---

## 6) اللغة (عربي / إنجليزي)

- زر في النافبار يعرض اللغة **المقابلة**: `EN` في العربي، و`عربي` في الإنجليزي.
- الافتراضي **عربي**. الحفظ في `localStorage: "lang"`.
- عند التبديل يتغير فورًا بدون reload:
  - `html[lang]` و`html[dir]` (`rtl` / `ltr`)
  - `document.title` و`meta description` و`og:*`
  - الخط
  - اتجاه Swiper (`dir`)
  - ترتيب النافبار والأقسام
- **استخدم CSS Logical Properties** (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`) أو Tailwind (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) بدل `left/right`.
- **استثناء مقصود:** زر الواتساب العائم يفضل على **اليمين الفعلي** في اللغتين (`right`, مش `inset-inline-end`).
- أيقونات الأسهم تتقلب في RTL (`rtl:rotate-180`).
- الأرقام والروابط والإيميل: LTR دايمًا.
- الأسماء في آراء العملاء بتتحول لكتابتها الإنجليزية في النسخة الإنجليزية (القسم 8).
- كل النصوص تيجي من `ar.js` / `en.js`، ممنوع نص ثابت جوه الـ JSX.
- لو مفتاح ناقص يرجع للعربي ويطبع تحذير في الـ console (في وضع التطوير).

---

## 7) هيكل الصفحة الرئيسية (بالترتيب)

| # | القسم | id |
|---|---|---|
| 1 | Navbar | — |
| 2 | Hero | `home` |
| 3 | ماذا عنا | `about` |
| 4 | خدماتنا | `services` |
| 5 | معرض الأعمال | `portfolio` |
| 6 | كيف نشتغل (إضافة مقترحة) | `process` |
| 7 | آراء العملاء | `testimonials` |
| 8 | شريط دعوة للتواصل (إضافة مقترحة) | `contact` |
| 9 | Footer | — |
| ثابت | زر واتساب عائم | — |

القسمان 6 و8 إضافات مقترحة، ويتحذفوا لو محمد قال.

### 7.1 Navbar
- ثابت أعلى الصفحة (`sticky`). شفاف فوق الهيرو، وبعد 40px سكرول يبقى بخلفية `--bg` بشفافية + `backdrop-filter: blur`، وظل خفيف، وارتفاعه يصغر شوية.
- الشعار (يمين في العربي / شمال في الإنجليزي) ← يعمل scroll لأعلى.
- الروابط: الرئيسية، ماذا عنا، خدماتنا، معرض الأعمال، آراء العملاء، تواصل.
- **Scroll-spy:** الرابط النشط يتلون برتقالي مع خط تحته، حسب القسم الظاهر.
- يمين/شمال الروابط: زر الثيم + زر اللغة + زر **"اطلب خدمتك"** (واتساب).
- الموبايل (< 1024px): أيقونة قائمة (hamburger) تفتح drawer كامل الشاشة، الروابط فيه كبيرة، وأزرار الثيم واللغة والواتساب تحت. يقفل لما تدوس رابط أو تدوس برا. السكرول بيتقفل وهو مفتوح.
- لو المستخدم في صفحة فرعية: الروابط ترجعه للرئيسية على القسم المطلوب (`/#services`).
- **ما فيش شريط علوي برتقالي منفصل زي الموقع القديم.** رقم الاتصال موجود في الفوتر والـ CTA وبالزراير.

### 7.2 Hero
- صورة الخلفية: `hero-storefront.jpg` بطبقة تدرج داكنة (`linear-gradient`) عشان النص يتقرأ بوضوح.
- المحتوى: كلمة صغيرة "وكالة مربع الفكرة" + العنوان الكبير (الـ Slogan) + فقرة قصيرة + زرين:
  - **"تواصل واتساب"** (أساسي، أخضر أو برتقالي حسب البراند) ← `wa.me`
  - **"اتصل بنا الآن"** (ثانوي outline أبيض) ← `tel:`
- أنيميشن دخول متتابع (العنوان ← الفقرة ← الأزرار) + zoom بطيء جدًا على الصورة (Ken Burns خفيف، 20 ثانية).
- سهم صغير في الآخر يتحرك لتحت ويودي لقسم "ماذا عنا".
- ارتفاع: `min-height: 100svh`.

### 7.3 ماذا عنا
- تخطيط عمودين (نص + صورة)، والموبايل عمود.
- الصورة: `pap-13-made.jpg` أو `hero`، بإطار بزوايا دائرية وعنصر برتقالي دائري الزوايا خلفها (زي اللوجو).
- 4 مميزات بأيقونات صغيرة (جودة، سرعة، دقة، تنوع).
- الهدف نص موجز بدون أرقام أو ادعاءات غير مؤكدة (مفيش "15 سنة خبرة" أو عدد عملاء).

### 7.4 خدماتنا
- العنوان: كلمة "خدماتنا" + "حلول طباعة متكاملة".
- 4 كروت (شبكة 4 أعمدة ← 2 ← 1). كل كارت: صورة الغلاف + العنوان + قائمة الخدمات + زر "شاهد الأعمال".
- **الكارت كله قابل للضغط** ← ينقل لصفحة القسم (`/services/:slug`).
- Hover: الكارت يرتفع 6px، الصورة تكبر 1.05، ويظهر سهم برتقالي.
- تحت الكروت: زرين (اتصال + واتساب) زي القديم.

### 7.5 معرض الأعمال (Swiper)
- `swiper` + modules: `Navigation`, `Autoplay`, `Keyboard`, `A11y`.
- **`loop: true`** (لوب لانهائي). الاتجاه حسب اللغة (`dir`).
- **زرين يمين وشمال** (أسهم دائرية) على جنبين السلايدر، بتتقلب تلقائيًا في RTL.
- `slidesPerView`: 1.15 (موبايل) / 2.2 (≥640) / 3 (≥1024) / 3.5 (≥1440). `spaceBetween: 20`.
- `autoplay: { delay: 3500, pauseOnMouseEnter: true, disableOnInteraction: false }`.
- السلايد كارت بنسبة `4/5` (`object-fit: cover`) بزوايا دائرية، مع طبقة تدرج خفيفة وأيقونة تكبير تظهر في الـ hover.
- **ضغطة على السلايد تفتح Lightbox** بالصورة كاملة، مع أسهم وزر إغلاق وكيبورد (← → Esc).
- `loading="lazy"` على كل الصور ماعدا أول 3. أبعاد width/height محددة.
- 25 صورة (القسم 9.4) مع alt مترجم.
- يحترم `prefers-reduced-motion` (يوقف autoplay).

### 7.6 كيف نشتغل (مقترح)
4 خطوات أفقية (عمودية في الموبايل) بأرقام برتقالية:
1. **أرسل فكرتك** — تواصل معنا واحكي لنا تفاصيل طلبك
2. **نراجع ونحدد** — نتفق على الخامة والمقاس والكمية
3. **ننفذ بدقة** — طباعة وتنفيذ بأعلى معايير الجودة
4. **نسلّم لك** — نسلّم طلبك في الموعد المتفق عليه

(لا أرقام وقت محددة ولا وعود.)

### 7.7 آراء العملاء
- 6 آراء حقيقية (القسم 8.7). **ممنوع نهائيًا** أي رأي اسمه Test / Testing / Testing44.
- كروت بتخطيط شبكة (3 ← 2 ← 1) أو سلايدر بسيط على الموبايل: نجوم 5 برتقالية + نص الرأي + الاسم + أيقونة اقتباس باهتة.
- **ما فيش** زر "Create your own review" ولا "Average rating" ولا "9 reviews" من الموقع القديم.
- (اختياري) سطر فوق: "تقييم ٥/٥" بدون عدد.

### 7.8 شريط التواصل (CTA)
خلفية برتقالية (الفاتح والداكن) بنص أبيض: "جاهز تطبع فكرتك؟" + زرّين (واتساب، اتصال). عناصر زخرفية مربعة دائرية الزوايا بشفافية.

### 7.9 Footer
- خلفية داكنة + `footer-pattern.jpg` بشفافية منخفضة.
- 4 أعمدة (موبايل: عمود):
  1. اللوجو (أبيض) + الوصف المختصر
  2. روابط سريعة (الأقسام) + روابط الأقسام الأربعة
  3. تواصل معنا: واتساب `+966 54 033 0205` (أيقونة واتساب)، اتصال `0540330205` (أيقونة هاتف)، الإيميل
  4. أوقات الدوام + تابعونا (أيقونتا إنستجرام وتيك توك)
- شريط سفلي: `© {السنة الحالية} مربع الفكرة للدعاية والإعلان. جميع الحقوق محفوظة.` (السنة تتحسب بـ `new Date().getFullYear()`، مش 2024 زي القديم).
- زر "العودة لأعلى" صغير على **يسار** الشاشة (عشان ما يزاحمش الواتساب).

### 7.10 زر الواتساب العائم
- دايرة خضراء `#25D366` بأيقونة واتساب بيضاء، `position: fixed; right: 20px; bottom: 20px; z-index` عالي.
- 56px (موبايل) / 60px (ديسكتوب). ظل + نبض (pulse) هادي كل 3 ثواني، يتوقف مع reduced-motion.
- يفتح `wa.me/966540330205?text=...` في تبويب جديد (`rel="noopener noreferrer"`).
- `aria-label` مترجم. Tooltip "تواصل معنا" بيظهر في الـ hover (ديسكتوب).
- يفضل على اليمين في العربي والإنجليزي.
- يراعي `env(safe-area-inset-bottom)` في الموبايل.

---

## 8) المحتوى النصي (عربي | إنجليزي)

### 8.1 النافبار والأزرار العامة
| المفتاح | عربي | إنجليزي |
|---|---|---|
| nav.home | الرئيسية | Home |
| nav.about | ماذا عنا | About |
| nav.services | خدماتنا | Services |
| nav.portfolio | معرض الأعمال | Portfolio |
| nav.testimonials | آراء العملاء | Testimonials |
| nav.contact | تواصل | Contact |
| cta.order | اطلب خدمتك | Order now |
| cta.whatsapp | تواصل واتساب | Chat on WhatsApp |
| cta.call | اتصل بنا الآن | Call us now |
| cta.view | شاهد الأعمال | View work |
| theme.toLight / toDark | الوضع الفاتح / الوضع الداكن | Light mode / Dark mode |
| lang.switch | EN | عربي |

### 8.2 الهيرو
- **عربي**
  - kicker: وكالة مربع الفكرة
  - العنوان: **نطبع أفكارك بجودة ترى وتدوم**
  - الفقرة: نقدم في مربع الفكرة حلول طباعة متكاملة تلبي جميع احتياجاتك، سواء كانت كميات كبيرة أو مقاسات متنوعة، مع الالتزام بأعلى معايير الجودة والدقة في التنفيذ. دعنا نكون شريكك الموثوق في تحويل أفكارك إلى مطبوعات.
- **إنجليزي**
  - kicker: Murabba Al-Fikra Agency
  - Headline: **We print your ideas with quality you can see, and that lasts.**
  - Paragraph: At Murabba Al-Fikra we offer complete printing solutions for every need, whether large quantities or custom sizes, with the highest standards of quality and precision. Let us be your trusted partner in turning your ideas into print.

> ملحوظة: الموقع القديم كان بيكتب "مربع الابتكار" في بعض الأماكن. **الاسم المعتمد "مربع الفكرة" فقط**.

### 8.3 ماذا عنا (نص جديد، مفيش من الموقع القديم)
- **عربي**
  - kicker: ماذا عنا
  - العنوان: شريكك في تحويل الفكرة إلى مطبوع
  - الفقرة 1: في مربع الفكرة للدعاية والإعلان نجمع بين الإبداع والتنفيذ الدقيق لنقدم لك مطبوعات تعبّر عن علامتك وتترك أثرًا. نبدأ من فكرتك، ونهتم بأدق التفاصيل حتى يصلك المنتج النهائي كما تخيلته.
  - الفقرة 2: من الورقيات والاستيكرات إلى لوحات الإكريليك واللوحات الإعلانية، نوفر لك خدمات متكاملة في مكان واحد، بمقاسات وكميات تناسب احتياجك.
  - المميزات:
    1. جودة تدوم — خامات مختارة وطباعة واضحة تعيش طويلًا
    2. تنفيذ مرتب وسريع — التزام بالمواعيد وتنظيم في العمل
    3. دقة في التفاصيل — اهتمام بكل مقاس وكل لون
    4. حلول متنوعة — كل احتياجاتك الإعلانية في مكان واحد
- **إنجليزي**
  - kicker: About us
  - Title: Your partner in turning ideas into print
  - P1: At Murabba Al-Fikra Advertising we combine creativity with precise execution to deliver printed work that reflects your brand and leaves an impression. We start from your idea and care about every detail, so the final product reaches you just as you imagined it.
  - P2: From stationery and stickers to acrylic and signage, we offer complete services in one place, in the sizes and quantities that suit your needs.
  - Features: 1. Lasting quality — Selected materials and sharp printing that stand the test of time. 2. Neat, fast execution — Organized work and respect for deadlines. 3. Attention to detail — Care for every size and every color. 4. Diverse solutions — All your advertising needs in one place.

### 8.4 خدماتنا
- kicker: خدماتنا | Our services
- العنوان: حلول طباعة متكاملة | Complete printing solutions

| slug | العنوان عربي | العنوان إنجليزي | عناصر عربي | عناصر إنجليزي |
|---|---|---|---|---|
| `papers` | الورقيات | Stationery | كروت شخصية – فولدرات – ظروف – أوراق رسمية – بروشور – علب منتجات – نوت بوك | Business cards – Folders – Envelopes – Letterheads – Brochures – Product boxes – Notebooks |
| `stickers` | الاستيكرات | Stickers | استيكرات بأنواعها – يوفي – DTF – استيكرات سيارات – استيكر جداري | Stickers of all kinds – UV – DTF – Car stickers – Wall stickers |
| `acrylic` | الإكريلك | Acrylic | بوكسات إكريليك – ستاند إكريليك – لوحات إرشادية | Acrylic boxes – Acrylic stands – Directional signs |
| `signs` | اللوحات | Signage | لوحات إعلانية – لوحات إرشادية – أحرف بارزة – لوحات نيون | Advertising signs – Directional signs – Raised letters – Neon signs |

> ملاحظة للمراجعة: كلمة "يوفي" مكتوبة هكذا في الموقع القديم (غالبًا UV). حافظنا عليها في العربي. محمد يتأكد.
> كلمة "بوشر" في القديم اتصححت إلى "بروشور".

### 8.5 معرض الأعمال
- kicker: معرض الأعمال | Portfolio
- العنوان: شاهد بعض أعمالنا | See some of our work
- نص فرعي: أعمال نفذناها لعملائنا | Projects we delivered for our clients

### 8.6 كيف نشتغل
- العنوان: كيف نشتغل | How we work
- الخطوات مكتوبة في 7.6. الإنجليزي:
  1. Share your idea — Contact us and tell us about your request
  2. We review & confirm — We agree on material, size and quantity
  3. Precise production — Printing and execution to the highest standards
  4. Delivery — We deliver your order on the agreed date

### 8.7 آراء العملاء (حقيقية فقط)

| # | الاسم عربي | الاسم إنجليزي | الرأي عربي | الرأي إنجليزي | نجوم |
|---|---|---|---|---|---|
| 1 | نور محمد | Nour Mohammed | جيد جدًا، شكرًا | Very good, thank you | 5 |
| 2 | سعيد محمد | Saeed Mohammed | ممتاز، شكرًا لكم | Excellent, thank you | 5 |
| 3 | عبدالله | Abdullah | الله يعطيكم العافية، شغل مرتب وسريع | God bless you — neat and fast work | 5 |
| 4 | أحمد محمد | Ahmed Mohammed | ممتاز، الله يعطيكم العافية | Excellent, God bless you | 5 |
| 5 | هاشم محمد | Hashem Mohammed | خدمة ممتازة، شكرًا جزيلًا | Excellent service, thank you very much | 5 |
| 6 | طلال الحمد | Talal Al-Hamad | تجربة ممتازة وتعامل رائع، شكرًا لكم | Excellent experience and wonderful service, thank you | 5 |

- العنوان: آراء العملاء | Client reviews — نص فرعي: ثقة عملائنا بنا | Our clients' trust
- **مستبعد:** Test, Testing, Testing44.

### 8.8 شريط التواصل (CTA)
- **عربي:** جاهز تطبع فكرتك؟ / تواصل معنا الآن ونبدأ بتنفيذ طلبك.
- **إنجليزي:** Ready to print your idea? / Contact us now and we'll start on your order.

### 8.9 الفوتر
- الوصف عربي: نقدم في مربع الفكرة حلول طباعة متكاملة تلبي جميع احتياجاتك، مع الالتزام بأعلى معايير الجودة والدقة في التنفيذ.
- الوصف إنجليزي: At Murabba Al-Fikra we offer complete printing solutions that meet all your needs, with the highest standards of quality and precision.
- العناوين: روابط سريعة | Quick links — تواصل معنا | Contact us — أوقات الدوام | Working hours — تابعونا على | Follow us
- الدوام: السبت إلى الخميس: 10 ص – 7 م / الجمعة: إجازة | Saturday – Thursday: 10 AM – 7 PM / Friday: Closed
- الحقوق: `© {year} مربع الفكرة للدعاية والإعلان. جميع الحقوق محفوظة.` | `© {year} Murabba Al-Fikra Advertising. All rights reserved.`

### 8.10 صفحات الأقسام
- زر رجوع: "العودة للخدمات" | "Back to services" (يرجع لـ `/#services`)
- عدد الصور: "{n} صورة" | "{n} photos"
- CTA أسفل الصفحة: "عاجبك شغل؟ اطلب الآن" | "Like what you see? Order now" ← واتساب برسالة تحتوي اسم القسم.
- "خدمات أخرى" | "Other services": كروت الأقسام التلاتة الباقية.
- 404: "الصفحة غير موجودة" | "Page not found" + زر للرئيسية.

---

## 9) الصور

### 9.1 الهيكل في `public/images/`
```
logo/   logo-orange.png, logo-white.png, logo-original.png
hero/   hero-storefront.jpg
og/     og-1200x630.jpg, footer-pattern.jpg
pap/    pap-1 … pap-13-made   (ورقيات)
stk/    stk-1 … stk-7-made    (استيكرات)
acr/    acr-1 … acr-10-made   (إكريليك)
sgn/    sgn-1 … sgn-6-made    (لوحات)
works/  work-01.jpg … work-25.jpg   (معرض الأعمال — النسخة المضغوطة)
```
> **أسماء ملفات works اتغيرت:** الأصلية `1.jpeg … 25.jpeg` بقت `work-01.jpg … work-25.jpg` (مضغوطة، أقصى بُعد 1200px، جودة 80، اتصلحت اتجاهاتها).

### 9.2 كارت الغلاف لكل قسم (في قسم خدماتنا)
| القسم | الصورة |
|---|---|
| الورقيات | `pap/pap-13-made.jpg` |
| الاستيكرات | `stk/stk-7-made.jpg` |
| الإكريلك | `acr/acr-10-made.jpg` |
| اللوحات | `sgn/sgn-6-made.jpg` |

الصور اللي اسمها `-made` هي كولاجات معمولة على خلفية برتقالي البراند، وتتحط **أول** واحدة في كل صفحة قسم كمان.

### 9.3 صفحة القسم `/services/:slug`
- **هيدر** بخلفية داكنة + عنوان القسم + وصفه + العناصر على شكل chips.
- **معرض صور:** Masonry (CSS columns: 1 / 2 / 3 أعمدة)، **بدون قص** (`height: auto`)، لأن فيها إنفوجرافيك وفلايرات طويلة (`acr-1`, `acr-2`, `sgn-1` عمودية) ولازم تظهر كاملة.
- كل صورة بتفتح في **Lightbox** (أسهم + إغلاق + كيبورد + عداد 3/13 + اسم الصورة).
- ظهور تدريجي للصور مع السكرول. `loading="lazy"` وأبعاد حقيقية (width/height) لمنع القفز.
- `ScrollToTop` تلقائي عند فتح الصفحة. الرجوع للرئيسية بيحافظ على مكان قسم الخدمات.
- `slug` غلط ← صفحة 404.
- عنوان الصفحة و`meta description` بيتغيروا لكل قسم وحسب اللغة.

### 9.4 قوائم الصور (الاسم | وصف عربي | وصف إنجليزي) — تُستخدم كـ alt وكابشن

**الورقيات `pap/`**
| ملف | عربي | إنجليزي |
|---|---|---|
| pap-13-made | مجموعة ورقيات بهوية البراند | Brand stationery collection |
| pap-1 | شنطة ورقية برتقالية بشعار مربع الفكرة | Orange paper bag with the Murabba Al-Fikra logo |
| pap-2 | علب عطور وتغليف فاخر | Perfume boxes and premium packaging |
| pap-3 | علب هدايا للسبح والإكسسوارات | Gift boxes for prayer beads and accessories |
| pap-4 | هوية ورقيات أسود وذهبي | Black and gold stationery identity |
| pap-5 | دفتر وورق مراسلات بشعار ذهبي | Notebook and letterhead with gold logo |
| pap-6 | كروت شخصية وظرف مراسلات | Business cards and envelope |
| pap-7 | دفتر سلك وأقلام وعلب هدايا | Spiral notebook, pens and gift boxes |
| pap-8 | تيشيرت بتطريز برتقالي | T-shirt with orange embroidery |
| pap-9 | تيشيرت بتطريز الشعار على الصدر | T-shirt with chest logo embroidery |
| pap-10 | ظهر التيشيرت بتطريز الشعار | T-shirt back embroidery |
| pap-11 | كاب بتطريز الشعار من كل الزوايا | Embroidered cap from every angle |
| pap-12 | كاب أسود بتطريز برتقالي | Black cap with orange embroidery |

**الاستيكرات `stk/`**
| ملف | عربي | إنجليزي |
|---|---|---|
| stk-7-made | أنواع مميزة: ذهبي، هولوجرام، شفاف | Premium types: gold, hologram, clear |
| stk-1 | أنواع الاستيكرات وقص الداي كت | Sticker types and die-cutting |
| stk-2 | ورقي، PP مقاوم للماء، شفاف | Paper, waterproof PP, clear |
| stk-3 | فينيل PVC، ذهبي وفضي، هولوجرام أمني | PVC vinyl, gold and silver, security hologram |
| stk-4 | ثابت، قابل للإزالة، شكل مخصص | Permanent, removable, custom shape |
| stk-5 | أمثلة قص الداي كت | Die-cut shape examples |
| stk-6 | شرح قالب القص | How the die template works |

**الإكريلك `acr/`**
| ملف | عربي | إنجليزي |
|---|---|---|
| acr-10-made | لوحة حائط ولوحة مكتبية إكريليك | Acrylic wall sign and desk sign |
| acr-1 | لوحات إرشادية أسود وذهبي | Directional signs, black and gold |
| acr-2 | لوحات إرشادية برتقالي | Directional signs, brand orange |
| acr-3 | لوحة بحروف بارزة: غرفة الاجتماعات | Raised-letter sign: Conference Room |
| acr-4 | لوحة بارزة مع المواصفات | Raised sign with specifications |
| acr-5 | لوحة مكتبية إكريليك ثلجي | Frosted acrylic desk sign |
| acr-6 | لوحة مكتبية ومميزاتها | Desk sign and its features |
| acr-7 | لوحات إرشادية برتقالي للمكاتب والمطاعم | Orange signs for offices and restaurants |
| acr-8 | لوحات إرشادية أسود وأبيض | Black and white directional signs |
| acr-9 | تركيب فعلي في مكاتب ومطعم | Installed in offices and a restaurant |

**اللوحات `sgn/`**
| ملف | عربي | إنجليزي |
|---|---|---|
| sgn-6-made | ستاند المعرض ورول أب | Exhibition stand and roll-up |
| sgn-1 | رول أب برتقالي للخدمات | Orange services roll-up |
| sgn-2 | رول أب: الشعار والعنوان والمنتجات | Roll-up: logo, headline and products |
| sgn-3 | رول أب: شبكة الخدمات | Roll-up: services grid |
| sgn-4 | ستاند معرض وكاونتر ورول أب | Exhibition stand, counter and roll-up |
| sgn-5 | خلفية معرض منحنية مع كاونتر | Curved exhibition backdrop with counter |

**معرض الأعمال `works/` (alt)**
| ملف | عربي | إنجليزي |
|---|---|---|
| work-01 | واجهة محل بلوحة نيون زرقاء | Storefront with blue neon sign |
| work-02 | لوحة نيون وردية على واجهة مبنى | Pink neon sign on a building |
| work-03 | سيارة بشعار مطبوع | Van with printed logo graphics |
| work-04 | لوحات أسماء مكتبية ومعدنية | Office and metal nameplates |
| work-05 | ستاند عجلة حظ للأطفال | Kids prize-wheel stand |
| work-06 | غلاف جلد أزرق للتقرير السنوي | Blue leather annual report cover |
| work-07 | لوحة واجهة بحروف بارزة | Facade sign with raised letters |
| work-08 | فولدر جلد أخضر بشعار ذهبي | Green leather folder with gold logo |
| work-09 | علامات ولوحات صغيرة لعلامات تجارية | Small brand labels and plaques |
| work-10 | جناح معرض بخلفية مطبوعة | Exhibition booth with printed backdrop |
| work-11 | منديل مطبوع بشعار كافيه | Napkin printed with a café logo |
| work-12 | لوحات إرشادية وأرقام غرف | Directional signs and room numbers |
| work-13 | حبل تعليق بطاقة مطبوع | Printed lanyard and badge holder |
| work-14 | رول أب إعلاني | Advertising roll-up banners |
| work-15 | إطار لوحة تذكارية | Framed commemorative piece |
| work-16 | جناح في معرض داخل قاعة | Exhibition booth inside a hall |
| work-17 | ستاند عجلة حظ للأطفال (زاوية أخرى) | Kids prize-wheel stand, another angle |
| work-18 | ملصق جداري لنادي رياضي | Wall graphics for a sports hall |
| work-19 | رول أب ترحيبي | Welcome roll-up banners |
| work-20 | لوحة إكريليك شفافة مطبوعة | Printed clear acrylic plaque |
| work-21 | لوحة اسم مكتبية إكريليك أبيض وأسود | Black and white acrylic desk nameplate |
| work-22 | لوحة اسم مكتبية إكريليك بتصميم زهور | Acrylic desk nameplate with floral design |
| work-23 | مطبوعات وبوسترات | Printed posters and cards |
| work-24 | ستاند إكريليك بـ QR لتقييم جوجل | Acrylic stand with Google review QR |
| work-25 | لوحات اسم مكتبية على جدار خشبي | Office plaques on a wooden wall |

> ملاحظة: الصور 15، 9، 23 وصفها تقريبي من معاينة صغيرة. محمد يراجع الوصف لو في اسم عميل ظاهر ويحب يغيّره.

### 9.5 الأداء
- الصور خارج شاشة العرض الأولى: `loading="lazy"` + `decoding="async"`.
- لو حبّ يحسّن أكتر: تحويل كل الصور إلى WebP مع fallback (اختياري، مش مطلوب).
- الهيرو: `fetchpriority="high"`، ومش lazy.

---

## 10) الأنيميشن والحركة

- **Reveal on scroll:** كومبوننت `<Reveal>` بـ `IntersectionObserver` (`threshold: .15`, يشتغل مرة واحدة): fade + translateY(24px) مدته 600ms. العناصر المتجاورة (كروت الخدمات، المميزات، الخطوات) بتدخل بتأخير متتابع 80ms.
- **النافبار:** تحول ناعم للخلفية عند السكرول + scroll-spy.
- **الهيرو:** دخول متتابع + zoom بطيء للخلفية + سهم يتحرك.
- **الكروت:** hover يرفع الكارت ويكبّر الصورة ويظهر السهم.
- **الأزرار:** hover يرفع 2px مع ظل، active يرجع، فوكس واضح.
- **تبديل الثيم:** الأيقونة تدور، والألوان تنتقل بنعومة.
- **السكرول:** `scroll-behavior: smooth` + `scroll-margin-top` لكل قسم بقدر ارتفاع النافبار.
- **تقليل الحركة:** `@media (prefers-reduced-motion: reduce)` يوقف كل ما سبق (Reveal يظهر مباشرة، autoplay متوقف، مفيش zoom ولا pulse).
- **ما فيش:** preloader طويل، ولا parallax تقيل، ولا مكتبة أنيميشن خارجية.

---

## 11) الاستجابة (Responsive)

- Mobile-first. نقاط الكسر: 640 / 768 / 1024 / 1280 / 1536.
- `container` بأقصى عرض 1280px وحشوة جانبية 16px (موبايل) ← 24px ← 32px.
- أحجام العناوين بـ `clamp()` (مثلاً عنوان الهيرو `clamp(2rem, 5vw, 4rem)`).
- أهداف اللمس ≥ 44px.
- لا سكرول أفقي أبدًا. اختبار على 360px و390px و768px و1280px و1920px.

---

## 12) الوصولية (A11y)

- HTML دلالي: `header / nav / main / section / footer`، عنوان `h1` واحد.
- كل صورة لها `alt` مترجم. الزخرفية `alt=""`.
- الأزرار الأيقونية لها `aria-label`.
- Lightbox: `role="dialog"`, `aria-modal`, يحبس الفوكس ويرجّعه، `Esc` يقفل.
- فوكس مرئي (`outline` برتقالي 2px، offset 2px).
- تباين الألوان ≥ 4.5:1 للنص العادي.
- رابط "تخطي إلى المحتوى" مخفي يظهر بالتاب.

---

## 13) السيو والمشاركة

- `<title>` عربي: `مربع الفكرة للدعاية والإعلان | طباعة ودعاية وإعلان`
- `<title>` إنجليزي: `Murabba Al-Fikra | Printing & Advertising`
- `meta description` (عربي): `نطبع أفكارك بجودة ترى وتدوم. ورقيات، استيكرات، إكريليك ولوحات إعلانية. تواصل معنا الآن.`
- `meta description` (إنجليزي): `We print your ideas with quality you can see, and that lasts. Stationery, stickers, acrylic and signage. Contact us today.`
- Open Graph + Twitter Card بصورة `og/og-1200x630.jpg`.
- `canonical` على `https://murbalifkra.com`.
- `robots.txt` و`sitemap.xml` (الرئيسية + 4 صفحات أقسام).
- JSON-LD نوع `LocalBusiness`: الاسم والهاتف والإيميل وساعات العمل **بدون عنوان**.
- `lang` على `<html>` بيتحدث مع اللغة.

---

## 14) الأمان والجودة

- روابط خارجية: `target="_blank" rel="noopener noreferrer"`.
- مفيش مفاتيح API أو باك إند. الموقع ثابت بالكامل.
- مفيش فورم تواصل (التواصل واتساب واتصال بس).
- `localStorage` داخل `try/catch` (لو معطّل ما يكسرش الموقع).
- Lighthouse مستهدف: Performance ≥ 90، Accessibility ≥ 95، SEO ≥ 95.

---

## 15) مرحلة الرفع والدومين (لاحقًا، بعد البناء)

1. رفع الكود على GitHub.
2. ربطه بـ Vercel ونشر أول نسخة.
3. إضافة `Murbalifkra.com` في Vercel (Settings ← Domains).
4. ضبط سجلات DNS عند مزود الدومين (خطوة بخطوة مع محمد).
5. التأكد من HTTPS، وتجربة الموبايل، وتجربة الواتساب والاتصال.

---

## 16) المتبقي من محمد (بعد التسليم الأول)

- [ ] رابط إنستجرام ← `data/site.js` (`SOCIAL.instagram`)
- [ ] رابط تيك توك ← `data/site.js` (`SOCIAL.tiktok`)
- [ ] مراجعة كلمة "يوفي" (هل هي UV؟)
- [ ] مراجعة نص "ماذا عنا" و"كيف نشتغل" مع العميل
- [ ] الموافقة على الاسم الإنجليزي: Murabba Al-Fikra
- [ ] تأكيد إن العميل موافق على نشر أسماء آراء العملاء

---

## 17) معايير القبول (Definition of Done)

- [ ] كل الأقسام بالترتيب في القسم 7، والسكرول سلس بين الأقسام والنافبار بيتلون صح.
- [ ] تبديل اللغة بيغيّر النص والاتجاه والخط والـ title بدون reload، ويتحفظ.
- [ ] تبديل الثيم شغال بدون وميض، ويتحفظ، ويحترم تفضيل النظام.
- [ ] 4 كروت الخدمات تفتح 4 صفحات بالصور الصح، والـ Lightbox شغال.
- [ ] السلايدر لوب لانهائي بأزرار يمين وشمال، وشغال في RTL وLTR.
- [ ] الواتساب العائم ثابت على اليمين ويفتح الرقم الصح. الاتصال يفتح رقم الاتصال الصح.
- [ ] مفيش عنوان ولا آراء Test ولا "مربع الابتكار" في أي مكان.
- [ ] أرقام الهاتف LTR في العربي.
- [ ] مفيش سكرول أفقي على 360px.
- [ ] مفيش أخطاء في الـ console.
- [ ] حجم الصفحة الأولى معقول (الصور lazy + مضغوطة).
