"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import ComingSoonButton from "@/components/ComingSoonButton";
import CopyButton from "@/components/CopyButton";

type TemplateStyle = "minimal" | "modern" | "classic";

type CVData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
  education: string;
  experience: string;
  projects: string;
  skills: string;
  languages: string;
  certificates: string;
};

const STORAGE_KEY = "perfecthub_cv_builder_draft_v1";

const defaultData: CVData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
  summary: "",
  education: "",
  experience: "",
  projects: "",
  skills: "",
  languages: "",
  certificates: "",
};

const steps = [
  "Profile",
  "Education",
  "Experience",
  "Projects",
  "Skills",
  "Languages",
  "Certificates",
] as const;

type Step = (typeof steps)[number];

function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildSmartBullets(
  role: string,
  skill: string,
  impact: string,
  context: string,
) {
  const safeRole = role || "professional";
  const safeSkill = skill || "core skill";
  const safeImpact = impact || "measurable improvement";
  const safeContext = context || "team objectives";

  return [
    `Delivered ${safeImpact} by applying ${safeSkill} as a ${safeRole} in ${safeContext}.`,
    `Led ${safeContext} initiatives as ${safeRole}, using ${safeSkill} to achieve ${safeImpact}.`,
    `Optimized workflows in ${safeContext} through ${safeSkill}, resulting in ${safeImpact}.`,
    `Collaborated cross-functionally as ${safeRole} and leveraged ${safeSkill} to drive ${safeImpact}.`,
    `Built repeatable processes in ${safeContext}; translated ${safeSkill} into ${safeImpact}.`,
  ];
}

function sectionTitleClass(template: TemplateStyle) {
  if (template === "modern") return "text-sm font-bold uppercase tracking-[0.12em] text-[#4f46e5]";
  if (template === "classic") return "text-base font-semibold text-slate-900";
  return "text-sm font-semibold uppercase tracking-[0.12em] text-slate-900";
}

export default function CVBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>("Profile");
  const [template, setTemplate] = useState<TemplateStyle>("minimal");
  const [data, setData] = useState<CVData>(defaultData);

  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [impact, setImpact] = useState("");
  const [context, setContext] = useState("");
  const [smartBullets, setSmartBullets] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as CVData;
      setData({ ...defaultData, ...parsed });
    } catch {
      // ignore invalid local storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateField = (key: keyof CVData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const previewClasses = useMemo(() => {
    if (template === "modern") {
      return "border-indigo-100 bg-gradient-to-br from-white to-indigo-50";
    }
    if (template === "classic") {
      return "border-slate-300 bg-white";
    }
    return "border-slate-200 bg-white";
  }, [template]);

  const handleGenerateBullets = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSmartBullets(buildSmartBullets(role, skill, impact, context));
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <div className="section-card p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            CV Builder
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Build your CV with a guided multi-step flow and live preview.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {steps.map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  currentStep === step
                    ? "bg-[#4f46e5] text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        <div className="section-card p-6">
          {currentStep === "Profile" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.location}
                  onChange={(event) => updateField("location", event.target.value)}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Headline
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.headline}
                  onChange={(event) => updateField("headline", event.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Professional summary
                </label>
                <textarea
                  className="h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                  value={data.summary}
                  onChange={(event) => updateField("summary", event.target.value)}
                />
              </div>
            </div>
          ) : null}

          {currentStep !== "Profile" ? (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {currentStep}
              </label>
              <textarea
                className="h-40 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
                placeholder={`Add ${currentStep.toLowerCase()} details. Use one line per bullet or entry.`}
                value={
                  currentStep === "Education"
                    ? data.education
                    : currentStep === "Experience"
                      ? data.experience
                      : currentStep === "Projects"
                        ? data.projects
                        : currentStep === "Skills"
                          ? data.skills
                          : currentStep === "Languages"
                            ? data.languages
                            : data.certificates
                }
                onChange={(event) => {
                  const value = event.target.value;
                  if (currentStep === "Education") updateField("education", value);
                  if (currentStep === "Experience") updateField("experience", value);
                  if (currentStep === "Projects") updateField("projects", value);
                  if (currentStep === "Skills") updateField("skills", value);
                  if (currentStep === "Languages") updateField("languages", value);
                  if (currentStep === "Certificates") updateField("certificates", value);
                }}
              />
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onPrint}
              className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
            >
              Export to PDF
            </button>
            <button
              type="button"
              onClick={() => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5]"
            >
              Save Draft
            </button>
            <ComingSoonButton label="Improve Bullet Points (AI Soon)" />
            <ComingSoonButton label="Generate Summary (AI Soon)" />
            <ComingSoonButton label="Tailor CV to Job (AI Soon)" />
          </div>
        </div>

        <div className="section-card p-6">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Smart Bullet Generator
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Rule-based bullet generation. No AI required.
          </p>
          <form onSubmit={handleGenerateBullets} className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              placeholder="Role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              placeholder="Skill"
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
            />
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              placeholder="Impact metric"
              value={impact}
              onChange={(event) => setImpact(event.target.value)}
            />
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              placeholder="Context"
              value={context}
              onChange={(event) => setContext(event.target.value)}
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
              >
                Generate 5 Bullets
              </button>
            </div>
          </form>

          {smartBullets.length ? (
            <div className="mt-5 space-y-3">
              {smartBullets.map((bullet, index) => (
                <div key={bullet} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm leading-7 text-slate-700">
                    {index + 1}. {bullet}
                  </p>
                  <CopyButton text={bullet} className="mt-3" label="Copy bullet" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <aside className={`section-card sticky top-36 h-fit p-6 ${previewClasses}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {(["minimal", "modern", "classic"] as TemplateStyle[]).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setTemplate(style)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase ${
                template === style
                  ? "bg-[#4f46e5] text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[210mm] rounded-xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {data.fullName || "Your Name"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {[data.headline, data.location].filter(Boolean).join(" | ") || "Professional Headline"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {[data.email, data.phone].filter(Boolean).join(" | ")}
          </p>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Summary</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {data.summary || "Write a short, impact-focused professional summary."}
            </p>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Experience</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {splitLines(data.experience).length
                ? splitLines(data.experience).map((item) => <li key={item}>{item}</li>)
                : [<li key="exp-placeholder">Add experience bullet points.</li>]}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Education</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {splitLines(data.education).length
                ? splitLines(data.education).map((item) => <li key={item}>{item}</li>)
                : [<li key="edu-placeholder">Add education entries.</li>]}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Projects</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {splitLines(data.projects).length
                ? splitLines(data.projects).map((item) => <li key={item}>{item}</li>)
                : [<li key="proj-placeholder">Add project highlights.</li>]}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Skills</h3>
            <p className="mt-2 text-sm text-slate-700">
              {splitLines(data.skills).join(", ") || "Add skills"}
            </p>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Languages</h3>
            <p className="mt-2 text-sm text-slate-700">
              {splitLines(data.languages).join(", ") || "Add languages"}
            </p>
          </section>

          <section className="mt-4">
            <h3 className={sectionTitleClass(template)}>Certificates</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {splitLines(data.certificates).length
                ? splitLines(data.certificates).map((item) => <li key={item}>{item}</li>)
                : [<li key="cert-placeholder">Add certificates</li>]}
            </ul>
          </section>
        </div>
      </aside>
    </section>
  );
}
