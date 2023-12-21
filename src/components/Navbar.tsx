import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthStore from "../stores/userZustand";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { baseUrl } from "@/services/base";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
      <div className="max-w-[1200px] w-[90%] mx-auto flex justify-center sm:justify-between items-center">
        <div className="absolute left-5 sm:hidden cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}>
          <Icon icon="pajamas:hamburger" color="white" width={40} height={40} />
        </div>

        <div
          className={`bg-primary sm:hidden flex flex-col items-center gap-5 py-10 w-full left-[-120%] absolute top-[70px] min-h-screen z-20 transition-all ${
            showMenu ? "opacity-100 translate-x-[120%]" : "opacity-0"
          }`}
        >
          <Link href={"/"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Home
          </Link>
          <Link href={"/subscription"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Subscription
          </Link>

          <hr className="h-px w-11/12 bg-[#BABABA]" />
          <div>
            {isAuthed ? (
              <div className="flex flex-col items-center gap-4">
                <img src={user.imgUrl} alt="" className="object-cover w-24 h-24 rounded-full cursor-pointer" />
                <div className="flex items-center gap-4">
                  <Link
                    href={`/profile/${user?.id}`}
                    className="border border-slate-400 font-semibold px-3 py-1 text-lg hover:opacity-95 rounded-lg"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="border border-slate-400 font-medium text-lg hover:opacity-95 px-3 py-1 hover:underline rounded-lg flex items-center"
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
            ) : (
              <div className="flex gap-5">
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

        <Link href={"/"} className="font-semibold text-3xl">
          PixelNews
        </Link>

        <div className="hidden sm:flex gap-4">
          <Link href={"/"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Home
          </Link>
          <Link href={"/subscription"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Subscription
          </Link>
        </div>

        {isAuthed ? (
          <div className="hidden sm:flex">
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
          <div className="hidden sm:flex gap-4">
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
