import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">
          Copyright {currentYear} PerfectHub. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-[#4f46e5]"
          >
            About
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm font-medium text-slate-600 transition hover:text-[#4f46e5]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-slate-600 transition hover:text-[#4f46e5]"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 transition hover:text-[#4f46e5]"
          >
            Contact
          </Link>
          <Link
            href="/disclaimer"
            className="text-sm font-medium text-slate-600 transition hover:text-[#4f46e5]"
          >
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
