"use client";

import Navbar from "@/components/Navbar";
import { socials } from "@/constants";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import { motion, easeIn } from "framer-motion";
import Form from "@/components/Form";

export default function Contact() {
    return (
        <main className="w-full h-screen flex flex-col relative">
            <Navbar />
            <section className="flex flex-col lg:flex-row md:justify-between md:items-center mt-28 mb-5 md:mt-36 mx-9 sm:mx-20 md:mx-36 lg:mx-48 flex-grow">
                <motion.div
                    className="mr-0 sm:mr-10 lg:ml-10 lg:mr-0 w-full md:w-4/5"
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <div className="flex flex-col justify-center items-start">
                        <h1 className="text-2xl text-gradient font-bold leading-none md:text-4xl">Got a cool build idea?</h1>
                        <h1 className="text-2xl text-gradient font-bold md:pl-10 leading-none md:text-4xl">want to hire me?</h1>
                        <h1 className="text-2xl text-gradient font-bold leading-none md:text-4xl">want to make content?</h1>
                        <h1 className="text-2xl text-gradient font-bold md:pl-10 leading-none pb-3 md:text-4xl">say hi!</h1>
                    </div>
                    <p className="flex lg:text-xl font-semibold text-start text-foreground">Let&apos;s chat — I&apos;d love to hear from you!</p>
                    <div className="flex flex-row justify-start md:justify-center gap-3 sm:gap-8 lg:flex-col lg:justify-normal lg:gap-0 my-10">
                        {socials.map((social, id) => {
                            return (
                                <Link href={social.url} rel="noopener noreferrer" key={id}>
                                    <p className="flex items-center text-base font-medium hover:underline lg:text-2xl text-foreground">{social.name} <MdArrowOutward className="w-5 h-5 lg:w-6 lg:h-6" /></p>
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>
                <Form />
            </section>
            <div className="mb-2 mt-auto">
                <p className="copyright text-center font-normal text-xs text-secondary">&copy; 2025 Leo Li</p>
            </div>
            <ScrollToTop />
        </main>
    );
}