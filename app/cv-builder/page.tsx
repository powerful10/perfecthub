import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import CVBuilder from "@/components/CVBuilder";

export const metadata: Metadata = {
  title: "CV Builder",
  description:
    "Build a professional CV with live preview, smart bullet generator, and PDF export.",
  alternates: {
    canonical: "/cv-builder",
  },
};

export default function CvBuilderPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Perfect CV Builder
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Build and export polished CVs with a Europass-like flow, local draft
          saving, and smart rule-based bullet generation.
        </p>
      </section>

      <AdBanner />
      <CVBuilder />
      <AdBanner />
    </article>
  );
}
