import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import PromptBuilder from "@/components/PromptBuilder";

export const metadata: Metadata = {
  title: "Prompt Builder",
  description:
    "Generate high-quality structured prompts using Smart Mode rules for tone, format, and output quality.",
  alternates: {
    canonical: "/prompt-builder",
  },
};

export default function PromptBuilderPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Prompt Builder (Smart Mode)
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Build better prompts faster using structured, rule-based prompt design.
        </p>
      </section>

      <AdBanner />
      <PromptBuilder />
      <AdBanner />
    </article>
  );
}
