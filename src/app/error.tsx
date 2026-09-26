"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-mist font-sans text-ink">
        <main className="mx-auto flex min-h-screen w-[min(640px,calc(100%-2rem))] flex-col items-center justify-center text-center">
          <h1 className="font-display text-3xl">Something went wrong</h1>
          <p className="mt-4 text-body">Please try again. If the problem continues, contact care@jarkabi.ca.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 bg-plum px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
