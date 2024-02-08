"use client";

import { BASE_URL } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteLink({ shortUrl, userId }) {
  const deleteDataAPI = async () => {
    try {
      await fetch(`${BASE_URL}/api/short`, {
        method: "DELETE",
        body: JSON.stringify({ shortUrl, userId }),
        cache: "no-cache",
      });
      toast.success("Deleted Successfully");
      setTimeout(() => window.location.reload(), 600);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={deleteDataAPI}
      className="border border-slate-400 rounded-md md:p-3 p-2 bg-white/10 hover:bg-white/20"
    >
      <RiDeleteBin6Line className="md:text-2xl" />
    </button>
  );
}
