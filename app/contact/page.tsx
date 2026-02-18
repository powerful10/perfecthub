import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact PerfectHub for feedback, support, partnerships, and content suggestions.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <article className="space-y-8 pt-4 md:pt-8">
      <section className="section-card px-6 py-10 sm:px-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          For support, collaboration, feedback, or content requests, contact the
          PerfectHub team at:
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-900">
          contact@perfecthub.example
        </p>
      </section>

      <AdBanner />

      <section className="section-card p-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Contact Form
        </h2>
        <form
          action="mailto:contact@perfecthub.example"
          method="post"
          encType="text/plain"
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            className="h-28 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5] md:col-span-2"
          />
          <button
            type="submit"
            className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca] md:col-span-2 md:w-fit"
          >
            Send Message
          </button>
        </form>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          We aim to respond within 2 business days.
        </p>
      </section>
    </article>
  );
}
