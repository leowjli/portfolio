import { useContext } from "react";
import { TranslationContext } from "./ChineseSection";

export default function TranslationHint() {
  const { isTranslated } = useContext(TranslationContext);
  
  return (
    <p className="text-sm text-foreground/50 mt-4 mr-3">
      <span className="hidden md:inline">Hover to translate to English</span>
      <span className="md:hidden">Tap to translate to {isTranslated ? "English" : "Chinese"}</span>
    </p>
  );
}
