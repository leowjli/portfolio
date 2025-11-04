"use client"

import { useState, useEffect } from "react";
import { ImArrowUp2 } from "react-icons/im";



export default function ScrollToTop() {
  const [showArrow, setShowArrow] = useState(false);

  // Show or hide the arrow based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showArrow && (
      <div onClick={scrollToTop} 
      className="fixed bottom-10 right-5 cursor-pointer bg-accent rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Scroll to top">
        <ImArrowUp2 className="w-8 h-8 text-white text-center" />
      </div>
    )
  );
}