import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the PerfectHub Privacy Policy and understand how we handle data, analytics, and advertising.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Last updated: February 18, 2026.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          PerfectHub values your privacy. This policy explains what information we
          collect, how it is used, and how advertising tools such as Google AdSense
          may process data.
        </p>
      </section>

      <AdBanner />

      <section className="space-y-5">
        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Information We Collect
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We may collect non-personal analytics data such as page views, session
            duration, browser type, and referral sources to improve content and user
            experience.
          </p>
        </div>

        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Cookies and Advertising
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Third-party vendors, including Google, may use cookies to serve ads based
            on prior visits to this website and other websites.
          </p>
        </div>

        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Data Usage
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Data is used to measure performance, improve site quality, and provide
            relevant resources and advertising experiences.
          </p>
        </div>

        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            AI Features Note
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            PerfectHub currently provides Smart Mode features using local heuristics.
            Future AI Power Mode features will follow this policy when launched.
          </p>
        </div>

        <div className="section-card p-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            For privacy questions, contact the site administrator through the About
            page.
          </p>
        </div>
      </section>
    </article>
  );
}
