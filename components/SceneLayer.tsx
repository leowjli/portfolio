"use client";

import { ReactNode, useMemo } from "react";
import { calculateSceneOpacity, easeInOutCubic } from "@/lib/animations";
import { SCENE_OVERLAP_SIZE, SLIDE_DISTANCE } from "@/constants/about";
import { SceneWindow } from "@/types/about";

type Props = {
  progress: number;
  sceneWindow: SceneWindow;
  leftContent: ReactNode;
  rightContent: ReactNode;
};

export default function SceneLayer({
  progress,
  sceneWindow,
  leftContent,
  rightContent,
}: Props) {
  const [start, end] = sceneWindow;

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isFirstScene = start === 0;
  const enterStart = isFirstScene ? 0 : start - SCENE_OVERLAP_SIZE;
  const enterEnd = start + SCENE_OVERLAP_SIZE;
  const exitStart = end - SCENE_OVERLAP_SIZE;
  const exitEnd = end + SCENE_OVERLAP_SIZE;

  // Calculate opacity and transform values based on progress
  const { opacity, leftY, rightY } = useMemo(() => {
    const opacity = calculateSceneOpacity(progress, sceneWindow, SCENE_OVERLAP_SIZE);
    let leftY = 0;
    let rightY = 0;

    if (progress < enterStart) {
      leftY = SLIDE_DISTANCE;
      rightY = -SLIDE_DISTANCE;
    } else if (progress < enterEnd && !isFirstScene) {
      const t = (progress - enterStart) / (enterEnd - enterStart);
      const easedT = easeInOutCubic(t);
      leftY = prefersReducedMotion ? 0 : SLIDE_DISTANCE * (1 - easedT);
      rightY = prefersReducedMotion ? 0 : -SLIDE_DISTANCE * (1 - easedT);
    } else if (progress >= exitStart && progress < exitEnd) {
      const t = (progress - exitStart) / (exitEnd - exitStart);
      const easedT = easeInOutCubic(t);
      leftY = prefersReducedMotion ? 0 : -SLIDE_DISTANCE * easedT;
      rightY = prefersReducedMotion ? 0 : SLIDE_DISTANCE * easedT;
    } else if (progress >= exitEnd) {
      leftY = -SLIDE_DISTANCE;
      rightY = SLIDE_DISTANCE;
    }

    return { opacity, leftY, rightY };
  }, [
    progress,
    sceneWindow,
    enterStart,
    enterEnd,
    exitStart,
    exitEnd,
    prefersReducedMotion,
    isFirstScene,
  ]);

  // Don't render if completely invisible
  if (opacity === 0) return null;

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center pointer-events-none"
      style={{ opacity }}
    >
      {/* Blob background layer - positioned to align with divider + right section */}
      <div className="hidden md:block absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 left-1/2 -ml-6">
          <div
            className="absolute top-12 right-8 w-96 h-96"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full blur-[80px] bg-red-500/50 dark:bg-red-500/60 animate-blob-wander-a" />
          </div>
          <div
            className="absolute bottom-16 left-12 w-[28rem] h-[28rem]"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full blur-[80px] bg-blue-500/50 dark:bg-blue-500/60 animate-blob-wander-b" />
          </div>
          <div
            className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem]"
            aria-hidden="true"
          >
            <div
              className="w-full h-full rounded-full blur-[90px] bg-purple-500/40 dark:bg-purple-500/50 animate-blob-wander-c"
              style={{ animationDelay: "5s" }}
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0">
        {/* Left Column */}
        <div
          className="relative z-10 flex flex-col justify-start m-6 sm:mx-16 sm:mt-32
          min-w-0 max-w-full overflow-hidden pointer-events-auto"
          style={{
            transform: `translateY(${leftY}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {leftContent}
        </div>

        {/* Center column - with paper background */}
        <div className="hidden md:block relative w-12 lg:w-20 xl:w-28" aria-hidden="true" />

        {/* Right Column - with full-height background */}
        <div className="relative flex flex-col justify-end md:pb-12">
          {/* Paper texture overlay - match center column style */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              backgroundColor: "white",
              opacity: 0.08,
            }}
          />
          {/* Content with slide animation */}
          <div
            className="relative z-[3] flex flex-col py-12 lg:py-16 pointer-events-auto w-fit ml-auto"
            style={{
              transform: `translateY(${rightY}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
}
