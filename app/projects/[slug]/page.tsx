import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/mdx";
import { formatDate } from "@/lib/utils";
import { allProjects } from "content-collections";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project._meta.path,
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
  const project = allProjects.find((project) => project._meta.path === slug);
  if (!project) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project;
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
      url: `${baseUrl}/projects/${project._meta.path}`,
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

export default async function Project({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((project) => project._meta.path === slug);

  if (!project) {
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
            headline: project.title,
            datePublished: project.publishedAt,
            dateModified: project.publishedAt,
            description: project.summary,
            image: project.image
              ? `${baseUrl}${project.image}`
              : `/og?title=${encodeURIComponent(project.title)}`,
            url: `${baseUrl}/projects/${project._meta.path}`,
            author: {
              "@type": "Person",
              name: "启阳",
            },
          }),
        }}
      />
      <h1 className="title text-2xl font-semibold tracking-tighter">
        {project.title}
      </h1>
      <div className="mt-2 mb-8 flex items-center justify-start gap-2 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(project.publishedAt, true)}
        </p>
        {project.category && (
          <Link
            href={`/categories/${project.category}`}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {"#" + project.category}
          </Link>
        )}
      </div>
      <article className="prose">
        <CustomMDX source={project.mdx} />
      </article>
    </section>
  );
}
