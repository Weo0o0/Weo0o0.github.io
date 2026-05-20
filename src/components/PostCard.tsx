import Link from "next/link";
import { Calendar, Clock, FolderOpen } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="glass-card glow-border p-6 h-full flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0, 212, 170, 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 212, 170, 0.2)",
              }}
            >
              <FolderOpen size={12} />
              {cat}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
          {post.title}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mt-auto pt-4 border-t border-[var(--border-color)]">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>
      </article>
    </Link>
  );
}
