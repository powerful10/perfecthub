import type { SectionEntry } from "@/lib/content";

type GuideRendererProps = {
  sections?: SectionEntry[];
};

export default function GuideRenderer({ sections }: GuideRendererProps) {
  if (!sections?.length) {
    return (
      <section className="section-card p-6">
        <p className="text-sm text-slate-600">No guide sections are defined for this item.</p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {sections.map((section) => (
        <article key={section.title} className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {section.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{section.content}</p>
        </article>
      ))}
    </section>
  );
}

