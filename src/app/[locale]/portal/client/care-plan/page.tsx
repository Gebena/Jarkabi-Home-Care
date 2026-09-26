import { PortalShell } from "@/components/portal/portal-shell";
import { demoCarePlan } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClientCarePlanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "client");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("carePlan")}>
      <ul className="space-y-4">
        {demoCarePlan.map((item) => (
          <li key={item.id} className="border border-line bg-white p-6">
            <h2 className="font-display text-lg text-ink">{item.goal}</h2>
            <p className="mt-1 text-xs text-body">{t("updated")}: {item.updatedAt}</p>
            <ul className="mt-4 list-disc space-y-1 ps-5 text-sm text-body">
              {item.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
