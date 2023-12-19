import CardProfile from "@/components/CardProfile";
import MainLayout from "@/components/layouts/MainLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const ProfilePage = () => {
  const router = useRouter();
  const { profileId } = router.query;

  const { data: dataProfile, isLoading } = useSWR(baseUrl(`/users/${profileId}`), fetcherGet);
  return (
    <MainLayout>
      <div className="flex justify-center pt-14">
        <CardProfile title="User" dataProfile={dataProfile} />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
