import { cache } from "react";
import { getAllContent } from "@/lib/content";
import type { CategoryKey } from "@/lib/categories";

export type SearchIndexItem = {
  id: string;
  category: CategoryKey;
  slug: string;
  href: string;
  title: string;
  description: string;
  body: string;
  keywords: string[];
  featured?: boolean;
  updatedAt?: string;
};

export const getSearchIndex = cache((): SearchIndexItem[] => {
  return getAllContent().map((item) => ({
    id: `${item.category}:${item.slug}`,
    category: item.category,
    slug: item.slug,
    href: item.href,
    title: item.title,
    description: item.description,
    body: item.body ?? "",
    keywords: item.keywords,
    featured: item.featured,
    updatedAt: item.updatedAt,
  }));
});
