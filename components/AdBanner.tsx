type AdBannerProps = {
  className?: string;
  size?: "horizontal" | "large";
};

export default function AdBanner({
  className = "",
  size = "horizontal",
}: AdBannerProps) {
  const heightClass = size === "large" ? "h-40" : "h-28";

  return (
    <aside
      aria-label="Advertisement"
      className={`${heightClass} section-card flex w-full items-center justify-center border-dashed text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 ${className}`}
    >
      AdBanner
    </aside>
  );
}
