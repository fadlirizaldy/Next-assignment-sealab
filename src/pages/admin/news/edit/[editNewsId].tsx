import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "@/services/base";
import { fetcherGet, fetcherPatch, fetcherPost } from "@/services/fetcher/fetcher";
import { Icon } from "@iconify/react/dist/iconify.js";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";
import { defaultNewsData } from "../add";

const EditNewsPage = () => {
  const router = useRouter();
  const { editNewsId: id } = router.query;
  const [dataNews, setDataNews] = useState(defaultNewsData);

  useEffect(() => {
    fetcherGet(baseUrl(`/news/${id}`))
      .then((data) => setDataNews(data))
      .catch((err) => console.log(err));
  }, []);

  const [error, setError] = useState(defaultNewsData);

  const validateNews = () => {
    if (dataNews.title === "" || dataNews.title.length < 10) {
      setError((prev) => ({ ...prev, title: "Please enter 10 length title" }));
    } else {
      setError((prev) => ({ ...prev, title: "" }));
    }

    if (dataNews.category === "") {
      setError((prev) => ({ ...prev, category: "Please enter the category" }));
    } else {
      setError((prev) => ({ ...prev, category: "" }));
    }
    if (dataNews.description === "") {
      setError((prev) => ({ ...prev, description: "Please enter the description" }));
    } else {
      setError((prev) => ({ ...prev, description: "" }));
    }
    if (!dataNews.img) {
      setError((prev) => ({ ...prev, img: "Please enter the photo" }));
    } else {
      setError((prev) => ({ ...prev, img: "" }));
    }

    if (
      dataNews.title === "" ||
      dataNews.title.length < 10 ||
      dataNews.category === "" ||
      dataNews.description === "" ||
      !dataNews.img
    )
      return false;

    return true;
  };

  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateNews()) return;
    let urlTmp = "";

    if (typeof dataNews.img !== "string") {
      const formData = new FormData();
      formData.append("file", dataNews.img);
      formData.append("upload_preset", "matoa_admin");

      const { url } = await fetcherPost("https://api.cloudinary.com/v1_1/db5fjn9m2/image/upload", formData);
      urlTmp = url;
    }

    const newData = {
      ...dataNews,
      id: uuidv4(),
      like: 0,
      img: urlTmp,
      updated_at: new Date().toLocaleString(),
    };

    await fetcherPatch(baseUrl(`/news/${id}`), newData);
    router.push("/admin/news");
  };

  return (
    <AdminLayout>
      <Link href={"/admin/news"} className="w-fit font-semibold text-blue-700 underline py-1 mt-4 ml-5">
        Back
      </Link>
      <div className="flex justify-center my-16 h-full">
        <div className="max-w-[1200px] w-[50%] mx-auto h-[80%]">
          <h1 className="text-3xl font-semibold py-2 border-b-2 border-slate-700 w-fit">Add News</h1>

          <form className="mt-5 flex flex-col gap-4" onSubmit={(e) => handleSubmitData(e)}>
            <div className="flex flex-col">
              <label className="font-medium text-xl mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Input title here.."
                className="p-2 rounded-lg border border-slate-300"
                onChange={(e) => setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                value={dataNews.title}
              />
              {error.title && <p className="text-red-600">{error.title}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium text-xl mb-1">Category</label>
                <select
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                  value={dataNews.category}
                >
                  <option value="" selected disabled hidden>
                    Choose a Category
                  </option>
                  <option value="Multiplayer online battle arena (MOBA)">Multiplayer online battle arena (MOBA)</option>
                  <option value="Shooters (FPS and TPS)">Shooters (FPS and TPS)</option>
                  <option value="Role-playing (RPG)">Role-playing (RPG)</option>
                  <option value="Simulation and sports">Simulation and sports</option>
                  <option value="Puzzlers and party games">Puzzlers and party games</option>
                </select>
                {error.category && <p className="text-red-600">{error.category}</p>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-xl mb-1">Type</label>
                <select
                  name="isPremium"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.value === "free" ? false : true }))
                  }
                  value={dataNews.isPremium ? "premium" : "free"}
                >
                  <option value="" selected disabled hidden>
                    Choose a type
                  </option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-xl mb-1">{error.description}</label>
              <textarea
                name="description"
                id=""
                cols={30}
                rows={10}
                className="p-2 rounded-lg border border-gray-300"
                value={dataNews.description}
                onChange={(e) => setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              ></textarea>
              {error.description && <p className="text-red-600">{error.description}</p>}
            </div>

            <label className="font-medium text-xl ">Upload Image</label>
            {dataNews.img ? (
              <div className="w-48 relative flex gap-5">
                <img
                  src={typeof dataNews.img === "string" ? dataNews.img : URL.createObjectURL(dataNews.img)}
                  className="object-cover h-full w-64"
                />
                <h2 className="text-sm text-slate-400">Click to change image</h2>

                <div className="absolute bg-slate-600 h-full w-full opacity-0 hover:opacity-100 hover:bg-opacity-20">
                  <input
                    type="file"
                    name="img"
                    id="imageInput2"
                    className="w-full h-full cursor-pointer opacity-0"
                    accept="image/png, image/gif, image/jpeg"
                    placeholder="Change Image"
                    onChange={(e) => {
                      setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }));
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                {error.img && <p className="text-red-600">{error.img}</p>}
                <div className="relative w-20 h-20 cursor-pointer bg-[#D2D7E0] rounded-2xl flex justify-center items-center">
                  <input
                    type="file"
                    name="img"
                    id="imageInput"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    accept="image/png, image/gif, image/jpeg"
                    placeholder="Input Image"
                    onChange={(e) => setDataNews((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }))}
                  />
                  <Icon icon="material-symbols:add" className="w-12 h-12" />
                </div>
              </>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 text-center text-xl bg-primaryBtn rounded-lg text-white hover:opacity-95"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditNewsPage;
