'use client'

import { useState } from 'react'
import { useFolders } from '@/lib/folder-context'

export default function NewFolderModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const { addFolder } = useFolders()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      addFolder(name.trim())
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[var(--card-bg)] rounded-[8px] border border-[var(--border)] w-full max-w-sm p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-[var(--text)]">새 폴더</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름"
            autoFocus
            className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[6px] border border-[var(--border)] text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] transition-colors duration-150"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
