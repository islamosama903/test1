export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        <p className="text-lg text-slate-300">جاري التحميل...</p>
      </div>
    </main>
  );
}
