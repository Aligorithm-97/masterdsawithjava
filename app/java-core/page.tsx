import Link from "next/link";

export default function JavaCorePage() {
  const topics = [
    {
      title: "Java Temelleri",
      description: "Değişkenler, veri tipleri, operatörler ve temel syntax",
      lessons: [
        "Java'ya Giriş ve Kurulum",
        "Değişkenler ve Veri Tipleri",
        "Operatörler ve İfadeler",
        "Kontrol Yapıları (if, else, switch)",
        "Döngüler (for, while, do-while)",
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
      href: "/java-core/java-temelleri",
    },
    {
      title: "Nesne Yönelimli Programlama",
      description: "Sınıflar, nesneler, kalıtım, polimorfizm ve encapsulation",
      lessons: [
        "Sınıflar ve Nesneler",
        "Constructor ve Method Overloading",
        "Inheritance (Kalıtım)",
        "Polymorphism (Çok Biçimlilik)",
        "Encapsulation ve Access Modifiers",
        "Abstract Classes ve Interfaces",
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
      description: "Hata yönetimi ve exception handling mekanizmaları",
      lessons: [
        "Exception Handling Temelleri",
        "Try-Catch Blokları",
        "Finally ve Try-with-Resources",
        "Custom Exception Oluşturma",
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
      title: "String ve StringBuilder",
      description: "String işlemleri ve performans optimizasyonu",
      lessons: [
        "String Sınıfı ve Metodları",
        "StringBuilder ve StringBuffer",
        "String Pool ve Immutability",
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
      title: "Arrays ve Collections",
      description: "Diziler ve temel collection sınıfları",
      lessons: [
        "Arrays (Diziler)",
        "ArrayList ve LinkedList",
        "HashSet ve TreeSet",
        "HashMap ve TreeMap",
        "Collections Utility Sınıfı",
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
      description: "Dosya okuma, yazma ve I/O işlemleri",
      lessons: [
        "File Sınıfı",
        "FileReader ve FileWriter",
        "BufferedReader ve BufferedWriter",
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
            <p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Java programlama dilinin temel kavramlarını öğrenin. OOP
              prensiplerinden exception handling\'e kadar kapsamlı bir rehber.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Öğrenme Yolculuğu
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Java\'yı adım adım öğrenin ve her konuyu detaylı olarak inceleyin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <Link
                key={index}
                href={topic.href}
                className="group card hover-lift animate-fade-in-up bg-[#23272f]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-[#23272f] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {topic.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {topic.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {topic.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                    İçerik:
                  </h4>
                  <ul className="space-y-2">
                    {topic.lessons.map((lesson, lessonIndex) => (
                      <li
                        key={lessonIndex}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span className="leading-relaxed">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="inline-flex items-center text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                    Detayları görüntüle
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Hızlı Başlangıç
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Java öğrenmeye başlamak için temel adımlar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center group animate-fade-in-up bg-[#23272f]"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-20 h-20 bg-[#23272f] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                JDK Kurulumu
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Java Development Kit\'i indirin ve sisteminize kurun
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
                IDE Seçimi
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                IntelliJ IDEA, Eclipse veya VS Code gibi bir IDE seçin
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
                İlk Program
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "Hello World" programı ile Java\'ya başlayın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Java Öğrenmeye Hazır mısınız?
          </h2>
          <p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            İlk adımı atın ve Java programlama yolculuğunuza başlayın
          </p>
          <Link
            href="/java-core/java-temelleri"
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
            İlk Derse Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
