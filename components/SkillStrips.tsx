"use client";

import Image from "next/image";
import { useState } from "react";

type Skill = {
  name: string;
  svgPath: string;
  alt: string;
};

type Props = {
  skills: Skill[];
};

export default function SkillStrips({ skills }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="w-full overflow-x-auto scrollbar-hide min-h-[120px]"
    >
      <div className="flex gap-1 min-w-max py-2">
        {skills.map((skill, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={skill.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Strip container */}
              <div
                className={`
                  relative h-20 rounded-md transition-all duration-300 ease-out overflow-visible
                  ${
                    isHovered
                      ? "w-24 bg-accent/10"
                      : "w-6 bg-card/50 border border-border/30"
                  }
                `}
              >
                {/* Vertical skill name (default state) */}
                <div
                  className={`
                    absolute inset-0 flex items-end justify-center py-1 transition-opacity duration-300
                    ${isHovered ? "opacity-0" : "opacity-100"}
                  `}
                >
                  <span
                    className="text-xs sm:text-sm font-medium text-foreground/70 select-none"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    {skill.alt}
                  </span>
                </div>

                {/* Icon (hover state) - full size, fills height */}
                <div
                  className={`
                    absolute inset-0 flex items-center justify-center transition-all duration-300
                    ${
                      isHovered
                        ? "opacity-100 scale-100 rounded-lg border border-accent"
                        : "opacity-0 scale-75 pointer-events-none"
                    }
                  `}
                >
                  <Image
                    src={skill.svgPath}
                    alt={skill.alt || skill.name}
                    width={96}
                    height={96}
                    className="h-full w-auto object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Tooltip label on hover (optional, shows at bottom) */}
              <div
                className={`
                  absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap 
                  text-xs text-foreground/80 font-medium transition-opacity duration-200
                  ${isHovered ? "opacity-100" : "opacity-0"}
                `}
              >
                {skill.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
