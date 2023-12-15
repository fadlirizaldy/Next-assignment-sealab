import AdminLayout from "@/components/layouts/AdminLayout";
import Dropdown from "@/components/Dropdown";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import useSWR from "swr";
import { DropdownFilterType } from "../news";
import { ScaleLoader } from "react-spinners";
import { useDebounce } from "@/utils/hooks";
import ModalTransactions from "@/components/admin/ModalTransactions";
import { TransactionType } from "@/utils/types";

export const filerColorType = (type: string) => {
  if (type === "completed") return "bg-green-600";
  else if (type === "process") return "bg-blue-500";
  else return "bg-dangerText";
};

const TransactionsPage = () => {
  const [dropdownType, setDropdownType] = useState<DropdownFilterType>({ statusTransaction: "Status" });
  const [searchVal, setSearchVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataTmp, setDataTmp] = useState<TransactionType>();

  const [page, setPage] = useState(1);
  const searchDebounce = useDebounce(searchVal, 500);

  const { data, isLoading } = useSWR(
    baseUrl(
      `/transactions?q=${searchDebounce}&_page=${page}&_limit=8${
        dropdownType.statusTransaction === "Status" ? "" : `&status=${dropdownType.statusTransaction}`
      }`
    ),
    fetcherGet,
    { refreshInterval: 1000 }
  );

  return (
    <AdminLayout>
      <div className="flex justify-center my-14 h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">All Transactions</h1>

          <div className="bg-white p-4 w-full flex gap-4 rounded-xl shadow-md mt-5 items-center justify-between">
            <h2 className="font-semibold text-xl">Filter</h2>
            <div className="flex w-full justify-end gap-4 items-center">
              <Dropdown type={dropdownType.statusTransaction!} setDropdownType={setDropdownType}>
                <div className="p-2 w-full flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute rounded-lg font-medium top-[50px] right-0 z-10">
                  <p
                    className="py-2 px-2 hover:bg-gray-100 capitalize"
                    onClick={() => setDropdownType((prev) => ({ ...prev, statusTransaction: "process" }))}
                  >
                    process
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100 capitalize"
                    onClick={() => setDropdownType((prev) => ({ ...prev, statusTransaction: "completed" }))}
                  >
                    completed
                  </p>
                  <p
                    className="py-2 px-2 hover:bg-gray-100 capitalize"
                    onClick={() => setDropdownType((prev) => ({ ...prev, statusTransaction: "canceled" }))}
                  >
                    canceled
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

          {isLoading ? (
            <ScaleLoader color="#1A4649" height={40} />
          ) : (
            <div className="shadow-md rounded-lg">
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
                  {data?.map((item: TransactionType) => (
                    <tr
                      className="max-h-32 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={item.id}
                    >
                      <td className="px-6 py-5">{item.id.slice(0, 10) + "..."}</td>
                      <th className=" py-5 truncate px-6">
                        {item.user_id.length > 20 ? item.user_id.slice(0, 20) + "..." : item.user_id}
                      </th>
                      <td className="px-6 py-5 text-white capitalize">
                        <span className={`p-2 rounded-lg ${filerColorType(item.status)}`}>{item.status}</span>
                      </td>
                      <th className="px-6 pt-2 font-medium text-secondaryText dark:text-white">
                        {item.transaction_date}
                      </th>
                      <td className="px-6 py-5">
                        <div
                          className="flex gap-2 p-1 w-fit cursor-pointer"
                          onClick={() => {
                            setDataTmp(item);
                            setShowModal(true);
                          }}
                        >
                          <Icon icon="ri:edit-line" className="text-primaryBtn" width="24" height="24" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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
      {showModal && <ModalTransactions setShowModal={setShowModal} data={dataTmp!} />}
    </AdminLayout>
  );
};

export default TransactionsPage;
