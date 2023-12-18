import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import BackToTop from "../BackToTop";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
