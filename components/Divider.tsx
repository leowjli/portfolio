"use client";

import { calculateSceneOpacity } from "@/lib/animations";
import { SCENE_OVERLAP_SIZE } from "@/constants/about";
import { ThemeLabel, SceneWindow } from "@/types/about";

type Props = {
  themes: ThemeLabel[];
  scrollProgress: number;
  sceneWindows: SceneWindow[];
};

export default function Divider({ themes, scrollProgress, sceneWindows }: Props) {
  // Calculate active theme and transition progress
  const themeCount = themes.length;
  const progressPerTheme = 1 / themeCount;
  const activeThemeIndex = Math.min(
    Math.floor(scrollProgress / progressPerTheme),
    themeCount - 1
  );

  const themeProgress = (scrollProgress % progressPerTheme) / progressPerTheme;

  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
      {/* Continuous S-curve spanning full height */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-20 xl:w-28 h-full">
          {/* SVG with curved inlay fill + stroke */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Masks for full height with gradient fade on left */}
              {themes.map((_, index) => (
                <mask key={`glyph-mask-${index}`} id={`glyph-mask-${index}`}>
                  <rect x="0" y="0" width="100" height="800" fill="white" />
                </mask>
              ))}
            </defs>

            {/* Curved inlay fills - one per scene, crossfades with glyph */}
            {themes.map((_, index) => {
              const opacity = calculateSceneOpacity(
                scrollProgress,
                sceneWindows[index],
                SCENE_OVERLAP_SIZE
              );

              return (
                <g key={`inlay-${index}`} opacity={opacity} mask={`url(#glyph-mask-${index})`}>
                  {/* Curved fill following S-curve - full height */}
                  <path
                    d="M 50 0 Q -40 200 50 400 Q 140 600 50 800 L 100 800 L 100 0 Z"
                    fill="var(--accent2)"
                  />
                  {/* Paper texture overlay */}
                  <path
                    d="M 50 0 Q -40 200 50 400 Q 140 600 50 800 L 100 800 L 100 0 Z"
                    fill="white"
                    opacity="0.08"
                  />
                </g>
              );
            })}

            {/* S-curve stroke */}
            <path
              d="M 50 0 Q -40 200 50 400 Q 140 600 50 800"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border/40 dark:text-border/50"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Theme labels that crossfade based on scroll */}
          {themes.map((theme, index) => {
            let opacity = 0;
            let scale = 0.98;

            if (index === activeThemeIndex) {
              // Current active theme
              // Special case: first theme should start visible when page loads
              if (index === 0 && scrollProgress < 0.05) {
                opacity = 1;
                scale = 1;
              } else if (themeProgress < 0.15) {
                // Entering
                const t = themeProgress / 0.15;
                opacity = t;
                scale = 0.98 + 0.02 * t;
              } else if (themeProgress > 0.85) {
                // Exiting
                const t = (themeProgress - 0.85) / 0.15;
                opacity = 1 - t;
                scale = 1 - 0.02 * t;
              } else {
                // Dwelling
                opacity = 1;
                scale = 1;
              }
            } else if (index === activeThemeIndex + 1 && themeProgress > 0.85) {
              // Next theme starting to enter
              const t = (themeProgress - 0.85) / 0.15;
              opacity = t;
              scale = 0.98 + 0.02 * t;
            }

            return (
              <div
                key={`${theme.zh}-${theme.en}`}
                className="absolute inset-0 transition-all duration-200"
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                }}
              >
                {/* Chinese character with pinyin - top right */}
                <div className="absolute top-32 -right-2 lg:right-4 flex flex-col items-center select-none">
                  {theme.pinyin && (
                    <div className="text-xs lg:text-sm text-subtle/20 dark:text-subtle/30 mb-1">
                      {theme.pinyin}
                    </div>
                  )}
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-subtle/30 dark:text-subtle/40">
                    {theme.zh}
                  </div>
                </div>

                {/* English word - bottom left */}
                <div
                  className="absolute bottom-28 -left-2 lg:left-8 text-[10px] lg:text-xs uppercase tracking-[0.2em] text-subtle/50 dark:text-subtle/60 font-semibold select-none"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  {theme.en}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
