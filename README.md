Platform demo — runs fully without Supabase

Quick start (no Supabase required):

1. Install dependencies:

```bash
npm ci
```

2. Run dev server:

```bash
npm run dev
```

The app includes built-in demo data and local storage fallback so all pages (admin login, couple panel, invitation) work without any Supabase keys.

Uploads are handled by dedicated media endpoints:
- `POST /api/uploads/image`
- `POST /api/uploads/video`
- `POST /api/uploads/music`

Each endpoint accepts `slug` and `file` in `multipart/form-data` and stores files in the Supabase `weddings` bucket when configured, or local `public/uploads` during local development.

Enabling Supabase (optional):

1. Copy `.env.example` to `.env.local` and fill the keys.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_URL` (optional, required only for scripts/migrations)

> Note: Vercel deployments that use file uploads require Supabase storage configuration. Without `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, uploads will fail on Vercel.
>
> The app still works without Supabase for wedding data, CRUD, and local demo flow, but uploads are only supported when Supabase storage is configured.

2. Run `node scripts/setup-supabase.js` to create the `weddings` bucket and optionally run migrations (requires `SUPABASE_DB_URL`).
3. Run `node scripts/seed-mock.js` to seed demo data into Supabase.
# منصة دعوات زفاف رقمية

مشروع Next.js لتوليد دعوات زفاف رقمية مع تكامل Supabase (Storage + Postgres).

ما تم توفيره في هذا المستودع:
- صفحات الواجهة والمشرف (`app/admin`, `app/wedding/[slug]`, ...)
- سكربتات إعداد Supabase وملف SQL للمهاجرات في `migrations/001_init.sql`
- سكربتات لإنشاء الـ Bucket وتشغيل المهاجرات وملء بيانات تجريبية في `scripts/`
- ملف `.env.example` يحتوي على المتغيرات المطلوبة

الخطوات لتشغيل المشروع محليًا بعد وضع المفاتيح في `.env.local` (اختصرناها لتكون بسيطة):

1. انسخ الملف `.env.example` إلى `.env.local` واملأ القيم:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (أو `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (اختياري لكن موصى به) `SUPABASE_DB_URL` — سلسلة اتصال Postgres لمشروعي Supabase

2. ثبّت الحزم:

```bash
npm install
```

3. شغّل سكربت إعداد Supabase لإنشاء Bucket وتشغيل المهاجرات (إن وُجدت بيانات الاتصال):

```bash
npm run supabase:setup
```

4. (اختياري) أدخل بيانات تجريبية:

```bash
npm run db:seed
```

5. شغّل الخادم المحلي:

```bash
npm run dev
```

بعد هذه الخطوات، إذا أتممت وضع متغيرات البيئة الصحيحة، سيعمل المشروع متكاملًا مع Supabase.

ملاحظات تنفيذية:
- إذا لم توفر مفاتيح Supabase، يستمر المشروع بالعمل باستخدام بيانات محلية (localStorage) كحل مؤقت.
- السكربت `supabase:setup` يحاول إنشاء Bucket باسم `weddings` ويشغّل المهاجرات إذا كانت `SUPABASE_DB_URL` متاحة.
