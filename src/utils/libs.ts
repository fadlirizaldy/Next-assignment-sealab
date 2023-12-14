import { toast } from "react-toastify";

export const isEmail = (email: string) => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return regex.test(email);
};

export const formatNumberWithDots = (x: number | string) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

export const showToastMessage = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const createReferralCode = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 5) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
