import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type BuildPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("build").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: BuildPageProps): Metadata {
  const item = getContentBySlug("build", params.slug);

  if (!item) {
    return {
      title: "Build Pack Not Found",
      description: "The requested build prompt pack could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/build/${item.slug}`,
    },
  };
}

export default function BuildDetailPage({ params }: BuildPageProps) {
  const item = getContentBySlug("build", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
