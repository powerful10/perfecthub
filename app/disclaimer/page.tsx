import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the PerfectHub disclaimer regarding informational content, tools, and external links.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          PerfectHub content is provided for general informational and educational
          purposes only. While we strive for accuracy, results from tools and guides
          should be independently verified.
        </p>
      </section>

      <AdBanner />

      <section className="space-y-5">
        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            IELTS Estimator Disclaimer
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            IELTS calculator and writing precheck tools on PerfectHub provide
            estimates only and are not official IELTS scoring systems.
          </p>
        </article>

        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            No Professional Advice
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Content on this site does not replace professional financial, legal,
            medical, or academic advice.
          </p>
        </article>

        <article className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Third-Party Content
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            External links and future affiliate links may be included for convenience.
            We are not responsible for third-party websites or services.
          </p>
        </article>
      </section>
    </article>
  );
}
