import { filerColorType } from "@/pages/admin/transactions";
import { TransactionType } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import ModalConfirmTransaction from "./ModalConfirmTransaction";
import { formatNumberWithDots, showToastMessage } from "@/utils/libs";
import { fetcherGet, fetcherPatch } from "@/services/fetcher/fetcher";
import { baseUrl } from "@/services/base";
import { ToastContainer } from "react-toastify";

const ModalTransactions = ({
  data,
  setShowModal,
}: {
  data: TransactionType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [choosenAction, setChoosenAction] = useState("");

  const handleProceed = async (choosen: string) => {
    if (choosen === "reject") {
      await fetcherPatch(baseUrl(`/transactions/${data.id}`), { ...data, status: "canceled" });
    } else {
      fetcherPatch(baseUrl(`/transactions/${data.id}`), { ...data, status: "completed" }).then((res) => {
        const additionDate = res.type === "pro" ? 365 : res.type === "amateur" ? 90 : 30;
        fetcherGet(baseUrl(`/users/${res.user_id}`)).then((resGet) => {
          const currentExpDate = resGet.expired_subs ? new Date(resGet.expired_subs) : new Date();
          currentExpDate.setDate(currentExpDate.getDate() + additionDate);

          fetcherPatch(baseUrl(`/users/${res.user_id}`), { plan: "premium", expired_subs: currentExpDate });
        });
      });
    }

    showToastMessage("Success proceed the transaction!");
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div
        onClick={() => {
          setShowModal(false);
        }}
        className="w-screen bg-[rgb(0,0,0,0.7)] fixed z-[99] h-screen top-0 left-0 bottom-0"
      ></div>

      <div className="w-[40%] bg-white rounded-xl px-10 py-5 flex flex-col justify-center z-[200] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-between relative">
          <h2 className="text-2xl pt-2 pb-5 text-center w-full text-primary font-semibold border-b-2 border-dotted border-slate-700">
            Transaction Detail
          </h2>

          <div className="mt-2">
            <div className="w-full flex gap-4">
              <h2 className="w-16">Id :</h2>
              <p className="w-full">{data.id}</p>
            </div>

            <div className="w-full flex gap-4">
              <h2 className="w-16">Id User:</h2>
              <p className="w-full">{data.user_id}</p>
            </div>

            <div className="w-full flex gap-4">
              <h2 className="w-16">Date :</h2>
              <p className="w-full">{data.transaction_date}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-xl mb-2">Type Subscription</h3>

              <div className="p-5 rounded-xl shadow-md flex flex-col items-center border border-slate-400 w-fit">
                {data.type === "rookie" ? (
                  <>
                    <Icon icon="ri:game-fill" color="#f2c83b" width={30} height={30} />
                    <h4 className="font-semibold text-xl">Rookie Package</h4>
                    <p>Rp100.000/month</p>
                  </>
                ) : data.type === "amateur" ? (
                  <>
                    <Icon icon="icon-park-solid:game-console" color="#f2c83b" width={30} height={30} />
                    <h4 className="font-semibold text-xl">Amateur Package</h4>
                    <p>Rp270.000/3 month</p>
                  </>
                ) : (
                  <>
                    <Icon icon="ion:game-controller-sharp" color="#f2c83b" width={30} height={30} />
                    <h4 className="font-semibold text-xl">Pro Package</h4>
                    <p>Rp1.050.000/12 month</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-xl">Total Paid</h3>
              <p className="rounded-xl">Rp{formatNumberWithDots(data.total_paid)}</p>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold text-xl mb-1">Status</h3>
              <p className={`p-2 w-fit text-white capitalize font-medium rounded-xl ${filerColorType(data.status)}`}>
                {data.status}
              </p>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                className="p-3 px-7 font-semibold border border-slate-400 rounded-lg text-white bg-slate-500"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              {data.status === "process" ? (
                <div className="flex gap-2">
                  <button
                    className="p-3 px-7 font-semibold border border-slate-400 rounded-lg text-white bg-red-600"
                    onClick={() => {
                      setChoosenAction("reject");
                      setShowModalConfirm(true);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="p-3 px-7 font-semibold border border-slate-400 rounded-lg text-white bg-green-600"
                    onClick={() => {
                      setChoosenAction("accept");
                      setShowModalConfirm(true);
                    }}
                  >
                    Accept
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showModalConfirm && (
        <ModalConfirmTransaction
          choosenAction={choosenAction}
          setShowModal={setShowModalConfirm}
          handleProceed={handleProceed}
        />
      )}
    </>
  );
};

export default ModalTransactions;
