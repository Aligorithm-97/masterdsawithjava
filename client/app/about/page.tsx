import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      title: "Comprehensive Content",
      description: "Detailed guides from Java core to advanced topics",
      icon: "📚",
    },
    {
      title: "Practical Examples",
      description: "Working code examples and explanations for each topic",
      icon: "💻",
    },
    {
      title: "Visual Explanations",
      description: "Visualizing complex concepts in an understandable way",
      icon: "🎨",
    },
    {
      title: "DSA Solutions",
      description: "Step-by-step solutions to algorithm problems",
      icon: "🧮",
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hi there! 👋
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              I'm just like you - someone trying to learn Java and DSA. This
              platform is my personal notebook where I share what I've learned
              during my own learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why This Platform?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              I want to share the challenges I faced while learning and how I
              solved them. This isn't a professional educational platform, but a
              friendly knowledge sharing space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#23272f] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Java?</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Platform independence</li>
                <li>• Strong OOP support</li>
                <li>• Rich ecosystem</li>
                <li>• High performance</li>
                <li>• Large community support</li>
              </ul>
            </div>
            <div className="bg-[#23272f] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Learning Approach
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Simple explanations</li>
                <li>• Practical examples</li>
                <li>• Step-by-step solutions</li>
                <li>• Real-world applications</li>
                <li>• Community support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What You'll Find Here
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive learning resources for Java and DSA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center bg-[#18181b] p-6 rounded-xl border border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join me on this learning journey and master Java and DSA together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/java-core"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Start Java Core
            </Link>
            <Link
              href="/dsa-solutions"
              className="border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Explore DSA Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
