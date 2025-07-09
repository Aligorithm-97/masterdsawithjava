import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      title: 'Kapsamlı İçerik',
      description: 'Java core\'dan ileri seviye konulara kadar detaylı rehberler',
      icon: '📚'
    },
    {
      title: 'Pratik Örnekler',
      description: 'Her konu için çalışan kod örnekleri ve açıklamalar',
      icon: '💻'
    },
    {
      title: 'Görsel Anlatımlar',
      description: 'Karmaşık kavramları anlaşılır şekilde görselleştirme',
      icon: '🎨'
    },
    {
      title: 'DSA Çözümleri',
      description: 'Algoritma problemlerinin adım adım çözümleri',
      icon: '🧮'
    }
  ];

  const stats = [
    { number: '50+', label: 'Java Konusu' },
    { number: '100+', label: 'DSA Problemi' },
    { number: '200+', label: 'Kod Örneği' },
    { number: '1000+', label: 'Mutlu Öğrenci' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-[#18181b] shadow-sm border-b border-[#23272f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Hakkında
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master DSA with Java, Java programlama ve algoritma problemlerini 
              öğrenmek isteyenler için kapsamlı bir eğitim platformudur.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Java programlama dilini öğrenmek ve algoritma problemlerini çözmek 
                isteyen herkes için kaliteli, anlaşılır ve pratik içerikler sunmak.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Modern yazılım geliştirme dünyasında başarılı olmak için gerekli 
                olan temel programlama becerilerini ve problem çözme yeteneklerini 
                geliştirmenize yardımcı oluyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/java-core"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Java Core Başla
                </Link>
                <Link
                  href="/dsa-solutions"
                  className="border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  DSA Çözümleri
                </Link>
              </div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/20 p-8 rounded-xl">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Neden Java?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>• Platform bağımsızlığı</li>
                <li>• Güçlü OOP desteği</li>
                <li>• Zengin ekosistem</li>
                <li>• Yüksek performans</li>
                <li>• Geniş topluluk desteği</li>
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
              Platform Özellikleri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Size sunduğumuz kapsamlı öğrenme deneyimi
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
              Platform İstatistikleri
            </h2>
            <p className="text-xl text-gray-100">
              Başarılarımız ve büyümemiz
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-100 font-medium">
                  {stat.label}
                </div>
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
              Öğrenme Yolu
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Java ve DSA öğrenme süreciniz için önerilen yol haritası
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🔰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Başlangıç Seviyesi
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Java temelleri</li>
                <li>• OOP kavramları</li>
                <li>• Temel veri yapıları</li>
                <li>• Basit algoritmalar</li>
              </ul>
            </div>
            
            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Orta Seviye
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• İleri Java özellikleri</li>
                <li>• Collections Framework</li>
                <li>• Stream API</li>
                <li>• Orta seviye DSA</li>
              </ul>
            </div>
            
            <div className="bg-[#23272f] p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                İleri Seviye
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Concurrency</li>
                <li>• Design Patterns</li>
                <li>• Karmaşık algoritmalar</li>
                <li>• Sistem tasarımı</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            İletişim
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya geri bildirimleriniz için 
            bizimle iletişime geçebilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@masterdsawithjava.online"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              E-posta Gönder
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