import CardProfile from "@/components/CardProfile";
import AdminLayout from "@/components/layouts/AdminLayout";
import { baseUrl } from "@/services/base";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const ProfileAdminPage = () => {
  const router = useRouter();
  const { profileAdminId } = router.query;
  const { data: dataProfile, isLoading } = useSWR(baseUrl(`/users/${profileAdminId}`), fetcherGet);

  return (
    <AdminLayout>
      <div className="flex justify-center pt-14">
        <CardProfile title={"Admin"} dataProfile={dataProfile} />
      </div>
    </AdminLayout>
  );
};

export default ProfileAdminPage;
