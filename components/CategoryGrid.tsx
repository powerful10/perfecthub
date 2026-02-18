"use client";

import { useMemo, useState } from "react";
import ContentCard from "@/components/ContentCard";
import AdBanner from "@/components/AdBanner";
import type { CategoryKey } from "@/lib/categories";
import type { ContentRecord } from "@/lib/content";

type SortKey = "featured" | "newest" | "title";

type CategoryGridProps = {
  items: ContentRecord[];
  category: CategoryKey;
};

export default function CategoryGrid({ items, category }: CategoryGridProps) {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filteredItems = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    const filtered = !normalized
      ? items
      : items.filter((item) => {
          const haystack = [
            item.title,
            item.description,
            item.keywords.join(" "),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalized);
        });

    const sorted = [...filtered];
    if (sort === "featured") {
      sorted.sort((a, b) => {
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        if (aFeatured !== bFeatured) {
          return bFeatured - aFeatured;
        }
        return a.title.localeCompare(b.title);
      });
    } else if (sort === "newest") {
      sorted.sort((a, b) => {
        const aDate = a.updatedAt ? Date.parse(a.updatedAt) : 0;
        const bDate = b.updatedAt ? Date.parse(b.updatedAt) : 0;
        if (aDate !== bDate) {
          return bDate - aDate;
        }
        return a.title.localeCompare(b.title);
      });
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [items, keyword, sort]);

  return (
    <>
      <section className="section-card flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-xl">
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-slate-700">
            Filter by keyword
          </label>
          <input
            id="category-filter"
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by title, description, or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4f46e5]"
          />
        </div>
        <div className="w-full sm:w-56">
          <label htmlFor="category-sort" className="mb-2 block text-sm font-medium text-slate-700">
            Sort
          </label>
          <select
            id="category-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4f46e5]"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </section>

      {filteredItems.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div key={item.slug}>
              <ContentCard
                title={item.title}
                description={item.description}
                href={item.href}
                category={category}
              />
              {index > 0 && (index + 1) % 6 === 0 ? (
                <AdBanner className="mt-5" />
              ) : null}
            </div>
          ))}
        </section>
      ) : (
        <section className="section-card p-6">
          <p className="text-sm text-slate-600">
            No items match your filter. Try another keyword.
          </p>
        </section>
      )}
    </>
  );
}
