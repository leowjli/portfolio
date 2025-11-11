"use client";

import { useEffect, useState } from "react";
import Divider from "./Divider";
import SceneLayer from "./SceneLayer";
import { Scene } from "@/types/about";
import { STAGE_HEIGHT_VH } from "@/constants/about";

type Props = {
  scenes: Scene[];
};

export default function AboutStage({ scenes }: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector("#about-stage-container");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define scene windows with equal distribution
  const sceneWindows: [number, number][] = scenes.map((_, i) => {
    const step = 1 / scenes.length;
    return [i * step, (i + 1) * step];
  });

  // Extract themes for the divider
  const themes = scenes.map((scene) => ({
    zh: scene.theme.zh,
    en: scene.theme.en,
    pinyin: scene.theme.pinyin,
  }));

  return (
    <>
      {/* Desktop: Pinned stage with crossfades */}
      <div
        id="about-stage-container"
        className="hidden md:block relative"
        style={{ height: `${STAGE_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <Divider
            themes={themes}
            scrollProgress={scrollProgress}
            sceneWindows={sceneWindows}
          />
          <div className="relative w-full h-full">
            {scenes.map((scene, index) => (
              <SceneLayer
                key={scene.id}
                progress={scrollProgress}
                sceneWindow={sceneWindows[index]}
                leftContent={scene.leftContent}
                rightContent={scene.rightContent}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="mt-20 md:mt-0 md:hidden">
        {scenes.map((scene) => (
          <section key={scene.id} className="relative pb-12">
            {/* Theme label */}
            <div className="flex items-center justify-between py-6 px-6 border-y border-border/30 mb-8">
              <div className="flex flex-col items-center">
                {scene.theme.pinyin && (
                  <span className="text-xs text-primary mb-1">
                    {scene.theme.pinyin}
                  </span>
                )}
                <span className="text-3xl font-bold text-subtle/30">{scene.theme.zh}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-subtle/50">
                {scene.theme.en}
              </span>
            </div>

            {/* Left content */}
            <div className="px-6 mb-8">
              {scene.leftContent}
            </div>

            {/* Right content with paper background */}
            <div className="relative py-8 mx-6 rounded-lg bg-accent2">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundColor: "white",
                  opacity: 0.08,
                }}
              />
              <div className="relative">
                {scene.rightContent}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
