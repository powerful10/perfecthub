"use client";

import { useState } from "react";
import ComingSoonModal from "@/components/ComingSoonModal";

type ComingSoonButtonProps = {
  label: string;
  title?: string;
  description?: string;
  className?: string;
};

export default function ComingSoonButton({
  label,
  title,
  description,
  className = "",
}: ComingSoonButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#4f46e5] hover:text-[#4f46e5] ${className}`}
      >
        {label}
      </button>
      <ComingSoonModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
      />
    </>
  );
}
