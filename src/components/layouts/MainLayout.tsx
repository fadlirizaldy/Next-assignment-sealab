import React from "react";
import Navbar from "../Navbar";
import useCookie from "@/utils/hooks";
import Footer from "../Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-primaryBg pb-20">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
