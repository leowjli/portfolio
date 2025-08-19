import Image from "next/image";
import Link from "next/link";
import Tag from "./tag";

interface ProjectCardProps {
  path: string
  link: string
  github: string,
  title: string
  role: string
  desc: string
  alt: string
  tags?: string[]
}

export function ProjectCard({ path, link, github, title, role, desc, alt, tags = [] }: ProjectCardProps) {
  // lg:flex-row
  return (
    <div className="flex flex-col h-full w-full justify-start bg-white rounded-lg shadow-lg border border-black/10 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* image section */}
      <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full h-[200px] lg:h-[250px] relative">
        <Image src={path} fill alt={alt} className="object-cover" />
      </Link>

      {/* card text section */}
      <div className="flex flex-col flex-1 justify-between px-6 pt-4 pb-6">
        <div className="flex flex-col">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col lg:flex-row lg:items-end pt-5 pb-2 gap-2">
              <h2 className="sm:text-xl md:text-2xl font-semibold hover:underline">{title}</h2>
              <p className="md:text-md lg:text-lg lg:ml-1 text-gray-500">{role}</p>
            </div>
          </Link>
          <p className="mb-4 lg:text-lg break-words"><em>{desc}</em></p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((t) => (
                <Tag key={t} text={t} />
              ))}
            </div>
          )}
        </div>

        {/* tags */}


        {/* buttons */}
        {(github || link) && (
          <div className="flex gap-4 mt-auto pt-2">
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