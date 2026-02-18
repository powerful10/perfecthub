import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import IeltsWritingPrecheck from "@/components/IeltsWritingPrecheck";

export const metadata: Metadata = {
  title: "IELTS Writing Precheck",
  description:
    "Use Smart Mode heuristics to precheck IELTS writing with estimated range and improvement checklist.",
  alternates: {
    canonical: "/ielts-writing-precheck",
  },
};

export default function IeltsWritingPrecheckPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          IELTS Writing Precheck (Smart Mode)
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Estimate writing quality with transparent heuristics. This is not an
          official IELTS score.
        </p>
      </section>

      <AdBanner />
      <IeltsWritingPrecheck />
      <AdBanner />
    </article>
  );
}
