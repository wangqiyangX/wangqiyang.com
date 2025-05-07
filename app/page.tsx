import { BlogPosts } from "@/components/posts";
import { allPosts } from "content-collections";
export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        启阳的编程手札
      </h1>
      <p className="mb-4">愿自由之风，吹拂世界。</p>
      <div className="my-8">
        <BlogPosts posts={allPosts} />
      </div>
    </section>
  );
}
