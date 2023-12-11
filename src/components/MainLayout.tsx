import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primaryBg">
      <h1>Main Layout</h1>
      {children}
    </div>
  );
};

export default MainLayout;
