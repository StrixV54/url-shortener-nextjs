import { BASE_URL } from "@/app/dashboard/page";
import DeleteLink from "@/components/DeleteLink";
import SaveLink from "./SaveLink";

export default function SingleRowBox({ item, index, userId }) {
  const shortUrlFull = `${BASE_URL}/api/` + item?.short;

  return (
    <li className="text-white w-full flex flex-wrap bg-[#4335a1] rounded-2xl shadow-xl py-6 px-6 lg:gap-12 gap-4 justify-between items-center">
      <div className="card-title flex">{index + 1}</div>
      <div className="flex-1 text-xs flex flex-col items-center ">
        <span className="uppercase opacity-60">FULL URL</span>
        <a
          href={item?.full}
          className="lg:text-xl md:text-base hover:text-blue-300 transition"
        >
          {item?.full}
        </a>
      </div>
      <div className="flex-1 text-xs flex flex-col items-center relative">
        <span className="uppercase opacity-60 md:mr-0 mr-10">SHORT URL:</span>
        <div className="peer flex items-center gap-3">
          <a
            href={shortUrlFull}
            className="lg:text-xl md:text-lg text-[#dddd58]"
          >
            {item?.short}
          </a>
          <SaveLink link={shortUrlFull} />
        </div>
        <span className="peer-hover:opacity-60 opacity-0 transition absolute top-[52px]">
          {shortUrlFull}
        </span>
      </div>
      <div className="justify-end">
        <div className="text-xs flex flex-col items-center justify-center">
          <span className="sm:text-4xl text-xl mb-1">{item?.clicks}</span>
          <span className="opacity-60">Clicks</span>
        </div>
      </div>
      <div className="block">
        <DeleteLink shortUrl={item?.short} userId={userId} />
      </div>
    </li>
  );
}
