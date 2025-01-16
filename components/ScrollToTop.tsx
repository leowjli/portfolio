"use client"

import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

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
      className="fixed bottom-10 right-10 cursor-pointer"
        aria-label="Scroll to top">
        <FaArrowCircleUp className="w-8 h-8 bg-blue-700 rounded-full text-blue-100 lg:w-14 lg:h-14"/>
      </div>
    )
  );
}