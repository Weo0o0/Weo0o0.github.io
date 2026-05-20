import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { Tag } from "lucide-react";

export const metadata = { title: "태그" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Tag className="text-[var(--accent-secondary)]" />
          태그
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">{tags.length}개 태그</p>
      </div>

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-2 mb-12">
        {tags.map((tag) => (
          <a
            key={tag.name}
            href={`#${tag.name}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
            style={{
              background: "rgba(124, 58, 237, 0.08)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              color: "#a78bfa",
            }}
          >
            #{tag.name}
            <span className="text-xs opacity-60">{tag.count}</span>
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {tags.map((tag) => {
          const posts = getPostsByTag(tag.name);
          return (
            <section key={tag.name} id={tag.name}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-white">#{tag.name}</h2>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(124, 58, 237, 0.1)",
                    color: "#a78bfa",
                  }}
                >
                  {tag.count}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
