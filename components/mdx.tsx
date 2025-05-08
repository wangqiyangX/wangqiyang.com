import { MDXContent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";

interface TableData {
  headers: string[];
  rows: string[][];
}

function Table({ data }: { data: TableData }) {
  const headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row: string[], index: number) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const href = props.href;

  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

interface RoundedImageProps extends React.ComponentProps<typeof Image> {
  alt: string;
  src: string;
}

function RoundedImage({ alt, ...props }: RoundedImageProps) {
  return <Image className="rounded-lg" alt={alt} {...props} />;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props: {
  source: string;
  components?: Record<string, unknown>;
}) {
  return (
    <MDXContent
      code={props.source}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
