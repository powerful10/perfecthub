import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import ContentCard from "@/components/ContentCard";
import SearchBar from "@/components/SearchBar";
import { CATEGORY_CONFIG } from "@/lib/categories";
import { getFeaturedContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "PerfectHub",
  description:
    "Global content platform to find perfect tools, prompts, templates, guides, and code with scalable SEO architecture.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const featuredSections = CATEGORY_CONFIG.map((category) => ({
    ...category,
    items: getFeaturedContent(category.key, 6),
    sectionTitle:
      category.key === "tools" ? "Featured Tools & Calculators" : `Featured ${category.label}`,
  }));

  return (
    <article className="space-y-10 pt-4 md:pt-8">
      <section className="section-card px-6 py-12 sm:px-10">
        <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
          PerfectHub
        </h1>
        <p className="mt-5 text-2xl font-medium tracking-tight text-slate-700">
          Find the perfect version of everything.
        </p>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          PerfectHub is a global, scalable content platform helping students,
          professionals, and creators discover the best calculators, prompts,
          templates, guides, and code.
        </p>
        <div className="mt-8 max-w-3xl">
          <SearchBar />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="rounded-full bg-[#4f46e5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
          >
            Explore Tools
          </Link>
          <Link
            href="/prompts"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5]"
          >
            Explore Prompts
          </Link>
        </div>
      </section>

      <AdBanner />

      <section className="section-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          AI Power Mode
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Smart Mode is available now. AI Power Mode features are coming soon for CV
          tailoring, writing rewrites, and deeper IELTS feedback.
        </p>
        <Link
          href="/coming-soon"
          className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5]"
        >
          View AI Roadmap
        </Link>
      </section>

      {featuredSections.map((section) => (
        <section key={section.key} className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {section.sectionTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {section.description}
              </p>
            </div>
            <Link
              href={section.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5]"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => (
              <ContentCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={item.href}
                category={item.category}
              />
            ))}
          </div>

          <AdBanner />
        </section>
      ))}
    </article>
  );
}
