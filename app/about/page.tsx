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
import { MdArrowOutward } from "react-icons/md";
import ChineseSection from "@/components/ChineseSection";
import TranslatableText from "@/components/TranslatableText";
import TranslationHint from "@/components/TranslationHint";

export default function About() {
  // Define all three scenes as data
  const scenes: Scene[] = [
    // Scene 1: Roots (根)
    {
      id: "roots",
      theme: { zh: "根", en: "Roots", pinyin: "gēn" },
      leftContent: (
        <div className="flex flex-col md:items-center md:gap-8">
          <div className="flex flex-col space-y-6 md:flex-1">
            <div className="flex flex-col">
              <h1 className="text-4xl text-gradient font-bold leading-none pb-8 md:text-5xl xl:text-6xl">
                This is Leo.
              </h1>
              <p className="lg:text-lg max-w-[600px] text-foreground">
                I&apos;m an Associate Software Engineer at{" "}
                <strong>
                  <a
                    href="https://www.t-mobile.com/"
                    className="underline inline-flex items-center text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    T-Mobile
                    <MdArrowOutward className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                </strong>
                , and passionate about designing and developing solutions that 
                connect information and people together. 
                I love the interactions between technology and people,
                and I studied these interactions through Informatics at the{" "}
                <strong>
                  <a
                    href="https://www.washington.edu/"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Univ. of Washington
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
                questions and always tinkering with my &quot;why&quot;.
              </p>
            </div>
            <NowPlaying />
          </div>
        </div>
      ),
      rightContent: (
        <ChineseSection>
          <div className="flex flex-col items-end px-6 md:px-0 lg:px-8 text-right">
            <TranslatableText
              chinese="根深蒂固，方能枝繁叶茂。"
              english="Only with deep roots can one flourish with branches and leaves."
              className="text-lg lg:text-3xl text-primary font-medium pb-4 font-ma-shan-zheng"
            />
            <TranslatableText
              chinese="我管加拿大，北京，和西雅图叫家。"
              english="I call Canada, Beijing, and Seattle home."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="家的文化的融合塑造了我看待世界的方式，"
              english="The fusion of home cultures shaped how I view the world,"
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="也让我热爱技术与人文的交汇。"
              english="and made me love the intersection of technology and humanities."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="我重视真实与热情，"
              english="I value authenticity and passion,"
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="并始终寻求提升与成长，"
              english="and always seek improvement and growth,"
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="不断学习如何提出正确的问题，"
              english="constantly learning how to ask the right questions,"
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese='并时刻打磨属于自己的"初心"。'
              english="and always refining my own 'why'."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslationHint />
          </div>
        </ChineseSection>
      ),
    },

    // Scene 2: Craft (工)
    {
      id: "craft",
      theme: { zh: "工", en: "Craft", pinyin: "gōng" },
      leftContent: (
        <div className="flex flex-col space-y-4">
          <div className="w-full max-w-full">
            <h2 className="text-3xl md:text-4xl text-gradient font-bold leading-none pb-2">
              Experience
            </h2>
            <div className="w-full max-w-full overflow-x-auto">
              <ExperienceIDE experiences={EXPERIENCES} />
            </div>
          </div>
          <div>
            {/* <h2 className="text-2xl md:text-3xl text-gradient font-bold leading-none pb-2">
              Skills
            </h2> */}
            <SkillStrips skills={skills} />
          </div>
        </div>
      ),
      rightContent: (
        <ChineseSection>
          <div className="flex flex-col items-end px-6 md:px-0 lg:px-8 text-right">
            <TranslatableText
              chinese="工，不只是手艺，而是心意。"
              english="Craft is not just skill, but intention."
              className="text-lg lg:text-3xl text-primary font-medium pb-4 font-ma-shan-zheng"
            />
            <TranslatableText
              chinese="代码如诗，每一行都是思考的结晶。"
              english="Code is like poetry, every line is the crystallization of thought."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="我相信优雅的解决方案源于对问题本质的理解。"
              english="I believe elegant solutions stem from understanding the essence of the problem."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="技术是工具，而工匠精神是灵魂。"
              english="Technology is the tool, while craftsmanship is the soul."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="每一个项目，我都追求将功能与美学完美结合。"
              english="In every project, I strive to perfectly blend functionality with aesthetics."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslationHint />
          </div>
        </ChineseSection>
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
            I like to hit the gym, doodle goofy ideas, vibe to music (my airpods
            are in almost all the time), explore nature, play drums, and meet
            new people!
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
        <ChineseSection>
          <div className="flex flex-col items-end px-6 md:px-0 lg:px-8 text-right">
            <TranslatableText
              chinese="衡，是生活与工作的平衡。"
              english="Balance is the equilibrium between life and work."
              className="text-lg lg:text-3xl text-primary font-medium pb-4 font-ma-shan-zheng"
            />
            <TranslatableText
              chinese="音乐让我专注，运动让我平静，朋友让我快乐。"
              english="Music helps me focus, sports calm me, friends make me happy."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="技术是我的事业，但生活的丰富才是我的能量来源。"
              english="Technology is my career, but life's richness is my source of energy."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="在代码与人和人的经历之间，在逻辑与创意之间，"
              english="Between code and people's experiences, between logic and creativity,"
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslatableText
              chinese="我在探索属于自己的平衡点。"
              english="I'm exploring my own point of balance."
              className="text-base lg:text-lg text-foreground/80"
            />
            <TranslationHint />
          </div>
        </ChineseSection>
      ),
    },
  ];

  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Navbar />

      {/* Pinned Stage with all three scenes */}
      <AboutStage scenes={scenes} />

      {/* Gallery - overlaps on desktop, normal flow on mobile */}
      <section className="relative mb-12 px-6 sm:px-16 z-0 md:pt-[calc(100vh-50rem)]">
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
