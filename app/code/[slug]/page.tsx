import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type CodePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("code").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: CodePageProps): Metadata {
  const item = getContentBySlug("code", params.slug);

  if (!item) {
    return {
      title: "Code Example Not Found",
      description: "The requested code example could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/code/${item.slug}`,
    },
  };
}

export default function CodeDetailPage({ params }: CodePageProps) {
  const item = getContentBySlug("code", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
