import { baseUrl } from "@/app/sitemap";
import { allPosts } from "content-collections";

export async function GET() {
  const itemsXml = allPosts
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${baseUrl}/blog/${post._meta.path}</link>
          <description>${post.summary || ""}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>启阳</title>
        <link>${baseUrl}</link>
        <description>记录了本人学习编程的所思及所得。</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
