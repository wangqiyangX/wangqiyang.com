import { formatDate } from "@/lib/utils";
import { Project } from "content-collections";
import Link from "next/link";

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div>
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
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[120px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(project.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100">
                {project.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
