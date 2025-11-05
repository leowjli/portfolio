"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { getInitialLang, saveLang, updateURLLang, type Language } from "@/lib/language";
import { MdLocationOn, MdAccessTime } from "react-icons/md";

export default function Hero() {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Initialize language on mount
  useEffect(() => {
    const initialLang = getInitialLang();
    setLang(initialLang);
    setMounted(true);
  }, []);

  // Cursor parallax effect
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offset (±20px max)
      const offsetX = ((clientX - centerX) / centerX) * 20;
      const offsetY = ((clientY - centerY) / centerY) * 20;

      setMousePosition({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    saveLang(newLang);
    updateURLLang(newLang);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  // Language swap animation
  const swapVariants = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };

  const swapTransition = {
    duration: 0.25,
    ease: "easeInOut",
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96" aria-hidden="true">
            <div className="w-full h-full rounded-full blur-[80px] bg-red-500/50 dark:bg-red-500/60 animate-blob-wander-a" />
          </div>
          <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem]" aria-hidden="true">
            <div className="w-full h-full rounded-full blur-[80px] bg-blue-500/50 dark:bg-blue-500/60 animate-blob-wander-b" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem]" aria-hidden="true">
            <div className="w-full h-full rounded-full blur-[90px] bg-purple-500/40 dark:bg-purple-500/50 animate-blob-wander-c" style={{ animationDelay: "5s" }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={lang === 'zh' ? { filter: "url(#paper-texture-section)" } : undefined}
    >
      {/* AMBIENT GRADIENT BLOBS */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96" aria-hidden="true">
          <div className="w-full h-full rounded-full blur-[80px] bg-red-500/50 dark:bg-red-500/60 animate-blob-wander-a" />
        </div>
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem]" aria-hidden="true">
          <div className="w-full h-full rounded-full blur-[80px] bg-blue-500/50 dark:bg-blue-500/60 animate-blob-wander-b" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem]" aria-hidden="true">
          <div className="w-full h-full rounded-full blur-[90px] bg-purple-500/40 dark:bg-purple-500/50 animate-blob-wander-c" style={{ animationDelay: "5s" }} />
        </div>
      </div>

      {/* SVG Filters for paper texture (Chinese mode) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="paper-texture-section" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="3.0"
              numOctaves="6"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.12 0"
              result="texture"
            />
            <feComposite in="SourceGraphic" in2="texture" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Language toggle */}
      <div
        className="absolute top-24 right-6 sm:right-8 z-20 flex items-center gap-2 p-1 rounded-lg
        bg-surface/80 dark:bg-surface/60 backdrop-blur-md border border-border/50 dark:border-border shadow-lg"
        role="group"
        aria-label="Language selector"
      >
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
          ${lang === 'en'
            ? 'bg-accent text-white shadow-sm'
            : 'text-secondary hover:text-foreground hover:bg-muted/50'
          }`}
          aria-pressed={lang === 'en'}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage('zh')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
          ${lang === 'zh'
            ? 'bg-accent text-white shadow-sm'
            : 'text-secondary hover:text-foreground hover:bg-muted/50'
          }`}
          aria-pressed={lang === 'zh'}
          aria-label="切换到中文"
        >
          中文
        </button>
      </div>

      {/* Main hero content */}
      <div className="absolute bottom-0 left-0 w-full flex items-start justify-center sm:justify-start pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Pinyin rail - (desktop only) */}
        {lang === 'zh' && (
          <aside
            className="hidden sm:flex flex-col items-center gap-3 mr-10 self-start z-10"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-1 text-xs text-subtle/60 dark:text-subtle/50 tracking-[0.15em] font-light">
              <span>n</span>
              <span>ǐ</span>
              <span className="py-1 text-[10px]">·</span>
              <span>h</span>
              <span>ǎ</span>
              <span>o</span>
            </div>
            <div className="w-px h-8 bg-border/30" />
          </aside>
        )}

        <motion.div
          className="relative flex flex-col items-start max-w-4xl z-0 mb-10 sm:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={
            !shouldReduceMotion
              ? {
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  transition: "transform 0.3s ease-out",
                }
              : undefined
          }
        >
        {/* Screen reader only announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {lang === 'en' ? 'English content displayed' : '中文内容已显示'}
        </div>

        {/* Headline: English / Chinese */}
        <AnimatePresence mode="wait">
          {lang === 'en' ? (
            <motion.div
              key="en"
              variants={swapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={swapTransition}
              className="flex flex-col"
            >
              {/* English greeting */}
              <motion.div variants={itemVariants}>
                <h1
                  className={`text-5xl font-bold leading-none pb-3 sm:text-6xl md:text-8xl xl:text-[150px]
                  text-gradient ${!shouldReduceMotion ? "animate-shimmer" : ""}`}
                >
                  What&apos;s up! I&apos;m Leo.
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <p className="text-base font-medium md:text-lg xl:text-2xl text-secondary">
                    Software developer 👨🏻‍💻 @ Tactical Affairs
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/30">
                      <MdLocationOn className="w-4 h-4 text-secondary" />
                      <span className="text-xs sm:text-sm text-secondary">Seattle, WA</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/30">
                      <MdAccessTime className="w-4 h-4 text-secondary" />
                      <span className="text-xs sm:text-sm text-secondary">{currentTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="zh"
              variants={swapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={swapTransition}
              className="flex flex-col"
            >
              {/* Chinese content with lang attribute */}
              <motion.div variants={itemVariants}>
                <h1
                  lang="zh"
                  className={`text-5xl font-bold leading-none pb-5 sm:text-6xl md:text-8xl xl:text-9xl
                  text-gradient font-[family-name:var(--font-noto-sans-sc)]
                  ${!shouldReduceMotion ? "animate-shimmer" : ""}`}
                  style={{ letterSpacing: "0.02em", filter: "url(#paper-texture)" }}
                >
                  嗨，我是 Leo.
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <p
                    lang="zh"
                    className="text-base font-medium md:text-lg xl:text-2xl text-secondary font-[family-name:var(--font-noto-sans-sc)]"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    软件工程师 👨🏻‍💻 @ Tactical Affairs
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/30">
                      <MdLocationOn className="w-4 h-4 text-secondary" />
                      <span lang="zh" className="text-xs sm:text-sm text-secondary font-[family-name:var(--font-noto-sans-sc)]">西雅图</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/30">
                      <MdAccessTime className="w-4 h-4 text-secondary" />
                      <span className="text-xs sm:text-sm text-secondary">{currentTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll cue indicator */}
      <div
        className="absolute bottom-24 right-8 hidden sm:block"
        aria-label="Scroll down"
      >
        <div className="mouse w-[30px] h-[54px] border-[3px] border-foreground rounded-[60px] relative">
          <span className="absolute w-2 h-2 bg-foreground left-1/2 -translate-x-1/2 rounded-full animate-mouse" />
        </div>
      </div>

    </section>
  );
}
