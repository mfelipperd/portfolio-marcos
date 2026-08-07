import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getReferenceCards } from "@/lib/referenceMetadata";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "Marcos Felippe - Blog",
      locale: "pt_BR",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      authors: ["Marcos Felippe"],
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@mfelipperd",
      site: "@mfelipperd",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const referenceCards = post.references
    ? await getReferenceCards(post.references)
    : [];

  return (
    <main className="relative min-h-screen bg-black text-white">
      <article className="max-w-[760px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
        <Link
          href="/blog"
          className="text-xs md:text-sm tracking-wider uppercase text-zinc-500 hover:text-white transition-colors"
        >
          ← Voltar ao blog
        </Link>

        {post.coverImage && (
          <div className="mt-8 rounded-xl overflow-hidden border border-white/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <header className="mt-8 mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-xs text-zinc-600 tracking-wide uppercase">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-strong:text-white">
          <MDXRemote source={post.content} />
        </div>

        {referenceCards.length > 0 && (
          <footer className="mt-16 pt-8 border-t border-white/5">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-500 mb-4">
              Referências
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {referenceCards.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 items-center border border-white/5 rounded-lg p-3 hover:border-white/15 hover:bg-white/[0.02] transition-colors"
                  >
                    {reference.image ? (
                      <Image
                        src={reference.image}
                        alt=""
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded object-cover shrink-0 bg-white/5"
                        unoptimized
                      />
                    ) : (
                      <div className="w-16 h-16 rounded shrink-0 bg-white/5 flex items-center justify-center">
                        {reference.favicon && (
                          <Image
                            src={reference.favicon}
                            alt=""
                            width={24}
                            height={24}
                            unoptimized
                          />
                        )}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate group-hover:underline underline-offset-4 decoration-white/30">
                        {reference.title}
                      </p>
                      {reference.ogDescription && (
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">
                          {reference.ogDescription}
                        </p>
                      )}
                      <p className="text-[11px] text-zinc-600 uppercase tracking-wide mt-1 truncate">
                        {reference.siteName ?? new URL(reference.url).hostname}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </article>
    </main>
  );
}
