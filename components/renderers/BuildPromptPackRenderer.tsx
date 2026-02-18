import CopyButton from "@/components/CopyButton";
import type { BuildPrompts } from "@/lib/content";

type BuildPromptPackRendererProps = {
  prompts?: BuildPrompts;
  inspiredBy?: string;
};

const PROMPT_LABELS: Array<{
  key: keyof BuildPrompts;
  title: string;
}> = [
  { key: "chatgpt_claude_prompt", title: "ChatGPT / Claude Prompt" },
  { key: "gemini_prompt", title: "Gemini Prompt" },
  { key: "codex_prompt", title: "Codex Implementation Prompt" },
];

export default function BuildPromptPackRenderer({
  prompts,
  inspiredBy,
}: BuildPromptPackRendererProps) {
  if (!prompts) {
    return null;
  }

  return (
    <section className="space-y-5">
      {PROMPT_LABELS.map((promptMeta) => (
        <article key={promptMeta.key} className="section-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
            <h2 className="text-base font-semibold text-slate-900">{promptMeta.title}</h2>
            <CopyButton text={prompts[promptMeta.key]} label="Copy prompt" />
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-700">
            <code>{prompts[promptMeta.key]}</code>
          </pre>
        </article>
      ))}

      <article className="section-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
          IP Safety
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Inspired by {inspiredBy ?? "a common product pattern"}, but original
          implementation and assets.
        </p>
      </article>
    </section>
  );
}
