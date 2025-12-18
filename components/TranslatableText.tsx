"use client";

import { useState, useContext } from "react";
import { TranslationContext } from "./ChineseSection";

type Props = {
  chinese: string;
  english: string;
  className?: string;
};

export default function TranslatableText({
  chinese,
  english,
  className = "",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { isTranslated } = useContext(TranslationContext);

  // On desktop: show English on hover
  // On mobile: show English when isTranslated is true
  const showEnglish = isHovered || isTranslated;

  return (
    <div
      className="grid"
      onMouseEnter={() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          setIsHovered(false);
        }
      }}
    >
      {/* Chinese text */}
      <p
        className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${className} ${
          showEnglish ? "opacity-0" : "opacity-100"
        }`}
        lang="zh"
      >
        {chinese}
      </p>
      {/* English text */}
      <p
        className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out pr-3 ${className} ${
          showEnglish ? "opacity-100" : "opacity-0"
        }`}
        lang="en"
      >
        {english}
      </p>
    </div>
  );
}
