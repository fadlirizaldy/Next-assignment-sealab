import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const TransactionsPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(baseUrl("/transactions"), fetcherGet);
  console.log(data);
  return (
    <AdminLayout>
      <div className="flex justify-center my-14 h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">All Subscriptions</h1>

          <table className="mt-7 w-full text-left rtl:text-right text-secondaryText dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Id Transaction
                </th>
                <th scope="col" className="px-6 py-4">
                  Id User
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <tr
                  className="max-h-32 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                  key={item.id}
                  onClick={() => router.push(`/admin/news/detail/${item.id}`)}
                >
                  <td className="px-6 py-5">{item.id.slice(0, 10) + "..."}</td>
                  <th className=" py-5 truncate px-6">
                    {item.user_id.length > 20 ? item.user_id.slice(0, 20) + "..." : item.user_id}
                  </th>
                  <td className="px-6 py-5">
                    <span className={`p-2 rounded-lg ${item.status === "process" ? "bg-blue-300" : "bg-green-400"}`}>
                      {item.status}
                    </span>
                  </td>
                  <th className="px-6 pt-2 font-medium text-secondaryText dark:text-white">{item.transaction_date}</th>
                  <td className="px-6 py-5">
                    <div className="flex gap-2 p-1">
                      <Icon
                        icon="ri:edit-line"
                        className="text-primaryBtn"
                        width="24"
                        height="24"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/news/edit/${item.id}`);
                        }}
                      />
                      <Icon icon="ph:trash-bold" className="text-dangerText" width="24" height="24" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TransactionsPage;
