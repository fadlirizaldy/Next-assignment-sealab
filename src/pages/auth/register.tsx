import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const register = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <AuthLayout>
      <h1 className="font-bold text-[32px] text-primary">Sign up</h1>

      <form className="flex flex-col gap-3">
        <div className="mt-4">
          <label htmlFor="" className="font-medium text-[20px] mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
          />
        </div>
        <div>
          <label htmlFor="" className="font-medium text-[20px] mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
          />
        </div>
        <div>
          <label htmlFor="" className="font-medium text-[20px] mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your email"
            className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
          />
        </div>
        <div>
          <label htmlFor="" className="font-medium text-[20px] mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Enter your email"
            className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
          />
        </div>
        <div>
          <label htmlFor="" className="font-medium text-[20px] mb-2">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
          />
        </div>

        <div className="flex gap-3">
          <div>
            <label htmlFor="" className="font-medium text-[20px] mb-2">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
            />
          </div>
          <div>
            <label htmlFor="" className="font-medium text-[20px] mb-2">
              Referral Code
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          type="submit"
          // disabled={validate || loading}
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
  );
};

export default register;
