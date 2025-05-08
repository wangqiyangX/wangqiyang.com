import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";

const posts = defineCollection({
  name: "posts",
  directory: "./content/posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().date(),
    summary: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "./content/projects",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().date(),
    summary: z.string(),
    image: z.string().optional(),
    category: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts, projects],
});
