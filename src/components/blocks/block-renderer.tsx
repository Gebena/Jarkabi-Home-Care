import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { ServiceCard } from "@/components/ui/service-card";
import type { ServiceData } from "@/lib/cms";
import { getPayloadClient } from "@/lib/payload";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";

type Block = {
  blockType: string;
  [key: string]: unknown;
};

type BlockRendererProps = {
  blocks: Block[] | null | undefined;
  locale: string;
  services?: ServiceData[];
  learnMoreLabel?: string;
};

const buttonClass =
  "inline-block bg-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum";

/**
 * Renders the editor-composed blocks on service and city pages in the same
 * Care Giver vocabulary the hand-built sections use, so a page assembled in the
 * CMS is indistinguishable from one written in code.
 */
export async function BlockRenderer({
  blocks,
  locale,
  services = [],
  learnMoreLabel = "Learn more",
}: BlockRendererProps) {
  if (!blocks?.length) return null;
  const base = `/${locale}`;
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            return (
              <PageSection key={index} tone="mist">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">
                    {String(block.headline ?? "")}
                  </h2>
                  {block.subheadline ? (
                    <p className="mt-4 text-base leading-relaxed text-body">
                      {String(block.subheadline)}
                    </p>
                  ) : null}
                  {block.body ? (
                    <p className="mt-4 text-sm leading-relaxed text-body">{String(block.body)}</p>
                  ) : null}
                  {block.primaryCtaLabel ? (
                    <Link
                      className={`mt-8 ${buttonClass}`}
                      href={String(block.primaryCtaHref ?? `${base}/contact`)}
                    >
                      {String(block.primaryCtaLabel)}
                    </Link>
                  ) : null}
                </div>
              </PageSection>
            );

          case "trustBar": {
            const items = (block.items as Array<{ label?: string }> | undefined) ?? [];
            if (items.length === 0) return null;
            return (
              <section key={index} className="border-y border-line bg-blush-soft py-7">
                <ul className="mx-auto flex w-[min(1240px,calc(100%-2rem))] flex-wrap justify-center gap-x-10 gap-y-3">
                  {items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2.5 text-sm font-medium text-plum"
                    >
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="shrink-0 text-tan-ink"
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          case "richText":
            return (
              <PageSection key={index}>
                <div className="mx-auto max-w-3xl">
                  {block.eyebrow ? (
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-tan-ink">
                      {String(block.eyebrow)}
                    </p>
                  ) : null}
                  {block.headline ? (
                    <h2 className="mt-3 font-display text-2xl text-ink sm:text-[1.9rem]">
                      {String(block.headline)}
                    </h2>
                  ) : null}
                  {block.body ? (
                    <p className="mt-5 text-base leading-relaxed text-body">
                      {String(block.body)}
                    </p>
                  ) : null}
                </div>
              </PageSection>
            );

          case "serviceGrid": {
            const related = (block.services as Array<{ slug?: string } | string | number> | undefined)
              ?.map((entry) => {
                const slug = typeof entry === "object" && entry?.slug ? entry.slug : null;
                return slug ? serviceBySlug.get(slug) : null;
              })
              .filter(Boolean) as ServiceData[];

            if (!related?.length) return null;

            return (
              <PageSection key={index} tone="mist">
                {block.headline ? (
                  <SectionTitle align="center" title={String(block.headline)} />
                ) : null}
                <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((service) => (
                    <li key={service.slug}>
                      <ServiceCard
                        service={service}
                        locale={locale}
                        ctaLabel={learnMoreLabel}
                      />
                    </li>
                  ))}
                </ul>
              </PageSection>
            );
          }

          case "ctaBanner":
            return (
              <PageSection key={index} tone="plum">
                <div className="flex flex-wrap items-center justify-between gap-8">
                  <div className="max-w-xl">
                    {block.headline ? (
                      <h2 className="font-display text-2xl text-white sm:text-3xl">
                        {String(block.headline)}
                      </h2>
                    ) : null}
                    {block.body ? (
                      <p className="mt-4 text-base leading-relaxed text-white/85">
                        {String(block.body)}
                      </p>
                    ) : null}
                  </div>
                  {block.buttonLabel ? (
                    <Link
                      className={buttonClass}
                      href={String(block.buttonHref ?? `${base}/contact`)}
                    >
                      {String(block.buttonLabel)}
                    </Link>
                  ) : null}
                </div>
              </PageSection>
            );

          case "processTimeline": {
            const steps =
              (block.steps as Array<{ title?: string; description?: string }> | undefined) ?? [];
            if (steps.length === 0) return null;
            return (
              <PageSection key={index}>
                {block.headline ? (
                  <SectionTitle align="center" title={String(block.headline)} />
                ) : null}
                <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="border-t-2 border-line pt-5">
                      <span aria-hidden="true" className="font-display text-2xl text-tan-ink">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-display text-base text-ink">{step.title}</h3>
                      {step.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-body">
                          {step.description}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </PageSection>
            );
          }

          case "faqAccordion":
            return <FaqAccordionBlock key={index} block={block} locale={locale} />;

          default:
            return null;
        }
      })}
    </>
  );
}

async function FaqAccordionBlock({ block, locale }: { block: Block; locale: string }) {
  const faqIds = (block.faqs as Array<{ id?: string | number } | string | number> | undefined) ?? [];
  if (!faqIds.length) return null;

  let faqs: Array<{ question: string; answer: string }> = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "faqs",
      locale,
      where: {
        id: {
          in: faqIds.map((entry) => (typeof entry === "object" ? entry.id : entry)).filter(Boolean),
        },
      },
      limit: 20,
    });
    faqs = docs.map((doc) => ({
      question: String(doc.question),
      answer: String(doc.answer ?? ""),
    }));
  } catch {
    return null;
  }

  if (!faqs.length) return null;

  return (
    <PageSection tone="mist">
      <div className="mx-auto max-w-3xl">
        {block.headline ? (
          <SectionTitle align="center" title={String(block.headline)} className="mb-10" />
        ) : null}

        {faqs.map((faq, faqIndex) => (
          <details key={faqIndex} className="group border-b border-line bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display text-base text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink">
              {faq.question}
              <ChevronDown
                size={18}
                aria-hidden="true"
                className="shrink-0 text-tan-ink transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-body">{faq.answer}</p>
          </details>
        ))}
      </div>
    </PageSection>
  );
}
