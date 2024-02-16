"use client";
import { useFormStatus } from "react-dom";

export default function SubmitBtn({ label }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary mb-3 text-white bg-[#4a58f1] border-none" aria-disabled={pending}>
      {pending && <span className="loading loading-spinner"></span>}
      {label}
    </button>
  );
}
