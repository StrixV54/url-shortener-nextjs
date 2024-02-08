"use client";
import toast from "react-hot-toast";
import { LuClipboardList } from "react-icons/lu";

export default function SaveLink({ link }) {
  const saveHandler = () => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied");
  };

  return (
    <button
      id="save"
      onClick={saveHandler}
      className="p-1 rounded-md border border-slate-400 bg-white/10 hover:bg-white/40"
    >
      <LuClipboardList className="text-xl" />
    </button>
  );
}
