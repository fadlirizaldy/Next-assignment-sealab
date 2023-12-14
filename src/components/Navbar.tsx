import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-primary text-white px-10 py-5">
      <div className="max-w-[1400px] w-[90%] mx-auto flex justify-between items-center">
        <Link href={"/"} className="font-semibold text-3xl">
          PixelNews
        </Link>

        <section className="flex gap-4">
          <Link href={"/"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Home
          </Link>
          <Link href={"/news"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            News
          </Link>
          <Link href={"/subscription"} className="px-3 py-1 font-medium text-xl hover:underline rounded-lg">
            Subscription
          </Link>
        </section>

        <section className="flex gap-4">
          <Link
            href={"/auth/register"}
            className="font-semibold p-3 text-secondary rounded-3xl bg-primaryBg hover:opacity-90"
          >
            Register
          </Link>
          <Link
            href={"/auth/login"}
            className="font-medium text-xl px-3 py-1 hover:underline rounded-lg flex items-center"
          >
            Login
          </Link>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
