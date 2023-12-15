import React from "react";
import Navbar from "../Navbar";
import useCookie from "@/utils/hooks";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-primaryBg">
        <h1>Main Layout</h1>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
