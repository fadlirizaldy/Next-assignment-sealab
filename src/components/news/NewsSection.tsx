import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { useDebounce } from "@/utils/hooks";
import { NewsType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";

const NewsSection = () => {
  const router = useRouter();
  const [filter, setFilter] = useState({ category: "", type: "", date: "" });
  const [searchVal, setSearchVal] = useState("");
  const [limit, setLimit] = useState(8);

  const searchDebounce = useDebounce(searchVal, 500);

  const { data: dataNews, isLoading } = useSWR(
    baseUrl(
      `/news?q=${searchDebounce}${filter.category ? `&category=${filter.category}` : ""}${
        filter.type ? `&isPremium=${filter.type === "true" ? true : false}` : ""
      }${filter.date ? `&_sort=created_at&_order=${filter.date}` : ""}`
    ),
    fetcherGet
  );

  return (
    <div className="mt-10">
      <h3 className="text-black text-2xl font-semibold flex items-center gap-1 mb-2">
        <div className="w-5 h-5 bg-primary"></div>
        News
      </h3>

      <div className="grid grid-cols-2 sm:flex items-center gap-3">
        <button
          className="p-[5px] px-2 border border-primaryBtn rounded-xl hover:text-white hover:bg-primaryBtn"
          onClick={() => {
            setFilter({ category: "", type: "", date: "" });
            setSearchVal("");
          }}
        >
          Reset
        </button>
        <select
          className="p-2 pr-8 border border-slate-400 bg-primaryBg rounded-xl sm:w-3/12"
          name="category"
          onChange={(e) => setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          value={filter?.category}
        >
          <option value="" selected disabled hidden>
            Category
          </option>
          <option value="Multiplayer online battle arena (MOBA)">Multiplayer online battle arena (MOBA)</option>
          <option value="Shooters (FPS and TPS)">Shooters (FPS and TPS)</option>
          <option value="Role-playing (RPG)">Role-playing (RPG)</option>
          <option value="Simulation and sports">Simulation and sports</option>
          <option value="Puzzlers and party games">Puzzlers and party games</option>
        </select>
        <select
          className="p-2 pr-8 border border-slate-400 bg-primaryBg rounded-xl sm:w-3/12"
          name="type"
          onChange={(e) => setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          value={filter?.type}
        >
          <option value="" selected hidden>
            All
          </option>
          <option value={"true"}>Premium</option>
          <option value={"false"}>Free</option>
        </select>
        <select
          className="p-2 pr-8 border border-slate-400 bg-primaryBg rounded-xl sm:w-3/12"
          name="date"
          onChange={(e) => setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          value={filter?.date}
        >
          <option value="" selected hidden>
            Date
          </option>
          <option value={"desc"}>Latest</option>
          <option value={"asc"}>Oldest</option>
        </select>
        <div className="relative w-full col-span-2 sm:w-2/5">
          <input
            type="text"
            placeholder="Search something..."
            className="p-[6px] pl-2 pr-8 border border-slate-400 bg-primaryBg rounded-xl w-full"
            onChange={(e) => setSearchVal(e.target.value)}
            value={searchVal}
          />
          <Icon
            icon="material-symbols:search"
            className="text-slate-500 absolute right-2 top-2"
            width={24}
            height={24}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-5 flex justify-center">
          <GridLoader color="#1A4649" />
        </div>
      ) : dataNews?.length > 0 ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows gap-6 mt-5">
            {dataNews?.slice(0, limit).map((news: NewsType) => (
              <div
                className="rounded-xl relative overflow-hidden group text-white cursor-pointer h-44 md:h-60"
                onClick={() => router.push(`/news/detail/${news?.id}`)}
                key={news.id}
              >
                <img
                  alt=""
                  src={news?.img ? news.img : "/no-image.png"}
                  className="group-hover:blur-[2px] transition-all duration-500 ease-out rounded-md h-full object-cover w-full"
                />
                <div className="inset-0 p-5 rounded-md absolute opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out bg-black/40 flex flex-col justify-end">
                  <h1 className="font-bold text-white text-xl">{news?.title}</h1>
                  <p className="flex items-center gap-1 line-clamp-1 text-sm">{news?.description.slice(0, 50)}...</p>
                </div>
              </div>
            ))}
          </section>
          {limit < dataNews?.length ? (
            <div
              className="flex justify-center items-center text-lg font-medium mt-4 p-3 cursor-pointer text-primaryBtn"
              onClick={() => setLimit(limit + 8)}
            >
              <h2>Load more..</h2>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center mt-5">
          <img src="/no-data.png" alt="" className="w-1/3" />
          <h2 className="font-semibold text-2xl">No Data</h2>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
