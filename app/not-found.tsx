import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center">
        <h1 className="text-4xl font-semibold">الصفحة غير موجودة</h1>
        <p className="mt-3 text-slate-400">قد تكون الرّابط غير صحيح أو الصفحة لم تعد متاحة.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-pink-500 px-5 py-3 font-semibold transition hover:bg-pink-600">العودة للرئيسية</Link>
      </div>
    </main>
  );
}
