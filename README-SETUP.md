# خطوات ربط المشروع بـ Supabase (مرة واحدة)

## 1) هات بيانات المشروع من Supabase
Supabase → مشروعك → **Project Settings → API** (أو **API Keys**):
- **Project URL** (شكله `https://xxxx.supabase.co`)
- **anon public key** (أو **Publishable key** اللي بيبدأ بـ `sb_publishable_`)

⚠️ ما تستخدمش `service_role` أو الـ secret key في المشروع نهائيًا.

## 2) شغّل ملف قاعدة البيانات
Supabase → **SQL Editor → New query** → افتح `supabase/schema.sql` وانسخ كل محتواه والصقه → **Run**.
المفروض تظهر رسالة نجاح. (آمن لو شغّلته مرتين.)

## 3) اعمل حساب الأدمن
1. **Authentication → Users → Add user → Create new user**: اكتب الإيميل والباسورد (فعّل Auto Confirm User). اختار باسورد قوي.
2. ارجع **SQL Editor**، افتح `supabase/add-admin.sql`، **غيّر `PUT-ADMIN-EMAIL-HERE` لنفس الإيميل**، وشغّله. لازم يرجّع صف فيه الإيميل.

## 4) اقفل التسجيل الجديد (مهم للأمان)
**Authentication → Sign In / Providers** (أو **Settings**) → عطّل **Allow new users to sign up**.

## 5) شغّله على جهازك
```bash
cp .env.example .env      # ويندوز: انسخ الملف يدويًا وسمّيه .env
# افتح .env وحط URL و KEY من الخطوة 1
npm install
npm run dev
```
افتح `http://localhost:5173/admin/login` وسجّل دخول.
في الرئيسية هتلاقي كارت **«استيراد محتوى الموقع الحالي»**: اضغطه مرة واحدة وانتظر لحد ما يخلص. (بيرفع الصور الحالية ويضغطها.)

## 6) جرّب البيلد ثم ارفع
```bash
npm run build
```
ارفع على GitHub، وفي **Vercel → Settings → Environment Variables** ضيف:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

وبعدها **Redeploy**. (من غيرهم الموقع بيشتغل بالبيانات الاحتياطية والداش بورد مش هيدخل.)

## 7) اختبار سريع بعد النشر
- ادخل `/admin/login` على الدومين.
- غيّر رقم الواتساب من «التواصل والفوتر» وتأكد إنه اتغير في الهيرو والنافبار والفوتر وزر الواتساب العايم.
- ارفع صورة وامسحها وتأكد إن المساحة اتحررت (Storage → media).

## ملاحظات
- حسابات Supabase المجانية ممكن تتوقف بعد فترة بدون استخدام. لو الموقع وقف ادخل Supabase واضغط Restore.
- أرقام الهواتف اللي بتبدأ بـ `0` بتتحول لدولية بكود `966`. لو الدولة اتغيرت عدّل `DEFAULT_CC` في `src/lib/phone.js`.
