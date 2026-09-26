import { PortalShell } from "@/components/portal/portal-shell";
import { demoMessages } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClientMessagesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "client");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("messages")}>
      <ul className="divide-y divide-line border border-line bg-white">
        {demoMessages.map((message) => (
          <li key={message.id} className="p-5">
            <p className="font-medium text-ink">{message.subject}</p>
            <p className="mt-1 text-sm text-body">{message.from} · {message.at}</p>
            <p className="mt-2 text-sm text-body">{message.preview}</p>
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
