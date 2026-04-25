'use client';

import Link from "next/link";
import { navigation } from "@/constants";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const path = usePathname();
  const [prevPath, setPrevPath] = useState("/");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 598) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (prevPath !== path) {
      setIsRouting(true);
    }
  }, [path, prevPath]);

  useEffect(() => {
    if (isRouting) {
      setPrevPath(path);
      const timeout = setTimeout(() => {
        setIsRouting(false);
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [path, isRouting]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:pl-16 sm:pr-8 py-6 ${isOpen ? "bg-muted" : "bg-background/80 backdrop-blur-md"} border-b border-border`}>

      <Link href="/">
        <p className="text-base font-medium text-foreground">Leo Li</p>
      </Link>

      <div className="flex items-center gap-4">
        <nav className={`md:justify-items-center md:flex ${isOpen ? 'fixed z-50 top-[72px] left-0 right-0 bg-background/90 backdrop-blur-lg w-full block transition-all duration-500 border-b border-border' : 'hidden md:block'}`}>
          <ul className="md:flex space-x-0 lg:space-x-2 xl:space-x-6">
            {navigation.map((nav_item, id) => {
              return (
                <Link className="transition-all duration-500 ease-in" href={nav_item.path} key={id} target={nav_item.name === "Resume" ? "_blank" : "_self"}>
                  <p className={`text-center text-base p-2 border-b-2 border-transparent ${path === nav_item.path ? "text-accent font-semibold hover:border-accent" : "text-foreground font-medium hover:border-foreground"}`}>{nav_item.name}</p>
                </Link>
              )
            })}
          </ul>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="md:hidden text-2xl text-foreground" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}