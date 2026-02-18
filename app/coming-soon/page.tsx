import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "AI Power Mode (Coming Soon)",
  description:
    "AI Power Mode for PerfectHub is coming soon with advanced CV tailoring, writing rewrites, and IELTS feedback.",
  alternates: {
    canonical: "/coming-soon",
  },
};

export default function ComingSoonPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          AI Power Mode (Coming Soon)
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          PerfectHub Smart Mode is fully available now. AI Power Mode will add
          advanced workflows, including CV tailoring, writing rewrites, and deeper
          IELTS feedback.
        </p>
      </section>

      <AdBanner />

      <section className="grid gap-5 md:grid-cols-3">
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            CV Intelligence
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Tailor CVs to specific job descriptions and improve bullet quality.
          </p>
        </article>
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Writing Assistant
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Rewrite text in formal, friendly, or academic styles with context
            control.
          </p>
        </article>
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            IELTS Depth Feedback
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Get more detailed language and structure recommendations for essays.
          </p>
        </article>
      </section>

      <section className="section-card p-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Join Waitlist
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Send us an email to join the AI Power Mode waitlist.
        </p>
        <a
          href="mailto:contact@perfecthub.example?subject=AI%20Power%20Mode%20Waitlist"
          className="mt-4 inline-flex rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
        >
          Join via Email
        </a>
      </section>
    </article>
  );
}
