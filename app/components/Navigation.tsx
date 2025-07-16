"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "de", label: "DE" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJavaMenu, setShowJavaMenu] = useState(false);
  const [javaMenuTimeout, setJavaMenuTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const menuRef = useRef(null);
  const javaMenuRef = useRef(null);
  const [lang, setLang] = useState("en");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
                  Java & DSA Mastery
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">
                  Professional Learning Platform
                </span>
              </div>
            </Link>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-700 mx-6 hidden md:block" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home */}
            <Link
              href="/"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <div
              className="relative"
              ref={javaMenuRef}
              onMouseEnter={handleJavaMenuEnter}
              onMouseLeave={handleJavaMenuLeave}
            >
              <button
                className={`relative px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 group flex items-center space-x-2 ${
                  showJavaMenu
                    ? "text-blue-400 bg-blue-600/20 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span>Java</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showJavaMenu ? "rotate-180 text-blue-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                    showJavaMenu ? "w-full" : "group-hover:w-full"
                  }`}
                ></div>
              </button>

              {showJavaMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 py-3 z-50">
                  <div className="px-2">
                    {javaMenuItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-all duration-200 mx-1 group"
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

            <Link
              href="/dsa-solutions"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">DSA Solutions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/algorithm-problems"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Algorithm Problems</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/about"
              className="relative px-4 py-3 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {isAuthenticated && (
              <Link
                href="/admin"
                className="relative px-4 py-3 text-sm font-semibold text-green-400 hover:text-green-300 rounded-lg transition-all duration-200 hover:bg-green-600/20 group border border-green-500/30 ml-2"
              >
                <span className="relative z-10">Admin</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}

            <div className="ml-4 flex items-center space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-gray-700">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                    lang === lng.code
                      ? "bg-blue-600 text-white shadow-md"
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
              {/* Home */}
              <Link
                href="/"
                className="block px-3 py-3 text-base font-semibold text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

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

              {isAuthenticated && (
                <Link
                  href="/admin"
                  className="block px-3 py-3 text-base font-semibold text-green-400 hover:text-green-300 hover:bg-green-600/20 rounded-lg transition-all duration-200 border-l-4 border-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
