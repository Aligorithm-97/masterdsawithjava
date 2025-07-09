'use client';

import Link from 'next/link';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'de', label: 'DE' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Java Core', href: '/java-core' },
    { name: 'Advanced Java', href: '/advanced-java' },
    { name: 'DSA Solutions', href: '/dsa-solutions' },
    { name: 'Algorithm Problems', href: '/algorithm-problems' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-[#23272f] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white dark:text-gray-900 font-bold text-lg">J</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse-slow"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  Master DSA
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  with Java
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-gray-300 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            ))}
            {/* Language Switcher */}
            <div className="ml-4 flex items-center space-x-1 bg-[#23272f] rounded-lg px-2 py-1">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors duration-150 ${lang === lng.code ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  onClick={() => { setLang(lng.code); console.log('Language changed to', lng.code); }}
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
              <span className="sr-only">Ana menüyü aç</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#23272f] shadow-lg z-40 animate-slide-in-left">
          <div className="flex flex-col py-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-1 px-6 mt-2">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng.code}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors duration-150 ${lang === lng.code ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  onClick={() => { setLang(lng.code); console.log('Language changed to', lng.code); }}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 