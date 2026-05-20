import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import MdxContent from "@/components/MdxContent";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";
import { Calendar, Clock, FolderOpen, Tag, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cleanedContent = post.content
    .replace(/\{:\s*\.notice--(\w+)\s*\}/g, "")
    .replace(/\{:\s*\.btn[^}]*\}/g, "")
    .replace(/\{%\s*include\s+video\s+id="([^"]+)"\s+provider="youtube"\s*%\}/g,
      '<iframe width="100%" height="400" src="https://www.youtube.com/embed/$1" frameBorder="0" allowFullScreen></iframe>'
    );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        모든 포스트
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <article className="lg:col-span-3">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/categories?q=${encodeURIComponent(cat)}`}
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0, 212, 170, 0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(0, 212, 170, 0.2)",
                  }}
                >
                  <FolderOpen size={12} />
                  {cat}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Tag size={14} className="text-[var(--text-muted)]" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-lg text-[var(--text-secondary)] hover:text-white transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="h-px mb-10" style={{ background: "var(--accent-gradient)", opacity: 0.3 }} />

          <MdxContent source={cleanedContent} />
        </article>

        {post.toc && (
          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        )}
      </div>
    </div>
  );
}
