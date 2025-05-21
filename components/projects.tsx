import { formatDate } from "@/lib/formatDate";
import { Project } from "content-collections";
import * as motion from "motion/react-client";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {projects
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((project) => (
          <Link
            key={project._meta.path}
            className="mb-4 flex flex-col space-y-1"
            href={`/projects/${project._meta.path}`}
          >
            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2"
            >
              <p className="w-[120px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(project.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100">
                {project.title}
              </p>
            </motion.div>
          </Link>
        ))}
    </motion.div>
  );
}
