import { allPosts } from "content-collections";

export const baseUrl = "https://wangqiyang.com";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post._meta.path}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/tags", "/about", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
