import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet, fetcherPatch } from "@/services/fetcher/fetcher";
import useAuthStore from "@/stores/userZustand";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";

const NewsDetail = () => {
  const router = useRouter();
  const { newsId } = router.query;
  const { data: newsDetail, isLoading } = useSWR(baseUrl(`/news/${newsId}`), fetcherGet, { refreshInterval: 2000 });
  const user = useAuthStore((state) => state.user);

  const handleShare = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_LOCAL_WEB_URL + router.asPath);
    toast("Link copied!", {
      position: "bottom-center",
      autoClose: 2000,
      pauseOnHover: false,
      theme: "light",
    });

    fetcherGet(baseUrl(`/news/${newsId}`)).then((res) => {
      fetcherPatch(baseUrl(`/news/${newsId}`), { share: res.share + 1 });
    });
  };

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
            <ToastContainer position="bottom-center" theme="light" />
            <h2 className="font-semibold text-3xl pb-2 border-b border-slate-600 w-fit">{newsDetail?.title}</h2>
            <div className="flex mb-4 gap-4">
              <p className="text-slate-400 font-medium capitalize">{newsDetail?.category}</p>
              <p className="text-slate-400 font-medium">|</p>
              <p className="text-slate-400 font-medium">{new Date(newsDetail?.created_at).toDateString()}</p>
            </div>

            <img src={newsDetail?.img ? newsDetail?.img : ""} alt="" className="w-full object-cover max-h-[421px]" />
            <section className="mt-10">
              <p className="text-justify text-lg">{newsDetail?.description}</p>
            </section>

            <div className="flex gap-3 items-center">
              <div className="mt-5 p-3 rounded-lg border border-primary bg-primary w-fit flex items-center gap-3 hover:opacity-95 cursor-pointer">
                <Icon icon="mdi:like" color="#fff" width={22} />
                <p className="text-white">Upvote ({newsDetail?.like})</p>
              </div>
              <div
                className="mt-5 p-3 rounded-lg border border-primary bg-primaryBg w-fit flex items-center gap-1 hover:bg-primary group cursor-pointer"
                onClick={() => handleShare()}
              >
                <Icon icon="bx:share" width={22} className="text-primary group-hover:text-white" />
                <p className="text-primary font-medium group-hover:text-white">Share ({newsDetail?.share})</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {newsDetail?.isPremium && user?.plan === "free" ? (
        <>
          <div className="w-screen bg-[rgb(0,0,0,0.4)] fixed z-[99] h-screen top-0 left-0 bottom-0"></div>
          <div className="w-full h-2/5 bg-gradient-to-t from-white from-70%  px-10 py-5 flex flex-col justify-center z-[200] fixed bottom-0 right-0 left-0">
            <div className="flex flex-col justify-end items-center relative pt-14">
              <h2 className="font-bold text-4xl mb-2">Try premium content</h2>
              <p className="text-secondaryText font-semibold mb-7">Get special price here</p>
              <Link
                href={"/subscription"}
                className="px-6 py-2 rounded-md text-white bg-primary font-medium text-xl hover:opacity-95"
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
