'use client'

import Link from 'next/link'
import { useState } from 'react'
import NewFolderModal from '@/components/NewFolderModal'

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <header className="nav-bg fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 border-b border-[var(--border)] z-10">
        <Link href="/" className="text-base font-semibold text-[var(--text)] tracking-tight">
          한입 링크
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-[6px] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] text-sm font-medium transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            <span className="text-base leading-none">+</span>
            새 폴더
          </button>
          <Link
            href="/new"
            className="flex items-center gap-1 px-4 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-medium transition-colors duration-150 hover:bg-[var(--accent-hover)]"
          >
            <span className="text-base leading-none">+</span>
            새 링크
          </Link>
        </div>
      </header>
      {modalOpen && <NewFolderModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
