import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthStore from "../stores/userZustand";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { baseUrl } from "@/services/base";

const HeaderAdmin = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const token = Cookies.get("token");

  const setAuthed = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (token) {
      fetcherGet(baseUrl(`/users/${token}`)).then((data) => {
        setUser(data);
      });
      setAuthed(true);
    }
  }, [setAuthed, token]);

  return (
    <div className="w-full px-10 py-4 bg-primary shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="flex justify-end relative">
        <img
          src={user?.imgUrl}
          alt=""
          className="object-cover w-12 h-12 rounded-full cursor-pointer"
          onMouseOver={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        />

        <div
          className={`py-2 px-1 w-1/12 flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all absolute rounded-lg font-medium top-12 right-0 z-10 ${
            showDropdown ? "opacity-100 translate-y-2" : "opacity-0"
          }`}
          onMouseOver={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className="py-2 px-2 hover:bg-gray-100"
            disabled={!showDropdown}
            onClick={() => router.push(`/admin/profile/${user.id}`)}
          >
            Profile
          </button>
          <button
            className="py-2 px-2 hover:bg-gray-100"
            disabled={!showDropdown}
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("role");
              router.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
