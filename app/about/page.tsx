"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { gallery, skills } from "@/constants";
import Image from "next/image";
import { easeIn, motion } from "framer-motion";
import Gallery from "@/components/Gallery";
import { MdArrowOutward } from "react-icons/md";
import ExperienceIDE from "@/app/components/ExperienceIDE";
import { EXPERIENCES } from "@/constants";
import NowPlaying from "@/components/NowPlaying";

export default function About() {
  return (
    <main className="w-full h-screen flex flex-col relative">
      <Navbar />
      <section className="flex flex-col md:flex-row md:items-center md:gap-5 mt-32 md:mt-36 mb-12 mx-9 sm:mx-20 md:mx-36 lg:mx-48">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: easeIn }}
          className="h-full flex flex-col mr-auto justify-end items-start"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F03E41] from-5% via-[#951DC6] via-30% to-[#398EEB] to-50% font-bold leading-none pb-8 md:text-5xl xl:text-7xl">This is Leo.</h1>
              <p className="lg:text-lg max-w-[600px] text-foreground">
                I&apos;m a Full-Stack Developer Intern at <strong>
                  <a href="https://tacticalaffairs.com/" className="hover:underline inline-flex items-center text-foreground dark:text-accent" target="_blank" rel="noopener noreferrer">Tactical Affairs<MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>, {" "}
                and a software engineer passionate about designing and developing solutions that connects information and people together.
                I love the interactions between technology and people, and I studied these interactions through Informatics at the{" "}
                <strong><a href="https://www.washington.edu/" className="hover:underline text-[#4B2E83] dark:text-purple-400" target="_blank" rel="noopener noreferrer">University of Washington</a><span className="text-[#4B2E83] dark:text-purple-400 font-bold"> [go dawgs!]</span>.</strong>
              </p>
            </div>
            <div>
              <p className="lg:text-lg max-w-[600px] text-foreground">
                I value authenticity and passion, and I&apos;m always looking for ways to improve and grow, learning to ask the right questions and always tinkering with my &quot;why&quot;
              </p>
            </div>
          </div>
          <NowPlaying />
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeIn }}
        >
          <div className="mb-20 md:mb-0 max-w-[350px] w-full">
            <Image
              className="w-full h-auto rounded-2xl shadow-custom-gradient"
              src="/headshot.jpg"
              alt="profile picture"
              width={600}
              height={850}
            />
          </div>
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
        <ExperienceIDE experiences={EXPERIENCES} />
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
                <p className="text-foreground">{skillItem.name}</p>
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
        <p className="lg:text-lg text-foreground">
          I&apos;m a people-person, and I focus on connections through playing basketball, tossing a frisbee, or eating delicious food.
          On my own, I like to hit the gym, doodle goofy ideas, vibe to music (my airpods are in almost all the time), explore nature, play drums, and meet new people!
          I&apos;ve also had the pleasure of playing cymbals with the{" "}
          <strong><a href="https://www.instagram.com/uwhuskydrumline/" className="hover:underline inline-flex items-center text-accent" target="_blank" rel="noopener noreferrer">Husky Drumline<MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong>
          and the {" "}
          <strong><a href="https://www.huskymarchingband.org/" className="hover:underline inline-flex items-center text-accent" target="_blank" rel="noopener noreferrer">Husky Marching Band!<MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" /></a></strong></p>
        {/* photo gallery! */}
        <div className="m-10">
          <Gallery images={gallery} />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
