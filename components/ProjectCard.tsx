"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Tag from "./Tag";

interface ProjectCardProps {
  path: string
  link: string
  github: string,
  title: string
  role: string
  desc: string
  why?: string
  alt: string
  tags?: string[]
}

export function ProjectCard({ path, link, github, title, role, desc, why, alt, tags = [] }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    initial: { y: 0 },
    hover: shouldReduceMotion ? {} : { y: -4 }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col h-full w-full justify-start bg-surface rounded-2xl shadow-lg border border-border hover:shadow-glow transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
      {/* image section */}
      <div className="w-full h-[200px] lg:h-[250px] relative">
        <Image src={path} fill alt={alt} className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>

      {/* Default card text section */}
      <div className="flex flex-col flex-1 justify-between px-6 pt-4 pb-6 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex flex-col">
          <div className="flex flex-col pt-5 pb-5">
            <h2 className="sm:text-xl md:text-3xl font-semibold text-foreground">{title}</h2>
            <p className="md:text-base text-foreground">{role}</p>
          </div>
          {why && (
            <p className="mb-4 text-xs lg:text-sm text-secondary dark:text-white max-w-prose">
              {why}
            </p>
          )}
        </div>
      </div>

      {/* Hover Overlay with glassmorphism */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-3">
        <div className="pointer-events-auto w-full h-fit rounded-2xl border border-white/30 dark:border-white/20 bg-gradient-to-t from-white/90 via-white/70 to-white/50 dark:from-black/80 dark:via-black/60 dark:to-black/40 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="sm:text-xl font-semibold text-accent group-hover:from-accent group-hover:to-foreground transition-all duration-300">{title}</h2>
          {/* <p className="md:text-base text-foreground mb-2">{role}</p> */}

          {desc && (
            <p className="mb-4 text-xs lg:text-sm text-secondary dark:text-white max-w-prose">
              {desc}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t) => (
                <Tag key={t} text={t} />
              ))}
            </div>
          )}

          {/* buttons */}
          {(github || link) && (
            <div className="flex gap-4 mt-2">
              {github && (
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  <p className="text-sm lg:text-base px-3 py-1 border border-border dark:border-white/30 rounded-lg max-w-fit text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/20 transition-colors">
                    GitHub
                  </p>
                </Link>
              )}
              {link && (
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  <p className="text-sm lg:text-base px-3 py-1 rounded-lg max-w-fit bg-accent text-white hover:opacity-90 transition-opacity">
                    Live Demo
                  </p>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}