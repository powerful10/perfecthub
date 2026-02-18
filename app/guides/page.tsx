import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryByKey } from "@/lib/categories";
import { getCategoryContent } from "@/lib/content";

const category = getCategoryByKey("guides");

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Read practical global guides for study, routines, productivity, programming, and interviews.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  const items = getCategoryContent("guides");

  return (
    <CategoryIndex
      title="Perfect Guides"
      description={category?.description ?? ""}
      items={items}
      category="guides"
    />
  );
}
