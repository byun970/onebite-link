'use client'

import Link from 'next/link'
import { useFolders } from '@/lib/folder-context'

export default function Sidebar() {
  const { folders } = useFolders()

  return (
    <aside className="fixed top-12 left-0 w-52 h-[calc(100vh-3rem)] border-r border-[var(--border)] bg-[var(--card-bg)] px-3 py-4 flex flex-col gap-0.5">
      <Link
        href="/"
        className="sidebar-link w-full px-3 py-2 rounded-[6px] text-sm font-semibold text-[var(--accent)] bg-[var(--hover-bg)] transition-colors duration-150"
      >
        전체
      </Link>
      <div className="mt-2 flex flex-col gap-0.5">
        {folders.map((folder) => (
          <Link
            key={folder}
            href={`/folder/${folder}`}
            className="sidebar-link w-full px-3 py-2 rounded-[6px] text-sm text-[var(--text)] transition-colors duration-150"
          >
            📁 {folder}
          </Link>
        ))}
      </div>
    </aside>
  )
}
