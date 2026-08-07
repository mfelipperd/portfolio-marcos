import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostFrontmatter, BlogPostMeta } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  const posts = getPostSlugs().map((slug) => {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogPostFrontmatter;

  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content).text,
    content,
  };
}
