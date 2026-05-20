import { Mail } from "lucide-react";
import { GithubIcon, XIcon } from "./icons";

const socials = [
  { icon: Mail, href: "mailto:weyuc25@gmail.com", label: "Email", isLucide: true },
  { icon: XIcon, href: "https://x.com/Weo0o0_", label: "X (Twitter)", isLucide: false },
  { icon: GithubIcon, href: "https://github.com/Weo0o0", label: "GitHub", isLucide: false },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold gradient-text">Weo0o0-Note</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              다양한 프로젝트 소개 및 개발하는 블로그
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-white/5 transition-all"
                aria-label={social.label}
              >
                {social.isLucide ? (
                  <social.icon size={20} />
                ) : (
                  <social.icon size={20} />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Weo0o0-Note. Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
