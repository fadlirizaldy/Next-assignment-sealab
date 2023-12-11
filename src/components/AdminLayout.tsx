import React from "react";
import Sidebar from "./auth/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primaryBg flex">
      <Sidebar />
      <div className="ml-[266px] w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
