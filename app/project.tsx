import Image from "next/image";
import { projects } from "@/constants"

export function ProjectCard({path, alt}: ProjectCardProps) {
    return (
        <div className="m-6">
            <Image className="border border-black rounded-[20px]"
                src={path}
                width={500}
                height={500}
                alt={alt}
            />
        </div>
    );
}

interface ProjectCardProps {
    path: string;
    alt: string;
  }

export default function Project() {
    return (
        <section className="projects-grid grid grid-cols-1 gap-x-10">
            {projects.map((project, index) => (
                <ProjectCard key={index} path={project.path} alt={project.alt} />
            ))}
        </section>
    );
}