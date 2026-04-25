import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/constants';

type ProjectType = typeof projects[number];

const chunkProjects = (projects: ProjectType[]) => {
  const pattern = [2]; // repeat 2-3-2-3
  const chunks = [];
  let start = 0;
  let i = 0;

  while (start < projects.length) {
    const size = pattern[i % pattern.length];
    chunks.push(projects.slice(start, start + size));
    start += size;
    i++;
  }

  return chunks;
};

const ProjectGridRow = ({ chunk }: { chunk: ProjectType[] }) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          grid sm:grid-cols-1
          ${chunk.length === 2 ? "md:grid-cols-2" : chunk.length === 3 ? "md:grid-cols-3" : ""}
          gap-x-6 gap-y-4 my-5 sm:mx-10 md:mx-24 items-stretch
        `}
      >
        {chunk.map((project) => (
          <motion.div
            key={project.title}
            className="flex"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1 },
            }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col h-full w-full">
              <ProjectCard {...project} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Project() {
  const chunks = chunkProjects(projects);

  return (
    <section className="mt-10 sm:mt-20 mx-5">
      {chunks.map((chunk, idx) => (
        <ProjectGridRow chunk={chunk} key={idx} />
      ))}
    </section>
  );
}