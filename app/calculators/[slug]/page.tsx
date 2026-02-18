import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("tools").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: CalculatorPageProps): Metadata {
  const item = getContentBySlug("tools", params.slug);

  if (!item) {
    return {
      title: "Calculator Not Found",
      description: "The requested calculator could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/calculators/${item.slug}`,
    },
  };
}

export default function CalculatorDetailPage({ params }: CalculatorPageProps) {
  const item = getContentBySlug("tools", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={{ ...item, href: `/calculators/${item.slug}` }} />;
}
