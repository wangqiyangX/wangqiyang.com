import { ProjectsList } from "@/components/projects";
import { allProjects } from "content-collections";

export const metadata = {
  title: "项目",
  description: "个人项目。",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">项目</h1>
      <ProjectsList projects={allProjects} />
    </section>
  );
}
