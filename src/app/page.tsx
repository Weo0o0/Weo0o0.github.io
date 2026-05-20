import { getAllPosts, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AuthorCard from "@/components/AuthorCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: "var(--accent)" }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: "var(--accent-secondary)" }} />

        <div className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
            style={{
              background: "rgba(0, 212, 170, 0.08)",
              border: "1px solid rgba(0, 212, 170, 0.2)",
              color: "var(--accent)",
            }}>
            <Sparkles size={16} />
            보안 · 데이터베이스 · 개발
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Weo0o0-Note</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            다양한 프로젝트 소개 및 개발하는 블로그
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16">
        {/* Posts */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">최신 포스트</h2>
            <span className="text-sm text-[var(--text-muted)]">{posts.length}개 포스트</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AuthorCard />

          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[var(--accent-secondary)]" />
              카테고리
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/categories?q=${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(124, 58, 237, 0.1)",
                        color: "var(--accent-secondary)",
                      }}>
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/categories"
              className="flex items-center gap-1 mt-4 text-xs text-[var(--accent)] hover:underline"
            >
              모든 카테고리 보기 <ArrowRight size={12} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
