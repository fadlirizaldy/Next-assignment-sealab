import React from "react";

const CardSubscription = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 rounded-sm border border-gray-300 flex flex-col items-center">{children}</div>;
};

export default CardSubscription;
