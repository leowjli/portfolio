"use client";

import Navbar from "@/components/navbar";
import { socials } from "@/constants";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import { motion, easeIn } from "framer-motion";
import Form from "@/components/form";

export default function Contact() {
    return (
        <main className="w-full h-screen flex flex-col relative">
            <Navbar />
            <section className="flex flex-col lg:flex-row md:justify-between md:items-center mt-28 mb-5 md:mt-36 mx-9 sm:mx-20 md:mx-36 lg:mx-48 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none md:text-5xl xl:text-7xl">Want to</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none pl-10 md:text-5xl xl:text-7xl">start</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none md:text-5xl xl:text-7xl">a new</h1>
                        <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-70% font-bold leading-none pl-10 pb-3 md:text-5xl xl:text-7xl">project?</h1>
                    </div>
                    <p className="flex text-center justify-end lg:text-xl pl-10 font-semibold md:text-start">Or just say hello?</p>
                    <div className="flex flex-row justify-center gap-8 lg:flex-col lg:justify-normal lg:gap-0 mt-10">
                        {socials.map((social, id) => {
                            return (
                                <Link href={social.url} rel="noopener noreferrer" key={id}>
                                    <p className="flex items-center text-base font-medium hover:underline lg:text-2xl">{social.name} <MdArrowOutward className="w-5 h-5 lg:w-6 lg:h-6" /></p>
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>
                <Form />
            </section>
            <div className="mb-2 mt-auto">
                <p className="copyright text-center font-normal text-xs">&copy; 2025 Leo Li</p>
            </div>
            <ScrollToTop />
        </main>
    );
}