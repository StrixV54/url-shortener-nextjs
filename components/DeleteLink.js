"use client";

import { useFormState } from "react-dom";
import { deleteDataAction } from "@/actions/server";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeleteLink({ shortUrl, userId }) {
  const [state, formAction] = useFormState(deleteDataAction, { message: "", error: false });

  useEffect(() => {
    if (state?.error) toast.error(state?.message);
    else if (state?.message) {
      toast.success(state?.message);
      setTimeout(() => window.location.reload(), 1000);
    }
  }, [state?.message]);

  return (
    <button
      onClick={() => {
        let formData = { shortUrl: shortUrl, userId: userId };
        formAction(formData);
      }}
      className="border border-slate-400 rounded-md md:p-3 p-2 bg-white/10 hover:bg-white/20"
    >
      <RiDeleteBin6Line className="md:text-2xl" />
    </button>
  );
}
