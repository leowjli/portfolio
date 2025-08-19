"use client";

import Navbar from "@/components/navbar";
import Project from "@/components/project";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ScrollToTop";
import { easeIn, motion } from 'framer-motion';
// import Image from "next/image";

export default function Home() {
    return (
        <main className="w-full h-screen flex flex-col relative">
            <Navbar />
            <div className="intro-container flex flex-col justify-start my-52 mx-9 sm:mx-20 md:mx-36 lg:mx-48 relative">
                <div className="intro flex flex-col justify-start">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: easeIn }}
                    >
                        <div className="flex gap-5">
                            <h1 className="intro-content text-4xl font-bold md:text-5xl xl:text-7xl">你好!</h1>
                            <h1 className="intro-content text-4xl font-bold md:text-5xl xl:text-7xl">Hello!</h1>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: easeIn }}
                    >
                        <h1 className="intro-content text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-50% font-bold leading-none pb-3 md:text-5xl xl:text-7xl">What&apos;s up, I&apos;m Leo.</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: easeIn }}
                    >
                        <p className="intro-headline text-base font-medium md:text-lg xl:text-2xl">Software developer @ Tactical Affairs</p>
                    </motion.div>
                </div>
                <div className="mouse-section absolute hidden left-1/2 transform -translate-x-1/2 sm:block sm:top-52 lg:top-60">
                    <div className="mouse w-[30px] h-[54px] border-[3px] border-black rounded-[60px] ">
                        <span className="before:content-[''] before:w-2 before:h-2 before:absolute before:top-[10px] before:bg-black before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-[50%] before:opacity-100 before:animate-mouse" />
                    </div>
                </div>
            </div>

            <Project />
            <Footer />
            <ScrollToTop />
        </main>
    );
}
