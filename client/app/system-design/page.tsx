import CategoryPosts from "../../components/CategoryPosts";

export default function SystemDesignPage() {
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              System Design
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              System Design
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Learn how to design scalable, distributed systems and understand
              the principles behind building large-scale applications.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts for System Design */}
      <CategoryPosts
        category="System Design"
        title="Latest System Design Articles"
        accent="yellow"
      />

      {/* Topics Grid */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              System Design Topics
            </h2>
            <p className="text-xl text-gray-400">
              Explore key areas of system design and architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Scalability */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-blue-400"
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
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Scalability
              </h3>
              <p className="text-gray-300 mb-6">
                Learn horizontal and vertical scaling strategies, load
                balancing, and how to handle increasing user loads.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-blue-400">• Load Balancing</div>
                <div className="text-sm text-blue-400">• Auto Scaling</div>
                <div className="text-sm text-blue-400">• Database Sharding</div>
              </div>
            </div>

            {/* Distributed Systems */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-green-400"
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
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Distributed Systems
              </h3>
              <p className="text-gray-300 mb-6">
                Understand microservices architecture, service communication,
                and distributed system challenges.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-green-400">• Microservices</div>
                <div className="text-sm text-green-400">• Service Mesh</div>
                <div className="text-sm text-green-400">
                  • Event-Driven Architecture
                </div>
              </div>
            </div>

            {/* Database Design */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Database Design
              </h3>
              <p className="text-gray-300 mb-6">
                Master database scaling, replication, caching strategies, and
                choosing the right database for your needs.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-purple-400">
                  • Database Replication
                </div>
                <div className="text-sm text-purple-400">
                  • Caching Strategies
                </div>
                <div className="text-sm text-purple-400">• NoSQL vs SQL</div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-yellow-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-yellow-400"
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
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Performance
              </h3>
              <p className="text-gray-300 mb-6">
                Learn optimization techniques, monitoring, and how to identify
                and resolve performance bottlenecks.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-yellow-400">
                  • Performance Monitoring
                </div>
                <div className="text-sm text-yellow-400">
                  • CDN Implementation
                </div>
                <div className="text-sm text-yellow-400">
                  • Memory Management
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Security</h3>
              <p className="text-gray-300 mb-6">
                Implement security best practices, authentication,
                authorization, and protect against common vulnerabilities.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-red-400">
                  • Authentication & Authorization
                </div>
                <div className="text-sm text-red-400">• API Security</div>
                <div className="text-sm text-red-400">• Data Encryption</div>
              </div>
            </div>

            {/* Real-world Examples */}
            <div className="bg-[#18181b] rounded-xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600/30 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Case Studies
              </h3>
              <p className="text-gray-300 mb-6">
                Study real-world system designs from companies like Netflix,
                Uber, Twitter, and learn from their architectures.
              </p>
              <div className="space-y-2">
                <div className="text-sm text-indigo-400">
                  • Netflix Architecture
                </div>
                <div className="text-sm text-indigo-400">
                  • Uber's Microservices
                </div>
                <div className="text-sm text-indigo-400">
                  • Twitter's Timeline
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Design Systems?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Start with the fundamentals and work your way up to designing
            complex, scalable systems that can handle millions of users.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Start Learning
          </button>
        </div>
      </section>
    </div>
  );
}
