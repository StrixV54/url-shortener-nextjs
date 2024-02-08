"use client";
import SingleRowComponent from "@/components/SingleRowBox";
import SignOut from "@/components/SignOut";
import InputLinkForm from "../../components/InputLinkForm";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/";

const fetchDataAPI = async (userId) => {
  const data = await fetch(`${BASE_URL}/api/short/${userId}`, {
    cache: "no-cache",
  });
  const res = await data.json();
  return res;
};

export default function Home() {
  const [list, setList] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userRecord = localStorage.getItem("shortener-user");
      if (!userRecord) {
        router.push("/login");
        return;
      }
      const parsedRecord = JSON.parse(userRecord);
      setUser(parsedRecord);
      fetchDataAPI(parsedRecord?.userId)
        .then((res) => setList(res?.list))
        .catch((err) => console.log("Error ", err))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Loading isFullScreen={"true"} />;

  return (
    <>
      <header className="absolute w-full z-10 flex justify-end sm:px-24 px-10 py-10">
        <div className="text-right flex items-center gap-3 sm:text-xl text-md">
          Hi, {user?.name}
          <SignOut />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center lg:p-24 sm:p-10 p-4 bg-base-300 gap-10 relative">
        <h1 className="text-[#5a67ff] sm:text-7xl text-4xl font-bold flex">
          URL Shortener
          <img
            loading="lazy"
            width="72"
            height="72"
            alt="sunglasses emoji"
            src="	https://daisyui.com/images/emoji/smiling-face-with-sunglasses.webp"
            className="ml-2 pointer-events-none inline-block h-[1em] w-[1em] align-bottom"
          />
        </h1>
        <InputLinkForm userId={user?.userId} loading={loading} />
        <h2 className="sm:text-2xl text-xl">
          {!loading && list?.length == 0
            ? "No Link Present."
            : "Created Links:"}
        </h2>
        <ul className="flex flex-col w-full gap-6">
          {loading && <Loading />}
          {list?.length > 0 &&
            list.map((item, index) => (
              <SingleRowComponent
                key={item?.short}
                item={item}
                index={index}
                userId={user?.userId}
              />
            ))}
        </ul>
      </main>
    </>
  );
}
