import CategoryPosts from "../../components/CategoryPosts";

export default function DesignPatternsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Design Patterns
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master proven solutions to common software design problems. Learn
            how to write maintainable, scalable, and reusable code.
          </p>
        </div>

        {/* Latest Posts for Design Patterns */}
        <CategoryPosts
          category="Design Patterns"
          title="Latest Design Patterns Articles"
          accent="purple"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Creational Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Creational Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Patterns that deal with object creation mechanisms, trying to
              create objects in a manner suitable to the situation.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-blue-400">• Singleton</div>
              <div className="text-sm text-blue-400">• Factory Method</div>
              <div className="text-sm text-blue-400">• Abstract Factory</div>
              <div className="text-sm text-blue-400">• Builder</div>
              <div className="text-sm text-blue-400">• Prototype</div>
            </div>
          </div>

          {/* Structural Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
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
              Structural Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Patterns that deal with object composition and relationships
              between entities to form larger structures.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-green-400">• Adapter</div>
              <div className="text-sm text-green-400">• Bridge</div>
              <div className="text-sm text-green-400">• Composite</div>
              <div className="text-sm text-green-400">• Decorator</div>
              <div className="text-sm text-green-400">• Facade</div>
            </div>
          </div>

          {/* Behavioral Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Behavioral Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Patterns that focus on communication between objects and the flow
              of control through a system.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-purple-400">• Observer</div>
              <div className="text-sm text-purple-400">• Strategy</div>
              <div className="text-sm text-purple-400">• Command</div>
              <div className="text-sm text-purple-400">• State</div>
              <div className="text-sm text-purple-400">• Template Method</div>
            </div>
          </div>

          {/* Java-Specific Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group">
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Java Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Design patterns specifically implemented in Java with real-world
              examples and best practices.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-yellow-400">
                • Spring Framework Patterns
              </div>
              <div className="text-sm text-yellow-400">• JEE Patterns</div>
              <div className="text-sm text-yellow-400">
                • Concurrency Patterns
              </div>
              <div className="text-sm text-yellow-400">
                • Enterprise Patterns
              </div>
            </div>
          </div>

          {/* Anti-Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 group">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Anti-Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Learn about common mistakes and how to avoid them. Understanding
              what not to do is as important as knowing what to do.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-red-400">• God Object</div>
              <div className="text-sm text-red-400">• Spaghetti Code</div>
              <div className="text-sm text-red-400">
                • Copy-Paste Programming
              </div>
              <div className="text-sm text-red-400">• Golden Hammer</div>
            </div>
          </div>

          {/* Modern Patterns */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Modern Patterns
            </h3>
            <p className="text-gray-300 mb-6">
              Contemporary design patterns for modern software development
              including microservices, cloud, and reactive patterns.
            </p>
            <div className="space-y-2">
              <div className="text-sm text-indigo-400">
                • Microservice Patterns
              </div>
              <div className="text-sm text-indigo-400">• Cloud Patterns</div>
              <div className="text-sm text-indigo-400">• Reactive Patterns</div>
              <div className="text-sm text-indigo-400">• Event Sourcing</div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-8 border border-green-500/30">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Pattern Categories Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">C</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Creational
                </h3>
                <p className="text-gray-300 text-sm">
                  Object creation mechanisms
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">S</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Structural
                </h3>
                <p className="text-gray-300 text-sm">
                  Object composition and relationships
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">B</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Behavioral
                </h3>
                <p className="text-gray-300 text-sm">
                  Communication and control flow
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Master Design Patterns
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Learn to recognize when to apply each pattern and how to implement
              them effectively in your Java applications.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Start Learning Patterns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
