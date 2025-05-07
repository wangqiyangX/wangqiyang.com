import { allPosts } from "content-collections";
import Link from "next/link";

export const metadata = {
  title: "标签",
  description: "所写文章用到的标签。",
};

export default function Page() {
  const tags = allPosts.map((post) => post.tags || []).flat();
  const uniqueTags = [...new Set(tags)];

  const tagCounts = uniqueTags.reduce(
    (acc, tag) => {
      acc[tag] = allPosts.filter((post) => post.tags?.includes(tag)).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8">标签</h1>
      <div className="flex flex-wrap gap-4">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            {"#" + tag}
            <span className="ml-1 text-neutral-400 dark:text-neutral-500">
              ({tagCounts[tag]})
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
