import React, { useState } from "react";

const HeaderAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="w-full px-10 py-4 bg-primary shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="flex justify-end relative">
        <img
          src="/photo_profile1.jpg"
          alt=""
          className="object-cover w-12 h-12 rounded-full cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />

        <div
          className={`py-2 px-1 w-1/12 flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all absolute rounded-lg font-medium top-12 right-0 z-10 ${
            showDropdown ? "opacity-100 translate-y-2" : "opacity-0"
          }`}
        >
          <p className="py-2 px-2 hover:bg-gray-100 cursor-pointer">Profile</p>
          <p className="py-2 px-2 hover:bg-gray-100 cursor-pointer">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
