"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ContentCard from "@/components/ContentCard";
import type { CategoryKey } from "@/lib/categories";
import type { SearchIndexItem } from "@/lib/search-index";

type SearchExperienceProps = {
  index: SearchIndexItem[];
};

const CATEGORY_ORDER: CategoryKey[] = [
  "tools",
  "prompts",
  "templates",
  "guides",
  "code",
  "build",
];

function groupByCategory(items: SearchIndexItem[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}

export default function SearchExperience({ index }: SearchExperienceProps) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) {
      return [];
    }

    return index
      .filter((item) => {
        const haystack = [
          item.title,
          item.description,
          item.body,
          item.keywords.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      })
      .sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(query) ? 1 : 0;
        const bStarts = b.title.toLowerCase().startsWith(query) ? 1 : 0;
        if (aStarts !== bStarts) {
          return bStarts - aStarts;
        }
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        if (aFeatured !== bFeatured) {
          return bFeatured - aFeatured;
        }
        return a.title.localeCompare(b.title);
      });
  }, [index, query]);

  if (!query) {
    return (
      <section className="section-card p-6">
        <p className="text-sm text-slate-600">
          Enter a keyword to search tools, prompts, templates, guides, code, and build packs.
        </p>
      </section>
    );
  }

  if (!results.length) {
    return (
      <section className="section-card p-6">
        <p className="text-sm text-slate-600">
          No results found for <strong>{query}</strong>. Try another keyword.
        </p>
      </section>
    );
  }

  const grouped = groupByCategory(results);

  return (
    <section className="space-y-8">
      {grouped.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {group.category}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <ContentCard
                key={item.id}
                title={item.title}
                description={item.description}
                href={item.href}
                category={item.category}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
