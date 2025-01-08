"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const transitions = {
    initial: {
        y: "-100%",
        height: '0%'
    },
    animate: {
        y: ["-100%", "0%", "-100%"],
        height: ["0%", "200%", "0%"],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        },
      },
}

export default function Transition({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(true);
    const path = usePathname();

    useEffect(() => {
        setIsTransitioning(true);
        const timeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [path]);


    return (
        <>
            {isTransitioning && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-[#398EEB] rounded-b-[250px] z-10"
                    variants={transitions}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 1.5 }}
                />
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 0 : 1 }}
                transition={{ duration: 1 }}
            >
                {!isTransitioning && children}
            </motion.div>
        </>
    );
}
