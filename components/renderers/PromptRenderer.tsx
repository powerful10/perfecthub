"use client";

import CopyButton from "@/components/CopyButton";
import type { PromptEntry } from "@/lib/content";

type PromptRendererProps = {
  prompts: PromptEntry[];
};

export default function PromptRenderer({ prompts }: PromptRendererProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {prompts.map((prompt, index) => (
        <article key={prompt.title} className="section-card flex flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
            Prompt {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
            {prompt.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{prompt.description}</p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-700">
            <code>{prompt.text}</code>
          </pre>
          <CopyButton text={prompt.text} label="Copy prompt" className="mt-4 self-start" />
        </article>
      ))}
    </div>
  );
}
