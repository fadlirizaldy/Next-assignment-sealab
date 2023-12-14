import AdminLayout from "@/components/layouts/AdminLayout";
import Dropdown from "@/components/Dropdown";
import TableNews from "@/components/TableNews";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { useDebounce } from "@/utils/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

export type DropdownType = { category: string; sort: string };

const NewsPage = () => {
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);
  const [dropdownType, setDropdownType] = useState({ category: "Category", sort: "Sort by" });
  const searchDebounce = useDebounce(searchVal, 500);

  const { data, isLoading } = useSWR(
    baseUrl(
      `/news?q=${searchDebounce}&?category=${
        dropdownType.category === "Category" ? "" : dropdownType.category
      }&_page=${page}&_limit=8&_sort=${dropdownType.sort === "Sort by" ? "" : "created_at"}&_order=${dropdownType.sort
        .slice(-3)
        .toLowerCase()}`
    ),
    fetcherGet
  );

  return (
    <AdminLayout>
      <div className="flex justify-center my-14 h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">All News</h1>

          <div className="bg-white p-4 flex gap-2 rounded-xl mt-8 items-center">
            <Link
              href={"/admin/news/add"}
              className="p-2 text-center bg-primaryBtn rounded-md w-32 text-white hover:opacity-95"
            >
              Add News
            </Link>

            <div className="flex gap-4 w-full justify-end items-center">
              <h2 className="font-semibold text-xl">Filter</h2>
              <Dropdown type={dropdownType.category} setDropdownType={setDropdownType}>
                <div className="p-2 w-full flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute rounded-lg font-medium top-[50px] right-0 z-10">
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() =>
                      setDropdownType((prev) => ({ ...prev, category: "Multiplayer online battle arena (MOBA)" }))
                    }
                  >
                    Multiplayer online battle arena (MOBA)
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, category: "Shooters (FPS and TPS)" }))}
                  >
                    Shooters (FPS and TPS)
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, category: "Role-playing (RPG)" }))}
                  >
                    Role-playing (RPG)
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, category: "Simulation and sports" }))}
                  >
                    Simulation and sports
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, category: "Puzzlers and party games" }))}
                  >
                    Puzzlers and party games
                  </p>
                </div>
              </Dropdown>
              <Dropdown type={dropdownType.sort} setDropdownType={setDropdownType}>
                <div className="p-2 w-full flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute rounded-lg font-medium top-[50px] right-0 z-10">
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, sort: "Date - Asc" }))}
                  >
                    Date - Asc
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100"
                    onClick={() => setDropdownType((prev) => ({ ...prev, sort: "Date - Desc" }))}
                  >
                    Date - Desc
                  </p>
                </div>
              </Dropdown>

              <div className="relative w-2/5">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="p-2 pr-8 border border-slate-400 rounded-xl w-full"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <Icon
                  icon="material-symbols:search"
                  className="text-slate-500 absolute right-2 top-2"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
            {isLoading ? "Loading..." : <TableNews data={data} />}
          </div>

          <div className="flex items-center gap-1 mt-4 justify-end pr-4">
            <Icon
              icon="fluent:triangle-left-12-filled"
              width={24}
              height={24}
              className={`text-primaryBtn ${
                page === 1 ? "opacity-75 cursor-not-allowed" : "opacity-100 cursor-pointer"
              }`}
              onClick={() =>
                setPage((prev) => {
                  if (prev === 1) return prev;
                  return prev - 1;
                })
              }
            />
            <h4 className="font-medium text-xl">{page}</h4>
            <Icon
              icon="fluent:triangle-right-12-filled"
              width={24}
              height={24}
              className={`text-primaryBtn ${
                data?.length < 8 ? "opacity-75 cursor-not-allowed" : "opacity-100 cursor-pointer"
              }`}
              onClick={() =>
                setPage((prev) => {
                  if (data?.length < 8) return prev;
                  return prev + 1;
                })
              }
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsPage;
