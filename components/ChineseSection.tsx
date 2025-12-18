"use client";

import { createContext, useState, ReactNode } from "react";

type TranslationContextType = {
  isTranslated: boolean;
};

export const TranslationContext = createContext<TranslationContextType>({
  isTranslated: false,
});

type Props = {
  children: ReactNode;
};

export default function ChineseSection({ children }: Props) {
  const [isTranslated, setIsTranslated] = useState(false);

  return (
    <TranslationContext.Provider value={{ isTranslated }}>
      <div
        className="cursor-pointer md:cursor-default"
        onClick={() => {
          if (window.matchMedia("(max-width: 767px)").matches) {
            setIsTranslated(!isTranslated);
          }
        }}
      >
        {children}
      </div>
    </TranslationContext.Provider>
  );
}
