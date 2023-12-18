import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";

const NewsDetail = () => {
  const router = useRouter();
  const { newsId } = router.query;
  const { data: newsDetail, isLoading } = useSWR(baseUrl(`/news/${newsId}`), fetcherGet);
  console.log(newsDetail);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        {isLoading ? (
          <div className="flex justify-center pt-20">
            <BeatLoader size={30} color="#36d7b7" />
          </div>
        ) : (
          <div className="pt-10">
            <h2 className="font-semibold text-3xl pb-2 border-b border-slate-600 w-fit">{newsDetail?.title}</h2>
            <div className="flex mb-4 gap-4">
              <p className="text-slate-400 font-medium capitalize">{newsDetail?.category}</p>
              <p className="text-slate-400 font-medium">|</p>
              <p className="text-slate-400 font-medium">{newsDetail?.created_at}</p>
            </div>

            <img src={newsDetail?.img ? newsDetail?.img : ""} alt="" className="w-full object-cover max-h-[421px]" />
            <section className="mt-10">
              <p className="text-justify text-lg">{newsDetail?.description}</p>
            </section>

            <div className="mt-5 p-3 rounded-lg border border-primary bg-primary w-fit flex items-center gap-3 hover:opacity-95 cursor-pointer">
              <Icon icon="mdi:like" color="#fff" width={22} />
              <p className="text-white">Upvote ({newsDetail?.like})</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewsDetail;
