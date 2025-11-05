"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AboutStage from "@/components/AboutStage";
import ExperienceIDE from "@/components/ExperienceIDE";
import SkillStrips from "@/components/SkillStrips";
import Gallery from "@/components/Gallery";
import NowPlaying from "@/components/NowPlaying";
import { gallery, skills, EXPERIENCES } from "@/constants";
import { Scene } from "@/types/about";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";

export default function About() {
  // Define all three scenes as data
  const scenes: Scene[] = [
    // Scene 1: Roots (根)
    {
      id: "roots",
      theme: { zh: "根", en: "Roots", pinyin: "gēn" },
      leftContent: (
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col space-y-6 md:flex-1">
            <div className="flex flex-col">
              <h1 className="text-4xl text-gradient font-bold leading-none pb-8 md:text-5xl xl:text-6xl">
                This is Leo.
              </h1>
              <p className="lg:text-lg max-w-[600px] text-foreground">
                I&apos;m a Full-Stack Developer Intern at{" "}
                <strong>
                  <a
                    href="https://tacticalaffairs.com/"
                    className="hover:underline inline-flex items-center text-foreground dark:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tactical Affairs
                    <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                </strong>
                , and a software engineer passionate about designing and
                developing solutions that connects information and people
                together. I love the interactions between technology and people,
                and I studied these interactions through Informatics at the{" "}
                <strong>
                  <a
                    href="https://www.washington.edu/"
                    className="hover:underline text-[#4B2E83] dark:text-purple-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    University of Washington
                  </a>
                  <span className="text-[#4B2E83] dark:text-purple-400 font-bold">
                    {" "}
                    [go dawgs!]
                  </span>
                  .
                </strong>
              </p>
            </div>
            <div>
              <p className="lg:text-lg max-w-[600px] text-foreground">
                I value authenticity and passion, and I&apos;m always looking
                for ways to improve and grow, learning to ask the right
                questions and always tinkering with my &quot;why&quot;
              </p>
            </div>
            <NowPlaying />
          </div>
        </div>
      ),
      rightContent: (
        <div className="flex flex-col px-6 lg:px-8">
          <div className="flex justify-end items-center mt-8">
            <div className="max-w-[280px] md:max-w-[320px] w-full md:pr-10">
              <Image
                className="w-full h-auto rounded-2xl shadow-custom-gradient-gold"
                src="/headshot.jpg"
                alt="profile picture"
                width={600}
                height={850}
                priority
              />
            </div>
          </div>
          <p
            className="text-lg lg:text-xl text-vermilion font-medium"
            lang="zh"
          >
            根深蒂固，方能枝繁叶茂。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            我管加拿大，北京，和西雅图叫家。
            <br />
            家的文化的融合塑造了我看待世界的方式，
            <br />
            也让我热爱技术与人文的交汇。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            我重视真实与热情，并始终寻求提升与成长，
            <br />
            不断学习如何提出正确的问题，并时刻打磨属于自己的“初心”
          </p>
          {/* <p className="text-sm text-foreground/60 italic" lang="zh">
            放空 - 蔡健雅
          </p> */}
        </div>
      ),
    },

    // Scene 2: Craft (工)
    {
      id: "craft",
      theme: { zh: "工", en: "Craft", pinyin: "gōng" },
      leftContent: (
        <div className="flex flex-col justify-center space-y-4 h-full">
          <div className="w-full max-w-full">
            <h2 className="text-2xl md:text-3xl text-gradient font-bold leading-none pb-2">
              Experience
            </h2>
            <div className="w-full max-w-full overflow-x-auto">
              <ExperienceIDE experiences={EXPERIENCES} />
            </div>
          </div>
          <div className="h-full">
            {/* <h2 className="text-2xl md:text-3xl text-gradient font-bold leading-none pb-2">
              Skills
            </h2> */}
            <SkillStrips skills={skills} />
          </div>
        </div>
      ),
      rightContent: (
        <div className="flex flex-col space-y-6 px-6 lg:px-8">
          <p
            className="text-lg lg:text-xl text-vermilion font-medium"
            lang="zh"
          >
            工，不只是手艺，而是心意。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            代码如诗，每一行都是思考的结晶。
            <br />
            我相信优雅的解决方案源于对问题本质的理解。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            技术是工具，而工匠精神是灵魂。
            <br />
            每一个项目，我都追求将功能与美学完美结合。
          </p>
        </div>
      ),
    },

    // Scene 3: Balance (衡)
    {
      id: "balance",
      theme: { zh: "衡", en: "Balance", pinyin: "héng" },
      leftContent: (
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl md:text-4xl text-gradient font-bold leading-none">
            What else?
          </h2>
          <p className="lg:text-lg text-foreground">
            I&apos;m a people-person, and I focus on connections through playing
            basketball, tossing a frisbee, or eating delicious food. On my own,
            I like to hit the gym, doodle goofy ideas, vibe to music (my
            airpods are in almost all the time), explore nature, play drums, and
            meet new people!
          </p>
          <p className="lg:text-lg text-foreground">
            I&apos;ve also had the pleasure of playing cymbals with the{" "}
            <strong>
              <a
                href="https://www.instagram.com/uwhuskydrumline/"
                className="hover:underline inline-flex items-center text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Husky Drumline
                <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </strong>{" "}
            and the{" "}
            <strong>
              <a
                href="https://www.huskymarchingband.org/"
                className="hover:underline inline-flex items-center text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Husky Marching Band!
                <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </strong>
          </p>
        </div>
      ),
      rightContent: (
        <div className="flex flex-col space-y-6 px-6 lg:px-8">
          <p
            className="text-lg lg:text-xl text-vermilion font-medium"
            lang="zh"
          >
            衡，是生活与工作的平衡。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            音乐让我专注，运动让我平静，朋友让我快乐。
            <br />
            技术是我的事业，但生活的丰富才是我的能量来源。
          </p>
          <p className="text-base lg:text-lg text-foreground/80" lang="zh">
            在代码与人和人的经历之间，在逻辑与创意之间，
            <br />
            我在探索属于自己的平衡点。
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Navbar />

      {/* Pinned Stage with all three scenes */}
      <AboutStage scenes={scenes} />

      {/* Gallery - overlaps on desktop, normal flow on mobile */}
      <section className="relative mb-12 px-6 sm:px-16 z-0 md:-mt-[100vh] md:pt-[calc(100vh-20rem)]">
        <div className="max-w-[1920px] mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border/20 bg-card/95 backdrop-blur-sm">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
