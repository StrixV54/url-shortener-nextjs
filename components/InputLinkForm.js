"use client";

import { BASE_URL } from "@/app/dashboard/page";
import { isUrlValid } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function InputLinkForm({ userId, loading }) {
  const inputRef = useRef(null);

  const addDataAPI = async (event) => {
    event.preventDefault();

    const formdata = new FormData(event.target);

    if (!isUrlValid(formdata.get("link"))) {
      toast.error("Invalid Url");
      return;
    }

    const body = {
      originalUrl: formdata.get("link"),
      userId,
    };
    inputRef.current.value = "";
    try {
      await fetch(`${BASE_URL}/api/short`, {
        method: "POST",
        body: JSON.stringify(body),
        cache: "no-cache",
      });
      toast.success("Short URL Created");
      setTimeout(() => window.location.reload(), 600);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex sm:gap-8 gap-3 w-full justify-center"
      onSubmit={addDataAPI}
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
      <button
        disabled={loading}
        type="submit"
        className="btn btn-primary mb-3 text-white bg-[#4a58f1] border-none disabled:bg-slate-700"
      >
        Create Short Link
      </button>
    </form>
  );
}
