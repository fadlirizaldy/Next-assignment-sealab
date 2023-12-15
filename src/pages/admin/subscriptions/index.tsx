import Dropdown from "@/components/Dropdown";
import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet, fetcherPatch } from "@/services/fetcher/fetcher";
import { useDebounce } from "@/utils/hooks";
import { UserType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { DropdownFilterType } from "../news";

const SubscriptionsPage = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);
  const searchDebounce = useDebounce(searchVal, 500);
  const [dropdownType, setDropdownType] = useState<DropdownFilterType>({ plan: "Type" });

  const { data, isLoading } = useSWR(
    baseUrl(
      `/users?q=${searchDebounce}&_page=${page}&_limit=8${
        dropdownType.plan === "Type" ? "" : `&plan=${dropdownType.plan}`
      }`
    ),
    fetcherGet,
    {
      refreshInterval: 1000,
    }
  );

  const handleDeactive = (user: UserType) => {
    const updatedUser = { ...user, plan: "free" };
    fetcherPatch(baseUrl(`/users/${user.id}`), updatedUser);
  };

  return (
    <AdminLayout>
      <div className="flex justify-center my-14 h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">All Subscriptions</h1>

          <div className="bg-white p-4 w-full flex gap-4 rounded-xl shadow-md mt-5 items-center justify-between">
            <h2 className="font-semibold text-xl">Filter</h2>
            <div className="flex w-full justify-end gap-4 items-center">
              <Dropdown type={dropdownType.plan!} setDropdownType={setDropdownType}>
                <div className="p-2 w-full flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute rounded-lg font-medium top-[50px] right-0 z-10">
                  <p
                    className="py-2 px-2 hover:bg-gray-100 capitalize"
                    onClick={() => setDropdownType((prev) => ({ ...prev, plan: "free" }))}
                  >
                    free
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100 capitalize"
                    onClick={() => setDropdownType((prev) => ({ ...prev, plan: "premium" }))}
                  >
                    premium
                  </p>
                </div>
              </Dropdown>
              <div className="relative w-2/5">
                <input
                  type="text"
                  placeholder="Search something..."
                  className="p-2 pr-8 border border-slate-400 rounded-xl w-full"
                  value={searchVal}
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

          <div className="shadow-md rounded-lg">
            <table className="mt-7 w-full text-left rtl:text-right text-secondaryText dark:text-gray-400">
              <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Id User
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Expired subscription
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any) => (
                  <tr
                    className="max-h-32 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={item.id}
                  >
                    <td className="px-6 py-5">{item.id.slice(0, 10) + "..."}</td>
                    <th className=" py-5 px-6">{item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}</th>
                    <td className="text-white px-6 py-5">
                      <span
                        className={`p-2 w-24 capitalize rounded-2xl ${
                          item.plan === "premium" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      >
                        {item.plan}
                      </span>
                    </td>
                    <th className="px-6 pt-2 font-medium text-secondaryText dark:text-white">{item.expired_subs}</th>
                    <td className="px-6 py-5">
                      {item.plan === "premium" ? (
                        <div
                          className="flex cursor-pointer gap-2 items-center w-fit p-1 border hover:bg-slate-100 border-slate-500 rounded-xl"
                          onClick={() => handleDeactive(item)}
                        >
                          <h2>Deactivate</h2>
                          <Icon icon="fluent-mdl2:deactivate-orders" className="text-dangerText font-semibold" />
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default SubscriptionsPage;
