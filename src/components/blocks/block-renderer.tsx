import Link from "next/link";

type Block = {
  blockType: string;
  [key: string]: unknown;
};

type BlockRendererProps = {
  blocks: Block[] | null | undefined;
  locale: string;
};

export function BlockRenderer({ blocks, locale }: BlockRendererProps) {
  if (!blocks?.length) return null;
  const base = `/${locale}`;

  return (
    <div className="block-stack">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            return (
              <section key={index} className="page-hero">
                <div className="container">
                  <h1>{String(block.headline ?? "")}</h1>
                  {block.subheadline ? <p className="page-lead">{String(block.subheadline)}</p> : null}
                  {block.body ? <p>{String(block.body)}</p> : null}
                  {block.primaryCtaLabel ? (
                    <Link className="button button-primary" href={String(block.primaryCtaHref ?? `${base}/contact`)}>
                      {String(block.primaryCtaLabel)}
                    </Link>
                  ) : null}
                </div>
              </section>
            );
          case "richText":
            return (
              <section key={index} className="section">
                <div className="container content-card">
                  {block.eyebrow ? <p className="eyebrow">{String(block.eyebrow)}</p> : null}
                  {block.headline ? <h2>{String(block.headline)}</h2> : null}
                  {block.body ? <p>{String(block.body)}</p> : null}
                </div>
              </section>
            );
          case "ctaBanner":
            return (
              <section key={index} className="cta-section">
                <div className="container cta-inner">
                  <div>
                    {block.headline ? <h2>{String(block.headline)}</h2> : null}
                    {block.body ? <p>{String(block.body)}</p> : null}
                  </div>
                  {block.buttonLabel ? (
                    <Link className="button button-primary" href={String(block.buttonHref ?? `${base}/contact`)}>
                      {String(block.buttonLabel)}
                    </Link>
                  ) : null}
                </div>
              </section>
            );
          case "processTimeline":
            return (
              <section key={index} className="section">
                <div className="container">
                  {block.headline ? <h2>{String(block.headline)}</h2> : null}
                  <ol className="process-timeline">
                    {(block.steps as Array<{ title?: string }> | undefined)?.map((step, stepIndex) => (
                      <li key={stepIndex}>
                        <span className="step-index">{stepIndex + 1}</span>
                        <span className="step-title">{step.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
