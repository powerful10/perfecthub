"use client";

type AdBannerProps = {
  className?: string;
  size?: "horizontal" | "large";
  label?: string;
};

const MONETAG_DIRECT_LINK = "https://uplcm.com/4/10668106";

export default function AdBanner({
  className = "",
  size = "horizontal",
  label = "Featured Partner",
}: AdBannerProps) {
  const paddingClass = size === "large" ? "p-6" : "p-4 sm:px-6";

  return (
    <aside aria-label="Sponsored Recommendation" className={`w-full ${className}`}>
      <a
        href={MONETAG_DIRECT_LINK}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`section-card group flex w-full flex-col justify-between gap-4 border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-sky-50/70 transition-all hover:border-sky-400 hover:shadow-md sm:flex-row sm:items-center ${paddingClass}`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
              Sponsored
            </span>
            <span className="text-xs font-medium text-slate-500">{label}</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 sm:text-base">
            Discover Top AI Tools, Productivity Apps &amp; Exclusive Partner Deals
          </p>
          <p className="text-xs text-slate-600">
            Explore curated software, templates, and special offers recommended for PerfectHub visitors.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-sky-600">
          Explore Offer →
        </span>
      </a>
    </aside>
  );
}
