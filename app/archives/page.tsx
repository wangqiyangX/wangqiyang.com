import { Post } from "@/.content-collections/generated";
import { allPosts } from "content-collections";
import Link from "next/link";

export const metadata = {
  title: "归档",
  description: "过去所写的所有文章。",
};

type MonthPosts = Record<number, Post[]>;

type YearMonthPosts = Record<number, MonthPosts>;

const organizePostsByYearAndMonth = (posts: Post[]) => {
  const organized: YearMonthPosts = {};

  posts.forEach((post) => {
    const date = new Date(post.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!organized[year]) {
      organized[year] = {};
    }

    if (!organized[year][month]) {
      organized[year][month] = [];
    }

    organized[year][month].push(post);
  });

  return organized;
};

const getMonthName = (month: number) => {
  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  return monthNames[month - 1];
};

const countPostsInYear = (yearData: MonthPosts): number => {
  return Object.values(yearData).reduce(
    (total, posts) => total + posts.length,
    0,
  );
};

export default function Page() {
  const organizedPosts: YearMonthPosts = organizePostsByYearAndMonth(allPosts);
  const years: string[] = Object.keys(organizedPosts).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">归档</h1>
      <div className="space-y-8">
        {years.map((yearStr) => {
          const year = Number(yearStr);
          return (
            <div key={year} className="border-b pb-6 last:border-0">
              <h2 className="text-primary mb-4 text-xl font-semibold">
                {year}年 ({countPostsInYear(organizedPosts[year])}篇文章)
              </h2>
              <div className="space-y-6 pl-4 md:pl-6">
                {Object.keys(organizedPosts[year])
                  .map(Number)
                  .sort((a, b) => b - a)
                  .map((month) => (
                    <div key={`${year}-${month}`} className="last:mb-0">
                      <h3 className="text-primary/80 mb-3 text-lg font-medium">
                        {getMonthName(month)} (
                        {organizedPosts[year][month].length}篇文章)
                      </h3>
                      <ul className="space-y-2 pl-4 md:pl-6">
                        {organizedPosts[year][month]
                          .sort(
                            (a, b) =>
                              new Date(b.publishedAt).getTime() -
                              new Date(a.publishedAt).getTime(),
                          )
                          .map((post) => (
                            <li key={post._meta.path} className="group">
                              <Link
                                href={`/blog/${post._meta.path}`}
                                className="hover:text-primary flex items-start"
                              >
                                <span className="text-muted-foreground min-w-[90px] text-sm">
                                  {new Date(
                                    post.publishedAt,
                                  ).toLocaleDateString("zh-CN", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <span className="group-hover:underline">
                                  {post.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
