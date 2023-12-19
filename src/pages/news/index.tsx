import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { NewsType } from "@/utils/types";
import { useRouter } from "next/router";
import React from "react";
import { BarLoader, BeatLoader } from "react-spinners";
import useSWR from "swr";

const NewsPage = () => {
  const router = useRouter();
  const { data: dataNews, isLoading } = useSWR(baseUrl("/news?_sort=like&_order=desc"), fetcherGet);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        {isLoading ? (
          <div className="flex justify-center pt-20">
            <BeatLoader size={30} color="#36d7b7" />
          </div>
        ) : (
          <div className="pt-10">
            <h3 className="font-semibold text-3xl mb-4 pb-2 border-b border-slate-600 w-fit">News</h3>

            <section className="flex flex-col gap-3">
              {dataNews?.map((data: NewsType, idx: number) => {
                return (
                  <div
                    className="flex gap-4 w-full h-32 pb-2 border-b border-slate-300 relative overflow-hidden"
                    key={data.id}
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-52 h-full object-cover cursor-pointer"
                      onClick={() => router.push(`/news/detail/${data.id}`)}
                    />

                    {data.isPremium ? (
                      <div className="bg-[#FFF200] font-semibold p-1 w-32 text-center absolute -left-9 top-3 -rotate-45">
                        <h2>Premium</h2>
                      </div>
                    ) : null}

                    <div className="cursor-pointer" onClick={() => router.push(`/news/detail/${data.id}`)}>
                      <div className="flex gap-4 items-center">
                        <h3 className="font-semibold text-xl">{data.title}</h3>
                        <p className="font-medium text-secondaryText capitalize text-sm italic">{data?.category}</p>
                      </div>
                      <p className="line-clamp-2">{data?.description}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewsPage;
