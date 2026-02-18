import type { Metadata } from "next";
import { Suspense } from "react";
import AdBanner from "@/components/AdBanner";
import SearchBar from "@/components/SearchBar";
import SearchExperience from "@/components/SearchExperience";
import { getSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search all PerfectHub categories including tools, prompts, templates, guides, code, and build prompt packs.",
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  const index = getSearchIndex();

  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Global Search
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Search across all categories and instantly find the perfect content.
        </p>
        <SearchBar className="mt-6 max-w-3xl" />
      </section>

      <AdBanner />
      <Suspense
        fallback={
          <section className="section-card p-6">
            <p className="text-sm text-slate-600">Loading search results...</p>
          </section>
        }
      >
        <SearchExperience index={index} />
      </Suspense>
      <AdBanner />
    </article>
  );
}
