import Link from "next/link";

export default function AdvancedJavaPage() {
  const topics = [
    {
      title: "Collections Framework",
      description: "List, Set, Map ve Queue implementasyonları",
      lessons: [
        "ArrayList vs LinkedList",
        "HashSet vs TreeSet",
        "HashMap vs TreeMap vs LinkedHashMap",
        "PriorityQueue ve Deque",
        "Collections Utility Methods",
        "Custom Comparator ve Comparable",
      ],
      icon: "📚",
    },
    {
      title: "Stream API",
      description: "Fonksiyonel programlama ve stream operasyonları",
      lessons: [
        "Stream Temelleri",
        "Intermediate Operations (filter, map, sorted)",
        "Terminal Operations (collect, reduce, forEach)",
        "Parallel Streams",
        "Custom Collectors",
        "Stream Best Practices",
      ],
      icon: "🌊",
    },
    {
      title: "Lambda Expressions",
      description: "Fonksiyonel interface'ler ve lambda syntax",
      lessons: [
        "Lambda Expression Syntax",
        "Functional Interfaces",
        "Method References",
        "Built-in Functional Interfaces",
        "Custom Functional Interfaces",
        "Lambda Best Practices",
      ],
      icon: "λ",
    },
    {
      title: "Generics",
      description: "Type-safe generic programlama",
      lessons: [
        "Generic Classes ve Methods",
        "Type Bounds (extends, super)",
        "Wildcards (? extends, ? super)",
        "Generic Constraints",
        "Type Erasure",
        "Generic Best Practices",
      ],
      icon: "<>",
    },
    {
      title: "Concurrency",
      description: "Multi-threading ve concurrent programming",
      lessons: [
        "Thread Creation ve Management",
        "Synchronization (synchronized, volatile)",
        "Concurrent Collections",
        "Executor Framework",
        "CompletableFuture",
        "Thread Safety Patterns",
      ],
      icon: "⚡",
    },
    {
      title: "Reflection",
      description: "Runtime class inspection ve manipulation",
      lessons: [
        "Class ve Method Reflection",
        "Field Access ve Modification",
        "Constructor Invocation",
        "Annotation Processing",
        "Dynamic Proxy",
        "Reflection Performance",
      ],
      icon: "🔍",
    },
    {
      title: "Annotations",
      description: "Custom annotation oluşturma ve processing",
      lessons: [
        "Built-in Annotations",
        "Custom Annotation Creation",
        "Annotation Retention Policies",
        "Annotation Processors",
        "Runtime Annotation Processing",
        "Annotation Best Practices",
      ],
      icon: "@",
    },
    {
      title: "I/O ve NIO",
      description: "Advanced input/output operations",
      lessons: [
        "NIO.2 Path API",
        "Files Utility Class",
        "Asynchronous I/O",
        "Memory-Mapped Files",
        "Channel ve Buffer Operations",
        "I/O Performance Optimization",
      ],
      icon: "📁",
    },
  ];

  return (
    <div className="min-h-screen bg-[#18181b]">
      {/* Header */}
      <section className="bg-[#18181b] shadow-sm border-b border-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              İleri Seviye Java
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Java\'nın gelişmiş özelliklerini öğrenin. Collections, Streams,
              Lambda expressions, Generics ve daha fazlası ile profesyonel Java
              programlama.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-[#23272f] rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-[#23272f]"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3 font-mono">
                      {topic.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {topic.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      İçerik:
                    </h4>
                    <ul className="space-y-2">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/advanced-java/${topic.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                    >
                      Detayları görüntüle
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ön Gereksinimler
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Bu konuları öğrenmek için sahip olmanız gereken temel bilgiler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#23272f] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ✅ Temel Java Bilgisi
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• OOP kavramları (inheritance, polymorphism)</li>
                <li>• Exception handling</li>
                <li>• Basic collections (ArrayList, HashMap)</li>
                <li>• File I/O temelleri</li>
              </ul>
            </div>

            <div className="bg-[#23272f] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ✅ Programlama Deneyimi
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• En az 6 ay Java programlama deneyimi</li>
                <li>• Algoritma ve veri yapıları temelleri</li>
                <li>• IDE kullanım deneyimi</li>
                <li>• Debugging becerileri</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Önerilen Öğrenme Sırası
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              İleri Java konularını öğrenmek için optimal sıralama
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#23272f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  1
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Collections
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Temel veri yapılarını derinlemesine öğrenin
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#23272f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  2
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Lambda & Streams
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Fonksiyonel programlama yaklaşımları
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#23272f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  3
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Generics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Type-safe generic programlama
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#23272f] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  4
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Concurrency
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Multi-threading ve concurrent programming
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            İleri Java Öğrenmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Modern Java programlama tekniklerini öğrenin ve profesyonel seviyeye
            ulaşın
          </p>
          <Link
            href="/advanced-java/collections-framework"
            className="btn bg-white text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl"
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
            İlk Konuya Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
