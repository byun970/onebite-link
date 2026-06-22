import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-6 bg-white border-b border-gray-200 z-10">
      <Link href="/" className="text-lg font-bold text-blue-600 tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-150"
      >
        <span className="text-base leading-none">+</span>
        새 링크
      </Link>
    </header>
  )
}
