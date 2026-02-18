"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

const goalOptions = [
  "Study",
  "Business",
  "Writing",
  "Coding",
  "Productivity",
  "Interview Prep",
];

const toneOptions = ["Professional", "Friendly", "Academic", "Persuasive", "Concise"];
const formatOptions = ["Bullet Points", "Step-by-step", "Table", "Narrative", "Checklist"];
const lengthOptions = ["Short", "Medium", "Long"];

export default function PromptBuilder() {
  const [goal, setGoal] = useState(goalOptions[0]);
  const [tone, setTone] = useState(toneOptions[0]);
  const [format, setFormat] = useState(formatOptions[0]);
  const [length, setLength] = useState(lengthOptions[1]);
  const [context, setContext] = useState("");

  const generatedPrompt = useMemo(() => {
    return [
      `Act as an expert assistant for ${goal.toLowerCase()}.`,
      `Use a ${tone.toLowerCase()} tone.`,
      `Return the answer in ${format.toLowerCase()} format.`,
      `Keep the response ${length.toLowerCase()}.`,
      "Prioritize actionable, globally relevant recommendations.",
      context ? `Context: ${context}` : "",
      "Before finalizing, include a quick quality-check checklist.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [goal, tone, format, length, context]);

  return (
    <section className="space-y-6">
      <div className="section-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Prompt Builder (Smart Mode)
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Create structured high-quality prompts using rule-based generation.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Goal</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            >
              {goalOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tone</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
            >
              {toneOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Format</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={format}
              onChange={(event) => setFormat(event.target.value)}
            >
              {formatOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Length</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
              value={length}
              onChange={(event) => setLength(event.target.value)}
            >
              {lengthOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Additional Context
          </label>
          <textarea
            className="h-24 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#4f46e5]"
            placeholder="Optional context to personalize the prompt..."
            value={context}
            onChange={(event) => setContext(event.target.value)}
          />
        </div>
      </div>

      <section className="section-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h3 className="text-base font-semibold text-slate-900">Generated Prompt</h3>
          <CopyButton text={generatedPrompt} label="Copy prompt" />
        </div>
        <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-700">
          <code>{generatedPrompt}</code>
        </pre>
      </section>
    </section>
  );
}
