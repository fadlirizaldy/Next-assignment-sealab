import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { TransactionType, UserType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import CountUp, { useCountUp } from "react-countup";
import { BarLoader } from "react-spinners";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import useSWR from "swr";

type UsersBarChart = { type: string; count: number };

const dashboard = () => {
  const { data: dataTransaction, isLoading: loadingTransaction } = useSWR(baseUrl("/transactions"), fetcherGet);
  const { data: dataUsers, isLoading: loadingUsers } = useSWR(baseUrl("/users"), fetcherGet);

  const [dataUsersChart, setDataUsersChart] = useState<UsersBarChart[]>();

  useEffect(() => {
    const countUserPremium = () => {
      let cntPremium = 0;
      let cntFree = 0;

      dataUsers?.forEach((user: UserType) => {
        if (user.plan === "premium") {
          cntPremium += 1;
        } else {
          cntFree += 1;
        }
      });

      return [
        { type: "Premium", count: cntPremium },
        { type: "Free", count: cntFree },
      ];
    };
    setDataUsersChart(countUserPremium());
  }, [dataUsers]);

  const countReduce = () => {
    return dataTransaction?.reduce(
      (accumulator: number, currentValue: TransactionType) => accumulator + currentValue.total_paid,
      0
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-center h-full">
        <div className="font-bold max-w-[1200px] w-[90%] mx-auto h-[80%]">
          <div className="flex justify-center">
            <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit mt-10">Dashboard</h1>
          </div>

          <section className="mt-10 grid grid-cols-3 gap-5">
            <div className="p-4 bg-primaryBtn text-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="font-semibold text-2xl">Total Transaction</h2>
              <div>
                {loadingTransaction ? (
                  <BarLoader />
                ) : (
                  <CountUp end={dataTransaction.length} duration={2} className="text-2xl" />
                )}
              </div>
            </div>
            <div className="p-4 bg-primaryBtn text-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="font-semibold text-2xl">Total Income</h2>
              <div className="">
                {loadingTransaction ? (
                  <BarLoader />
                ) : (
                  <div className="flex items-center">
                    <h2 className="text-2xl">Rp</h2>
                    <CountUp end={countReduce()} duration={2} className="text-2xl" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-primaryBtn text-white rounded-lg shadow-md flex flex-col items-center">
              <h2 className="font-semibold text-2xl">Total Users</h2>
              {loadingUsers ? (
                <BarLoader />
              ) : (
                <div className="flex items-center">
                  <CountUp end={dataUsers?.length} duration={2} className="text-2xl" />
                </div>
              )}
            </div>
          </section>

          <div className="mt-10 p-4 rounded-lg shadow-md flex flex-col items-center border border-slate-300">
            <h3 className="text-2xl">Premium & Free User</h3>
            <BarChart width={500} height={300} data={dataUsersChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis dataKey="count" />
              <Tooltip />
              <Legend />
              <Bar label={true} dataKey="count" fill="#1A4649" />
            </BarChart>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default dashboard;
