import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { GithubIcon, XIcon } from "./icons";

export default function AuthorCard() {
  return (
    <div className="glass-card p-6 text-center">
      <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg-primary)]">
        <Image src="/images/logo.jpg" alt="Weo0o0-Note" fill className="object-cover" />
      </div>

      <h3 className="text-lg font-bold text-white">Weo0o0-Note</h3>
      <p className="text-sm text-[var(--text-muted)] mt-1 flex items-center justify-center gap-1">
        <MapPin size={14} />
        Daejeon, South Korea
      </p>
      <p className="text-sm text-[var(--text-secondary)] mt-3">방갑습니다 🤗</p>

      <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-[var(--border-color)]">
        <a
          href="mailto:weyuc25@gmail.com"
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-white/5 transition-all"
        >
          <Mail size={18} />
        </a>
        <a
          href="https://x.com/Weo0o0_"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-white/5 transition-all"
        >
          <XIcon size={18} />
        </a>
        <a
          href="https://github.com/Weo0o0"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-white/5 transition-all"
        >
          <GithubIcon size={18} />
        </a>
      </div>
    </div>
  );
}
