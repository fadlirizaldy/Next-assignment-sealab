import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");

    router.reload();
  };

  return (
    <div className="py-10 fixed bg-secondary text-white w-[280px] flex flex-col min-h-screen">
      <Link href={"/"} className="px-10 mb-44">
        <h1 className="font-semibold text-4xl">PixelNews</h1>
        <h2 className="text-center font-medium text-2xl">Admin</h2>
      </Link>

      <div className="flex flex-col gap-3">
        <Link
          href={"/admin"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname === "/admin" ? "bg-primary" : ""
          }`}
        >
          <Icon icon="material-symbols:dashboard" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Dashboard</h2>
        </Link>
        <Link
          href={"/admin/news"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname.includes("/news") ? "bg-primary" : ""
          }`}
        >
          <Icon icon="typcn:news" width="24" height="24" className="text-white" />
          <h2 className="font-medium text-xl">News</h2>
        </Link>
        <Link
          href={"/admin/transactions"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname.includes("/transactions") ? "bg-primary" : ""
          }`}
        >
          <Icon icon="solar:wallet-money-broken" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Transactions</h2>
        </Link>
        <Link
          href={"/admin/subscriptions"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname.includes("/subscriptions") ? "bg-primary" : ""
          }`}
        >
          <Icon icon="mdi:user" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Subscription</h2>
        </Link>
      </div>

      <div className="mt-44">
        <div
          className="px-8 py-5 flex gap-5 items-center cursor-pointer hover:bg-primary"
          onClick={() => handleLogout()}
        >
          <Icon icon="solar:logout-2-bold" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Logout</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
