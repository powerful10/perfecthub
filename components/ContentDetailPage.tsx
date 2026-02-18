import AdBanner from "@/components/AdBanner";
import CategoryContentRenderer from "@/components/renderers/CategoryContentRenderer";
import type { ContentRecord } from "@/lib/content";

type ContentDetailPageProps = {
  item: ContentRecord;
};

export default function ContentDetailPage({ item }: ContentDetailPageProps) {
  const toolJsonLd =
    item.category === "tools"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: item.title,
          description: item.seoDescription,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          url: `https://perfecthub.vercel.app${item.href}`,
        }
      : null;

  return (
    <article className="space-y-8 pt-4 md:pt-8">
      {toolJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
        />
      ) : null}
      <section className="section-card px-6 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4f46e5]">
          {item.category}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          {item.intro ?? item.description}
        </p>
      </section>

      <AdBanner size="large" />

      <CategoryContentRenderer item={item} />

      <AdBanner />

      <AdBanner size="large" />
    </article>
  );
}
