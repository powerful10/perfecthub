import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryByKey } from "@/lib/categories";
import { getCategoryContent } from "@/lib/content";

const category = getCategoryByKey("code");

export const metadata: Metadata = {
  title: "Code",
  description:
    "Copy production-style UI and frontend code examples with clean structure and syntax highlighting.",
  alternates: {
    canonical: "/code",
  },
};

export default function CodePage() {
  const items = getCategoryContent("code");

  return (
    <CategoryIndex
      title="Perfect Code"
      description={category?.description ?? ""}
      items={items}
      category="code"
    />
  );
}
