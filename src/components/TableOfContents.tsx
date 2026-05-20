"use client";

import { useEffect, useMemo, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");

  const headings = useMemo(() => {
    const regex = /^(#{2,4})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2].replace(/[*_`]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣-]/g, "")
        .replace(/\s+/g, "-");
      items.push({ id, text, level: match[1].length });
    }
    return items;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="glass-card p-5 sticky top-24">
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-[var(--accent)]" />
        목차
      </h3>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
            <a
              href={`#${h.id}`}
              className={`block text-xs py-1.5 px-3 rounded-lg transition-all ${
                activeId === h.id
                  ? "text-[var(--accent)] bg-[var(--glow-accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
