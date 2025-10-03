"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const javaMenuItems = [
    { name: "Java Core", href: "/java-core" },
    { name: "Advanced Java", href: "/advanced-java" },
  ];

  const dsaMenuItems = [
    { name: "DSA", href: "/dsa-solutions" },
    { name: "System Design", href: "/system-design" },
    { name: "Design Patterns", href: "/design-patterns" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#18181b] bg-opacity-95 backdrop-blur-md shadow-lg border-b border-[#23272f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              tabIndex={0}
              className="flex items-center space-x-4 group focus:outline-none hover:scale-105 transition-transform duration-200"
              style={{ outline: "none", boxShadow: "none" }}
            >
              {/* Clear Java/DSA Logo */}
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#23272f] to-[#18181b] border border-[#31343a] shadow-lg mr-2 group-hover:shadow-xl transition-shadow duration-200">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  {/* Kod bloğu */}
                  <rect
                    x="8"
                    y="10"
                    width="20"
                    height="12"
                    rx="3"
                    fill="#fff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <text
                    x="18"
                    y="20"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#2563eb"
                    fontFamily="monospace"
                  >{`{ }`}</text>
                  {/* DSA düğümleri ve bağlantılar */}
                  <circle
                    cx="12"
                    cy="32"
                    r="2"
                    fill="#2563eb"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="24"
                    cy="32"
                    r="2"
                    fill="#2563eb"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="18"
                    cy="26"
                    r="2"
                    fill="#2563eb"
                    stroke="#fff"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="13.5"
                    y1="30.5"
                    x2="17"
                    y2="27.5"
                    stroke="#2563eb"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="22.5"
                    y1="30.5"
                    x2="19"
                    y2="27.5"
                    stroke="#2563eb"
                    strokeWidth="1.2"
                  />
                </svg>
              </span>
              <div className="flex flex-col justify-center ml-1">
                <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                  MasterDSA
                </span>
              </div>
            </Link>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-700 mx-6 hidden md:block" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/java-core"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Java Core</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>{" "}
            <Link
              href="/advanced-java"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Advanced Java</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/dsa-solutions"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">DSA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/system-design"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">System Design</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/design-patterns"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Design Patterns</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/about"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
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

        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300 opacity-100 max-h-96">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-md border-t border-gray-700">
              <div className="px-3 py-2">
                <div className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                  Java
                </div>
                <div className="space-y-1 ml-4">
                  {javaMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-md transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2">
                <div className="text-sm font-bold text-green-400 uppercase tracking-wider mb-2">
                  DSA & Algorithms
                </div>
                <div className="space-y-1 ml-4">
                  {dsaMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-green-600/20 rounded-md transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="block px-3 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
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
