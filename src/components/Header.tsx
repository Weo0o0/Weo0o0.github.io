"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, Tag, FolderOpen, Calendar } from "lucide-react";

const navItems = [
  { label: "검색", href: "/search", icon: Search },
  { label: "카테고리", href: "/categories", icon: FolderOpen },
  { label: "태그", href: "/tags", icon: Tag },
  { label: "연도", href: "/archives", icon: Calendar },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="flex h-16 items-center justify-between rounded-b-2xl px-6"
          style={{
            background: "rgba(10, 10, 15, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[var(--accent)] transition-all">
              <Image src="/images/logooo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <span className="text-lg font-bold gradient-text">Weo0o0-Note</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden mx-4 mt-2 rounded-2xl p-4"
          style={{
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
