import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type TemplatePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("templates").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: TemplatePageProps): Metadata {
  const item = getContentBySlug("templates", params.slug);

  if (!item) {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/templates/${item.slug}`,
    },
  };
}

export default function TemplateDetailPage({ params }: TemplatePageProps) {
  const item = getContentBySlug("templates", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
