import ContentCard from "@/components/ContentCard";
import type { ContentRecord } from "@/lib/content";

type SearchResultsListProps = {
  query: string;
  results: ContentRecord[];
};

export default function SearchResultsList({ query, results }: SearchResultsListProps) {
  if (!query) {
    return (
      <section className="section-card p-6">
        <p className="text-sm text-slate-600">
          Enter a keyword to search tools, prompts, templates, guides, and code.
        </p>
      </section>
    );
  }

  if (!results.length) {
    return (
      <section className="section-card p-6">
        <p className="text-sm text-slate-600">
          No results found for <strong>{query}</strong>. Try a broader keyword.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {results.map((item) => (
        <ContentCard
          key={`${item.category}-${item.slug}`}
          title={item.title}
          description={item.description}
          href={item.href}
          category={item.category}
        />
      ))}
    </section>
  );
}
