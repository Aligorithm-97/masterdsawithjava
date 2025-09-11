import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master DSA with Java - Java Core Concepts & Algorithm Solutions",
  description:
    "Learn Java core concepts, advanced Java programming, and solve DSA problems with detailed explanations and visual tutorials.",
  keywords:
    "Java, DSA, algorithms, data structures, programming, tutorials, problem solving",
  authors: [{ name: "Master DSA with Java" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Master DSA with Java",
    description:
      "Java core concepts, advanced Java, and DSA problems with explanations.",
    url: "https://masterdsawithjava.com/",
    siteName: "Master DSA with Java",
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "Master DSA with Java",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master DSA with Java",
    description:
      "Java core concepts, advanced Java, and DSA problems with explanations.",
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
