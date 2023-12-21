import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import useAuthStore from "@/stores/userZustand";
import { NewsType } from "@/utils/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const RecommendSection = ({ newsId }: { newsId: string }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [recommendNews, setRecommendNews] = useState([]);
  console.log(user);

  useEffect(() => {
    if (!isLoggedIn) {
      fetcherGet(baseUrl(`/news?_sort=like&_order=desc&_limit=3&id_ne=${newsId}`)).then((resGet) =>
        setRecommendNews(resGet)
      );
    } else {
      if (user?.like?.length < 1) {
        fetcherGet(baseUrl(`/news?_sort=like&_order=desc&_limit=3&id_ne=${newsId}`)).then((resGet) =>
          setRecommendNews(resGet)
        );
      } else {
        fetcherGet(baseUrl(`/news/${user?.like[user.like.length - 1]}`)).then((res) => {
          const category = res.category;

          fetcherGet(baseUrl(`/news?category=${category}&_limit=3&id_ne=${newsId}`)).then((resGet) =>
            setRecommendNews(resGet)
          );
        });
      }
    }
  }, [newsId]);
  return (
    <div className="grid grid-cols-3 gap-6">
      {recommendNews?.map((news: NewsType) => (
        <div
          className="rounded-xl relative overflow-hidden group text-white cursor-pointer h-52"
          onClick={() => router.push(`/news/detail/${news?.id}`)}
          key={news.id}
        >
          <img
            alt=""
            src={news?.img ? news.img : "/no-image.png"}
            className="group-hover:blur-[2px] transition-all duration-500 ease-out rounded-md h-full object-cover w-full"
          />
          <div className="inset-0 p-5 rounded-md absolute opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out bg-black/40 flex flex-col justify-end">
            <h1 className="font-bold text-white text-xl">{news?.title}</h1>
            <p className="flex items-center gap-1 line-clamp-1 text-sm">{news?.description.slice(0, 50)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendSection;
