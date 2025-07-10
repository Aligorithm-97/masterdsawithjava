import Link from "next/link";

export default function DSASolutionsPage() {
  const categories = [
    {
      title: "Array Problems",
      description: "Array problems and solution approaches",
      problems: [
        { title: "Two Sum", difficulty: "Easy", solutions: 3 },
        { title: "Maximum Subarray", difficulty: "Medium", solutions: 2 },
        {
          title: "Container With Most Water",
          difficulty: "Medium",
          solutions: 2,
        },
        { title: "3Sum", difficulty: "Medium", solutions: 2 },
        { title: "Trapping Rain Water", difficulty: "Hard", solutions: 3 },
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
      color: "from-gray-600 to-gray-700",
      href: "/dsa-solutions/array-problems",
    },
    {
      title: "String Problems",
      description: "String manipulation and algorithm problems",
      problems: [
        { title: "Valid Parentheses", difficulty: "Easy", solutions: 2 },
        {
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          solutions: 2,
        },
        {
          title: "Longest Palindromic Substring",
          difficulty: "Medium",
          solutions: 3,
        },
        {
          title: "Regular Expression Matching",
          difficulty: "Hard",
          solutions: 2,
        },
        { title: "Minimum Window Substring", difficulty: "Hard", solutions: 2 },
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
      color: "from-gray-700 to-gray-800",
      href: "/dsa-solutions/string-problems",
    },
    {
      title: "Linked List",
      description: "Linked list problems and solutions",
      problems: [
        { title: "Reverse Linked List", difficulty: "Easy", solutions: 2 },
        {
          title: "Detect Cycle in Linked List",
          difficulty: "Medium",
          solutions: 2,
        },
        { title: "Merge Two Sorted Lists", difficulty: "Easy", solutions: 2 },
        {
          title: "Remove Nth Node From End",
          difficulty: "Medium",
          solutions: 2,
        },
        { title: "Reorder List", difficulty: "Medium", solutions: 2 },
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
      color: "from-gray-800 to-gray-900",
      href: "/dsa-solutions/linked-list",
    },
    {
      title: "Tree Problems",
      description: "Tree data structure problems",
      problems: [
        {
          title: "Binary Tree Inorder Traversal",
          difficulty: "Easy",
          solutions: 3,
        },
        {
          title: "Maximum Depth of Binary Tree",
          difficulty: "Easy",
          solutions: 2,
        },
        {
          title: "Validate Binary Search Tree",
          difficulty: "Medium",
          solutions: 2,
        },
        { title: "Lowest Common Ancestor", difficulty: "Medium", solutions: 2 },
        {
          title: "Serialize and Deserialize Binary Tree",
          difficulty: "Hard",
          solutions: 2,
        },
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      color: "from-gray-900 to-black",
      href: "/dsa-solutions/tree-problems",
    },
    {
      title: "Dynamic Programming",
      description: "Dynamic programming problems",
      problems: [
        { title: "Climbing Stairs", difficulty: "Easy", solutions: 2 },
        { title: "House Robber", difficulty: "Medium", solutions: 2 },
        {
          title: "Longest Increasing Subsequence",
          difficulty: "Medium",
          solutions: 2,
        },
        { title: "Coin Change", difficulty: "Medium", solutions: 2 },
        { title: "Edit Distance", difficulty: "Hard", solutions: 2 },
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
      color: "from-black to-gray-900",
      href: "/dsa-solutions/dynamic-programming",
    },
    {
      title: "Graph Problems",
      description: "Graph algorithms and problems",
      problems: [
        { title: "Number of Islands", difficulty: "Medium", solutions: 2 },
        { title: "Course Schedule", difficulty: "Medium", solutions: 2 },
        { title: "Word Ladder", difficulty: "Hard", solutions: 2 },
        { title: "Alien Dictionary", difficulty: "Hard", solutions: 2 },
        { title: "Redundant Connection", difficulty: "Medium", solutions: 2 },
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
      color: "from-gray-500 to-gray-600",
      href: "/dsa-solutions/graph-problems",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    return "badge-error"; // badge-error artık gri olacak
  };

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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              DSA Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              DSA Solutions
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Detailed solutions for data structures and algorithm problems. Different approaches and optimization techniques for each problem.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Problem Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Problems organized by different data structures and algorithm types
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="card hover-lift animate-fade-in-up bg-[#23272f]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 bg-[#23272f] rounded-2xl flex items-center justify-center text-white mr-4`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {category.problems.map((problem, problemIndex) => (
                    <div
                      key={problemIndex}
                      className="flex items-center justify-between p-4 bg-[#23272f] rounded-xl hover:bg-[#2a2f38] transition-all duration-200 group"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                          {problem.title}
                        </h4>
                        <div className="flex items-center mt-2">
                          <span
                            className={`badge ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {problem.solutions} solutions
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/dsa-solutions/${category.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}/${problem.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm flex items-center group-hover:translate-x-1 transition-all duration-200"
                      >
                        View Solution
                        <svg
                          className="ml-1 w-4 h-4"
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
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={category.href}
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors duration-200"
                  >
                    All {category.title} Problems
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
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Recommended order to start solving DSA problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div
              className="text-center group animate-fade-in-up bg-[#23272f]"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-20 h-20 bg-[#23272f] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Fundamental Algorithms
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Sorting, searching and fundamental data structures
              </p>
            </div>

            <div
              className="text-center group animate-fade-in-up bg-[#23272f]"
              style={{ animationDelay: "400ms" }}
            >
              <div className="w-20 h-20 bg-[#23272f] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Data Structures
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Arrays, linked lists, trees and graphs
              </p>
            </div>

            <div
              className="text-center group animate-fade-in-up bg-[#23272f]"
              style={{ animationDelay: "600ms" }}
            >
              <div className="w-20 h-20 bg-[#23272f] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Algorithm Techniques
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Two pointers, sliding window, DP
              </p>
            </div>

            <div
              className="text-center group animate-fade-in-up bg-[#23272f]"
              style={{ animationDelay: "800ms" }}
            >
              <div className="w-20 h-20 bg-[#23272f] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Advanced Topics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Graph algorithms and advanced DP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Start Solving DSA Problems
          </h2>
          <p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Start solving your first problem and improve your algorithm skills
          </p>
          <Link
            href="/dsa-solutions/array-problems/two-sum"
            className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover-lift animate-fade-in-up"
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
            Solve First Problem
          </Link>
        </div>
      </section>
    </div>
  );
}
