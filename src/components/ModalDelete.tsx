import { baseUrl } from "@/services/base";
import { fetcherDelete } from "@/services/fetcher/fetcher";
import { NewsType } from "@/utils/types";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { KeyedMutator } from "swr";

const ModalDelete = ({
  dataDeleted,
  setShowModal,
}: {
  dataDeleted: NewsType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const response = await fetcherDelete(baseUrl(`/news/${dataDeleted.id}`));
    setLoading(false);

    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="w-screen bg-[rgb(0,0,0,0.7)] fixed z-[99] h-screen top-0 left-0 bottom-0"
      ></div>
      <div className="w-[40%] bg-white rounded-xl px-10 py-4 flex flex-col justify-center z-[200] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between">
          <h2 className="text-xl text-primary">Confirm Delete</h2>
          <div className="cursor-pointer text-primary" onClick={() => setShowModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <hr className="h-px bg-[#BABABA] my-3" />

        <div className="py-10 flex justify-center items-center">
          <h3 className="text-[#666] text-xl">
            Are you sure want to delete <span className="text-primary">{dataDeleted.title}</span>
          </h3>
        </div>
        <hr className="h-px bg-[#BABABA] my-3" />

        <div className="flex gap-3 justify-end">
          <button
            className="py-2 px-7 rounded-lg bg-primary text-white hover:opacity-95"
            onClick={() => handleDelete()}
          >
            {loading ? "Loading.." : "Yes"}
          </button>
          <button
            className="py-2 px-7 rounded-lg border border-primary hover:opacity-95 text-primary"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ModalDelete;
