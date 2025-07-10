"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "de", label: "DE" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJavaMenu, setShowJavaMenu] = useState(false);
  const [javaMenuTimeout, setJavaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const menuRef = useRef(null);
  const javaMenuRef = useRef(null);
  const [lang, setLang] = useState("en");

  const handleJavaMenuEnter = () => {
    if (javaMenuTimeout) {
      clearTimeout(javaMenuTimeout);
      setJavaMenuTimeout(null);
    }
    setShowJavaMenu(true);
  };

  const handleJavaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setShowJavaMenu(false);
    }, 150); // 150ms delay before closing
    setJavaMenuTimeout(timeout);
  };

  const javaMenuItems = [
    { name: "Java Core", href: "/java-core" },
    { name: "Advanced Java", href: "/advanced-java" },
  ];

  const dsaMenuItems = [
    { name: "DSA Solutions", href: "/dsa-solutions" },
    { name: "Algorithm Problems", href: "/algorithm-problems" },
  ];

  const otherMenuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              tabIndex={0}
              className="flex items-center space-x-3 group focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-transparent focus:shadow-none active:outline-none active:ring-0 active:border-transparent active:shadow-none"
              style={{ outline: "none", boxShadow: "none" }}
            >
              <div className="relative">
                <div
                  className="w-11 h-11 bg-gradient-to-br from-[#23272f] to-[#18181b] border border-[#31343a] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105 focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-transparent focus:shadow-none active:outline-none active:ring-0 active:border-transparent active:shadow-none"
                  style={{ outline: "none", boxShadow: "none" }}
                >
                  <span className="text-white dark:text-gray-100 font-mono font-extrabold text-2xl select-none">
                    J
                  </span>
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-gray-400 rounded-full border border-white dark:border-[#18181b] shadow-sm"></div>
              </div>
              <div className="flex flex-col justify-center ml-1">
                <span className="text-lg font-bold tracking-tight text-gray-100 dark:text-white group-hover:text-gray-300 transition-colors duration-200">
                  Master DSA
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-400 font-medium tracking-wide mt-0.5">
                  with Java
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Home */}
            <Link
              href="/"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>

            {/* Java Dropdown Menu */}
            <div 
              className="relative" 
              ref={javaMenuRef}
              onMouseEnter={handleJavaMenuEnter}
              onMouseLeave={handleJavaMenuLeave}
            >
              <button
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group flex items-center space-x-1 ${
                  showJavaMenu 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>Java</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showJavaMenu ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-0 left-1/2 h-0.5 transition-all duration-300 ${
                  showJavaMenu 
                    ? 'w-full left-0 bg-blue-600 dark:bg-blue-400' 
                    : 'w-0 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0'
                }`}></span>
              </button>
              
              {showJavaMenu && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-3 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                  <div className="px-1">
                    {javaMenuItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200 mx-1 group"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DSA Solutions */}
            <Link
              href="/dsa-solutions"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
            >
              DSA Solutions
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>

            {/* Algorithm Problems */}
            <Link
              href="/algorithm-problems"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
            >
              Algorithm Problems
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
            >
              About
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>

            {/* Language Switcher */}
            <div className="ml-4 flex items-center space-x-1 bg-[#23272f] rounded-lg px-2 py-1">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors duration-150 ${
                    lang === lng.code
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => {
                    setLang(lng.code);
                    console.log("Language changed to", lng.code);
                  }}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300 opacity-100 max-h-96">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#18181b] border-t border-gray-700">
              {/* Home */}
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Java Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Java
                </div>
                <div className="space-y-1 ml-4">
                  {javaMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* DSA Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  DSA & Algorithms
                </div>
                <div className="space-y-1 ml-4">
                  {dsaMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* About */}
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
