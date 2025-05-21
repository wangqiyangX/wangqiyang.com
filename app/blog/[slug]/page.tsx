import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/mdx";
import { formatDate } from "@/lib/formatDate";
import { allPosts } from "content-collections";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((post) => post._meta.path === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post._meta.path}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((post) => post._meta.path === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: post.image
              ? `${baseUrl}${post.image}`
              : `/og?title=${encodeURIComponent(post.title)}`,
            url: `${baseUrl}/blog/${post._meta.path}`,
            author: {
              "@type": "Person",
              name: "启阳的编程手札",
            },
          }),
        }}
      />
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {post.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-start gap-2 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt, true)}
        </p>
        {post.tags?.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {"#" + tag}
          </Link>
        ))}
      </div>
      <article className="prose">
        <CustomMDX source={post.mdx} />
      </article>
    </section>
  );
}
