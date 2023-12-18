import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { NewsType } from "@/utils/types";
import React from "react";
import { BarLoader, BeatLoader } from "react-spinners";
import useSWR from "swr";

const NewsPage = () => {
  const { data: dataNews, isLoading } = useSWR(baseUrl("/news?_sort=like&_order=desc"), fetcherGet);
  console.log(dataNews);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto flex justify-between items-center">
        {isLoading ? (
          <BeatLoader size={30} color="#36d7b7" />
        ) : (
          <div className="mt-10">
            <h2 className="font-semibold text-3xl mb-4 pb-2 border-b border-slate-600 w-fit">Top Liked News</h2>

            <div className="w-full">
              <img src={dataNews[0]?.img ? dataNews[0]?.img : ""} alt="" className="w-full object-cover h-80" />
              <div className="flex gap-4 items-center mt-5">
                <h3 className="font-semibold text-xl">{dataNews[0]?.title}</h3>
                <p className="font-medium text-secondaryText capitalize text-sm italic">{dataNews[0]?.category}</p>
              </div>
              <p className="line-clamp-2">{dataNews[0]?.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-3xl mb-4 pb-2 border-b border-slate-600 w-fit">News</h3>

              <section className="flex flex-col gap-3">
                {dataNews?.map((data: NewsType, idx: number) => {
                  if (idx === 0) return;
                  return (
                    <div className="flex gap-4 w-full h-32">
                      <img src={data.img} alt="" className="w-52 h-full object-cover" />
                      <div>
                        <div className="flex gap-4 mt-5">
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
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewsPage;
