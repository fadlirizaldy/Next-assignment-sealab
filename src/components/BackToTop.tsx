import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isBrowser()) {
    window.addEventListener("scroll", toggleVisible);
  }
  return (
    <button
      className={`right-20 bottom-20 fixed hidden md:flex items-center gap-4 border border-slate-400 p-2 rounded-lg transition-all text-primary hover:bg-primary hover:text-white  ${
        visible ? "opacity-100 -translate-y-2" : "opacity-0"
      }`}
      onClick={() => scrollToTop()}
      disabled={!visible}
    >
      <Icon icon="icon-park-outline:to-top" color="currentColor" width={30} />
      <p>Back to top</p>
    </button>
  );
};

export default BackToTop;
