import Link from "next/link";

export default function MaintenancePage() {
  return (
    <html lang="en">
      <body className="bg-mist font-sans text-ink">
        <main className="mx-auto flex min-h-screen w-[min(640px,calc(100%-2rem))] flex-col items-center justify-center text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body">Maintenance</p>
          <h1 className="mt-3 font-display text-3xl">We&apos;ll be back shortly</h1>
          <p className="mt-4 text-body">
            Jarkabi Home Care is undergoing scheduled maintenance. For urgent care needs, email{" "}
            <a href="mailto:care@jarkabi.ca" className="text-coral underline">
              care@jarkabi.ca
            </a>
            .
          </p>
          <Link href="/api/health" className="mt-8 text-sm text-body underline">
            System status
          </Link>
        </main>
      </body>
    </html>
  );
}
