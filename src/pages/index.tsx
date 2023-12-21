import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { NewsType } from "@/utils/types";
import { DotLoader, HashLoader } from "react-spinners";
import { Icon } from "@iconify/react/dist/iconify.js";
import NewsSection from "@/components/news/NewsSection";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(baseUrl(`/news?_sort=like&_order=desc&_limit=5`));

  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
};

export default function Home({ data: dataTopLiked }: { data: NewsType[] }) {
  const router = useRouter();
  const { data: dataNewsLatest, isLoading } = useSWR(
    baseUrl("/news?_sort=created_at&_order=desc&_limit=5"),
    fetcherGet
  );
  // const { data: dataLatest, is };
  console.log(dataNewsLatest);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        {isLoading ? (
          <div className="pt-10 flex justify-center">
            <HashLoader />
          </div>
        ) : (
          <div className="pt-10">
            <h2 className="font-semibold text-3xl mb-4 pb-2 border-b border-slate-600 w-fit animate-fade-up animate-delay-300 animate-once">
              Top Liked News
            </h2>

            <div className="grid gap-5 grid-cols-4 grid-rows-2 animate-fade-up animate-delay-500 animate-once">
              <div
                className="w-full cursor-pointer col-span-2 row-span-full"
                onClick={() => router.push(`/news/detail/${dataTopLiked[0]?.id}`)}
              >
                <div className="relative h-full">
                  <img
                    src={dataTopLiked[0]?.img ? dataTopLiked[0]?.img : ""}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute bottom-6 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataTopLiked[0]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataTopLiked[1]?.id}`)}
              >
                <div className="relative h-full">
                  <img
                    src={dataTopLiked[1]?.img ? dataTopLiked[1]?.img : ""}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataTopLiked[1]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataTopLiked[2]?.id}`)}
              >
                <div className="relative h-full">
                  <img
                    src={dataTopLiked[2]?.img ? dataTopLiked[2]?.img : ""}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataTopLiked[2]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataTopLiked[3]?.id}`)}
              >
                <div className="relative h-full">
                  <img
                    src={dataTopLiked[3]?.img ? dataTopLiked[3]?.img : ""}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataTopLiked[3]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataTopLiked[4]?.id}`)}
              >
                <div className="relative h-full">
                  <img
                    src={dataTopLiked[4]?.img ? dataTopLiked[4]?.img : ""}
                    alt=""
                    className="w-full object-cover h-full"
                  />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataTopLiked[4]?.title}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 animate-fade-up animate-delay-700 animate-once">
              <h3 className="text-black text-2xl font-semibold flex items-center gap-1 mb-3">
                <div className="w-5 h-5 bg-primary"></div>
                Latest
              </h3>

              {dataNewsLatest?.map((data: NewsType, idx: number) => {
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
            </div>
            <NewsSection />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
