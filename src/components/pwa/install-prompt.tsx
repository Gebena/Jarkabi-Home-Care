"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "jarkabi:install-prompt-dismissed";

/**
 * Sits above the mobile action bar, so it must be dismissible: together the two
 * cost roughly 15% of a phone viewport.
 */
export function InstallPrompt() {
  const t = useTranslations("mobile");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    function onBeforeInstall(event: Event) {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
    setDeferred(null);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("installTitle")}
      className="fixed inset-x-4 bottom-[4.75rem] z-[55] flex items-center gap-3 border border-line bg-white p-4 shadow-elevated lg:hidden"
    >
      <p className="flex-1 text-sm leading-snug text-ink">{t("installTitle")}</p>

      <button
        type="button"
        onClick={install}
        className="shrink-0 bg-tan px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
      >
        {t("installApp")}
      </button>

      <button
        type="button"
        onClick={dismiss}
        aria-label={t("installDismiss")}
        className="shrink-0 rounded-full p-1.5 text-body transition-colors hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
