import React from "react";
import Navbar from "../Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-primaryBg">
        <h1>Main Layout</h1>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
