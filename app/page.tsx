import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Java Core Concepts',
      description: 'Temel Java programlama kavramları, OOP prensipleri ve best practices',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: '/java-core',
      color: 'from-gray-600 to-gray-700'
    },
    {
      title: 'İleri Seviye Java',
      description: 'Collections, Streams, Lambda expressions, Generics ve daha fazlası',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: '/advanced-java',
      color: 'from-gray-700 to-gray-800'
    },
    {
      title: 'DSA Çözümleri',
      description: 'Veri yapıları ve algoritma problemlerinin detaylı çözümleri',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: '/dsa-solutions',
      color: 'from-gray-800 to-gray-900'
    },
    {
      title: 'Algoritma Soruları',
      description: 'LeetCode, HackerRank ve diğer platformlardan seçilmiş sorular',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      href: '/algorithm-problems',
      color: 'from-gray-900 to-black'
    }
  ];

  const recentPosts = [
    {
      title: 'Java Collections Framework Detaylı Rehber',
      category: 'İleri Java',
      date: '2024-01-15',
      readTime: '8 dk',
      excerpt: 'Java Collections Framework\'ün tüm bileşenlerini detaylı olarak inceleyin.'
    },
    {
      title: 'Two Sum Problemi - Çoklu Çözüm Yaklaşımları',
      category: 'DSA Çözümleri',
      date: '2024-01-12',
      readTime: '12 dk',
      excerpt: 'LeetCode\'un en popüler problemi için farklı algoritma yaklaşımları.'
    },
    {
      title: 'Java Stream API ile Fonksiyonel Programlama',
      category: 'İleri Java',
      date: '2024-01-10',
      readTime: '10 dk',
      excerpt: 'Modern Java programlama teknikleri ve Stream API kullanımı.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#18181b] py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-slow"></span>
              Yeni: Java 21 Özellikleri Eklendi
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Master DSA with{' '}
              <span className="gradient-text">Java</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Java core konseptlerini öğrenin, ileri seviye programlama tekniklerini keşfedin ve 
              DSA problemlerini çözerek algoritma becerilerinizi geliştirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/java-core"
                className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover-lift"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Java Core Başla
              </Link>
              <Link
                href="/dsa-solutions"
                className="btn btn-secondary px-8 py-4 text-lg font-semibold hover-lift"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                DSA Çözümleri
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Java Dersi</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">DSA Problemi</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">25+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Algoritma</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Öğrenci</div>
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
              Neler Öğreneceksiniz?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kapsamlı Java ve DSA eğitim içerikleri ile programlama becerilerinizi geliştirin
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
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Son Yayınlar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              En güncel Java ve DSA içerikleri ile bilgilerinizi taze tutun
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <article
                key={index}
                className="card hover-lift animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-success">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Link
              href="/blog"
              className="btn btn-secondary px-6 py-3 font-semibold hover-lift"
            >
              Tüm yazıları görüntüle
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-700 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Java ve DSA Yolculuğunuza Başlayın
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Adım adım rehberler, görsel anlatımlar ve pratik örneklerle 
            programlama becerilerinizi geliştirin.
          </p>
          <Link
            href="/java-core"
            className="btn bg-white text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover-lift animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Hemen Başla
          </Link>
        </div>
      </section>
    </div>
  );
}
