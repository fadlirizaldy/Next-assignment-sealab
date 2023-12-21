import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-fit bg-primaryBtn text-white">
        <div className="max-w-[1200px] w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-center py-14">
          <div>
            <h2 className="font-semibold text-4xl">PixelNews</h2>
            <div className="flex gap-2 justify-center items-center mt-3">
              <Icon icon="mdi:linkedin" color="white" width={22} />
              <Icon icon="mdi:twitter" color="white" width={22} />
              <Icon icon="ri:instagram-fill" color="white" width={22} />
              <Icon icon="bi:threads-fill" color="white" width={22} />
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-20 sm:flex-row">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-2xl mb-2">Contact Us</h4>
              <p>+62 123 4567 890</p>
              <p>news@pixel.com</p>
              <p>Kuningan, Jakarta, Indonesia</p>
              <p>Mon - Fri | 10.00 - 17.00</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-2xl mb-2">Our Services</h4>
              <p>Home</p>
              <p>News</p>
              <p>Subscription</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-2xl mb-2">Quick Links</h4>
              <Link href={"/admin"}>Admin</Link>
              <p>About Us</p>
              <p>FAQ</p>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-4 bg-primary text-white font-medium">
        <h2>Copyright PixelNews &copy; 2023</h2>
      </div>
    </>
  );
};

export default Footer;
