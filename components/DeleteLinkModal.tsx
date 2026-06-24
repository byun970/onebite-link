'use client'

import { useLinks } from '@/lib/link-context'

interface DeleteLinkModalProps {
  id: number
  title: string
  onClose: () => void
}

export default function DeleteLinkModal({ id, title, onClose }: DeleteLinkModalProps) {
  const { removeLink } = useLinks()

  const handleDelete = async () => {
    await removeLink(id)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[var(--card-bg)] rounded-[8px] border border-[var(--border)] w-full max-w-sm p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-[var(--text)]">링크 삭제</h3>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-medium text-[var(--text)]">{title}</span> 링크를 삭제할까요?
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[6px] border border-[var(--border)] text-sm text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-[6px] bg-[var(--error)] text-white text-sm font-medium hover:opacity-90 transition-opacity duration-150"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
