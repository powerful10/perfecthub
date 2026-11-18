import Link from "next/link";

type AdBannerProps = {
  className?: string;
  size?: "horizontal" | "large";
  label?: string;
};

export default function AdBanner({
  className = "",
  size = "horizontal",
  label = "Featured Hub",
}: AdBannerProps) {
  const paddingClass = size === "large" ? "p-6" : "p-4 sm:px-6";

  return (
    <aside aria-label="Tool Spotlight" className={`w-full ${className}`}>
      <Link
        href="/#tools"
        className={`section-card group flex w-full flex-col justify-between gap-4 border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50/70 transition-all hover:border-sky-400 hover:shadow-md sm:flex-row sm:items-center ${paddingClass}`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
              Interactive
            </span>
            <span className="text-xs font-medium text-slate-500">{label}</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 sm:text-base">
            Explore 100+ Free Calculators, Prompts, and Productivity Tools on PerfectHub
          </p>
          <p className="text-xs text-slate-600">
            Instant online calculations, developer utilities, and AI prompts designed for speed.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-sky-600">
          Try Tools Free →
        </span>
      </Link>
    </aside>
  );
}
