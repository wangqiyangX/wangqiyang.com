import { BlogPosts } from "@/components/posts";
import { allPosts } from "content-collections";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

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
        <ChevronLeft className="w-4 h-4" />
        返回
      </Link>
      <h1 className="font-semibold text-2xl mb-8">标签：{tag}</h1>
      <BlogPosts posts={posts} />
    </section>
  );
}
