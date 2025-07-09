import Link from 'next/link';

export default function AlgorithmProblemsPage() {
  const platforms = [
    {
      name: 'LeetCode',
      description: 'En popüler algoritma problem platformu',
      problems: [
        { title: 'Two Sum', difficulty: 'Easy', category: 'Array', solved: true },
        { title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', solved: true },
        { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'String', solved: false },
        { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Array', solved: false },
        { title: 'Regular Expression Matching', difficulty: 'Hard', category: 'String', solved: false }
      ],
      icon: '🔥',
      color: 'bg-orange-500'
    },
    {
      name: 'HackerRank',
      description: 'Algoritma ve veri yapıları problemleri',
      problems: [
        { title: 'Arrays - DS', difficulty: 'Easy', category: 'Array', solved: true },
        { title: '2D Array - DS', difficulty: 'Easy', category: 'Array', solved: true },
        { title: 'Dynamic Array', difficulty: 'Easy', category: 'Array', solved: false },
        { title: 'Left Rotation', difficulty: 'Easy', category: 'Array', solved: false },
        { title: 'Sparse Arrays', difficulty: 'Medium', category: 'String', solved: false }
      ],
      icon: '💻',
      color: 'bg-green-500'
    },
    {
      name: 'CodeForces',
      description: 'Competitive programming problemleri',
      problems: [
        { title: 'Watermelon', difficulty: 'Easy', category: 'Math', solved: true },
        { title: 'Way Too Long Words', difficulty: 'Easy', category: 'String', solved: true },
        { title: 'Team', difficulty: 'Easy', category: 'Implementation', solved: false },
        { title: 'Beautiful Matrix', difficulty: 'Easy', category: 'Implementation', solved: false },
        { title: 'Petya and Strings', difficulty: 'Easy', category: 'String', solved: false }
      ],
      icon: '⚔️',
      color: 'bg-gray-700'
    }
  ];

  const categories = [
    { name: 'Array', count: 25, icon: '📊' },
    { name: 'String', count: 20, icon: '🔤' },
    { name: 'Linked List', count: 15, icon: '🔗' },
    { name: 'Tree', count: 18, icon: '🌳' },
    { name: 'Graph', count: 12, icon: '🕸️' },
    { name: 'Dynamic Programming', count: 22, icon: '🧮' },
    { name: 'Greedy', count: 10, icon: '🎯' },
    { name: 'Backtracking', count: 8, icon: '🔄' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Algoritma Soruları
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              LeetCode, HackerRank ve CodeForces\'tan seçilmiş problemler. 
              Her problem için detaylı çözüm ve açıklamalar.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Platform İstatistikleri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Çözülen problem sayıları ve başarı oranları
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className={`${platform.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{platform.icon}</span>
                    <h3 className="text-xl font-semibold">{platform.name}</h3>
                  </div>
                  <p className="mt-2 opacity-90">{platform.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {platform.problems.map((problem, problemIndex) => (
                      <div
                        key={problemIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {problem.title}
                          </h4>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {problem.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {problem.solved && (
                            <span className="text-green-500">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                          <Link
                            href={`/algorithm-problems/${platform.name.toLowerCase()}/${problem.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium text-sm"
                          >
                            Çözüm
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/algorithm-problems/${platform.name.toLowerCase()}`}
                      className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
                    >
                      Tüm {platform.name} problemleri
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Problem Kategorileri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Farklı algoritma kategorilerinde problemler
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/algorithm-problems/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {category.count} problem
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              İlerleme Takibi
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Çözülen problemlerinizi takip edin ve hedeflerinizi belirleyin
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">45</div>
                <div className="text-gray-600 dark:text-gray-300">Toplam Çözülen</div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">23</div>
                <div className="text-gray-600 dark:text-gray-300">Easy Çözülen</div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">18</div>
                <div className="text-gray-600 dark:text-gray-300">Medium Çözülen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Algoritma Problemlerini Çözmeye Başlayın
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Farklı zorluk seviyelerinde problemlerle algoritma becerilerinizi 
            geliştirin ve yazılım mülakatlarına hazırlanın.
          </p>
          <Link
            href="/algorithm-problems/leetcode/two-sum"
            className="bg-white text-gray-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            İlk Problemi Çöz
          </Link>
        </div>
      </section>
    </div>
  );
} 