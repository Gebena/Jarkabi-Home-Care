import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-[min(640px,calc(100%-2rem))] flex-col items-center justify-center py-20 text-center">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body">404</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-4 text-body">
        The page you requested is unavailable or may have moved.
      </p>
      <Link
        href="/en"
        className="mt-8 inline-block bg-plum px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white"
      >
        Return home
      </Link>
    </main>
  );
}
