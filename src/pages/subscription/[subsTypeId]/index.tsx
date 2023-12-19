import { baseUrl } from "@/services/base";
import { fetcherGet, fetcherPost } from "@/services/fetcher/fetcher";
import useAuthStore from "@/stores/userZustand";
import { formatNumberWithDots, showToastMessage } from "@/utils/libs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const SubscriptionTransactions = () => {
  const router = useRouter();
  const { subsTypeId } = router.query;
  const [tmpId, setTmpId] = useState(uuidv4());

  const user = useAuthStore((state) => state.user);

  const { data: dataSubs, isLoading } = useSWR(baseUrl(`/plan?name=${subsTypeId}`), fetcherGet);

  console.log(dataSubs);
  console.log("User", user);

  const handleTransaction = async () => {
    const newTransaction = {
      id: tmpId,
      user_id: user.id,
      type: dataSubs[0]?.name,
      transaction_date: new Date(),
      total_paid: dataSubs[0]?.price,
      status: "process",
    };

    await fetcherPost(baseUrl("/transactions"), newTransaction);
    router.replace(`/subscription/${subsTypeId}/${tmpId}`);
  };

  return (
    <>
      <div className="py-5 px-10 border-b border-gray-400">
        <button
          className="py-2 px-4 bg-[#f4f4f5] text-secondaryText text-lg flex items-center gap-3 hover:bg-[#cbcbcb]"
          onClick={() => router.back()}
        >
          <Icon icon="pajamas:go-back" color="currentColor" /> Back
        </button>
      </div>
      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <ScaleLoader color="#1A4649" height={30} />
        </div>
      ) : (
        <div className="max-h-full flex flex-col items-center max-w-[1200px] mx-auto w-[90%]">
          <h3 className="mt-10 font-semibold text-2xl mb-5">Payment for Subscription Package</h3>
          <div className="rounded-lg border border-gray-400 w-1/2">
            <h5 className="p-3 font-medium text-lg">Price for Subscription</h5>
            <hr className="h-px bg-[#BABABA] mb-3" />

            <div className="flex justify-between p-3">
              <h3 className="capitalize">
                {dataSubs[0]?.name} ({dataSubs[0]?.duration} month{dataSubs[0]?.duration > 1 ? "s" : ""})
              </h3>
              <p className="text-lg">Rp{formatNumberWithDots(dataSubs[0]?.price ?? "")}</p>
            </div>

            <hr className="h-px bg-[#BABABA] mt-3" />

            <div className="flex justify-between mt-2 p-3">
              <h5 className="text-xl">Total Payment</h5>
              <div className="flex flex-col items-start">
                <p className="mb-2 font-medium text-xl">Rp{formatNumberWithDots(dataSubs[0]?.price ?? "")}</p>
                <button
                  className="py-2 w-full bg-primaryBtn text-white font-medium rounded-md"
                  onClick={() => {
                    handleTransaction();
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionTransactions;
