import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="py-10 fixed bg-secondary text-white w-[266px] flex flex-col min-h-screen">
      <div className="px-10 mb-44">
        <h1 className="font-semibold text-4xl">PixelNews</h1>
        <h2 className="text-center font-medium text-2xl">Admin</h2>
      </div>

      <div className="flex flex-col gap-10">
        <Link href={"/"}>
          <h2 className="p-5">Dashboard</h2>
        </Link>
        <Link href={"/"}>Posts</Link>
        <Link href={"/"}>Users</Link>
        <Link href={"/"}>Transactios</Link>
      </div>

      <div className="mt-44">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
