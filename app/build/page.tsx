import type { Metadata } from "next";
import CategoryIndex from "@/components/CategoryIndex";
import { getCategoryContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build Prompt Packs",
  description:
    "Explore original build prompt packs for apps, sites, and games with platform-ready implementation instructions.",
  alternates: {
    canonical: "/build",
  },
};

export default function BuildPage() {
  const items = getCategoryContent("build");

  return (
    <CategoryIndex
      title="Perfect Build Prompt Packs"
      description="Original build packs inspired by proven product patterns with safe, original implementation guidance."
      items={items}
      category="build"
    />
  );
}
