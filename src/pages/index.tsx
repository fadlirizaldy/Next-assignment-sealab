import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <h2>Dari index</h2>
    </MainLayout>
  );
}
