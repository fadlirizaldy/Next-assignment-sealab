import { useEffect, useState } from "react";

export const useDebounce = (text: string, delay: number) => {
  const [tmp, setTmp] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTmp(text);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  });
  return tmp;
};
