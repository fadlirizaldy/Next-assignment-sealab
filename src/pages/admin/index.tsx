import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { TransactionType, UserType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BarLoader } from "react-spinners";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import useSWR from "swr";

type UsersBarChart = { type: string; count: number };
type TransactionsType = { name: string; value: any; fill: string };

const dashboard = () => {
  const { data: dataTransaction, isLoading: loadingTransaction } = useSWR(baseUrl("/transactions"), fetcherGet);
  const { data: dataUsers, isLoading: loadingUsers } = useSWR(baseUrl("/users"), fetcherGet);

  const [dataUsersChart, setDataUsersChart] = useState<UsersBarChart[]>();
  const [dataTypeTransactions, setDataTypeTransactions] = useState<TransactionsType[]>();

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
    setDataTypeTransactions(dataStatusTransaction());
  }, [dataUsers]);

  const countReduceTransaction = () => {
    return dataTransaction?.reduce(
      (accumulator: number, currentValue: TransactionType) => accumulator + currentValue.total_paid,
      0
    );
  };

  const dataStatusTransaction = () => {
    const countComplete = dataTransaction?.filter((data: TransactionType) => data.status === "completed").length;
    const countCanceled = dataTransaction?.filter((data: TransactionType) => data.status === "canceled").length;
    const countProcess = dataTransaction?.filter((data: TransactionType) => data.status === "process").length;

    return [
      { name: "Completed", value: countComplete, fill: "#16A34A" },
      { name: "Canceled", value: countCanceled, fill: "#FF4949" },
      { name: "Process", value: countProcess, fill: "#3B82F6" },
    ];
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
                    <CountUp end={countReduceTransaction()} duration={2} className="text-2xl" separator="." />
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

          <div className="mt-10 p-4 rounded-lg shadow-md flex gap-10 items-center border border-slate-300">
            <div className="flex flex-col items-center">
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
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl">Type Transactions</h3>
              <PieChart width={550} height={300}>
                <Legend height={18} cx={250} cy={50} />
                <Pie
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  cx={270}
                  cy={120}
                  fill="#82ca9d"
                  label
                  paddingAngle={0}
                  data={dataTypeTransactions}
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default dashboard;
