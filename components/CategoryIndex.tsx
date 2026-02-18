import AdBanner from "@/components/AdBanner";
import CategoryGrid from "@/components/CategoryGrid";
import type { CategoryKey } from "@/lib/categories";
import type { ContentRecord } from "@/lib/content";

type CategoryIndexProps = {
  title: string;
  description: string;
  items: ContentRecord[];
  category: CategoryKey;
};

export default function CategoryIndex({
  title,
  description,
  items,
  category,
}: CategoryIndexProps) {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </section>

      <AdBanner />

      <CategoryGrid items={items} category={category} />

      <AdBanner />
    </article>
  );
}
