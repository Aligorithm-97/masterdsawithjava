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

  const stats = [
    { number: "50+", label: "Java Topics" },
    { number: "100+", label: "DSA Problems" },
    { number: "200+", label: "Code Examples" },
    { number: "1000+", label: "Happy Students" },
  ];

  return (
    <div className="min-h-screen bg-[#18181b] pt-16">
      {/* Header */}
      <section className="bg-[#18181b] shadow-sm border-b border-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master DSA with Java is a comprehensive learning platform for
              those who want to learn Java programming and algorithm problems.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To provide high-quality, clear, and practical content for
                everyone who wants to learn Java programming and solve algorithm
                problems.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We help you develop the essential programming skills and
                problem-solving abilities needed to succeed in the modern
                software development world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/java-core"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Start Java Core
                </Link>
                <Link
                  href="/dsa-solutions"
                  className="border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  DSA Solutions
                </Link>
              </div>
            </div>
            <div className="bg-[#23272f] p-8 rounded-xl">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why Java?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>• Platform independence</li>
                <li>• Strong OOP support</li>
                <li>• Rich ecosystem</li>
                <li>• High performance</li>
                <li>• Large community support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The comprehensive learning experience we offer you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center bg-[#23272f] p-6 rounded-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-gray-100">Our achievements and growth</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The recommended roadmap for your Java and DSA learning process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🔰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Beginner Level
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Java fundamentals</li>
                <li>• OOP concepts</li>
                <li>• Basic data structures</li>
                <li>• Simple algorithms</li>
              </ul>
            </div>

            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Intermediate Level
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Advanced Java features</li>
                <li>• Collections Framework</li>
                <li>• Stream API</li>
                <li>• Intermediate DSA</li>
              </ul>
            </div>

            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Advanced Level
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Algorithm techniques</li>
                <li>• Hard DSA problems</li>
                <li>• System design</li>
                <li>• Interview preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            You can contact us for your questions, suggestions, or feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@masterdsawithjava.online"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Send Email
            </a>
            <a
              href="https://github.com/masterdsawithjava"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
