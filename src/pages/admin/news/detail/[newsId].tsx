import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DetailPage = () => {
  const router = useRouter();
  const { newsId: id } = router.query;
  const [dataNews, setDataNews] = useState({
    id: "",
    title: "",
    description: "",
    isPremium: false,
    img: "",
    category: "",
    like: 0,
  });

  useEffect(() => {
    fetcherGet(baseUrl(`/news/${id}`))
      .then((data) => setDataNews(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(dataNews);

  return (
    <AdminLayout>
      <Link href={"/admin/news"} className="w-fit font-semibold text-blue-700 underline py-1 mt-4 ml-5">
        Back
      </Link>
      <div className="flex justify-center my-16 h-full">
        <div className="max-w-[1200px] w-[80%] mx-auto">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">{dataNews.title}</h1>
          <h4>{dataNews.isPremium ? "Premium" : ""}</h4>

          <div className="flex items-center gap-2">
            <Icon icon="mdi:like" className="text-primaryBtn" width={16} height={16} />
            <p>{dataNews.like}</p>
          </div>

          <div className="flex justify-center w-full mt-14">
            <img src={dataNews.img} alt="" className="w-[80%] object-cover" />
          </div>

          <section className="mt-5">
            <p>{dataNews.description}</p>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DetailPage;
