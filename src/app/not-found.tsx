import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-mist font-sans text-ink">
        <main className="mx-auto flex min-h-screen w-[min(640px,calc(100%-2rem))] flex-col items-center justify-center text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body">404</p>
          <h1 className="mt-3 font-display text-3xl">Page not found</h1>
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
      </body>
    </html>
  );
}
