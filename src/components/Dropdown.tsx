import { DropdownFilterType } from "@/pages/admin/news";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type DropdownType = {
  type: string;
  setDropdownType: React.Dispatch<React.SetStateAction<DropdownFilterType>>;
  children: React.ReactNode;
};

const Dropdown = ({ type, setDropdownType, children }: DropdownType) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className="w-1/5 p-2 border border-slate-400 rounded-xl flex gap-2 items-center cursor-pointer relative"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="font-medium text-lg text-gray-700 line-clamp-1">{type}</h2>

        {["Category", "Sort by", "Type", "Status"].includes(type) ? (
          <Icon
            icon="octicon:triangle-down-24"
            className={`${showDropdown ? "rotate-180" : "rotate-0"}  transition ease-in-out `}
          />
        ) : (
          <Icon
            icon="iconoir:cancel"
            className="text-dangerText"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownType((prev: DropdownFilterType) => {
                if (["Date - Asc", "Date - Desc"].includes(type)) {
                  return { ...prev, sort: "Sort by" };
                } else if (["premium", "free"].includes(type)) return { ...prev, plan: "Type" };
                else if (["process", "completed", "canceled"].includes(type)) {
                  return { ...prev, statusTransaction: "Status" };
                } else {
                  return { ...prev, category: "Category" };
                }
              });
            }}
          />
        )}
      </div>

      {showDropdown ? children : null}
    </div>
  );
};

export default Dropdown;
