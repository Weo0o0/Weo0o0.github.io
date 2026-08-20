import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { FolderOpen } from "lucide-react";

export const metadata = { title: "카테고리" };

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FolderOpen className="text-[var(--accent)]" />
          카테고리
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          {categories.length}개 카테고리
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((cat) => {
          const posts = getPostsByCategory(cat.name);
          return (
            <section key={cat.name} id={cat.name}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-white">{cat.name}</h2>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: "rgba(0, 212, 170, 0.1)",
                    color: "var(--accent)",
                  }}
                >
                  {cat.count}
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
