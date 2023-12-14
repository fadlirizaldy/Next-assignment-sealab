import InputText from "@/components/InputText";
import AuthLayout from "@/components/layouts/AuthLayout";
import { baseUrl } from "@/services/base";
import { v4 as uuidv4 } from "uuid";
import { fetcherGet, fetcherPost } from "@/services/fetcher/fetcher";
import { createReferralCode, isEmail, showToastMessage } from "@/utils/libs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

export type UserRegisterType = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  address?: string;
  phone?: string;
  referral_code?: string;
};

const defaultData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  phone: "",
  referral_code: "",
};

const register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [dataRegister, setDataRegister] = useState<UserRegisterType>(defaultData);
  const [error, setError] = useState<UserRegisterType>(defaultData);

  const validateRegister = () => {
    if (dataRegister.name === "") {
      setError((prev) => ({ ...prev, name: "Please enter a valid the name" }));
    } else {
      setError((prev) => ({ ...prev, name: "" }));
    }

    if (dataRegister.email === "" || !isEmail(dataRegister.email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid the email" }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (dataRegister.password === "") {
      setError((prev) => ({ ...prev, password: "Please enter the password" }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (dataRegister.password !== dataRegister.confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Password doesn't Match" }));
    } else {
      setError((prev) => ({ ...prev, confirmPassword: "" }));
    }

    if (dataRegister.address === "") {
      setError((prev) => ({ ...prev, address: "Please enter the address" }));
    } else {
      setError((prev) => ({ ...prev, address: "" }));
    }

    if (dataRegister.phone === "") {
      setError((prev) => ({ ...prev, phone: "Please enter the phone" }));
    } else {
      setError((prev) => ({ ...prev, phone: "" }));
    }

    if (
      dataRegister.name === "" ||
      dataRegister.email === "" ||
      dataRegister.password === "" ||
      !isEmail(dataRegister.email) ||
      dataRegister.password !== dataRegister.confirmPassword ||
      dataRegister.address === "" ||
      dataRegister.phone === ""
    )
      return false;

    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateRegister()) {
      setLoading(false);
      return;
    }

    const responseGetUser = await fetcherGet(
      baseUrl(`/users?email=${dataRegister.email}&password=${dataRegister.password}`)
    );

    if (responseGetUser.length > 0) {
      setError((prev) => ({ ...prev, email: "Email or password is already registered" }));
      setLoading(false);
      return;
    }

    const newData = {
      id: uuidv4(),
      ...dataRegister,
      like: [],
      imgUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      role: "user",
      expired_subs: "",
      referral_code: createReferralCode(),
    };

    const { confirmPassword, referral_code, ...newData2 } = newData;

    await fetcherPost(baseUrl("/users"), newData2);
    showToastMessage("Success register! Login to continue");

    setTimeout(() => {
      setLoading(false);
      router.replace("/auth/login");
    }, 1500);
  };
  return (
    <>
      <ToastContainer />
      <AuthLayout>
        <h1 className="font-bold text-[32px] text-primary mb-3">Sign up</h1>

        <form className="flex flex-col gap-3">
          <div>
            <InputText
              title="Name"
              name="name"
              placeholder="Enter your name"
              setData={setDataRegister}
              data={dataRegister.name!}
              type="text"
            />
            <p className="font-medium text-sm text-dangerText">{error.name}</p>
          </div>
          <div>
            <InputText
              title="Email"
              name="email"
              placeholder="Enter your email"
              setData={setDataRegister}
              data={dataRegister.email}
              type="text"
            />
            <p className="font-medium text-sm text-dangerText">{error.email}</p>
          </div>
          <div>
            <InputText
              title="Password"
              name="password"
              placeholder="Enter your password"
              setData={setDataRegister}
              data={dataRegister.password}
              type="password"
            />
            <p className="font-medium text-sm text-dangerText">{error.password}</p>
          </div>
          <div>
            <InputText
              title="Confirm Password"
              name={"confirmPassword"}
              data={dataRegister.confirmPassword!}
              setData={setDataRegister}
              placeholder="Match the password"
              type="password"
            />
            <p className="font-medium text-sm text-dangerText">{error.confirmPassword}</p>
          </div>

          <div>
            <InputText
              title="Address"
              name="address"
              placeholder="Enter your address"
              setData={setDataRegister}
              data={dataRegister.address!}
              type="text"
            />
            <p className="font-medium text-sm text-dangerText">{error.address}</p>
          </div>

          <div className="flex gap-3">
            <div>
              <InputText
                title="Phone"
                name="phone"
                placeholder="Enter your phoe"
                setData={setDataRegister}
                data={dataRegister.phone!}
                type="text"
              />
              <p className="font-medium text-sm text-dangerText">{error.phone}</p>
            </div>
            <div>
              <InputText
                title="Referral Code"
                name="referral_code"
                placeholder="Enter your referral code if any"
                setData={setDataRegister}
                data={dataRegister.referral_code!}
                type="text"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className="text-xl h-[44px] mt-5 mb-[15px] rounded-[8px] font-semibold text-white bg-primaryBtn disabled:cursor-not-allowed"
          >
            {loading ? <ScaleLoader color="#fff" height={15} /> : "Sign up"}
          </button>
        </form>

        <p className="text-center">
          Have an account? Login{" "}
          <Link href="/auth/login" className="font-semibold text-primary">
            here
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default register;
