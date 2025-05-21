import { PostsList } from "@/components/posts";
import { allPosts } from "content-collections";

export const metadata = {
  title: "文章",
  description: "编程相关的一些笔记。",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">文章</h1>
      <PostsList posts={allPosts} />
    </section>
  );
}
