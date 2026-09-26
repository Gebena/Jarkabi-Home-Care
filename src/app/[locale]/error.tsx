"use client";

import { useEffect } from "react";

export default function LocaleError({
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
    <main className="mx-auto flex min-h-[60vh] w-[min(640px,calc(100%-2rem))] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-3xl text-ink">Something went wrong</h1>
      <p className="mt-4 text-body">Please try again. If the problem continues, contact care@jarkabi.ca.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-plum px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white"
      >
        Try again
      </button>
    </main>
  );
}
