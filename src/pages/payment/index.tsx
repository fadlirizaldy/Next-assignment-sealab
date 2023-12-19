import { baseUrl } from "@/services/base";
import { fetcherPatch, fetcherPost } from "@/services/fetcher/fetcher";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PaymentPage = () => {
  const router = useRouter();
  useEffect(() => {
    // alert("paid");
    // fetcherPatch(baseUrl(`/transactions/${id}`))
    // fetch("http://localhost:8080/plan", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   method: "post",
    //   body: JSON.stringify({ task: "hehe" }),
    // }).then(() => {
    // });
    // fetcherPost(baseUrl("/plan"), JSON.stringify({ id: "opodpad", name: "hehe" })).then(() => {
    //   router.push("/");
    // });
  }, []);
  return (
    <div>
      <h1>Hehe</h1>
    </div>
  );
};

export default PaymentPage;
