"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

export default function Gallery({ images }: CarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!images || images.length === 0) {
    return <p>Cool photos coming soon!</p>;
  }

  return (
    <div className="relative w-full mx-auto flex flex-col items-center overflow-hidden">
      <div
        className="relative w-[90%] h-[400px] overflow-hidden rounded-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery carousel"
      >
        <div
          className="slider flex w-max"
          style={{
            animation: prefersReducedMotion ? "none" : "scroll 50s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          <div className="slide-track flex">
            {images.concat(images).map((image, index) => (
              <div key={index} className="slide w-[400px] h-[400px] flex-shrink-0 p-5">
                <Image
                  src={image}
                  alt={`Photo ${index + 1} for carousel`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}