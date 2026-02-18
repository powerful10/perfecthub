import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryByKey } from "@/lib/categories";
import { getCategoryContent } from "@/lib/content";

const category = getCategoryByKey("tools");

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browse global perfect tools and calculators built for students, professionals, and everyone worldwide.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const items = getCategoryContent("tools");

  return (
    <CategoryIndex
      title="Perfect Tools"
      description={category?.description ?? ""}
      items={items}
      category="tools"
    />
  );
}
