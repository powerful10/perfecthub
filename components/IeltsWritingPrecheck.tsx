"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ComingSoonButton from "@/components/ComingSoonButton";

const LINKING_WORDS = [
  "however",
  "therefore",
  "moreover",
  "furthermore",
  "in addition",
  "on the other hand",
  "for example",
  "in conclusion",
];

function countWords(text: string) {
  return (text.match(/\b[\w'-]+\b/g) ?? []).length;
}

function countParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean).length;
}

function getBandRange(
  wordCount: number,
  hasWordTarget: boolean,
  ttr: number,
  repeatedCount: number,
  linkingCount: number,
  task: "task1" | "task2",
) {
  let score = 5.0;
  if (hasWordTarget) score += 0.7;
  if (ttr >= 0.45) score += 0.4;
  if (linkingCount >= (task === "task2" ? 4 : 2)) score += 0.4;
  if (repeatedCount <= 6) score += 0.3;
  if (wordCount >= (task === "task2" ? 320 : 190)) score += 0.2;

  const low = Math.max(4.0, Math.min(8.0, score - 0.5));
  const high = Math.max(low + 0.5, Math.min(8.5, score + 0.5));

  return `${low.toFixed(1)} - ${high.toFixed(1)}`;
}

export default function IeltsWritingPrecheck() {
  const [task, setTask] = useState<"task1" | "task2">("task2");
  const [essay, setEssay] = useState("");

  const analysis = useMemo(() => {
    const words = countWords(essay);
    const paragraphs = countParagraphs(essay);

    const tokens = (essay.toLowerCase().match(/\b[a-z']+\b/g) ?? []).filter(
      (token) => token.length > 2,
    );
    const unique = new Set(tokens);
    const ttr = tokens.length ? unique.size / tokens.length : 0;

    const freq = new Map<string, number>();
    tokens.forEach((token) => freq.set(token, (freq.get(token) ?? 0) + 1));
    const repeated = Array.from(freq.entries()).filter(([, count]) => count >= 4);

    const lowerEssay = essay.toLowerCase();
    const linkingCount = LINKING_WORDS.reduce((count, linkingWord) => {
      const regex = new RegExp(`\\b${linkingWord.replace(/\s+/g, "\\\\s+")}\\b`, "g");
      return count + (lowerEssay.match(regex)?.length ?? 0);
    }, 0);

    const minWords = task === "task1" ? 150 : 250;
    const hasWordTarget = words >= minWords;

    const checklist = [
      { label: `Word count target (${minWords}+ words)`, ok: hasWordTarget },
      { label: "Vocabulary variety (TTR >= 0.40)", ok: ttr >= 0.4 },
      {
        label: task === "task2" ? "4+ paragraphs recommended" : "2+ paragraphs recommended",
        ok: paragraphs >= (task === "task2" ? 4 : 2),
      },
      {
        label: "Linking words used",
        ok: linkingCount >= (task === "task2" ? 4 : 2),
      },
    ];

    const improvements: string[] = [];
    if (!hasWordTarget) improvements.push(`Increase word count to at least ${minWords}.`);
    if (paragraphs < (task === "task2" ? 4 : 2)) {
      improvements.push("Improve paragraph structure for clearer organization.");
    }
    if (linkingCount < (task === "task2" ? 4 : 2)) {
      improvements.push("Use more linking words to strengthen cohesion.");
    }
    if (ttr < 0.4) {
      improvements.push("Expand vocabulary variety and avoid repeating the same words.");
    }
    if (repeated.length > 8) {
      improvements.push("Replace repeated words with synonyms.");
    }
    if (!improvements.length) {
      improvements.push("Strong baseline. Focus on argument depth and lexical precision.");
    }

    const bandRange = getBandRange(
      words,
      hasWordTarget,
      ttr,
      repeated.length,
      linkingCount,
      task,
    );

    return {
      words,
      paragraphs,
      linkingCount,
      ttr,
      repeated,
      checklist,
      improvements,
      bandRange,
    };
  }, [essay, task]);

  return (
    <section className="space-y-6">
      <div className="section-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          IELTS Writing Precheck (Smart Mode)
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Heuristic feedback only. This is not an official IELTS score.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTask("task1")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              task === "task1"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            Task 1
          </button>
          <button
            type="button"
            onClick={() => setTask("task2")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              task === "task2"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            Task 2
          </button>
        </div>
        <textarea
          className="mt-5 h-72 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-[#4f46e5]"
          placeholder={`Paste IELTS ${task === "task1" ? "Task 1" : "Task 2"} response...`}
          value={essay}
          onChange={(event) => setEssay(event.target.value)}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <ComingSoonButton label="AI Band Estimator (Soon)" />
          <ComingSoonButton label="Band-9 Rewrite (AI Soon)" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Word Count</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.words}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Paragraphs</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.paragraphs}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Linking Words</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.linkingCount}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Estimated Band</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.bandRange}</p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="section-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Checklist</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {analysis.checklist.map((item) => (
              <li key={item.label} className="flex items-start gap-2">
                <span className={item.ok ? "text-emerald-600" : "text-rose-600"}>
                  {item.ok ? "OK" : "Fix"}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            Top Improvements
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {analysis.improvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Vocabulary variety (type/token ratio): {analysis.ttr.toFixed(2)}
          </p>
        </section>
      </div>

      <section className="section-card p-6">
        <p className="text-sm leading-7 text-slate-600">
          Disclaimer: This precheck provides estimated heuristics only and is not an
          official IELTS assessment. Read full details on{" "}
          <Link href="/disclaimer" className="font-semibold text-[#4f46e5]">
            Disclaimer
          </Link>
          .
        </p>
      </section>
    </section>
  );
}
