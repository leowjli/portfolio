"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ScrollToTop";
import { gallery, skills } from "@/constants";
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import Gallery from "@/components/gallery";
import { MdArrowOutward } from "react-icons/md";

export default function About() {
    return (
        <main className="w-full h-screen flex flex-col relative">
            <Navbar />
            <section className="flex flex-col md:flex-row-reverse md:justify-between md:items-center mt-32 md:mt-36 mb-12 mx-9 sm:mx-20 md:mx-36 lg:mx-48">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, ease: easeIn }}
                >
                    <div className="flex justify-center items-center mb-20 md:mx-10 max-w-[350px] w-full">
                        <Image
                            className="w-full h-auto rounded-[26px] shadow-custom-gradient"
                            src="/leo_profile_pic.png" 
                            alt="profile picture" 
                            width={600} 
                            height={850} 
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-50% font-bold leading-none pb-6 md:text-5xl xl:text-7xl">This is Leo.</h1>
                    <p className="lg:text-lg max-w-[600px]">I&apos;m a Software Engineer Fellow at <strong>
                        <a href="https://headstarter.co/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Headstarter <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong> 
                        and a frontend developer passionate about designing and developing solutions that connects information and people together. 
                        I love the interactions between technology and people, and I&apos;m currently studying those interactions through Informatics at the 
                    <strong><a href="" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">University of Washington</a></strong> [go dawgs!].</p>
                </motion.div>

            </section>

            <section className="flex flex-col my-12 mx-9 sm:mx-20 md:mx-36 lg:mx-48">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-10% to-[#398EEB] to-30% font-bold leading-none pb-10 md:text-5xl">Experience</h1>
                </motion.div>
                <p className="lg:text-lg pb-4">I am a currently a <strong>Software Engineer Fellow</strong> at <strong>
                    <a href="https://headstarter.co/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Headstarter <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong> 
                    building various AI projects and developing my skills in artificial intelligence and machine learning.
                </p>
                <p className="lg:text-lg pb-4">
                    I am also working as a <strong>computer consultant</strong> with <strong>
                        <a href="https://academictechnologies.asa.uw.edu/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">UW Academic Technologies <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>, 
                        helping students, faculty, and staff with different software and operating system issues.
                </p>
                <p className="lg:text-lg pb-4">
                    I also love design work and (re)making websites, and I am working as <strong>web developer</strong> for the <strong>
                        <a href="https://www.csauw.com/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Chinese Student Association <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>, 
                        where I am also the cultural director, helping advocate and educate others on Chinese culture.
                </p>
                <p className="lg:text-lg pb-4">As a frontend developer, working with designers is an essential part of bringing designs to life, I am learning from and working with talented designers at <strong>
                    <a href="" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Alpha Theta Delta</a></strong>, 
                    a professional multidisciplinary design fraternity as a <strong>web developer</strong>, recreating the website and bridging the communication gap between designers and developers, fostering a clearer understanding and a shared vocabulary.
                </p>
                <p className="lg:text-lg pb-4">Some cool projects I have worked on previously are 
                    <strong><a href="" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">___ <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>, a ___ web application [that does something];{" "}
                    <strong><a href="" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">[one of the AI apps] <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>, 
                    [description].
                </p>
                <p className="lg:text-lg">Check out some of the skills I utilized for these fun experiences below!</p>
            </section>

            <section className="flex flex-col my-12 mx-9 sm:mx-20 md:mx-35 lg:mx-48">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-10% to-[#398EEB] to-30% font-bold leading-none pb-6 md:text-5xl">Skills</h1>
                </motion.div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
                    {skills.map((skillItem) => {
                        return (
                            <div className="flex flex-col justify-center items-center" key={skillItem.name}>
                                <Image src={skillItem.svgPath} alt={skillItem.alt} width={60} height={60} />
                                <p>{skillItem.name}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="my-12 mx-9 sm:mx-20 md:mx-36 lg:mx-48">
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: easeIn }}
                >
                    <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-10% to-[#398EEB] to-30% font-bold leading-none pb-6 md:text-5xl">What else?</h1>
                </motion.div>
                <p className="lg:text-lg">
                    I&apos;m a people-person, and I focus on connections through playing basketball, tossing a frisbee, or eating delicious food. 
                    On my own, I like to hit the gym, doodle goofy ideas, vibe to music (my airpods are in almost all the time), explore nature, play drums, and meet new people!
                    You can also find me playing cymbals with the{" "}
                    <strong><a href="https://www.huskymarchingband.org/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Husky Drumline<MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong> 
                    and the {" "}
                    <strong><a href="https://www.instagram.com/uwhuskydrumline/" className="hover:underline inline-flex items-center" target="_blank" rel="noopener noreferrer">Husky Marching Band!<MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong
                ></p>
                {/* photo gallery! */}
                <div className="m-10">
                    <Gallery images={gallery} visibleImg={3}/>
                </div>
            </section>

            <Footer />
            <ScrollToTop />
        </main>
    );
}
