"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostRenderer from "./PostRenderer";
import { Post } from "../lib/types";
import { getAccessToken } from "../utils/GetTokenFromCookie";

interface CategoryPostsProps {
  category: string; // Backend category name
  title?: string; // Section title
  accent?: "blue" | "green" | "purple" | "yellow"; // badge color
}

const badgeClassByAccent: Record<
  NonNullable<CategoryPostsProps["accent"]>,
  string
> = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

export default function CategoryPosts({
  category,
  title,
  accent = "blue",
}: CategoryPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (value?: string) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const apiBaseUrl = process.env.GO_URL || "http://localhost:8090";
        const token = getAccessToken();

        const res = await fetch(`${apiBaseUrl}/posts/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = await res.json();
        if (!res.ok) {
          console.error("Failed to load posts:", payload?.error ?? payload);
          return;
        }

        const rawItems: any[] = Array.isArray(payload)
          ? payload
          : payload?.data || payload?.items || payload?.content || [];

        const postsWithParsedBlocks = rawItems.map((post: any) => {
          const id =
            post?.id ??
            post?.postId ??
            post?.post?.id ??
            post?.uuid ??
            post?.slug; // AS IS, string olarak bırak

          const category =
            post?.category ?? post?.categoryName ?? post?.category?.name;
          const date = post?.date ?? post?.createdAt ?? post?.created_date;
          const blocks =
            typeof post?.blocks === "string"
              ? JSON.parse(post.blocks)
              : post?.blocks;

          return { ...post, id, category, date, blocks };
        });

        // Tarihe göre sıralama (en yeni önce)
        const sortedPosts = postsWithParsedBlocks.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        setPosts(sortedPosts);
      } catch (e) {
        console.error("Failed loading posts:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  if (loading) {
    return (
      <section className="py-16 bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading {category} posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">No Posts Yet</h2>
            <p className="text-gray-400 mb-8">
              Posts for {category} will appear here once created.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#23272f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title ?? "Latest Articles"}
          </h2>
          <p className="text-gray-400">
            Explore our latest {category} articles and tutorials
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const badgeClass = badgeClassByAccent[accent];
            const candidates = [(post as any)?.id].filter((v) => v != null);

            const postId = candidates[0];
            return (
              <article
                key={String(post.id)}
                className="bg-[#18181b] rounded-xl shadow-lg border border-gray-700 overflow-hidden hover-lift"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate((post as any).date)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {(post as any).summary && (
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {(post as any).summary}
                    </p>
                  )}
                  <div className="space-y-3">
                    <PostRenderer
                      blocks={(post as any).blocks}
                      maxBlocks={2}
                      isPreview={true}
                    />
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    {postId != null ? (
                      <Link
                        href={`/post/${postId}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Details unavailable
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
