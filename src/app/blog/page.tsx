import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos sobre desenvolvimento web, IA e automação por Marcos Felippe.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="max-w-[900px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
        <Link
          href="/"
          className="text-xs md:text-sm tracking-wider uppercase text-zinc-500 hover:text-white transition-colors"
        >
          ← Voltar ao portfólio
        </Link>

        <header className="mt-8 mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center gap-4">
            <span className="w-8 h-px bg-white/20" />
            Blog
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="text-zinc-500 text-sm md:text-base">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <ul className="space-y-8 md:space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-white/5 pb-8 md:pb-10">
                <Link href={`/blog/${post.slug}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {post.coverImage && (
                    <div className="shrink-0 w-full sm:w-[220px] aspect-[1200/630] rounded-lg overflow-hidden border border-white/5">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={220}
                        height={116}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-zinc-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-zinc-400 text-sm md:text-base leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-zinc-600 tracking-wide uppercase">
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
