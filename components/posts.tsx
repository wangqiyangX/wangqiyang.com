import { formatDate } from "@/lib/formatDate";
import { Post } from "content-collections";
import * as motion from "motion/react-client";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
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
            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2"
            >
              <p className="w-[120px] text-neutral-600 tabular-nums dark:text-neutral-400">
                {formatDate(post.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100">
                {post.title}
              </p>
            </motion.div>
          </Link>
        ))}
    </motion.div>
  );
}
