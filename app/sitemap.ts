import { allPosts, allProjects } from "content-collections";

export const baseUrl = "https://wangqiyang.com";

export default async function sitemap() {
  const blogs = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post._meta.path}`,
    lastModified: post.publishedAt,
  }));

  const projects = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project._meta.path}`,
    lastModified: project.publishedAt,
  }));

  // Get all unique tags from posts
  const tags = [...new Set(allPosts.map((post) => post.tags || []).flat())];
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/blog", "/tags", "/about", "/projects", "/rss"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  return [...routes, ...blogs, ...projects, ...tagPages];
}
