import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Explore global calculators for education, finance, health, productivity, and conversions.",
  alternates: {
    canonical: "/calculators",
  },
};

export default function CalculatorsPage() {
  const items = getCategoryContent("tools");

  return (
    <CategoryIndex
      title="Perfect Calculators"
      description="A global calculator library built to solve everyday and professional calculations quickly."
      items={items}
      category="tools"
    />
  );
}
