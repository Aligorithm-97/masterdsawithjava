"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import PostRenderer from "../../../components/PostRenderer";

type Block =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; content: string };

interface Post {
  id: string;
  title: string;
  summary: string;
  blocks: Block[];
  category: string;
  date: string;
  created_at: string;
}

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`/api/posts/${params.id}`);

        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#18181b] pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#18181b] pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              The post you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] pt-16">
      {/* Header */}
      <section className="bg-[#23272f] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link
              href={`/${post.category.toLowerCase().replace(" ", "-")}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium mb-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to {post.category}
            </Link>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                post.category === "Java Core"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {post.summary}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <PostRenderer blocks={post.blocks} />
          </article>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-[#23272f] border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Enjoyed this article?
            </h2>
            <p className="text-gray-400 mb-8">
              Explore more content in our learning resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/java-core"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Java Core Concepts
              </Link>
              <Link
                href="/dsa-solutions"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
              >
                DSA Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
