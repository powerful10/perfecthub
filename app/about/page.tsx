import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "About PerfectHub",
  description:
    "Learn about PerfectHub and our global mission to build scalable, high-quality content and tools.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          About PerfectHub
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          PerfectHub is a global platform helping users across all ages, countries,
          and professions discover the perfect version of everything through
          calculators, prompts, templates, guides, and code.
        </p>
      </section>

      <AdBanner />

      <section className="grid gap-5 md:grid-cols-2">
        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Our Mission
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Deliver practical, high-quality content with scalable architecture so new
            resources can be published quickly without manual page development.
          </p>
        </div>
        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Global Focus
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We design for international relevance, SEO discoverability, and
            monetization readiness through ad-friendly layouts and content expansion.
          </p>
        </div>
      </section>
    </article>
  );
}
