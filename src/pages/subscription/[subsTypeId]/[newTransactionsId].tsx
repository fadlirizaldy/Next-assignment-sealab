import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { formatNumberWithDots, showToastMessage } from "@/utils/libs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { BarLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";

const NewTransactions = () => {
  const router = useRouter();
  const { subsTypeId, newTransactionsId } = router.query;

  const { data: dataSubs, isLoading } = useSWR(baseUrl(`/plan?name=${subsTypeId}`), fetcherGet);

  useEffect(() => {
    if (!router.isReady) return;

    fetcherGet(baseUrl(`/transactions/${newTransactionsId}`))
      .then((resGet) => {
        if (resGet.status === "completed") {
          showToastMessage("Payment is already complete! Redirecting...");
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        }
      })
      .catch((err) => router.replace("/"));
  }, [router.isReady]);

  return (
    <>
      {isLoading ? (
        <BarLoader />
      ) : (
        <>
          <ToastContainer />
          <div className="py-5 px-10 border-b border-gray-400">
            <button
              className="py-2 px-4 bg-[#f4f4f5] text-secondaryText text-lg flex items-center gap-3 hover:bg-[#cbcbcb]"
              onClick={() => router.back()}
            >
              <Icon icon="pajamas:go-back" color="currentColor" /> Back
            </button>
          </div>
          <div className="max-h-full flex flex-col items-center max-w-[1200px] mx-auto w-[90%] mt-10">
            <div className="rounded-xl border border-gray-400 w-full md:w-1/2 flex flex-col items-center p-3">
              <h2 className="font-semibold text-xl mb-3">
                {">>>"} Scan Here {"<<<"}
              </h2>

              <div className="animate-flip-down animate-delay-500 animate-once">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`${process.env.NEXT_PUBLIC_LOCAL_WEB_URL}/payment/${newTransactionsId}`}
                  viewBox={`0 0 256 256`}
                />
              </div>

              <hr className="h-px bg-[#BABABA] my-3" />

              <div className="flex flex-col gap-2">
                <p className="text-lg capitalize">Id transaction : {newTransactionsId}</p>
                <p className="text-lg capitalize">Plan type: {subsTypeId}</p>
                <p className="text-lg ">Sub Total: Rp{formatNumberWithDots(dataSubs[0]?.price ?? "")}</p>
              </div>

              <button
                className="mt-4 bg-primary py-2 px-5 text-white rounded-xl font-medium text-lg hover:opacity-95"
                onClick={() => router.replace("/")}
              >
                Back To Home
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewTransactions;
