import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";

export const useDebounce = (text: string, delay: number = 500) => {
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

export default function useCookie(name: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    Cookies.set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: string, options: Object) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue("");
  }, [name]);

  return [value, updateCookie, deleteCookie];
}
