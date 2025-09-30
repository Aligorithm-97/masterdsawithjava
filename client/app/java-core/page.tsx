"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import PostRenderer from "../../components/PostRenderer";
import { Post } from "../../lib/types";
import { getAccessToken } from "../../utils/GetTokenFromCookie";

export default function JavaCorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const POSTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);

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
    loadPosts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const loadPosts = async (page = 1, search = "") => {
    try {
      const params = new URLSearchParams({
        category: "Java",
      });
      const apiBaseUrl = process.env.GO_API || "http://localhost:8090";
      const token = getAccessToken();
      const response = await fetch(`${apiBaseUrl}/posts/Java`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = await response.json();

      if (response.ok) {
        // Normalize response to a common shape
        const rawItems: any[] = Array.isArray(payload)
          ? payload
          : payload?.data || payload?.items || payload?.content || [];

        const total: number = Array.isArray(payload)
          ? rawItems.length
          : (payload?.totalElements ??
            payload?.totalItems ??
            payload?.total ??
            rawItems.length);

        // Normalize and parse each post
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
        setTotalPosts(total);
      } else {
        console.error("Error loading posts:", payload?.error ?? payload);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Posts loaded:", posts);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const topics = [
    {
      title: "Java Fundamentals",
      description: "Variables, data types, operators, and basic syntax",
      lessons: [
        "Introduction to Java and Setup",
        "Variables and Data Types",
        "Operators and Expressions",
        "Control Structures (if, else, switch)",
        "Loops (for, while, do-while)",
      ],
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
      color: "from-gray-600 to-gray-700",
      href: "/java-core/java-fundamentals",
    },
    {
      title: "Object-Oriented Programming",
      description:
        "Classes, objects, inheritance, polymorphism, and encapsulation",
      lessons: [
        "Classes and Objects",
        "Constructor and Method Overloading",
        "Inheritance",
        "Polymorphism",
        "Encapsulation and Access Modifiers",
        "Abstract Classes and Interfaces",
      ],
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: "from-gray-700 to-gray-800",
      href: "/java-core/nesne-yonelimli-programlama",
    },
    {
      title: "Exception Handling",
      description: "Error management and exception handling mechanisms",
      lessons: [
        "Exception Handling Basics",
        "Try-Catch Blocks",
        "Finally and Try-with-Resources",
        "Creating Custom Exceptions",
        "Exception Hierarchy",
      ],
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
      color: "from-gray-800 to-gray-900",
      href: "/java-core/exception-handling",
    },
    {
      title: "String and StringBuilder",
      description: "String operations and performance optimization",
      lessons: [
        "String Class and Methods",
        "StringBuilder and StringBuffer",
        "String Pool and Immutability",
        "String Formatting",
        "Regular Expressions",
      ],
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
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
      color: "from-gray-900 to-black",
      href: "/java-core/string-ve-stringbuilder",
    },
    {
      title: "Arrays and Collections",
      description: "Arrays and basic collection classes",
      lessons: [
        "Arrays",
        "ArrayList and LinkedList",
        "HashSet and TreeSet",
        "HashMap and TreeMap",
        "Collections Utility Class",
      ],
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: "from-black to-gray-900",
      href: "/java-core/arrays-ve-collections",
    },
    {
      title: "File I/O",
      description: "File reading, writing, and I/O operations",
      lessons: [
        "File Class",
        "FileReader and FileWriter",
        "BufferedReader and BufferedWriter",
        "Serialization",
        "NIO.2 API",
      ],
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "from-gray-500 to-gray-600",
      href: "/java-core/file-io",
    },
  ];

  return (
    <div className="min-h-screen bg-[#18181b] pt-16">
      {/* Header */}
      <section className="bg-[#18181b] shadow-sm border-b border-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium mb-6">
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
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Java Core Concepts
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Java Core Concepts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Master the fundamental concepts of Java programming language. From
              basic syntax to advanced object-oriented programming principles.
            </p>
          </div>
        </div>
      </section>

      {/* Arama kutusu */}
      <div className="mb-8 flex items-center gap-2 justify-center px-6 py-4 mx-6 my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title or summary..."
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="ml-2 text-gray-400 hover:text-red-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dynamic Posts Section */}
      {loading ? (
        <section className="py-16 bg-[#23272f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading Java articles...</p>
            </div>
          </div>
        </section>
      ) : posts.length > 0 ? (
        <section className="py-16 bg-[#23272f]">
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
              {posts.map((post) => (
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
                      {/*Yarın burdan devam postbyid falan*/}

                      {(() => {
                        const candidates = [(post as any)?.id].filter(
                          (v) => v != null,
                        );

                        const postId = candidates[0];
                        console.log(postId);
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
        <section className="py-16 bg-[#23272f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                No Java Articles Yet
              </h2>
              <p className="text-gray-400 mb-8">
                Java articles will appear here once they are created.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } font-semibold`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Topics Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Follow our structured learning path to master Java Core concepts
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group block bg-[#23272f] rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${topic.color}`}
                    >
                      <div className="text-white">{topic.icon}</div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {topic.lessons.length} lessons
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {topic.description}
                  </p>
                  <ul className="space-y-1">
                    {topic.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                      <li
                        key={lessonIndex}
                        className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {lesson}
                      </li>
                    ))}
                    {topic.lessons.length > 3 && (
                      <li className="text-sm text-blue-400 font-medium">
                        +{topic.lessons.length - 3} more lessons
                      </li>
                    )}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Java?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Start your journey with Java Core concepts and build a strong
            foundation for advanced programming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/java-core/java-fundamentals"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Start Learning
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/dsa-solutions"
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              Explore DSA Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
