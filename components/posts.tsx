import Link from "next/link";
import { formatDate } from "@/app/utils";
import { Post } from "content-collections";

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
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post._meta.path}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums">
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
