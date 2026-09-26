"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { portalRoles, type PortalRole } from "@/lib/portal/roles";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PortalLoginFormProps = {
  locale: string;
  demoEnabled: boolean;
};

export function PortalLoginForm({ locale, demoEnabled }: PortalLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoRole, setDemoRole] = useState<PortalRole>("client");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSupabaseLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push(`/${locale}/portal`);
      router.refresh();
    } catch {
      setError("Unable to sign in. Check Supabase configuration.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/portal/demo-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: demoRole }),
    });

    if (!response.ok) {
      setError("Demo login failed");
      setLoading(false);
      return;
    }

    router.push(`/${locale}/portal`);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md border border-line bg-white p-8">
      {isSupabaseConfigured() ? (
        <form onSubmit={handleSupabaseLogin} className="space-y-4">
          <h2 className="font-display text-xl text-ink">Sign in</h2>
          <p className="text-sm text-body">
            Use your Jarkabi portal credentials. Staff accounts require MFA when enabled.
          </p>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-ink">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-ink">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line px-3 py-2"
            />
          </label>
          {error ? <p className="text-sm text-coral">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-plum px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : null}

      {demoEnabled ? (
        <form onSubmit={handleDemoLogin} className={isSupabaseConfigured() ? "mt-8 border-t border-line pt-8 space-y-4" : "space-y-4"}>
          <h2 className="font-display text-xl text-ink">
            {isSupabaseConfigured() ? "Demo access" : "Portal preview"}
          </h2>
          <p className="text-sm text-body">
            Preview portal layouts locally without Supabase Auth keys.
          </p>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-ink">Demo role</span>
            <select
              value={demoRole}
              onChange={(e) => setDemoRole(e.target.value as PortalRole)}
              className="w-full border border-line px-3 py-2"
            >
              {portalRoles.map((role) => (
                <option key={role} value={role}>
                  {role.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          {error ? <p className="text-sm text-coral">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-plum px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-plum disabled:opacity-60"
          >
            {loading ? "Loading…" : "Enter demo portal"}
          </button>
        </form>
      ) : null}

      {!isSupabaseConfigured() && !demoEnabled ? (
        <p className="text-sm text-body">
          Portal authentication is not configured. Set{" "}
          <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, or enable{" "}
          <code className="text-xs">NEXT_PUBLIC_PORTAL_DEMO=true</code> for local preview.
        </p>
      ) : null}
    </div>
  );
}
