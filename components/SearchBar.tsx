type SearchBarProps = {
  defaultValue?: string;
  className?: string;
  compact?: boolean;
};

export default function SearchBar({
  defaultValue = "",
  className = "",
  compact = false,
}: SearchBarProps) {
  return (
    <form
      action="/search"
      method="get"
      className={`flex w-full items-center gap-2 ${className}`}
      role="search"
      aria-label="Global search"
    >
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search perfect tools, prompts, templates, guides, code..."
        className={`w-full rounded-full border border-slate-200 bg-white px-4 outline-none transition focus:border-[#4f46e5] ${
          compact ? "py-2 text-sm" : "py-3 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`rounded-full bg-[#4f46e5] font-semibold text-white transition hover:bg-[#4338ca] ${
          compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm"
        }`}
      >
        Search
      </button>
    </form>
  );
}
