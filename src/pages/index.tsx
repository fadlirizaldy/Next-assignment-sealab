import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { NewsType } from "@/utils/types";
import { DotLoader } from "react-spinners";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  const router = useRouter();
  const { data: dataNews, isLoading } = useSWR(baseUrl("/news?_sort=like&_order=desc"), fetcherGet);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        {isLoading ? (
          <DotLoader />
        ) : (
          <div className="pt-10">
            <h2 className="font-semibold text-3xl mb-4 pb-2 border-b border-slate-600 w-fit">Top Liked News</h2>

            <div className="grid gap-5 grid-cols-4 grid-rows-2">
              <div
                className="w-full cursor-pointer col-span-2 row-span-full"
                onClick={() => router.push(`/news/detail/${dataNews[0]?.id}`)}
              >
                <div className="relative h-full">
                  <img src={dataNews[0]?.img ? dataNews[0]?.img : ""} alt="" className="w-full object-cover h-full" />
                  <div className="absolute bottom-6 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataNews[0]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataNews[1]?.id}`)}
              >
                <div className="relative h-full">
                  <img src={dataNews[1]?.img ? dataNews[1]?.img : ""} alt="" className="w-full object-cover h-full" />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataNews[1]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataNews[2]?.id}`)}
              >
                <div className="relative h-full">
                  <img src={dataNews[2]?.img ? dataNews[2]?.img : ""} alt="" className="w-full object-cover h-full" />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataNews[2]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataNews[3]?.id}`)}
              >
                <div className="relative h-full">
                  <img src={dataNews[3]?.img ? dataNews[3]?.img : ""} alt="" className="w-full object-cover h-full" />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataNews[3]?.title}</h3>
                  </div>
                </div>
              </div>
              <div
                className="w-full cursor-pointer col-span-1 row-span-1"
                onClick={() => router.push(`/news/detail/${dataNews[4]?.id}`)}
              >
                <div className="relative h-full">
                  <img src={dataNews[4]?.img ? dataNews[4]?.img : ""} alt="" className="w-full object-cover h-full" />
                  <div className="absolute bottom-5 text-white flex items-center text-xl px-6 gap-2">
                    <h3 className="font-semibold text-xl">{dataNews[4]?.title}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-black text-2xl font-semibold flex items-center gap-1 mb-3">
                <div className="w-5 h-5 bg-primary"></div>
                Latest
              </h3>

              {dataNews?.map((data: NewsType, idx: number) => {
                if (idx < 5 || idx > 9) return;
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

            <div className="mt-10">
              <h3 className="text-black text-2xl font-semibold flex items-center gap-1 mb-3">
                <div className="w-5 h-5 bg-primary"></div>
                News
              </h3>

              <div className="flex items-center gap-3">
                <select>
                  <option>Multiplayer online battle arena (MOBA)</option>
                  <option>Shooters (FPS and TPS)</option>
                  <option>Role-playing (RPG)</option>
                </select>
                <select>
                  <option>All</option>
                  <option>Premium</option>
                  <option>Free</option>
                </select>
                <div className="relative w-2/5">
                  <input
                    type="text"
                    placeholder="Search something..."
                    className="p-2 pr-8 border border-slate-400 bg-primaryBg rounded-xl w-full"
                    // onChange={(e) => setSearchVal(e.target.value)}
                  />
                  <Icon
                    icon="material-symbols:search"
                    className="text-slate-500 absolute right-2 top-2"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

{
  /* <div className="w-32 bg-green-600 row-span-2">HEHE</div>
            <div className="w-32 bg-red-600">HEHE</div>

            <div className="w-32 bg-blue-600">HEHE</div>

            <div className="w-32 bg-cyan-600">HEHE</div>

            <div className="w-32 bg-gray-600">HEHE</div> */
}
