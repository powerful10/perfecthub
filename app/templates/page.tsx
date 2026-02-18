import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryByKey } from "@/lib/categories";
import { getCategoryContent } from "@/lib/content";

const category = getCategoryByKey("templates");

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Find perfect global templates for CVs, resumes, cover letters, emails, and professional messages.",
  alternates: {
    canonical: "/templates",
  },
};

export default function TemplatesPage() {
  const items = getCategoryContent("templates");

  return (
    <CategoryIndex
      title="Perfect Templates"
      description={category?.description ?? ""}
      items={items}
      category="templates"
    />
  );
}
