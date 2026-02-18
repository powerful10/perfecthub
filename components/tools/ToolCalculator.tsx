"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ToolType } from "@/lib/content";

type ToolCalculatorProps = {
  toolType?: ToolType;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#4f46e5]";
const labelClass = "mb-2 block text-sm font-medium text-slate-700";
const actionClass =
  "rounded-xl bg-[#4f46e5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]";

const GRADE_POINTS = [
  { label: "A+", points: 4.0 },
  { label: "A", points: 4.0 },
  { label: "A-", points: 3.7 },
  { label: "B+", points: 3.3 },
  { label: "B", points: 3.0 },
  { label: "B-", points: 2.7 },
  { label: "C+", points: 2.3 },
  { label: "C", points: 2.0 },
  { label: "C-", points: 1.7 },
  { label: "D+", points: 1.3 },
  { label: "D", points: 1.0 },
  { label: "F", points: 0.0 },
] as const;

const TIME_ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Moscow",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function getLetterGrade(percentage: number) {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}

function formatDateInput(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDateTimeInput(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function getTimeZoneOffsetMinutes(timeZone: string, date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  });

  const zoneName =
    formatter.formatToParts(date).find((part) => part.type === "timeZoneName")
      ?.value ?? "GMT+0";
  const match = zoneName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);

  if (!match) {
    return 0;
  }

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? "0");
  return sign * (hours * 60 + minutes);
}

function zonedDateTimeToUtc(localDateTime: string, timeZone: string) {
  const [datePart, timePart] = localDateTime.split("T");
  if (!datePart || !timePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  if ([year, month, day, hour, minute].some((value) => Number.isNaN(value))) {
    return null;
  }

  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute);
  let adjustedUtc = naiveUtc;

  for (let i = 0; i < 2; i += 1) {
    const offset = getTimeZoneOffsetMinutes(timeZone, new Date(adjustedUtc));
    adjustedUtc = naiveUtc - offset * 60_000;
  }

  return new Date(adjustedUtc);
}

function formatInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function ResultCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
        {title}
      </h3>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-600">{hint}</p> : null}
    </div>
  );
}

function GpaCalculator() {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("A");
  const [credits, setCredits] = useState("3");
  const [rows, setRows] = useState<
    { id: string; subject: string; grade: string; points: number; credits: number }[]
  >([]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [error, setError] = useState("");

  const totalCredits = useMemo(
    () => rows.reduce((sum, row) => sum + row.credits, 0),
    [rows],
  );

  const addSubject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = GRADE_POINTS.find((entry) => entry.label === grade);
    const parsedCredits = Number(credits);

    if (!subject.trim()) {
      setError("Enter a subject name.");
      return;
    }
    if (!selected || Number.isNaN(parsedCredits) || parsedCredits <= 0) {
      setError("Enter a valid grade and credits.");
      return;
    }

    setRows((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        subject: subject.trim(),
        grade: selected.label,
        points: selected.points,
        credits: parsedCredits,
      },
    ]);
    setSubject("");
    setCredits("3");
    setError("");
  };

  const calculate = () => {
    if (!rows.length || totalCredits <= 0) {
      setError("Add at least one subject.");
      setGpa(null);
      return;
    }
    const weighted = rows.reduce((sum, row) => sum + row.points * row.credits, 0);
    setGpa(weighted / totalCredits);
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect GPA Calculator</h2>
      <form onSubmit={addSubject} className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div>
          <label className={labelClass} htmlFor="gpa-subject">
            Subject
          </label>
          <input
            id="gpa-subject"
            className={inputClass}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Mathematics"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="gpa-grade">
            Grade
          </label>
          <select
            id="gpa-grade"
            className={inputClass}
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          >
            {GRADE_POINTS.map((entry) => (
              <option key={entry.label} value={entry.label}>
                {entry.label} ({entry.points.toFixed(1)})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="gpa-credits">
            Credits
          </label>
          <input
            id="gpa-credits"
            className={inputClass}
            type="number"
            min="0.5"
            step="0.5"
            value={credits}
            onChange={(event) => setCredits(event.target.value)}
          />
        </div>
        <div className="md:self-end">
          <button type="submit" className={`${actionClass} w-full`}>
            Add Subject
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Credits</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{row.subject}</td>
                  <td className="px-4 py-3">
                    {row.grade} ({row.points.toFixed(1)})
                  </td>
                  <td className="px-4 py-3">{row.credits.toFixed(1)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600"
                      onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-slate-500">
                  No subjects added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" className={actionClass} onClick={calculate}>
          Calculate GPA
        </button>
        <p className="text-sm text-slate-600">Total Credits: {totalCredits.toFixed(1)}</p>
      </div>

      {gpa !== null ? <ResultCard title="GPA Result" value={gpa.toFixed(2)} /> : null}
    </section>
  );
}

function IeltsCalculator() {
  const [scores, setScores] = useState({
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });
  const [result, setResult] = useState<{ average: number; band: number } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.values(scores).map(Number);

    if (values.some((value) => Number.isNaN(value) || value < 0 || value > 9)) {
      setError("Each score must be between 0 and 9.");
      setResult(null);
      return;
    }

    const average = values.reduce((sum, value) => sum + value, 0) / 4;
    const band = Math.round(average * 2) / 2;
    setResult({ average, band });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Perfect IELTS Calculator
      </h2>
      <form onSubmit={calculate} className="mt-6 grid gap-4 md:grid-cols-2">
        {(
          [
            ["listening", "Listening"],
            ["reading", "Reading"],
            ["writing", "Writing"],
            ["speaking", "Speaking"],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className={labelClass} htmlFor={`ielts-${key}`}>
              {label}
            </label>
            <input
              id={`ielts-${key}`}
              className={inputClass}
              type="number"
              min="0"
              max="9"
              step="0.5"
              value={scores[key]}
              onChange={(event) =>
                setScores((current) => ({ ...current, [key]: event.target.value }))
              }
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <button type="submit" className={actionClass}>
            Calculate Overall Band
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard title="Overall Band" value={result.band.toFixed(1)} />
          <ResultCard
            title="Average (Before Rounding)"
            value={result.average.toFixed(2)}
          />
        </div>
      ) : null}
    </section>
  );
}

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(formatDateInput(new Date()));
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (!birthDate || Number.isNaN(birth.getTime())) {
      setError("Select a valid birth date.");
      setResult(null);
      return;
    }
    if (!targetDate || Number.isNaN(target.getTime())) {
      setError("Select a valid target date.");
      setResult(null);
      return;
    }
    if (birth > target) {
      setError("Birth date cannot be after target date.");
      setResult(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonthDays = new Date(
        target.getFullYear(),
        target.getMonth(),
        0,
      ).getDate();
      days += previousMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor(
      (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
    );

    setResult({ years, months, days, totalDays });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect Age Calculator</h2>
      <form onSubmit={calculate} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="age-birth">
            Birth date
          </label>
          <input
            id="age-birth"
            type="date"
            className={inputClass}
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="age-target">
            Calculate age on
          </label>
          <input
            id="age-target"
            type="date"
            className={inputClass}
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className={actionClass}>
            Calculate Age
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard
            title="Age"
            value={`${result.years} years, ${result.months} months, ${result.days} days`}
          />
          <ResultCard title="Total Days Lived" value={result.totalDays.toLocaleString()} />
        </div>
      ) : null}
    </section>
  );
}
function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (
      Number.isNaN(weightValue) ||
      Number.isNaN(heightValue) ||
      weightValue <= 0 ||
      heightValue <= 0
    ) {
      setError("Enter valid height and weight values.");
      setResult(null);
      return;
    }

    const bmi =
      unit === "metric"
        ? weightValue / (heightValue / 100) ** 2
        : (weightValue / heightValue ** 2) * 703;

    let category = "Obese";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Healthy";
    else if (bmi < 30) category = "Overweight";

    setResult({ bmi, category });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect BMI Calculator</h2>
      <form onSubmit={calculate} className="mt-6 space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              unit === "metric"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
            onClick={() => setUnit("metric")}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              unit === "imperial"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
            onClick={() => setUnit("imperial")}
          >
            Imperial (lb, in)
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="bmi-weight">
              Weight ({unit === "metric" ? "kg" : "lb"})
            </label>
            <input
              id="bmi-weight"
              className={inputClass}
              type="number"
              min="1"
              step="0.1"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="bmi-height">
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              id="bmi-height"
              className={inputClass}
              type="number"
              min="1"
              step="0.1"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={actionClass}>
          Calculate BMI
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard title="BMI" value={result.bmi.toFixed(2)} />
          <ResultCard title="Category" value={result.category} />
        </div>
      ) : null}
    </section>
  );
}

function GradeCalculator() {
  const [earned, setEarned] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<{ percentage: number; letter: string } | null>(
    null,
  );
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const earnedValue = Number(earned);
    const totalValue = Number(total);

    if (
      Number.isNaN(earnedValue) ||
      Number.isNaN(totalValue) ||
      totalValue <= 0 ||
      earnedValue < 0 ||
      earnedValue > totalValue
    ) {
      setError("Enter valid earned and total points.");
      setResult(null);
      return;
    }

    const percentage = (earnedValue / totalValue) * 100;
    const letter = getLetterGrade(percentage);
    setResult({ percentage, letter });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect Grade Calculator</h2>
      <form onSubmit={calculate} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="grade-earned">
            Earned points
          </label>
          <input
            id="grade-earned"
            className={inputClass}
            type="number"
            min="0"
            step="0.1"
            value={earned}
            onChange={(event) => setEarned(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="grade-total">
            Total points
          </label>
          <input
            id="grade-total"
            className={inputClass}
            type="number"
            min="0"
            step="0.1"
            value={total}
            onChange={(event) => setTotal(event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className={actionClass}>
            Calculate Grade
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard title="Percentage" value={`${result.percentage.toFixed(2)}%`} />
          <ResultCard title="Letter Grade" value={result.letter} />
        </div>
      ) : null}
    </section>
  );
}

function PercentageCalculator() {
  const [xPercent, setXPercent] = useState("");
  const [ofValue, setOfValue] = useState("");
  const [partValue, setPartValue] = useState("");
  const [wholeValue, setWholeValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [result, setResult] = useState<{
    percentOf: number;
    percentWhat: number;
    percentChange: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const p = Number(xPercent);
    const y = Number(ofValue);
    const part = Number(partValue);
    const whole = Number(wholeValue);
    const from = Number(fromValue);
    const to = Number(toValue);

    if (
      [p, y, part, whole, from, to].some((value) => Number.isNaN(value)) ||
      whole === 0 ||
      from === 0
    ) {
      setError("Fill all values and avoid zero in denominators.");
      setResult(null);
      return;
    }

    setResult({
      percentOf: (p / 100) * y,
      percentWhat: (part / whole) * 100,
      percentChange: ((to - from) / from) * 100,
    });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Perfect Percentage Calculator
      </h2>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="per-p">
              What is X% of Y? (X)
            </label>
            <input
              id="per-p"
              className={inputClass}
              type="number"
              value={xPercent}
              onChange={(event) => setXPercent(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="per-y">
              What is X% of Y? (Y)
            </label>
            <input
              id="per-y"
              className={inputClass}
              type="number"
              value={ofValue}
              onChange={(event) => setOfValue(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="per-part">
              X is what % of Y? (X)
            </label>
            <input
              id="per-part"
              className={inputClass}
              type="number"
              value={partValue}
              onChange={(event) => setPartValue(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="per-whole">
              X is what % of Y? (Y)
            </label>
            <input
              id="per-whole"
              className={inputClass}
              type="number"
              value={wholeValue}
              onChange={(event) => setWholeValue(event.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="per-from">
              Percentage change from
            </label>
            <input
              id="per-from"
              className={inputClass}
              type="number"
              value={fromValue}
              onChange={(event) => setFromValue(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="per-to">
              Percentage change to
            </label>
            <input
              id="per-to"
              className={inputClass}
              type="number"
              value={toValue}
              onChange={(event) => setToValue(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={actionClass}>
          Calculate Percentages
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <ResultCard title="X% of Y" value={result.percentOf.toFixed(2)} />
          <ResultCard title="X is What % of Y" value={`${result.percentWhat.toFixed(2)}%`} />
          <ResultCard
            title="Percentage Change"
            value={`${result.percentChange.toFixed(2)}%`}
          />
        </div>
      ) : null}
    </section>
  );
}

function StudyTimeCalculator() {
  const [totalHours, setTotalHours] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [dailyAvailable, setDailyAvailable] = useState("");
  const [result, setResult] = useState<{
    dailyNeeded: number;
    weeklyNeeded: number;
    feasible: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const total = Number(totalHours);
    const days = Number(daysLeft);
    const daily = Number(dailyAvailable);

    if (
      [total, days, daily].some((value) => Number.isNaN(value) || value <= 0)
    ) {
      setError("Enter positive values for all fields.");
      setResult(null);
      return;
    }

    const dailyNeeded = total / days;
    const weeklyNeeded = dailyNeeded * 7;
    setResult({ dailyNeeded, weeklyNeeded, feasible: dailyNeeded <= daily });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Perfect Study Time Calculator
      </h2>
      <form onSubmit={calculate} className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="study-total">
            Total study hours needed
          </label>
          <input
            id="study-total"
            className={inputClass}
            type="number"
            min="1"
            step="0.5"
            value={totalHours}
            onChange={(event) => setTotalHours(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="study-days">
            Days until deadline
          </label>
          <input
            id="study-days"
            className={inputClass}
            type="number"
            min="1"
            value={daysLeft}
            onChange={(event) => setDaysLeft(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="study-available">
            Daily hours available
          </label>
          <input
            id="study-available"
            className={inputClass}
            type="number"
            min="0.5"
            step="0.5"
            value={dailyAvailable}
            onChange={(event) => setDailyAvailable(event.target.value)}
          />
        </div>
        <div className="md:col-span-3">
          <button type="submit" className={actionClass}>
            Build Study Plan
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ResultCard title="Daily Hours Needed" value={result.dailyNeeded.toFixed(2)} />
          <ResultCard title="Weekly Hours Needed" value={result.weeklyNeeded.toFixed(2)} />
          <ResultCard
            title="Plan Status"
            value={result.feasible ? "Feasible" : "Needs More Time"}
            hint={
              result.feasible
                ? "Your current daily availability is enough."
                : "Increase daily study time or extend your timeline."
            }
          />
        </div>
      ) : null}
    </section>
  );
}
function SalaryCalculator() {
  const [mode, setMode] = useState<"hourly" | "annual">("hourly");
  const [hourlyRate, setHourlyRate] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<{
    hourly: number;
    weekly: number;
    monthly: number;
    annual: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hours = Number(hoursPerWeek);
    const weeks = Number(weeksPerYear);

    if ([hours, weeks].some((value) => Number.isNaN(value) || value <= 0)) {
      setError("Hours per week and weeks per year must be positive.");
      setResult(null);
      return;
    }

    if (mode === "hourly") {
      const hourly = Number(hourlyRate);
      if (Number.isNaN(hourly) || hourly <= 0) {
        setError("Enter a valid hourly rate.");
        setResult(null);
        return;
      }
      const annual = hourly * hours * weeks;
      setResult({
        hourly,
        weekly: hourly * hours,
        monthly: annual / 12,
        annual,
      });
    } else {
      const annual = Number(annualSalary);
      if (Number.isNaN(annual) || annual <= 0) {
        setError("Enter a valid annual salary.");
        setResult(null);
        return;
      }
      const hourly = annual / (hours * weeks);
      setResult({
        hourly,
        weekly: annual / weeks,
        monthly: annual / 12,
        annual,
      });
    }

    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect Salary Calculator</h2>
      <form onSubmit={calculate} className="mt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("hourly")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "hourly"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            Hourly to Salary
          </button>
          <button
            type="button"
            onClick={() => setMode("annual")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "annual"
                ? "bg-[#4f46e5] text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            Salary to Hourly
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {mode === "hourly" ? (
            <div>
              <label className={labelClass} htmlFor="salary-hourly">
                Hourly rate
              </label>
              <input
                id="salary-hourly"
                className={inputClass}
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
              />
            </div>
          ) : (
            <div>
              <label className={labelClass} htmlFor="salary-annual">
                Annual salary
              </label>
              <input
                id="salary-annual"
                className={inputClass}
                type="number"
                min="0"
                step="1"
                value={annualSalary}
                onChange={(event) => setAnnualSalary(event.target.value)}
              />
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="salary-hours">
              Hours per week
            </label>
            <input
              id="salary-hours"
              className={inputClass}
              type="number"
              min="1"
              step="1"
              value={hoursPerWeek}
              onChange={(event) => setHoursPerWeek(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="salary-weeks">
              Weeks per year
            </label>
            <input
              id="salary-weeks"
              className={inputClass}
              type="number"
              min="1"
              step="1"
              value={weeksPerYear}
              onChange={(event) => setWeeksPerYear(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={actionClass}>
          Calculate Salary
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ResultCard title="Hourly" value={`$${result.hourly.toFixed(2)}`} />
          <ResultCard title="Weekly" value={`$${result.weekly.toFixed(2)}`} />
          <ResultCard title="Monthly" value={`$${result.monthly.toFixed(2)}`} />
          <ResultCard title="Annual" value={`$${result.annual.toFixed(2)}`} />
        </div>
      ) : null}
    </section>
  );
}

function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const principalValue = Number(principal);
    const annualRate = Number(interestRate);
    const yearsValue = Number(years);

    if (
      [principalValue, annualRate, yearsValue].some((value) => Number.isNaN(value)) ||
      principalValue <= 0 ||
      yearsValue <= 0 ||
      annualRate < 0
    ) {
      setError("Enter valid loan values.");
      setResult(null);
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = yearsValue * 12;

    const monthlyPayment =
      monthlyRate === 0
        ? principalValue / months
        : (principalValue *
            monthlyRate *
            (1 + monthlyRate) ** months) /
          ((1 + monthlyRate) ** months - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principalValue;
    setResult({ monthlyPayment, totalPayment, totalInterest });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Perfect Loan Calculator</h2>
      <form onSubmit={calculate} className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="loan-principal">
            Loan amount
          </label>
          <input
            id="loan-principal"
            className={inputClass}
            type="number"
            min="1"
            value={principal}
            onChange={(event) => setPrincipal(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="loan-rate">
            Annual interest rate (%)
          </label>
          <input
            id="loan-rate"
            className={inputClass}
            type="number"
            min="0"
            step="0.01"
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="loan-years">
            Loan term (years)
          </label>
          <input
            id="loan-years"
            className={inputClass}
            type="number"
            min="1"
            step="1"
            value={years}
            onChange={(event) => setYears(event.target.value)}
          />
        </div>
        <div className="md:col-span-3">
          <button type="submit" className={actionClass}>
            Calculate Loan
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ResultCard title="Monthly Payment" value={`$${result.monthlyPayment.toFixed(2)}`} />
          <ResultCard title="Total Payment" value={`$${result.totalPayment.toFixed(2)}`} />
          <ResultCard title="Total Interest" value={`$${result.totalInterest.toFixed(2)}`} />
        </div>
      ) : null}
    </section>
  );
}

function TimeZoneConverter() {
  const [dateTime, setDateTime] = useState(formatDateTimeInput(new Date()));
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [result, setResult] = useState<{
    fromFormatted: string;
    toFormatted: string;
  } | null>(null);
  const [error, setError] = useState("");

  const convert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const utcDate = zonedDateTimeToUtc(dateTime, fromZone);

    if (!utcDate || Number.isNaN(utcDate.getTime())) {
      setError("Enter a valid date and time.");
      setResult(null);
      return;
    }

    setResult({
      fromFormatted: formatInTimeZone(utcDate, fromZone),
      toFormatted: formatInTimeZone(utcDate, toZone),
    });
    setError("");
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Perfect Time Zone Converter
      </h2>
      <form onSubmit={convert} className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="tz-datetime">
            Date and time
          </label>
          <input
            id="tz-datetime"
            className={inputClass}
            type="datetime-local"
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="tz-from">
            From time zone
          </label>
          <select
            id="tz-from"
            className={inputClass}
            value={fromZone}
            onChange={(event) => setFromZone(event.target.value)}
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="tz-to">
            To time zone
          </label>
          <select
            id="tz-to"
            className={inputClass}
            value={toZone}
            onChange={(event) => setToZone(event.target.value)}
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <button type="submit" className={actionClass}>
            Convert Time Zone
          </button>
        </div>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ResultCard title={`Time in ${fromZone}`} value={result.fromFormatted} />
          <ResultCard title={`Time in ${toZone}`} value={result.toFormatted} />
        </div>
      ) : null}
    </section>
  );
}

function UnitConverter() {
  const [category, setCategory] = useState<"length" | "weight" | "temperature">(
    "length",
  );
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const units = useMemo(() => {
    if (category === "length") {
      return [
        { key: "m", label: "Meter (m)" },
        { key: "km", label: "Kilometer (km)" },
        { key: "cm", label: "Centimeter (cm)" },
        { key: "mm", label: "Millimeter (mm)" },
        { key: "mi", label: "Mile (mi)" },
        { key: "yd", label: "Yard (yd)" },
        { key: "ft", label: "Foot (ft)" },
        { key: "in", label: "Inch (in)" },
      ];
    }
    if (category === "weight") {
      return [
        { key: "kg", label: "Kilogram (kg)" },
        { key: "g", label: "Gram (g)" },
        { key: "mg", label: "Milligram (mg)" },
        { key: "lb", label: "Pound (lb)" },
        { key: "oz", label: "Ounce (oz)" },
      ];
    }
    return [
      { key: "c", label: "Celsius (°C)" },
      { key: "f", label: "Fahrenheit (°F)" },
      { key: "k", label: "Kelvin (K)" },
    ];
  }, [category]);

  const convert = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = Number(value);

    if (Number.isNaN(input)) {
      setError("Enter a valid number.");
      setResult(null);
      return;
    }

    const lengthToMeter: Record<string, number> = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.344,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    };
    const weightToKg: Record<string, number> = {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.45359237,
      oz: 0.028349523125,
    };

    let converted: number;

    if (category === "length") {
      converted = (input * lengthToMeter[fromUnit]) / lengthToMeter[toUnit];
    } else if (category === "weight") {
      converted = (input * weightToKg[fromUnit]) / weightToKg[toUnit];
    } else {
      const toCelsius = (num: number, unit: string) => {
        if (unit === "c") return num;
        if (unit === "f") return ((num - 32) * 5) / 9;
        return num - 273.15;
      };
      const fromCelsius = (num: number, unit: string) => {
        if (unit === "c") return num;
        if (unit === "f") return (num * 9) / 5 + 32;
        return num + 273.15;
      };
      converted = fromCelsius(toCelsius(input, fromUnit), toUnit);
    }

    setResult(converted);
    setError("");
  };

  const onCategoryChange = (nextCategory: "length" | "weight" | "temperature") => {
    setCategory(nextCategory);
    if (nextCategory === "length") {
      setFromUnit("m");
      setToUnit("km");
    } else if (nextCategory === "weight") {
      setFromUnit("kg");
      setToUnit("lb");
    } else {
      setFromUnit("c");
      setToUnit("f");
    }
    setResult(null);
  };

  return (
    <section className="section-card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Perfect Unit Converter
      </h2>
      <form onSubmit={convert} className="mt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["length", "Length"],
              ["weight", "Weight"],
              ["temperature", "Temperature"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onCategoryChange(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                category === key
                  ? "bg-[#4f46e5] text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="unit-value">
              Value
            </label>
            <input
              id="unit-value"
              className={inputClass}
              type="number"
              step="any"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="unit-from">
              From
            </label>
            <select
              id="unit-from"
              className={inputClass}
              value={fromUnit}
              onChange={(event) => setFromUnit(event.target.value)}
            >
              {units.map((unitOption) => (
                <option key={unitOption.key} value={unitOption.key}>
                  {unitOption.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="unit-to">
              To
            </label>
            <select
              id="unit-to"
              className={inputClass}
              value={toUnit}
              onChange={(event) => setToUnit(event.target.value)}
            >
              {units.map((unitOption) => (
                <option key={unitOption.key} value={unitOption.key}>
                  {unitOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={actionClass}>
          Convert Unit
        </button>
      </form>

      {error ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {result !== null ? (
        <ResultCard title="Converted Value" value={result.toFixed(6)} />
      ) : null}
    </section>
  );
}

export default function ToolCalculator({ toolType }: ToolCalculatorProps) {
  switch (toolType) {
    case "gpa":
      return <GpaCalculator />;
    case "ielts":
      return <IeltsCalculator />;
    case "age":
      return <AgeCalculator />;
    case "bmi":
      return <BmiCalculator />;
    case "grade":
      return <GradeCalculator />;
    case "percentage":
      return <PercentageCalculator />;
    case "study-time":
      return <StudyTimeCalculator />;
    case "salary":
      return <SalaryCalculator />;
    case "loan":
      return <LoanCalculator />;
    case "time-zone":
      return <TimeZoneConverter />;
    case "unit-converter":
      return <UnitConverter />;
    default:
      return (
        <section className="section-card p-6">
          <p className="text-sm text-slate-600">Invalid tool configuration.</p>
        </section>
      );
  }
}


