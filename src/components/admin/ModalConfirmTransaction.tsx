import React from "react";

const ModalConfirmTransaction = ({
  choosenAction,
  setShowModal,
  handleProceed,
}: {
  choosenAction: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleProceed: (choosen: string) => void;
}) => {
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="w-screen bg-[rgb(0,0,0,0.7)] fixed z-[200] h-screen top-0 left-0 bottom-0"
      ></div>
      <div className="w-[30%] bg-white rounded-xl px-10 py-5 flex flex-col justify-center z-[400] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col justify-between relative">
          <h2 className="text-2xl pt-2 pb-5 text-center w-full text-primary font-semibold border-b-2 border-slate-700">
            Are you sure want to{" "}
            <span className={`${choosenAction === "reject" ? "text-red-600" : "text-green-700"}`}>
              {choosenAction === "reject" ? "Reject" : "Accept"}
            </span>
            ?
          </h2>
        </div>

        <p className="italic text-secondaryText">After you proceed. The process can't be undone</p>

        <div className="flex gap-2 mt-3 justify-end">
          <button
            className="p-2 px-5 font-semibold border border-slate-400 rounded-lg text-white bg-slate-500"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className={`p-2 px-5 font-semibold border border-slate-400 rounded-lg text-white ${
              choosenAction === "reject" ? "bg-red-600" : "bg-green-600"
            }`}
            onClick={() => handleProceed(choosenAction)}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmTransaction;
