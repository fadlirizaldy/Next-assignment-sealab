import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="brightness-50 bg-[url(/background-login.jpg)] bg-no-repeat bg-cover absolute w-full h-full"></div>
      <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 w-[600px] h-fit rounded-[24px] bg-[#FFFFFF] p-[32px] justify-center border-2 border-[#E1E4EA] shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
