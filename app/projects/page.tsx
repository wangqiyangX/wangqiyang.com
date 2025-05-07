import { allProjects } from "content-collections";
import { ProjectsList } from "@/components/projects-list";

export const metadata = {
  title: "项目",
  description: "个人项目。",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">项目</h1>
      <ProjectsList projects={allProjects} />
    </section>
  );
}
