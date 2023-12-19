import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthStore from "../stores/userZustand";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { baseUrl } from "@/services/base";

const Navbar = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setAuthed = useAuthStore((state) => state.setIsLoggedIn);
  const isAuthed = useAuthStore((state) => state.isLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (token) {
      fetcherGet(baseUrl(`/users/${token}`)).then((data) => {
        setUser(data);
        setAuthed(true);
      });
    }
  }, [setAuthed, token]);

  return (
    <div className="w-full bg-primary text-white px-10 py-5">
      <div className="max-w-[1200px] w-[90%] mx-auto flex justify-between items-center">
        <Link href={"/"} className="font-semibold text-3xl">
          PixelNews
        </Link>

        <div className="flex gap-4">
          <Link href={"/"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Home
          </Link>
          {/* <Link href={"/news"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            News
          </Link> */}
          <Link href={"/subscription"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Subscription
          </Link>
        </div>

        {isAuthed ? (
          <div className="flex">
            <div className="relative">
              <img
                src={user.imgUrl}
                alt=""
                className="object-cover w-12 h-12 rounded-full cursor-pointer"
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              />

              <div
                className={` text-black py-2 px-1 w-[200%] flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all absolute rounded-lg font-medium top-12 right-0 z-10 ${
                  showDropdown ? "opacity-100 translate-y-2" : "opacity-0"
                }`}
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button
                  className="py-2 px-2 hover:bg-gray-100 cursor-pointer"
                  disabled={!showDropdown}
                  onClick={() => router.push(`/profile/${user?.id}`)}
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
        ) : (
          <div className="flex gap-4">
            <Link
              href={"/auth/register"}
              className="font-semibold p-3 text-secondary rounded-3xl bg-primaryBg hover:opacity-90"
            >
              Register
            </Link>
            <Link
              href={"/auth/login"}
              className="font-medium text-xl px-3 py-1 hover:underline rounded-lg flex items-center"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
