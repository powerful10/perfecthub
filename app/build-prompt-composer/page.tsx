import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import BuildPromptComposer from "@/components/BuildPromptComposer";

export const metadata: Metadata = {
  title: "Build Prompt Composer",
  description:
    "Compose original product build prompts and Codex implementation prompts for apps, games, and sites.",
  alternates: {
    canonical: "/build-prompt-composer",
  },
};

export default function BuildPromptComposerPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Build Prompt Composer (Smart Mode)
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Generate high-quality build prompts for original products and implementation
          prompts tailored for Codex workflows.
        </p>
      </section>

      <AdBanner />
      <BuildPromptComposer />
      <AdBanner />
      <section className="section-card p-6">
        <p className="text-sm leading-7 text-slate-600">
          IP Safety: Always keep outputs original and avoid brand names, logos, and
          proprietary assets.
        </p>
      </section>
      <AdBanner />
    </article>
  );
}
