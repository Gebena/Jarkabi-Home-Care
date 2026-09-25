type LegalSection = {
  title: string;
  body: string;
};

type LegalSectionsProps = {
  sections: LegalSection[];
};

export function LegalSections({ sections }: LegalSectionsProps) {
  if (!sections.length) return null;

  return (
    <div className="mt-8 space-y-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display text-xl text-ink">{section.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-body">{section.body}</p>
        </section>
      ))}
    </div>
  );
}
