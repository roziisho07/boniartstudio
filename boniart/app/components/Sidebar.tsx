// components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  years: number[];
}

export function Sidebar({ years }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between px-4">
        <Link href="/" className="text-sm font-medium text-gray-900">
          Shahid Hassan Boni
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="p-2 text-gray-700"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="px-8 py-10">
          <Link
            href="/"
            className="block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <h1 className="text-2xl font-light text-gray-900">
              Shahid Hassan
              <span className="block text-xl text-gray-500">Boni</span>
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-6 overflow-y-auto">
          <div className="mb-8">
            <div className="px-4 mb-3">
              <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                Art Works
              </span>
            </div>

            <ul className="space-y-1">
              {years.map((year) => (
                <li key={year}>
                  <Link
                    href={`/year/${year}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block px-4 py-2 text-sm
                      ${
                        pathname === `/year/${year}`
                          ? "text-gray-900 font-medium bg-gray-50"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }
                      transition-colors rounded-md
                    `}
                  >
                    {year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="px-4 mb-3">
              <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                Information
              </span>
            </div>

            <ul className="space-y-1">
              {[
                { href: "/about", label: "About" },
                { href: "/in-situ-media", label: "Other Medium" },
                { href: "/news-press", label: "News/Press" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block px-4 py-2 text-sm
                      ${
                        pathname === item.href
                          ? "text-gray-900 font-medium bg-gray-50"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }
                      transition-colors rounded-md
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="px-8 py-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shahid Hassan Boni
          </p>
        </div>
      </aside>
    </>
  );
}
