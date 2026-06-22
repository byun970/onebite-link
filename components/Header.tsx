import Link from 'next/link'

export default function Header() {
  return (
    <header className="nav-bg fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 border-b border-[var(--border)] z-10">
      <Link href="/" className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-medium transition-colors duration-150 hover:bg-[var(--accent-hover)]"
      >
        <span className="text-base leading-none">+</span>
        새 링크
      </Link>
    </header>
  )
}
