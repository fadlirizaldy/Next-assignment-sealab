import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <div className="py-10 fixed bg-secondary text-white w-[280px] flex flex-col min-h-screen">
      <div className="px-10 mb-44">
        <h1 className="font-semibold text-4xl">PixelNews</h1>
        <h2 className="text-center font-medium text-2xl">Admin</h2>
      </div>

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
            pathname === "/admin/news" ? "bg-primary" : ""
          }`}
        >
          <Icon icon="material-symbols:dashboard" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">News</h2>
        </Link>
        <Link
          href={"/admin/transactions"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname === "/admin/transactions" ? "bg-primary" : ""
          }`}
        >
          <Icon icon="material-symbols:dashboard" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Transactions</h2>
        </Link>
        <Link
          href={"/admin/users"}
          className={`px-8 py-5 flex gap-5 items-center hover:bg-primary transition-all ${
            pathname === "/admin/users" ? "bg-primary" : ""
          }`}
        >
          <Icon icon="material-symbols:dashboard" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Users</h2>
        </Link>
      </div>

      <div className="mt-44">
        <div className="px-8 py-5 flex gap-5 items-center hover:bg-primary">
          <Icon icon="material-symbols:dashboard" className="text-white" width="24" height="24" />
          <h2 className="font-medium text-xl">Logout</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
