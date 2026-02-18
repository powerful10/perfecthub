import Link from "next/link";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import type { CategoryKey } from "@/lib/categories";

type ContentCardProps = {
  title: string;
  description: string;
  href: string;
  category: CategoryKey;
};

export default function ContentCard({
  title,
  description,
  href,
  category,
}: ContentCardProps) {
  return (
    <Card className="flex h-full flex-col p-6">
      <Badge>{category}</Badge>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex w-fit items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
      >
        Explore
      </Link>
    </Card>
  );
}
