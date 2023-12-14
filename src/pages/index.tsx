import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <h2>Dari index</h2>
      <Link href={"/admin"} className="p-2 border border-red-500">
        admin
      </Link>
    </MainLayout>
  );
}
