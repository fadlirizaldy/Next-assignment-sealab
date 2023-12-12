import AdminLayout from "@/components/AdminLayout";
import TableNews from "@/components/TableNews";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import React from "react";
import useSWR from "swr";

const NewsPage = () => {
  const { data, isLoading } = useSWR(baseUrl("/news"), fetcherGet);
  return (
    <AdminLayout>
      <div className="flex justify-center mt-16 h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">All News</h1>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <TableNews data={data} />
          </div>

          <div>
            <button>{"<"}</button>
            <button>{">"}</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsPage;

{
  /* TABEL
  ssg : revalidate
<section classNameName="mt-10">
  <div classNameName="grid grid-cols-9 gap-5 rounded-t-xl bg-gray-200  ">
    <h4 classNameName="p-5 col-span-1">Id</h4>
    <h4 classNameName="p-5 col-span-2">Title</h4>
    <h4 classNameName="p-5 col-span-1">Category</h4>
    <h4 classNameName="p-5 col-span-3">Description</h4>
    <h4 classNameName="p-5 col-span-2"></h4>
  </div>
  <div>
    <div classNameName="grid grid-cols-9 gap-5 h-9">
      <p classNameName="p-5 col-span-1">382194821938-1284-1283123-8</p>
      <p classNameName="p-5 col-span-2">Mario bros is now release alpha version</p>
      <p classNameName="p-5 col-span-1">Race</p>
      <p classNameName="py-5 col-span-3 line-clamp-1">
        Reasonable particular on my it in sympathize. Size now easy eat hand how. Unwilling he departure
        elsewhere dejection at. Heart large seems may purse means few blind. Exquisite newspaper attending on
        certainty oh suspicion of. He less do quit evil is. Add matter family active mutual put wishes happen.
      </p>
      <p classNameName="p-5 col-span-2">:</p>
    </div>
  </div>
</section> */
}
