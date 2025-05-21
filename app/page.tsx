import { PostsList } from "@/components/posts";
import { ProjectsList } from "@/components/projects";
import { allPosts, allProjects } from "content-collections";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        启阳的编程手札
      </h1>
      <p className="mb-4">愿自由之风，吹拂世界。</p>
      <div className="my-8">
        <h2 className="mb-4 text-lg font-semibold tracking-tighter">
          最近文章
        </h2>
        <PostsList posts={allPosts.slice(0, 3)} />
      </div>
      <div className="my-8">
        <h2 className="mb-4 text-lg font-semibold tracking-tighter">
          最近项目
        </h2>
        <ProjectsList projects={allProjects.slice(0, 3)} />
      </div>
    </section>
  );
}
