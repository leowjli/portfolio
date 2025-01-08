import Image from "next/image";
import { projects } from "@/constants"
import Link from "next/link";
import { motion } from "framer-motion";

export function ProjectCard({ path, link, github, title, role, desc, alt }: ProjectCardProps) {
    return (
        <div className="flex flex-col lg:flex-row">
            <Link href={link} className="w-full md:max-w-[300px] md:max-h-[300px]">
                <Image className="rounded-s-[20px] bg-black w-full h-full object-cover"
                    src={path}
                    width={200}
                    height={200}
                    alt={alt}
                />
            </Link>
            <div className="flex flex-col justify-start mx-10 mt-1 mb-4">
                <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-3 md:mt-6 lg:mt-10">{title}</h2>
                <p className="lg:text-lg mb-3">{role}</p>
                <p className="mb-3 lg:text-lg lg:mt-5">{desc}</p>
                <div className={`${github && link ? "flex gap-5" : ""}`}>
                    <Link href={github} target="_blank" rel="noopener noreferrer" className={`${github ? "block" : ""}`}>
                        <p className={`${github ? "lg:text-lg px-3 py-1 border border-black rounded-lg max-w-fit" : ""}`}>{github ? "GitHub" : ""}</p>
                    </Link>
                    <Link href={link} target="_blank" rel="noopener noreferrer" className={`${link ? "block" : ""}`}>
                        <p className={`${link ? "lg:text-lg px-3 py-1 border border-black rounded-lg max-w-fit" : ""}`}>{link ? "Live Demo" : ""}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

interface ProjectCardProps {
    path: string
    link: string
    github: string,
    title: string
    role: string
    desc: string
    alt: string
}

export default function Project() {
    return (
        <section className="projects-grid grid grid-cols-1 sm:grid-cols-2
        gap-x-10 gap-y-4 sm:gap-x-2 md:gap-x-9 mx-5 sm:mx-10 md:mx-24">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{
                        once: true  // could change this
                    }}
                >
                    <div className="border border-black rounded-[20px]" key={index}>
                        <ProjectCard
                            path={project.path}
                            link={project.link}
                            github={project.github}
                            title={project.title}
                            role={project.role}
                            desc={project.desc}
                            alt={project.alt}
                        />
                    </div>
                </motion.div>
            ))}
        </section>
    );
}