import { DataLoginType } from "@/pages/auth/login";
import { UserRegisterType } from "@/pages/auth/register";
import React from "react";

type InputPropsType = {
  title: string;
  name: string;
  placeholder: string;
  type: string;
  data: string;
  setData: React.Dispatch<React.SetStateAction<DataLoginType | UserRegisterType>>;
};

const InputText = ({ title, name, placeholder, type, data, setData }: InputPropsType) => {
  return (
    <div>
      <label htmlFor="" className="font-medium text-[20px] mb-2 capitalize">
        {title}
      </label>
      <input
        name={name}
        type={type}
        value={data}
        placeholder={placeholder}
        className="rounded-[8px] border border-gray-400 bg-[#F9FAFB] focus:outline-primaryBtn px-4 w-full h-[52px]"
        onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
      />
    </div>
  );
};

export default InputText;
