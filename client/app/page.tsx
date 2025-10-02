"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Post } from "../lib/types";
import PostRenderer from "@/components/PostRenderer";
import { formatDate } from "@/utils/FormatDate";
export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const apiBaseUrl = process.env.GO_URL || "http://localhost:8090";

        const response = await fetch(`${apiBaseUrl}/posts`);

        if (response.ok) {
          const data = await response.json();
          // Parse blocks from JSON string to array
          const postsWithParsedBlocks = (data.data || []).map((post: any) => ({
            ...post,
            blocks:
              typeof post.blocks === "string"
                ? JSON.parse(post.blocks)
                : post.blocks,
          }));
          // Tarihe göre sıralama (en yeni önce)
          const sortedPosts = postsWithParsedBlocks.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          setRecentPosts(sortedPosts);
        }
      } catch (error) {
        console.error("Error loading recent posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentPosts();
  }, []);
  const features = [
    {
      title: "Java Core Concepts",
      description:
        "Fundamental Java programming concepts, OOP principles, and best practices",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      href: "/java-core",
    },
    {
      title: "Advanced Java",
      description:
        "Collections, Streams, Lambda expressions, Generics, and more",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      href: "/advanced-java",
    },
    {
      title: "DSA Solutions",
      description:
        "Detailed solutions for data structures and algorithm problems",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      href: "/dsa-solutions",
    },
    {
      title: "Algorithm Problems",
      description:
        "Selected problems from LeetCode, HackerRank, and other platforms",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      href: "/algorithm-problems",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#18181b] py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2 animate-pulse-slow"></span>
              New: Java 21 Features Added
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              MasterDSA with <span className="gradient-text">Java</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Welcome to my personal learning space! I'm sharing my Java and DSA
              journey as I learn and grow. Join me in this adventure of
              problem-solving and coding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/java-core"
                className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover-lift"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Java Core Start
              </Link>
              <Link
                href="/dsa-solutions"
                className="btn btn-secondary px-8 py-4 text-lg font-semibold hover-lift"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                DSA Solutions
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div
                className="text-center animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                  50+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Java Courses
                </div>
              </div>
              <div
                className="text-center animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                  100+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  DSA Problems
                </div>
              </div>
              <div
                className="text-center animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
              >
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                  25+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Algorithms
                </div>
              </div>
              <div
                className="text-center animate-fade-in-up"
                style={{ animationDelay: "800ms" }}
              >
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                  10k+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Will You Learn?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Improve your programming skills with comprehensive Java and DSA
              educational content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-[#23272f] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Posts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay up to date with the latest Java and DSA content
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading recent posts...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            <section className="py-16 bg-[#18181b]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Latest Articles
                  </h2>
                  <p className="text-gray-400">
                    Explore our latest Java Core articles and tutorials
                  </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {recentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-[#18181b] rounded-xl shadow-lg border border-gray-700 overflow-hidden hover-lift"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="text-gray-400 mb-4 line-clamp-3">
                            {post.summary}
                          </p>
                        )}
                        <div className="space-y-3">
                          <PostRenderer
                            blocks={post.blocks}
                            maxBlocks={2}
                            isPreview={true}
                          />
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          {(() => {
                            const candidates = [(post as any)?.id].filter(
                              (v) => v != null,
                            );

                            const postId = candidates[0];
                            if (postId != null) {
                              return (
                                <Link
                                  href={`/post/${postId}`}
                                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                >
                                  Read More →
                                </Link>
                              );
                            }
                            return (
                              <span className="text-gray-500 text-sm">
                                Details unavailable
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                No Posts Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Posts will appear here once they are created.
              </p>
            </div>
          )}

          <div
            className="text-center mt-12 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Link
              href="/blog"
              className="btn btn-secondary px-6 py-3 font-semibold hover-lift"
            >
              View All Articles
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Start Your Java and DSA Journey
          </h2>
          <p
            className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Improve your programming skills with step-by-step guides, visual
            explanations, and practical examples.
          </p>
          <Link
            href="/java-core"
            className="btn bg-white text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover-lift animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
}
