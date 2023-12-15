import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { fetcherGet } from "@/services/fetcher/fetcher";
import { isEmail, showToastMessage } from "@/utils/libs";
import { baseUrl } from "@/services/base";
import { ScaleLoader } from "react-spinners";

import InputText from "@/components/InputText";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToastContainer } from "react-toastify";

export type DataLoginType = {
  email: string;
  password: string;
};

const login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [dataLogin, setDataLogin] = useState<DataLoginType>({ email: "", password: "" });
  const [error, setError] = useState<DataLoginType>({ email: "", password: "" });

  const validateLogin = () => {
    if (dataLogin.email === "" || !isEmail(dataLogin.email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid the email" }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (dataLogin.password === "") {
      setError((prev) => ({ ...prev, password: "Please enter the password" }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (dataLogin.email === "" || dataLogin.password === "" || !isEmail(dataLogin.email)) return false;

    return true;
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateLogin()) {
      setLoading(false);
      return;
    }

    const responseGetLogin = await fetcherGet(
      baseUrl(`/users?email=${dataLogin.email}&password=${dataLogin.password}`)
    );

    if (responseGetLogin.length < 1) {
      setError((prev) => ({ ...prev, password: "Email or password is incorrect" }));
      setLoading(false);
      return;
    }

    Cookies.set("role", responseGetLogin[0].role);
    Cookies.set("token", responseGetLogin[0].id);

    showToastMessage("Success login! Welcome");

    setTimeout(() => {
      setLoading(false);
      if (responseGetLogin[0].role === "admin") {
        router.replace("/admin/");
      } else {
        router.replace("/");
      }
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <AuthLayout>
        <h1 className="font-bold text-[32px] text-primary mb-3">Login</h1>

        <form className="flex flex-col gap-5">
          <div>
            <InputText
              title="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
              data={dataLogin.email}
              setData={setDataLogin}
            />
            <p className="font-medium text-sm text-dangerText">{error.email}</p>
          </div>
          <div>
            <InputText
              title="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              data={dataLogin.password}
              setData={setDataLogin}
            />
            <p className="font-medium text-sm text-dangerText">{error.password}</p>
          </div>

          <button
            onClick={handleLogin}
            type="submit"
            disabled={loading}
            className="text-xl h-[44px] mt-10 mb-[15px] rounded-[8px] font-semibold text-white bg-primaryBtn disabled:cursor-not-allowed"
          >
            {loading ? <ScaleLoader color="#fff" height={15} /> : "Log In"}
          </button>
        </form>

        <p className="text-center">
          Don't have account yet? Regsiter{" "}
          <Link href="/auth/register" className="font-semibold text-primary">
            here
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default login;
