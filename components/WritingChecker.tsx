"use client";

import { useMemo, useState } from "react";
import ComingSoonButton from "@/components/ComingSoonButton";

const OVERUSED_WORDS = [
  "very",
  "really",
  "good",
  "bad",
  "things",
  "stuff",
  "nice",
  "amazing",
];

function sentenceSplit(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function wordCount(text: string) {
  return (text.match(/\b[\w'-]+\b/g) ?? []).length;
}

function syllableEstimate(word: string) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  const matches = clean.match(/[aeiouy]+/g);
  return Math.max(1, matches?.length ?? 1);
}

function readabilityScore(text: string) {
  const words = text.match(/\b[\w'-]+\b/g) ?? [];
  const sentences = sentenceSplit(text);
  if (!words.length || !sentences.length) {
    return 0;
  }
  const syllables = words.reduce((sum, word) => sum + syllableEstimate(word), 0);
  return 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
}

function highlightText(text: string) {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/ {2,}/g, '<mark class="rounded bg-amber-100 px-1">$&</mark>');
  html = html.replace(
    /\b(very|really|good|bad|things|stuff|nice|amazing)\b/gi,
    '<mark class="rounded bg-indigo-100 px-1">$1</mark>',
  );

  return html;
}

export default function WritingChecker() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const words = wordCount(text);
    const sentences = sentenceSplit(text);
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean).length;
    const readTimeMinutes = words / 200;

    const longSentenceIssues = sentences
      .map((sentence) => ({ sentence, count: wordCount(sentence) }))
      .filter((item) => item.count > 25);

    const tokens = (text.toLowerCase().match(/\b[a-z']+\b/g) ?? []).filter(
      (token) => token.length > 2,
    );
    const frequency = new Map<string, number>();
    tokens.forEach((token) => {
      frequency.set(token, (frequency.get(token) ?? 0) + 1);
    });

    const repeatedWords = Array.from(frequency.entries())
      .filter(([, count]) => count >= 4)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const overused = OVERUSED_WORDS.map((word) => ({
      word,
      count: frequency.get(word) ?? 0,
    })).filter((entry) => entry.count > 0);

    const doubleSpaces = (text.match(/ {2,}/g) ?? []).length;

    const linesMissingPunctuation = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !/[.!?]$/.test(line));

    const passiveMatches = text.match(
      /\b(?:was|were|is|are|been|be)\s+\w+(?:ed|en)\b/gi,
    ) ?? [];

    const suggestions: string[] = [];
    if (longSentenceIssues.length) {
      suggestions.push("Split long sentences into shorter units for clarity.");
    }
    if (repeatedWords.length) {
      suggestions.push("Replace frequently repeated words with alternatives.");
    }
    if (doubleSpaces > 0) {
      suggestions.push("Remove double spaces to improve readability.");
    }
    if (linesMissingPunctuation.length) {
      suggestions.push("Add punctuation at the end of unfinished lines.");
    }
    if (passiveMatches.length) {
      suggestions.push("Use active voice where possible for stronger writing.");
    }
    if (!suggestions.length) {
      suggestions.push("Writing looks clean. Keep refining tone and precision.");
    }

    return {
      words,
      sentences: sentences.length,
      paragraphs,
      readTimeMinutes,
      longSentenceIssues,
      repeatedWords,
      overused,
      doubleSpaces,
      linesMissingPunctuation,
      passiveMatches,
      readability: readabilityScore(text),
      suggestions,
    };
  }, [text]);

  return (
    <section className="space-y-6">
      <div className="section-card p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Smart Writing Checker
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Heuristic quality checks for clarity, repetition, readability, and structure.
        </p>
        <textarea
          className="mt-5 h-64 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-[#4f46e5]"
          placeholder="Paste your writing here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <ComingSoonButton label="Fix Grammar (AI Soon)" />
          <ComingSoonButton label="Rewrite Style (AI Soon)" />
          <ComingSoonButton label="Make Concise (AI Soon)" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Words</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.words}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Sentences</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.sentences}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Paragraphs</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{analysis.paragraphs}</p>
        </div>
        <div className="section-card p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Reading Time</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {analysis.readTimeMinutes.toFixed(1)} min
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="section-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Issues</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Long sentences: {analysis.longSentenceIssues.length}</li>
            <li>Repeated words: {analysis.repeatedWords.length}</li>
            <li>Overused words found: {analysis.overused.length}</li>
            <li>Double spaces: {analysis.doubleSpaces}</li>
            <li>Lines missing punctuation: {analysis.linesMissingPunctuation.length}</li>
            <li>Passive voice clues: {analysis.passiveMatches.length}</li>
            <li>Readability score (Flesch): {analysis.readability.toFixed(1)}</li>
          </ul>
          {analysis.repeatedWords.length ? (
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Repeated Words
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {analysis.repeatedWords.map(([word, count]) => `${word} (${count})`).join(", ")}
              </p>
            </div>
          ) : null}
        </section>

        <section className="section-card p-6">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">Suggestions</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {analysis.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section-card p-6">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          Highlighted Text
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          Highlighting marks overused words and double spaces.
        </p>
        <div
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700"
          dangerouslySetInnerHTML={{ __html: highlightText(text || "No text yet.") }}
        />
      </section>
    </section>
  );
}
