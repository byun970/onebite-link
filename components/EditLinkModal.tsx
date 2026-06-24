'use client'

import { useState } from 'react'
import { useLinks } from '@/lib/link-context'
import { useFolders } from '@/lib/folder-context'

interface EditLinkModalProps {
  url: string
  initialTitle: string
  initialDescription: string
  initialFolder: string
  onClose: () => void
}

export default function EditLinkModal({
  url,
  initialTitle,
  initialDescription,
  initialFolder,
  onClose,
}: EditLinkModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [folder, setFolder] = useState(initialFolder)

  const { updateLink } = useLinks()
  const { folders } = useFolders()

  const isChanged =
    title.trim() !== initialTitle ||
    description.trim() !== initialDescription ||
    folder !== initialFolder

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    updateLink(url, { title: title.trim(), description: description.trim(), folder })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[var(--card-bg)] rounded-[8px] border border-[var(--border)] w-full max-w-sm p-6 flex flex-col gap-5">
        <h3 className="text-base font-semibold text-[var(--text)]">링크 수정</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">설명</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">폴더</label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)]"
            >
              {folders.map((f) => (
                <option key={f.id} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[6px] border border-[var(--border)] text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !isChanged}
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
