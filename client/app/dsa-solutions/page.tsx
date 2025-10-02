"use client";
import Link from "next/link";
import CategoryPosts from "../../components/CategoryPosts";

export default function DSASolutionsPage() {
  const categories = [
    {
      title: "Arrays",
      description: "Array manipulation, searching, and sorting algorithms",
      problems: [
        "Two Sum",
        "Maximum Subarray",
        "Merge Sorted Array",
        "Remove Duplicates",
        "Rotate Array",
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
      color: "from-blue-600 to-blue-700",
      href: "/dsa-solutions/arrays",
    },
    {
      title: "Strings",
      description: "String manipulation and pattern matching",
      problems: [
        "Valid Parentheses",
        "Longest Substring Without Repeating Characters",
        "Valid Palindrome",
        "String to Integer",
        "Longest Common Prefix",
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
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      ),
      color: "from-green-600 to-green-700",
      href: "/dsa-solutions/strings",
    },
    {
      title: "Linked Lists",
      description: "Linked list operations and manipulations",
      problems: [
        "Reverse Linked List",
        "Detect Cycle",
        "Merge Two Sorted Lists",
        "Remove Nth Node From End",
        "Palindrome Linked List",
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      color: "from-purple-600 to-purple-700",
      href: "/dsa-solutions/linked-lists",
    },
    {
      title: "Trees",
      description: "Binary trees, BST, and tree traversals",
      problems: [
        "Maximum Depth of Binary Tree",
        "Validate Binary Search Tree",
        "Invert Binary Tree",
        "Binary Tree Level Order Traversal",
        "Lowest Common Ancestor",
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
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      ),
      color: "from-yellow-600 to-yellow-700",
      href: "/dsa-solutions/trees",
    },
    {
      title: "Graphs",
      description: "Graph algorithms and traversals",
      problems: [
        "Number of Islands",
        "Clone Graph",
        "Course Schedule",
        "Word Ladder",
        "Graph Valid Tree",
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
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
          />
        </svg>
      ),
      color: "from-red-600 to-red-700",
      href: "/dsa-solutions/graphs",
    },
    {
      title: "Dynamic Programming",
      description: "DP problems and optimization techniques",
      problems: [
        "Climbing Stairs",
        "House Robber",
        "Longest Increasing Subsequence",
        "Coin Change",
        "Edit Distance",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "from-indigo-600 to-indigo-700",
      href: "/dsa-solutions/dynamic-programming",
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Data Structures & Algorithms
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              DSA Solutions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Comprehensive solutions to Data Structures and Algorithms problems
              with detailed explanations and Java implementations.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Posts Section */}
      <CategoryPosts category="DSA" title="Latest Solutions" accent="green" />

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Problem Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore DSA problems by category with detailed solutions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className="group block bg-[#23272f] rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}
                    >
                      <div className="text-white">{category.icon}</div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {category.problems.length} problems
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <ul className="space-y-1">
                    {category.problems
                      .slice(0, 3)
                      .map((problem, problemIndex) => (
                        <li
                          key={problemIndex}
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
                          {problem}
                        </li>
                      ))}
                    {category.problems.length > 3 && (
                      <li className="text-sm text-green-400 font-medium">
                        +{category.problems.length - 3} more problems
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
            Ready to Master DSA?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Start solving problems and improve your algorithmic thinking with
            our comprehensive DSA solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dsa-solutions/arrays"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              Start Solving
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
          </div>
        </div>
      </section>
    </div>
  );
}
