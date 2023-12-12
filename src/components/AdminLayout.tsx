import React from "react";
import Sidebar from "./auth/Sidebar";
import HeaderAdmin from "./HeaderAdmin";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primaryBg flex">
      <Sidebar />
      <div className="ml-[280px] w-full min-h-screen flex flex-col">
        <HeaderAdmin />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
