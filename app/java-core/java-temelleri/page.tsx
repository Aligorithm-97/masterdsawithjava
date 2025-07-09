import Link from "next/link";

export default function JavaTemelleriPage() {
  const lessons = [
    {
      title: "Java'ya Giriş ve Kurulum",
      content: `
        <h3>Java Nedir?</h3>
        <p>Java, Sun Microsystems tarafından 1995 yılında geliştirilen, platform bağımsız, nesne yönelimli bir programlama dilidir.</p>
        
        <h4>Java\'nın Özellikleri:</h4>
        <ul>
          <li><strong>Platform Bağımsızlığı:</strong> "Write Once, Run Anywhere" prensibi</li>
          <li><strong>Nesne Yönelimli:</strong> OOP prensiplerini destekler</li>
          <li><strong>Güvenli:</strong> Memory management ve type safety</li>
          <li><strong>Çok İş Parçacıklı:</strong> Concurrent programming desteği</li>
        </ul>

        <h4>JDK Kurulumu:</h4>
        <ol>
          <li>Oracle JDK\'yı <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">resmi siteden</a> indirin</li>
          <li>İşletim sisteminize uygun versiyonu seçin</li>
          <li>Kurulum dosyasını çalıştırın</li>
          <li>PATH değişkenini ayarlayın</li>
        </ol>

        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <h5>Kurulum Kontrolü:</h5>
          <pre><code>java -version
javac -version</code></pre>
        </div>
      `,
    },
    {
      title: "Değişkenler ve Veri Tipleri",
      content: `
        <h3>Java\'da Veri Tipleri</h3>
        
        <h4>Primitive Veri Tipleri:</h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 dark:border-gray-600">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border px-4 py-2">Veri Tipi</th>
                <th class="border px-4 py-2">Boyut</th>
                <th class="border px-4 py-2">Değer Aralığı</th>
                <th class="border px-4 py-2">Varsayılan Değer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border px-4 py-2">byte</td>
                <td class="border px-4 py-2">8 bit</td>
                <td class="border px-4 py-2">-128 to 127</td>
                <td class="border px-4 py-2">0</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">short</td>
                <td class="border px-4 py-2">16 bit</td>
                <td class="border px-4 py-2">-32,768 to 32,767</td>
                <td class="border px-4 py-2">0</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">int</td>
                <td class="border px-4 py-2">32 bit</td>
                <td class="border px-4 py-2">-2^31 to 2^31-1</td>
                <td class="border px-4 py-2">0</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">long</td>
                <td class="border px-4 py-2">64 bit</td>
                <td class="border px-4 py-2">-2^63 to 2^63-1</td>
                <td class="border px-4 py-2">0L</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">float</td>
                <td class="border px-4 py-2">32 bit</td>
                <td class="border px-4 py-2">IEEE 754</td>
                <td class="border px-4 py-2">0.0f</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">double</td>
                <td class="border px-4 py-2">64 bit</td>
                <td class="border px-4 py-2">IEEE 754</td>
                <td class="border px-4 py-2">0.0d</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">boolean</td>
                <td class="border px-4 py-2">1 bit</td>
                <td class="border px-4 py-2">true/false</td>
                <td class="border px-4 py-2">false</td>
              </tr>
              <tr>
                <td class="border px-4 py-2">char</td>
                <td class="border px-4 py-2">16 bit</td>
                <td class="border px-4 py-2">\\u0000 to \\uffff</td>
                <td class="border px-4 py-2">\\u0000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4>Değişken Tanımlama:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// Değişken tanımlama
int sayi = 10;
String metin = "Merhaba Java";
double ondalik = 3.14;
boolean dogruMu = true;

// Final (sabit) değişken
final int SABIT_SAYI = 100;

// Var keyword (Java 10+)
var otomatikTip = "Bu bir String";
var sayi2 = 42; // int olarak algılanır</code></pre>
        </div>
      `,
    },
    {
      title: "Operatörler ve İfadeler",
      content: `
        <h3>Java Operatörleri</h3>
        
        <h4>Aritmetik Operatörler:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int a = 10, b = 3;

// Toplama
int toplam = a + b; // 13

// Çıkarma
int fark = a - b; // 7

// Çarpma
int carpim = a * b; // 30

// Bölme
int bolum = a / b; // 3 (tam sayı bölme)

// Mod (kalan)
int kalan = a % b; // 1

// Artırma/Azaltma
a++; // a = a + 1
b--; // b = b - 1

// Ön artırma/azaltma
++a; // Önce artır, sonra kullan
--b; // Önce azalt, sonra kullan</code></pre>
        </div>

        <h4>Karşılaştırma Operatörleri:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int x = 5, y = 10;

boolean esitMi = (x == y);      // false
boolean esitDegilMi = (x != y); // true
boolean buyukMu = (x > y);      // false
boolean kucukMu = (x < y);      // true
boolean buyukEsit = (x >= y);   // false
boolean kucukEsit = (x <= y);   // true</code></pre>
        </div>

        <h4>Mantıksal Operatörler:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>boolean a = true, b = false;

// VE (AND)
boolean ve = a && b; // false

// VEYA (OR)
boolean veya = a || b; // true

// DEĞİL (NOT)
boolean degil = !a; // false

// Kısa devre operatörleri
boolean kisaDevre = (a && b); // b kontrol edilmez</code></pre>
        </div>
      `,
    },
    {
      title: "Kontrol Yapıları (if, else, switch)",
      content: `
        <h3>Kontrol Yapıları</h3>
        
        <h4>if-else Yapısı:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int yas = 18;

// Basit if
if (yas >= 18) {
    System.out.println("Reşitsiniz");
}

// if-else
if (yas >= 18) {
    System.out.println("Reşitsiniz");
} else {
    System.out.println("Reşit değilsiniz");
}

// if-else if-else
if (yas < 13) {
    System.out.println("Çocuk");
} else if (yas < 20) {
    System.out.println("Genç");
} else if (yas < 65) {
    System.out.println("Yetişkin");
} else {
    System.out.println("Yaşlı");
}

// Ternary operatör
String durum = (yas >= 18) ? "Reşit" : "Reşit değil";</code></pre>
        </div>

        <h4>switch Yapısı:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int gun = 3;

// Geleneksel switch
switch (gun) {
    case 1:
        System.out.println("Pazartesi");
        break;
    case 2:
        System.out.println("Salı");
        break;
    case 3:
        System.out.println("Çarşamba");
        break;
    default:
        System.out.println("Diğer günler");
}

// Switch expression (Java 14+)
String gunAdi = switch (gun) {
    case 1 -> "Pazartesi";
    case 2 -> "Salı";
    case 3 -> "Çarşamba";
    default -> "Diğer günler";
};</code></pre>
        </div>
      `,
    },
    {
      title: "Döngüler (for, while, do-while)",
      content: `
        <h3>Döngüler</h3>
        
        <h4>for Döngüsü:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// Klasik for döngüsü
for (int i = 0; i < 5; i++) {
    System.out.println("Sayı: " + i);
}

// for-each döngüsü
int[] sayilar = {1, 2, 3, 4, 5};
for (int sayi : sayilar) {
    System.out.println("Sayı: " + sayi);
}

// Çoklu değişken
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println("i: " + i + ", j: " + j);
}</code></pre>
        </div>

        <h4>while Döngüsü:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// while döngüsü
int sayac = 0;
while (sayac < 5) {
    System.out.println("Sayaç: " + sayac);
    sayac++;
}

// Sonsuz döngü (dikkatli kullanın)
while (true) {
    // İşlemler
    if (kosul) {
        break; // Döngüden çık
    }
}</code></pre>
        </div>

        <h4>do-while Döngüsü:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// do-while döngüsü (en az bir kez çalışır)
int sayi = 1;
do {
    System.out.println("Sayı: " + sayi);
    sayi++;
} while (sayi <= 5);

// Kullanıcı girişi kontrolü
Scanner scanner = new Scanner(System.in);
int girilenSayi;
do {
    System.out.print("1-10 arası sayı girin: ");
    girilenSayi = scanner.nextInt();
} while (girilenSayi < 1 || girilenSayi > 10);</code></pre>
        </div>

        <h4>Döngü Kontrol İfadeleri:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// break - döngüden çık
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // 5'te döngüden çık
    }
    System.out.println(i);
}

// continue - sonraki iterasyona geç
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Çift sayıları atla
    }
    System.out.println(i); // Sadece tek sayılar
}</code></pre>
        </div>
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-[#18181b] pt-16">
      {/* Header */}
      <section className="bg-[#18181b] shadow-sm pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8">
          <div className="text-center">
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link
                href="/java-core"
                className="hover:text-gray-600 dark:hover:text-gray-400"
              >
                Java Core
              </Link>
              <span className="mx-2">→</span>
              <span className="text-gray-900 dark:text-white">
                Java Temelleri
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Java Temelleri
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Java programlama dilinin temel kavramlarını öğrenin. Değişkenler,
              veri tipleri, operatörler ve kontrol yapıları ile Java\'ya giriş
              yapın.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-[#23272f] rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-[#2a2f38] p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {index + 1}. {lesson.title}
                  </h2>
                </div>
                <div className="p-6">
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-[#18181b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/java-core"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
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
              Java Core Ana Sayfa
            </Link>
            <Link
              href="/java-core/nesne-yonelimli-programlama"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
            >
              Sonraki: Nesne Yönelimli Programlama
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
