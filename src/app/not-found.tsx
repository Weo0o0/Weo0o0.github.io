import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-8">
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
        style={{ background: "var(--accent-gradient)" }}
      >
        <Home size={18} />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
