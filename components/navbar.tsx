'use client';

import Link from "next/link";
import { navigation } from "@/constants";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";


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
        if(prevPath !== path) {
            setIsRouting(true);
        }
    }, [path, prevPath]);

    useEffect(() => {
        if(isRouting) {
            setPrevPath(path);
            const timeout = setTimeout(() => {
                setIsRouting(false);
            }, 1500)

            return () => clearTimeout(timeout)
        }
    }, [path, isRouting]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6 ${isOpen ? "bg-blue-100" : "bg-white"}`}>

            <Link href="/">
                <p className="text-base font-medium">Leo Li</p>
            </Link>
            <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Toggle Menu">
                {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
            </button>

            <nav className={`md:justify-items-center md:flex ${isOpen ? 'fixed z-50 top-[72px] left-0 right-0 bg-blue-400/20 backdrop-blur-lg w-full block transition-all duration-500' : 'hidden md:block'}`}>
                <ul className="md:flex space-x-0 lg:space-x-2 xl:space-x-6">
                    {navigation.map((nav_item, id) => {
                        return (
                            <Link className="transition-all duration-500 ease-in" href={nav_item.path} key={id} target={nav_item.name === "Resume" ? "_blank" : "_self"}>
                                <p className={`text-center text-base p-2 hover:border-b-2 ${path === nav_item.path ? "text-[#398EEB] font-semibold hover:border-[#398EEB]" : "text-black font-medium hover:border-black"}`}>{nav_item.name}</p>
                            </Link>
                        )
                    })}
                </ul>
            </nav>
        </header>
    );
}