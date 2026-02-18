import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type ToolPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("tools").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const item = getContentBySlug("tools", params.slug);

  if (!item) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/tools/${item.slug}`,
    },
  };
}

export default function ToolDetailPage({ params }: ToolPageProps) {
  const item = getContentBySlug("tools", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
