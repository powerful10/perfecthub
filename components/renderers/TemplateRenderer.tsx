"use client";

import CopyButton from "@/components/CopyButton";
import type { SectionEntry } from "@/lib/content";

type TemplateRendererProps = {
  templateText?: string;
  sections?: SectionEntry[];
};

export default function TemplateRenderer({
  templateText,
  sections,
}: TemplateRendererProps) {
  return (
    <div className="space-y-6">
      {templateText ? (
        <section className="section-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
            <h2 className="text-base font-semibold text-slate-900">Template</h2>
            <CopyButton text={templateText} label="Copy template" />
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-700">
            <code>{templateText}</code>
          </pre>
        </section>
      ) : null}

      {sections?.length ? (
        <section className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="section-card p-6">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.content}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}
