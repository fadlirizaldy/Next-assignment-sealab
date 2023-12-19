import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import BackToTop from "../BackToTop";
import useAuthStore from "@/stores/userZustand";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-primaryBg pb-20">{children}</div>

      <BackToTop />

      <Footer />
    </div>
  );
};

export default MainLayout;
