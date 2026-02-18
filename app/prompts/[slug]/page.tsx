import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetailPage from "@/components/ContentDetailPage";
import { getCategoryContent, getContentBySlug } from "@/lib/content";

type PromptPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCategoryContent("prompts").map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: PromptPageProps): Metadata {
  const item = getContentBySlug("prompts", params.slug);

  if (!item) {
    return {
      title: "Prompt Not Found",
      description: "The requested prompt content could not be found.",
    };
  }

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    keywords: item.keywords,
    alternates: {
      canonical: `/prompts/${item.slug}`,
    },
  };
}

export default function PromptDetailPage({ params }: PromptPageProps) {
  const item = getContentBySlug("prompts", params.slug);

  if (!item) {
    notFound();
  }

  return <ContentDetailPage item={item} />;
}
