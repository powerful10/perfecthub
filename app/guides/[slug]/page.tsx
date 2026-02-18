import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type GuidePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("guides").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const item = getContentBySlug("guides", params.slug);

  if (!item) {
    return {
      title: "Guide Not Found",
      description: "The requested guide could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/guides/${item.slug}`,
    },
  };
}

export default function GuideDetailPage({ params }: GuidePageProps) {
  const item = getContentBySlug("guides", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
