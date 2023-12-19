import { UserType } from "@/utils/types";
import React from "react";

const CardProfile = ({ title, dataProfile }: { title: string; dataProfile: UserType }) => {
  return (
    <div className="rounded-xl border border-slate-400 w-3/5 bg-white">
      <h2 className="font-semibold text-2xl px-4 py-3">Profile User</h2>
      <hr className="h-px bg-[#BABABA]" />

      <div className="px-8 py-5">
        <div className=" flex gap-20">
          <img src={dataProfile?.imgUrl} alt="" className="object-cover rounded-full w-52 h-52" />
          <div className="w-1/2">
            <label htmlFor="" className="font-medium text-lg">
              Name
            </label>
            <input
              type="text"
              className="rounded-[8px] border mb-2 border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-3 w-full py-2"
              value={dataProfile?.name}
            />

            <label htmlFor="" className="font-medium text-lg">
              Email
            </label>
            <input
              type="text"
              className="rounded-[8px] border border-gray-400 bg-[#dddede] focus:outline-primaryBtn px-3 w-full py-2"
              value={dataProfile?.email}
              disabled={true}
            />
          </div>
        </div>
      </div>

      <hr className="h-px bg-[#BABABA] mt-3" />
      <div className="py-4 px-8 w-[86%]">
        <label htmlFor="" className="font-medium text-lg">
          Phone
        </label>
        <input
          type="text"
          className="rounded-[8px] border mb-4 border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-3 w-full py-2"
          value={dataProfile?.phone}
        />
        <label htmlFor="" className="font-medium text-lg">
          Address
        </label>
        <input
          type="text"
          className="rounded-[8px] border mb-5 border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-3 w-full py-2"
          value={dataProfile?.address}
        />
        <label htmlFor="" className="font-medium text-lg block">
          Referral Code
        </label>
        <input
          type="text"
          className="rounded-[8px] border border-gray-400 bg-[#dddede] focus:outline-primaryBtn px-3 w-1/4 py-2 mb-4"
          value={dataProfile?.referral_code}
        />
      </div>
    </div>
  );
};

export default CardProfile;
