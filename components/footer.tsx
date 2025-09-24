import { socials } from "@/constants";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="flex flex-col justify-between mt-20">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:mx-20 md:mx-36 lg:mx-48">
        <div className="flex flex-col justify-items-center mb-[60px]">
          <p className="text-base font-medium lg:text-lg text-foreground">Let&apos;s get some coffee and connect!</p>
          <p className="text-base font-medium flex items-center lg:text-lg text-foreground">Talk soon <PiCoffeeDuotone className="w-5 h-5 ml-2" /></p>
          <p className="text-base font-medium lg:text-lg text-foreground">谢谢你。Thanks for visiting!</p>
        </div>
        <div className="flex flex-col mb-[60px]">
          {socials.map((social, id) => {
            return (
              <Link href={social.url} rel="noopener noreferrer" key={id}>
                <p className="flex items-center text-base font-medium hover:underline lg:text-lg text-foreground">{social.name} <MdArrowOutward className="w-5 h-5 lg:w-6 lg:h-6" /></p>
              </Link>
            )
          })}
        </div>
      </div>
      <p className="copyright text-center font-normal text-xs mb-2 text-secondary">&copy; 2025 Leo Li</p>
    </div>
  );
}