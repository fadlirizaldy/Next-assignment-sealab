import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const TableNews = ({ data }) => {
  console.log(data);
  return (
    <table className="w-full text-left rtl:text-right text-secondaryText dark:text-gray-400">
      <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-4">
            Id
          </th>
          <th scope="col" className="px-6 py-4">
            Title
          </th>
          <th scope="col" className="px-6 py-4">
            Category
          </th>
          <th scope="col" className="px-6 py-4">
            Description
          </th>
          <th scope="col" className="px-6 py-4">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            className="max-h-32 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
            key={item.news_id}
            onClick={() => alert("row clicked")}
          >
            <td className="px-6 py-5">{item.news_id.slice(0, 10) + "..."}</td>
            <th className=" py-5 truncate px-6">{item.title.slice(0, 20) + "..."}</th>
            <td className="px-6 py-5">{item.category}</td>
            <th className="px-6 pt-2 font-medium text-secondaryText dark:text-white line-clamp-2 overflow-hidden">
              {item.description}
            </th>
            <td className="px-6 py-5">
              <div className="flex gap-2 p-1">
                <Icon
                  icon="ri:edit-line"
                  className="text-primaryBtn"
                  width="24"
                  height="24"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("edit clicked");
                  }}
                />
                <Icon
                  icon="ph:trash-bold"
                  className="text-dangerText"
                  width="24"
                  height="24"
                  onClick={() => alert("delete clicked")}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableNews;
