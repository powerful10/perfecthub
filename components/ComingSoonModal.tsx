"use client";

import { useEffect } from "react";

type ComingSoonModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
};

export default function ComingSoonModal({
  open,
  title = "AI Power Mode (Coming Soon)",
  description = "This AI feature is in development. Smart Mode is available now.",
  onClose,
}: ComingSoonModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 p-4">
      <div className="section-card w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
          >
            Got it
          </button>
          <a
            href="/coming-soon"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5]"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
