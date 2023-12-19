import CardSubscription from "@/components/CardSubscription";
import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { formatNumberWithDots } from "@/utils/libs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

type PlanType = {
  id: string;
  name: string;
  price: number;
  icon: string;
  duration: number;
};

const SubscriptionPage = () => {
  const router = useRouter();

  const handleChoose = (typeSubs: string) => {
    router.push(`/subscription/${typeSubs}`);
  };

  const { data: dataPlan, isLoading } = useSWR(baseUrl("/plan"), fetcherGet);

  return (
    <MainLayout>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        <div className="pt-10 flex flex-col items-center gap-3">
          <h2 className="text-3xl font-medium ">Price & Benefit Subscribe</h2>
          <p className="text-secondaryText">
            Choose a subscription package as a learning investment that suits your needs.
          </p>
        </div>

        <section className="mt-5 p-6 bg-white rounded-md border border-gray-400 shadow-md">
          <div className="grid grid-cols-2 gap-5">
            {dataPlan?.map((data: PlanType, idx: number) => (
              <CardSubscription key={idx}>
                <Icon icon={data.icon} color="#f2c83b" width={30} height={30} />
                <h2 className="font-semibold text-xl capitalize">{data.name} Package</h2>
                <p className="font-medium text-lg">
                  Subscribe for {data.duration} month{data.duration > 1 ? "s" : ""}
                </p>
                <p className="font-medium text-xl">Rp{formatNumberWithDots(data.price)}</p>
                <button
                  className="mt-3 py-2 px-4 bg-primary text-white font-medium hover:opacity-95"
                  onClick={() => handleChoose(data.name)}
                >
                  Choose Package
                </button>
              </CardSubscription>
            ))}
          </div>

          <hr className="h-px bg-[#BABABA] my-6 " />

          <div className="flex flex-col gap-2 pl-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-2xl">
                <Icon icon="ph:book-duotone" color="#1a4649" />
                <h4 className="text-2xl">Access to all news</h4>
              </div>
              <p className="text-secondaryText">Access to all news and article (premium and free content)</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-2xl">
                <Icon icon="ant-design:read-outlined" color="#1a4649" />
                <h4 className="text-2xl">Enhance your reading experience</h4>
              </div>
              <p className="text-secondaryText">Read offline wherever you go</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-2xl">
                <Icon icon="mdi:ads-off" color="#1a4649" />
                <h4 className="text-2xl">Free of ads</h4>
              </div>
              <p className="text-secondaryText">Ads will completely get rid of your screen</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;
