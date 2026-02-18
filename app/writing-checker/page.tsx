import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import WritingChecker from "@/components/WritingChecker";

export const metadata: Metadata = {
  title: "Writing Checker",
  description:
    "Analyze writing quality with smart heuristics: readability, repetition, sentence length, and more.",
  alternates: {
    canonical: "/writing-checker",
  },
};

export default function WritingCheckerPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Writing Checker (Smart Mode)
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Improve clarity with rule-based writing diagnostics. No external AI required.
        </p>
      </section>

      <AdBanner />
      <WritingChecker />
      <AdBanner />
    </article>
  );
}
