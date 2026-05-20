import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = { title: "연도별 아카이브" };

export default function ArchivesPage() {
  const posts = getAllPosts();

  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date.slice(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Calendar className="text-[var(--accent)]" />
          연도별 아카이브
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">{posts.length}개 포스트</p>
      </div>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold gradient-text">{year}</h2>
              <span className="text-sm text-[var(--text-muted)]">
                {grouped[year].length}개 포스트
              </span>
            </div>

            <div className="space-y-3">
              {grouped[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group"
                  style={{ border: "1px solid transparent" }}
                >
                  <span className="text-sm text-[var(--text-muted)] font-mono whitespace-nowrap">
                    {post.date.slice(5)}
                  </span>
                  <span className="text-white group-hover:text-[var(--accent)] transition-colors flex-grow">
                    {post.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors opacity-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
