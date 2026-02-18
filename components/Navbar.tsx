import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/calculators", label: "Calculators" },
  { href: "/prompts", label: "Prompts" },
  { href: "/templates", label: "Templates" },
  { href: "/guides", label: "Guides" },
  { href: "/code", label: "Code" },
  { href: "/build", label: "Build" },
  { href: "/build-prompt-composer", label: "Build Composer" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-slate-900 transition hover:text-[#4f46e5]"
          >
            PerfectHub
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/search"
              aria-label="Open search"
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Search
            </Link>
            <Link
              href="/coming-soon"
              className="rounded-full bg-[#4f46e5] px-3 py-2 text-xs font-semibold text-white"
            >
              AI Soon
            </Link>
          </div>
          <div className="hidden w-full max-w-lg lg:block">
            <SearchBar compact />
          </div>
          <Link
            href="/coming-soon"
            className="hidden rounded-full bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4338ca] lg:inline-flex"
          >
            AI Power Mode
          </Link>
        </div>

        <ul className="flex items-center gap-1 overflow-x-auto pb-1 sm:gap-3">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#4f46e5]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
