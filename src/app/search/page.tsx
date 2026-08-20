"use client";

import { useState, useEffect, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: PostMeta[]) => setAllPosts(data))
      .catch(() => {});
  }, []);

  const posts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, allPosts]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">검색</h1>
        <div className="relative max-w-xl mx-auto">
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
            autoFocus
          />
        </div>
      </div>

      {query && (
        <p className="text-sm text-[var(--text-muted)] mb-6">{posts.length}개 결과</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {query && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--text-muted)]">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
