import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    path: string
    link: string
    github: string,
    title: string
    role: string
    desc: string
    alt: string
}

export function ProjectCard({ path, link, github, title, role, desc, alt }: ProjectCardProps) {
    // lg:flex-row
    return (
        <div className="flex flex-col h-full w-full justify-between bg-white rounded-[20px] shadow-lg border border-black/10 hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* image section */}
            <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full h-[200px] lg:h-[250px] relative">
                <Image
                    src={path}
                    layout="fill"
                    objectFit="cover"
                    alt={alt}
                />
            </Link>

            {/* card text section */}
            <div className="flex flex-col justify-start px-6 pt-4 pb-6">
                <Link href={link} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-end pt-5 pb-2">
                        <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-semibold hover:underline">{title}</h2>
                        <p className="md:text-md lg:text-lg ml-1 text-gray-500">[{role}]</p>
                    </div>
                </Link>
                <p className="mb-10 lg:text-lg break-words"><em>{desc}</em></p>

                {/* buttons */}
                {(github || link) && (
                    <div className="flex gap-4 mt-auto">
                        {github && (
                            <Link href={github} target="_blank" rel="noopener noreferrer">
                                <p className="text-sm lg:text-base px-3 py-1 border border-black rounded-lg max-w-fit">GitHub</p>
                            </Link>
                        )}
                        {link && (
                            <Link href={link} target="_blank" rel="noopener noreferrer">
                                <p className="text-sm lg:text-base px-3 py-1 border border-black rounded-lg max-w-fit">Live Demo</p>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}