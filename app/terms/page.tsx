import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Read the PerfectHub terms and conditions for using tools, guides, prompts, and templates.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          By using PerfectHub, you agree to use this website lawfully and
          responsibly. Content and tools are provided for informational use.
        </p>
      </section>

      <AdBanner />

      <section className="space-y-5">
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Acceptable Use
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            You agree not to misuse the site, attempt unauthorized access, or
            distribute malicious content.
          </p>
        </article>
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Content Ownership
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            PerfectHub content and branding are protected. You may use content for
            personal and educational purposes with proper attribution where needed.
          </p>
        </article>
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Limitation of Liability
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            PerfectHub is not liable for decisions made solely based on website
            content, calculators, or estimators.
          </p>
        </article>
      </section>
    </article>
  );
}
