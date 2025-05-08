import { formatDate } from "@/lib/utils";
import { Post } from "content-collections";
import Link from "next/link";

export function BlogPosts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post._meta.path}
            className="mb-4 flex flex-col space-y-1"
            href={`/blog/${post._meta.path}`}
          >
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[120px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(post.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
