import Link from "next/link";

export default function TwoSumPage() {
  const solutions = [
    {
      title: "Brute Force Yaklaşımı",
      description:
        "İki iç içe döngü kullanarak tüm kombinasyonları kontrol eder",
      complexity: "O(n²)",
      space: "O(1)",
      code: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        
        // Tüm kombinasyonları kontrol et
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        
        return new int[]{-1, -1}; // Çözüm bulunamadı
    }
}`,
      explanation: `
        <h4>Algoritma:</h4>
        <ol>
          <li>İlk döngü ile dizinin her elemanını seç</li>
          <li>İkinci döngü ile seçilen elemandan sonraki tüm elemanları kontrol et</li>
          <li>İki elemanın toplamı hedef değere eşitse indeksleri döndür</li>
        </ol>
        
        <h4>Avantajlar:</h4>
        <ul>
          <li>Basit ve anlaşılır</li>
          <li>Ekstra bellek kullanmaz</li>
        </ul>
        
        <h4>Dezavantajlar:</h4>
        <ul>
          <li>Yavaş - O(n²) zaman karmaşıklığı</li>
          <li>Büyük diziler için verimsiz</li>
        </ul>
      `,
    },
    {
      title: "HashMap Yaklaşımı",
      description: "HashMap kullanarak tek geçişte çözüm bulur",
      complexity: "O(n)",
      space: "O(n)",
      code: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            // Complement değeri daha önce görülmüş mü?
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            // Mevcut elemanı ve indeksini map'e ekle
            map.put(nums[i], i);
        }
        
        return new int[]{-1, -1}; // Çözüm bulunamadı
    }
}`,
      explanation: `
        <h4>Algoritma:</h4>
        <ol>
          <li>HashMap oluştur (eleman değeri → indeks)</li>
          <li>Her eleman için complement değerini hesapla (target - current)</li>
          <li>Complement değeri map'te varsa çözümü buldun</li>
          <li>Yoksa mevcut elemanı map'e ekle</li>
        </ol>
        
        <h4>Avantajlar:</h4>
        <ul>
          <li>Hızlı - O(n) zaman karmaşıklığı</li>
          <li>Tek geçişte çözüm bulur</li>
          <li>Pratikte en çok kullanılan yaklaşım</li>
        </ul>
        
        <h4>Dezavantajlar:</h4>
        <ul>
          <li>O(n) ekstra bellek kullanır</li>
          <li>HashMap overhead'i</li>
        </ul>
      `,
    },
    {
      title: "İki Pointer Yaklaşımı (Sıralı Dizi)",
      description: "Dizi sıralıysa iki pointer kullanarak çözüm bulur",
      complexity: "O(n log n)",
      space: "O(1)",
      code: `import java.util.Arrays;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Orijinal indeksleri korumak için
        int[][] indexedNums = new int[nums.length][2];
        for (int i = 0; i < nums.length; i++) {
            indexedNums[i][0] = nums[i];
            indexedNums[i][1] = i;
        }
        
        // Değerlere göre sırala
        Arrays.sort(indexedNums, (a, b) -> Integer.compare(a[0], b[0]));
        
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int sum = indexedNums[left][0] + indexedNums[right][0];
            
            if (sum == target) {
                return new int[]{indexedNums[left][1], indexedNums[right][1]};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return new int[]{-1, -1};
    }
}`,
      explanation: `
        <h4>Algoritma:</h4>
        <ol>
          <li>Diziyi değerlere göre sırala (indeksleri koru)</li>
          <li>Sol pointer başta, sağ pointer sonda</li>
          <li>İki pointer'ın değerlerini topla</li>
          <li>Toplam hedeften küçükse sol pointer'ı artır</li>
          <li>Toplam hedeften büyükse sağ pointer'ı azalt</li>
        </ol>
        
        <h4>Avantajlar:</h4>
        <ul>
          <li>Sabit ekstra bellek kullanır</li>
          <li>Elegant çözüm</li>
          <li>3Sum, 4Sum gibi problemlerde genişletilebilir</li>
        </ul>
        
        <h4>Dezavantajlar:</h4>
        <ul>
          <li>Diziyi sıralamak gerekir</li>
          <li>Orijinal indeksleri korumak karmaşık</li>
          <li>HashMap yaklaşımından daha yavaş</li>
        </ul>
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link
                href="/dsa-solutions"
                className="hover:text-gray-600 dark:hover:text-gray-400"
              >
                DSA Çözümleri
              </Link>
              <span className="mx-2">→</span>
              <Link
                href="/dsa-solutions/array-problems"
                className="hover:text-gray-600 dark:hover:text-gray-400"
              >
                Array Problems
              </Link>
              <span className="mx-2">→</span>
              <span className="text-gray-900 dark:text-white">Two Sum</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Two Sum Problemi
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              LeetCode #1 - Verilen bir dizide toplamı hedef değere eşit olan
              iki elemanın indekslerini bulun.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Description */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Problem Açıklaması
              </h2>
            </div>
            <div className="p-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3>Problem:</h3>
                <p>
                  Verilen bir tamsayı dizisi <code>nums</code> ve bir hedef
                  değer <code>target</code> için, dizide toplamı hedef değere
                  eşit olan iki elemanın indekslerini döndürün.
                </p>

                <h3>Giriş Formatı:</h3>
                <ul>
                  <li>
                    <code>nums</code>: Tamsayı dizisi (2 ≤ nums.length ≤ 10⁴)
                  </li>
                  <li>
                    <code>target</code>: Hedef toplam değeri
                  </li>
                </ul>

                <h3>Çıkış Formatı:</h3>
                <ul>
                  <li>İki elemanın indekslerini içeren dizi</li>
                  <li>
                    Her giriş için tam olarak bir çözüm olduğu garanti edilir
                  </li>
                </ul>

                <h3>Örnek:</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                  <p>
                    <strong>Giriş:</strong> nums = [2, 7, 11, 15], target = 9
                  </p>
                  <p>
                    <strong>Çıkış:</strong> [0, 1]
                  </p>
                  <p>
                    <strong>Açıklama:</strong> nums[0] + nums[1] = 2 + 7 = 9
                  </p>
                </div>

                <h3>Kısıtlamalar:</h3>
                <ul>
                  <li>2 ≤ nums.length ≤ 10⁴</li>
                  <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                  <li>-10⁹ ≤ target ≤ 10⁹</li>
                  <li>Sadece bir geçerli çözüm vardır</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Çözüm Yaklaşımları
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Farklı algoritma yaklaşımları ve optimizasyon teknikleri
            </p>
          </div>

          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-600"
              >
                <div className="bg-gray-100 dark:bg-gray-900/30 p-6 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">
                      {index + 1}. {solution.title}
                    </h3>
                    <div className="flex gap-4 text-sm">
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                        Zaman: {solution.complexity}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                        Bellek: {solution.space}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {solution.description}
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Java Kodu:
                      </h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{solution.code}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Açıklama:
                      </h4>
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: solution.explanation,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complexity Analysis */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Karmaşıklık Analizi
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border px-4 py-2 text-left">Yaklaşım</th>
                      <th className="border px-4 py-2 text-left">
                        Zaman Karmaşıklığı
                      </th>
                      <th className="border px-4 py-2 text-left">
                        Bellek Karmaşıklığı
                      </th>
                      <th className="border px-4 py-2 text-left">Önerilen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Brute Force</td>
                      <td className="border px-4 py-2">O(n²)</td>
                      <td className="border px-4 py-2">O(1)</td>
                      <td className="border px-4 py-2">❌</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">HashMap</td>
                      <td className="border px-4 py-2">O(n)</td>
                      <td className="border px-4 py-2">O(n)</td>
                      <td className="border px-4 py-2">✅</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Two Pointer</td>
                      <td className="border px-4 py-2">O(n log n)</td>
                      <td className="border px-4 py-2">O(1)</td>
                      <td className="border px-4 py-2">⚠️</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/dsa-solutions/array-problems"
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Array Problems
            </Link>
            <Link
              href="/dsa-solutions/array-problems/maximum-subarray"
              className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
            >
              Sonraki: Maximum Subarray
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
      </section>
    </div>
  );
}
