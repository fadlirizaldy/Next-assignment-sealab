import { baseUrl } from "@/services/base";
import { fetcherGet, fetcherPatch, fetcherPost } from "@/services/fetcher/fetcher";
import { showToastMessage } from "@/utils/libs";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const PaymentPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { paymentId } = router.query;

    fetcherGet(baseUrl(`/transactions/${paymentId}`)).then((resGet) => {
      if (resGet.status === "completed") {
        router.replace("/");
      }
      fetcherPatch(baseUrl(`/transactions/${paymentId}`), { status: "completed" }).then((res) => {
        fetcherPatch(baseUrl(`/users/${res.user_id}`), { plan: "premium" }).then(() => {
          showToastMessage("Transactions complete! Redirecting..");
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        });
      });
      fetcherPatch(baseUrl(`/transactions/${paymentId}`), { status: "completed" }).then((res) => {
        const additionDate = res.type === "pro" ? 365 : res.type === "amateur" ? 90 : 30;
        fetcherGet(baseUrl(`/users/${res.user_id}`)).then((resGet) => {
          const currentExpDate = resGet.expired_subs ? new Date(resGet.expired_subs) : new Date();
          currentExpDate.setDate(currentExpDate.getDate() + additionDate);

          fetcherPatch(baseUrl(`/users/${res.user_id}`), { plan: "premium", expired_subs: currentExpDate }).then(() => {
            showToastMessage("Transactions complete! Redirecting..");
            setTimeout(() => {
              router.replace("/");
            }, 2000);
          });
        });
      });
    });
  }, [router.isReady]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
