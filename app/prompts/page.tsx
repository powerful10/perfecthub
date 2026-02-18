import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryByKey } from "@/lib/categories";
import { getCategoryContent } from "@/lib/content";

const category = getCategoryByKey("prompts");

export const metadata: Metadata = {
  title: "Prompts",
  description:
    "Explore global prompt collections for study, business, writing, coding, productivity, and interviews.",
  alternates: {
    canonical: "/prompts",
  },
};

export default function PromptsPage() {
  const items = getCategoryContent("prompts");

  return (
    <CategoryIndex
      title="Perfect Prompts"
      description={category?.description ?? ""}
      items={items}
      category="prompts"
    />
  );
}
