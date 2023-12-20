import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import useAuthStore from "@/stores/userZustand";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";

const NewsDetail = () => {
  const router = useRouter();
  const { newsId } = router.query;
  const { data: newsDetail, isLoading } = useSWR(baseUrl(`/news/${newsId}`), fetcherGet);
  const user = useAuthStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (newsDetail?.isPremium && user?.plan === "free") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [newsDetail]);

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

      {newsDetail?.isPremium && user?.plan === "free" ? (
        <>
          <div className="w-screen bg-[rgb(0,0,0,0.4)] fixed z-[99] h-screen top-0 left-0 bottom-0"></div>
          <div className="w-full h-1/3 bg-gradient-to-t from-white from-50%  px-10 py-5 flex flex-col justify-center z-[200] fixed bottom-0 right-0 left-0">
            <div className="flex flex-col justify-center items-center relative">
              <h2 className="font-bold text-3xl mb-2">Try premium content</h2>
              <p className="text-secondaryText font-semibold mb-5">Get special price here</p>
              <Link
                href={"/subscription"}
                className="px-5 py-2 rounded-md text-white bg-primary font-medium text-lg hover:opacity-95"
              >
                Get Now!
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </MainLayout>
  );
};

export default NewsDetail;
