"use client";

import { useFormState } from "react-dom";
import SubmitBtn from "./SubmitBtn";
import { addRecordAction } from "@/actions/server";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function InputLinkForm({ userId }) {
  const [state, formAction] = useFormState(addRecordAction, { message: "", error: false });
  const inputRef = useRef();

  useEffect(() => {
    if (state?.error) toast.error(state?.message);
    else if (state?.message) {
      toast.success(state?.message);
      setTimeout(() => window.location.reload(), 1000);
    }
  }, [state?.message]);

  return (
    <form
      className="flex sm:gap-8 gap-3 w-full justify-center"
      action={(formData) => {
        formData.append("userId", userId);
        inputRef.current.value = "";
        formAction(formData);
      }}
    >
      <input
        type="text"
        id="link"
        name="link"
        required
        ref={inputRef}
        placeholder="Enter or paste your link"
        className="input input-bordered max-w-[700px] w-full"
      />
      <SubmitBtn label={"Create Short Link"} />
    </form>
  );
}
