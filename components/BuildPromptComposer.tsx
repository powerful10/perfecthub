"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

const PRODUCT_TYPES = ["app", "game", "site"] as const;
const PLATFORMS = ["web", "mobile", "desktop", "cross-platform"] as const;
const MONETIZATION_MODELS = [
  "ads",
  "subscription",
  "freemium",
  "one-time purchase",
  "affiliate",
] as const;

export default function BuildPromptComposer() {
  const [productType, setProductType] =
    useState<(typeof PRODUCT_TYPES)[number]>("app");
  const [inspirationCategory, setInspirationCategory] = useState(
    "productivity workflow",
  );
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("web");
  const [techStack, setTechStack] = useState("Next.js 14, TypeScript, TailwindCSS");
  const [mustHaveFeatures, setMustHaveFeatures] = useState(
    "User onboarding\nCore dashboard\nSearch and filters\nResponsive UI\nAnalytics-ready events",
  );
  const [monetization, setMonetization] =
    useState<(typeof MONETIZATION_MODELS)[number]>("ads");
  const [targetUsers, setTargetUsers] = useState("global students and professionals");

  const normalizedFeatures = useMemo(() => {
    return mustHaveFeatures
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [mustHaveFeatures]);

  const perfectBuildPrompt = useMemo(() => {
    const featuresText = normalizedFeatures
      .map((feature, index) => `${index + 1}. ${feature}`)
      .join("\n");

    return [
      "You are a senior product engineer and UX strategist.",
      `Design an original ${productType} inspired by the ${inspirationCategory} style.`,
      `Target platform: ${platform}.`,
      `Tech stack preference: ${techStack}.`,
      `Target users: ${targetUsers}.`,
      `Monetization model: ${monetization}.`,
      "",
      "Must-have features:",
      featuresText || "1. Define core features",
      "",
      "Deliverables:",
      "1) Product concept and differentiation.",
      "2) Information architecture and core user flows.",
      "3) Feature prioritization (MVP vs Phase 2).",
      "4) UI system guidance (colors, spacing, typography, states).",
      "5) Data model and API contract outline.",
      "6) Launch checklist with analytics and growth loops.",
      "",
      "IP and originality constraints:",
      "- Do not copy any brand names, logos, copyrighted art, proprietary assets, or trademarked identifiers.",
      "- Build an original implementation with original naming, copy, assets, and interaction details.",
      `- Inspired by ${inspirationCategory}, but original implementation and assets.`,
    ].join("\n");
  }, [
    inspirationCategory,
    monetization,
    normalizedFeatures,
    platform,
    productType,
    targetUsers,
    techStack,
  ]);

  const codexImplementationPrompt = useMemo(() => {
    const featuresText = normalizedFeatures
      .map((feature) => `- ${feature}`)
      .join("\n");

    return [
      "You are Codex acting as a senior full-stack engineer.",
      `Build a production-ready, original ${productType} for ${platform}.`,
      `Reference style direction: ${inspirationCategory} patterns (without copying protected assets).`,
      `Tech stack: ${techStack}.`,
      `Audience: ${targetUsers}.`,
      `Monetization readiness: ${monetization}.`,
      "",
      "Implementation requirements:",
      "- Provide complete file structure and all code needed to run.",
      "- Use clean architecture, reusable components, and responsive UI.",
      "- Include input validation, empty states, loading states, and error handling.",
      "- Add SEO metadata, semantic headings, and performance best practices.",
      "- Prepare ad slots and analytics hook points where relevant.",
      "- Add seed content/data for immediate demo value.",
      "",
      "Core features to implement:",
      featuresText || "- Define core features",
      "",
      "Originality and safety constraints:",
      "- No brand names, logos, copyrighted art, or proprietary visual assets.",
      "- Original naming, UI details, copywriting, and sample data only.",
      `- Inspired by ${inspirationCategory}, but original implementation and assets.`,
      "",
      "Output requirement:",
      "- Return only code and file contents.",
    ].join("\n");
  }, [
    inspirationCategory,
    monetization,
    normalizedFeatures,
    platform,
    productType,
    targetUsers,
    techStack,
  ]);

  return (
    <section className="space-y-6">
      <section className="section-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Build Prompt Composer (Smart Mode)
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Generate a complete build prompt and a Codex-focused implementation prompt
          with originality and IP safety constraints.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Type
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={productType}
              onChange={(event) =>
                setProductType(event.target.value as (typeof PRODUCT_TYPES)[number])
              }
            >
              {PRODUCT_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Inspiration Category
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={inspirationCategory}
              onChange={(event) => setInspirationCategory(event.target.value)}
              placeholder="e.g. kanban workflow, short-video feed, language learning loop"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Platform
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value as (typeof PLATFORMS)[number])
              }
            >
              {PLATFORMS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Monetization
            </label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={monetization}
              onChange={(event) =>
                setMonetization(
                  event.target.value as (typeof MONETIZATION_MODELS)[number],
                )
              }
            >
              {MONETIZATION_MODELS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tech Stack
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={techStack}
              onChange={(event) => setTechStack(event.target.value)}
              placeholder="e.g. Next.js, TypeScript, TailwindCSS, Prisma"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Must-have Features (one per line)
            </label>
            <textarea
              className="h-32 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={mustHaveFeatures}
              onChange={(event) => setMustHaveFeatures(event.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Target Users
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={targetUsers}
              onChange={(event) => setTargetUsers(event.target.value)}
              placeholder="e.g. solo founders, university students, remote teams"
            />
          </div>
        </div>
      </section>

      <section className="section-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-900">Perfect Build Prompt</h3>
          <CopyButton text={perfectBuildPrompt} label="Copy prompt" />
        </div>
        <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-700">
          <code>{perfectBuildPrompt}</code>
        </pre>
      </section>

      <section className="section-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-900">
            Codex Implementation Prompt
          </h3>
          <CopyButton text={codexImplementationPrompt} label="Copy prompt" />
        </div>
        <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-700">
          <code>{codexImplementationPrompt}</code>
        </pre>
      </section>
    </section>
  );
}
