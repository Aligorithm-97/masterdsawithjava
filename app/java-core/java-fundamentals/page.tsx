import Link from "next/link";

export default function JavaTemelleriPage() {
  const lessons = [
    {
      title: "Introduction to Java and Setup",
      content: `
        <h3>What is Java?</h3>
        <p>Java is a platform-independent, object-oriented programming language developed by Sun Microsystems in 1995.</p>
        
        <h4>Features of Java:</h4>
        <ul>
          <li><strong>Platform Independence:</strong> "Write Once, Run Anywhere" principle</li>
          <li><strong>Object-Oriented:</strong> Supports OOP principles</li>
          <li><strong>Secure:</strong> Memory management and type safety</li>
          <li><strong>Multithreaded:</strong> Support for concurrent programming</li>
        </ul>

        <h4>JDK Installation:</h4>
        <ol>
          <li>Download Oracle JDK from the <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">official website</a></li>
          <li>Select the version suitable for your operating system</li>
          <li>Run the installer</li>
          <li>Set the PATH variable</li>
        </ol>

        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <h5>Installation Check:</h5>
          <pre><code>java -version
javac -version</code></pre>
        </div>
      `,
    },
    {
      title: "Variables and Data Types",
      content: `
        <h3>Data Types in Java</h3>
        
        <h4>Primitive Data Types:</h4>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 dark:border-gray-600">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="border px-4 py-2">Data Type</th>
                <th class="border px-4 py-2">Size</th>
                <th class="border px-4 py-2">Value Range</th>
                <th class="border px-4 py-2">Default Value</th>
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

        <h4>Declaring Variables:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// Declaring variables
int number = 10;
String text = "Hello Java";
double decimal = 3.14;
boolean isTrue = true;

// Final (constant) variable
final int CONSTANT_NUMBER = 100;

// Var keyword (Java 10+)
var autoType = "This is a String";
var number2 = 42; // inferred as int</code></pre>
        </div>
      `,
    },
    {
      title: "Operators and Expressions",
      content: `
        <h3>Java Operators</h3>
        
        <h4>Arithmetic Operators:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int a = 10, b = 3;

// Addition
int sum = a + b; // 13

// Subtraction
int diff = a - b; // 7

// Multiplication
int product = a * b; // 30

// Division
int quotient = a / b; // 3 (integer division)

// Modulus (remainder)
int remainder = a % b; // 1

// Increment/Decrement
a++; // a = a + 1
b--; // b = b - 1

// Pre-increment/decrement
++a; // Increment first, then use
--b; // Decrement first, then use</code></pre>
        </div>

        <h4>Comparison Operators:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int x = 5, y = 10;

boolean isEqual = (x == y);      // false
boolean isNotEqual = (x != y);   // true
boolean isGreater = (x > y);     // false
boolean isLess = (x < y);        // true
boolean isGreaterOrEqual = (x >= y); // false
boolean isLessOrEqual = (x <= y);    // true</code></pre>
        </div>

        <h4>Logical Operators:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>boolean a = true, b = false;

// AND
boolean and = a && b; // false

// OR
boolean or = a || b; // true

// NOT
boolean not = !a; // false

// Short-circuit operators
boolean shortCircuit = (a && b); // b is not checked</code></pre>
        </div>
      `,
    },
    {
      title: "Control Structures (if, else, switch)",
      content: `
        <h3>Control Structures</h3>
        
        <h4>if-else Structure:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int age = 18;

// Simple if
if (age >= 18) {
    System.out.println("You are an adult");
}

// if-else
if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are not an adult");
}

// if-else if-else
if (age < 13) {
    System.out.println("Child");
} else if (age < 20) {
    System.out.println("Teenager");
} else if (age < 65) {
    System.out.println("Adult");
} else {
    System.out.println("Senior");
}

// Ternary operator
String status = (age >= 18) ? "Adult" : "Not adult";</code></pre>
        </div>

        <h4>switch Structure:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>int day = 3;

// Traditional switch
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Other days");
}

// Switch expression (Java 14+)
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Other days";
};</code></pre>
        </div>
      `,
    },
    {
      title: "Loops (for, while, do-while)",
      content: `
        <h3>Loops</h3>
        
        <h4>for Loop:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// Classic for loop
for (int i = 0; i < 5; i++) {
    System.out.println("Number: " + i);
}

// for-each loop
int[] numbers = {1, 2, 3, 4, 5};
for (int number : numbers) {
    System.out.println("Number: " + number);
}

// Multiple variables
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println("i: " + i + ", j: " + j);
}</code></pre>
        </div>

        <h4>while Loop:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// while loop
int counter = 0;
while (counter < 5) {
    System.out.println("Counter: " + counter);
    counter++;
}

// Infinite loop (use with caution)
while (true) {
    // Operations
    if (condition) {
        break; // Exit loop
    }
}</code></pre>
        </div>

        <h4>do-while Loop:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// do-while loop (runs at least once)
int number = 1;
do {
    System.out.println("Number: " + number);
    number++;
} while (number <= 5);

// User input check
Scanner scanner = new Scanner(System.in);
int enteredNumber;
do {
    System.out.print("Enter a number between 1-10: ");
    enteredNumber = scanner.nextInt();
} while (enteredNumber < 1 || enteredNumber > 10);</code></pre>
        </div>

        <h4>Loop Control Statements:</h4>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <pre><code>// break - exit loop
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exit at 5
    }
    System.out.println(i);
}

// continue - skip to next iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    System.out.println(i); // Only odd numbers
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
                Java Fundamentals
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Java Fundamentals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn the fundamental concepts of the Java programming language. Get started with variables, data types, operators, and control structures.
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
              Java Core Home
            </Link>
            <Link
              href="/java-core/object-oriented-programming"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
            >
              Next: Object-Oriented Programming
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
