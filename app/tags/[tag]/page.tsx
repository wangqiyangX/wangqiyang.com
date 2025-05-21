import { PostsList } from "@/components/posts";
import { allPosts } from "content-collections";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const tags = allPosts.map((post) => post.tags || []).flat();
  const uniqueTags = [...new Set(tags)];

  return uniqueTags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const { tag } = await params;
  const posts = allPosts.filter((post) => post.tags?.includes(tag));

  if (!posts) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-4">
      <Link
        href="/tags"
        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300"
      >
        <ChevronLeft className="h-4 w-4" />
        返回
      </Link>
      <h1 className="mb-8 text-2xl font-semibold">标签：{tag}</h1>
      <PostsList posts={posts} />
    </section>
  );
}
