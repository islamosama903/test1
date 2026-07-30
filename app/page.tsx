'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarDays, Heart, Sparkles, ShieldCheck, Share2, QrCode, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'دعوات منشأة', value: '24+' },
  { label: 'مشاركة يومية', value: '1.2k' },
  { label: 'ذكريات محفوظة', value: '8.4k' }
];

const features = [
  { title: 'لوحة تحكم احترافية', text: 'إدارة كاملة للدعوات والزيارات والتهاني في مكان واحد.' },
  { title: 'دعوة تفاعلية', text: 'موسيقى، عدّ تنازلي، صور، فيديو، ومشاركة ذكريات بعد الزفاف.' },
  { title: 'أمان ومشاركة', text: 'QR Code، روابط جاهزة، وحفظ آمن للملفات عبر Supabase.' }
];

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.25),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#111827_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-lg font-semibold text-pink-100">
            <Sparkles className="h-5 w-5 text-pink-400" />
            عروسة ونجوم
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/admin" className="rounded-full border border-pink-400/30 px-4 py-2 text-sm transition hover:bg-pink-500/20">لوحة الأدمن</Link>
            <button type="button" onClick={handleLogout} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20">تسجيل خروج</button>
            <Link href="/wedding/demo" className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold transition hover:bg-pink-600">استعرض الدعوة</Link>
          </div>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-2 text-sm text-pink-100">
              <Heart className="h-4 w-4" />
              منصة دعوات زفاف رقمية احترافية
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              أنشئ دعوة تزف الحب وتستمر كألبوم ذكريات رقمي من أول ضحكة إلى آخر مشاركة.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              من شاشة افتتاحية أنيقة إلى لوحة تحكم للأدمن والعروسين، كل شيء في منصة واحدة مصممة لتبدو أجمل من أي دعوة تقليدية.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/create" className="rounded-full bg-pink-500 px-6 py-3 font-semibold transition hover:bg-pink-600">ابدأ الآن</Link>
              <Link href="/privacy" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">سياسة الخصوصية</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-pink-950/20 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">نظرة سريعة</p>
                <h2 className="text-2xl font-semibold">ما الذي تقدمه المنصة؟</h2>
              </div>
              <div className="rounded-full bg-pink-500/20 p-3 text-pink-300">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-center">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {features.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-pink-200">
                    <ShieldCheck className="h-4 w-4" />
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-pink-200"><CalendarDays className="h-5 w-5" /> <span className="font-semibold">دعوة جاهزة للعرض</span></div>
            <p className="mt-2 text-sm text-slate-300">تبدأ من صفحة افتتاحية جميلة ثم تنتقل إلى رحلة كاملة من الذكريات والمشاركة.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-pink-200"><Users className="h-5 w-5" /> <span className="font-semibold">تفاعل مع الضيوف</span></div>
            <p className="mt-2 text-sm text-slate-300">RSVP، تهاني، رسائل صوتية، صور، وفيديوهات كل ذلك مع موافقة العروسين.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-2 text-pink-200"><Share2 className="h-5 w-5" /> <span className="font-semibold">مشاركة سريعة</span></div>
            <p className="mt-2 text-sm text-slate-300">QR Code، مشاركة واتساب، ونسخ الرابط بضغطة واحدة.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
