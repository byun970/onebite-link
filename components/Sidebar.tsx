'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFolders, Folder } from '@/lib/folder-context'
import DeleteFolderModal from '@/components/DeleteFolderModal'
import EditFolderModal from '@/components/EditFolderModal'
import { createClient } from '@/lib/supabase/client'

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.917 1.75a1.237 1.237 0 0 1 1.75 1.75L4.083 11.083 1.75 11.667l.583-2.334L9.917 1.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 0 1 .583-.583h2.334a.583.583 0 0 1 .583.583V3.5M11.083 3.5l-.583 8.167H3.5L2.917 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.833 6.417v3.5M8.167 6.417v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

export default function Sidebar() {
  const { folders } = useFolders()
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null)
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null)
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <aside className="fixed top-12 left-0 w-52 h-[calc(100vh-3rem)] border-r border-[var(--border)] bg-[var(--card-bg)] px-3 py-4 flex flex-col gap-0.5">
        <Link
          href="/"
          className="sidebar-link w-full px-3 py-2 rounded-[6px] text-sm font-semibold text-[var(--accent)] bg-[var(--hover-bg)] transition-colors duration-150"
        >
          전체
        </Link>
        <div className="mt-2 flex flex-col gap-0.5">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="group sidebar-link flex items-center rounded-[6px] transition-colors duration-150"
            >
              <Link
                href={`/folder/${encodeURIComponent(folder.name)}`}
                className="flex-1 px-3 py-2 text-sm text-[var(--text)] truncate"
              >
                📁 {folder.name}
              </Link>
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 mr-2 flex-shrink-0 transition-all duration-150">
                <button
                  onClick={() => setFolderToEdit(folder)}
                  className="p-1 rounded text-[var(--text-sub)] hover:text-[var(--accent)] transition-colors duration-150"
                  aria-label={`${folder.name} 폴더 수정`}
                >
                  <PencilIcon />
                </button>
                <button
                  onClick={() => setFolderToDelete(folder)}
                  className="p-1 rounded text-[var(--text-sub)] hover:text-[var(--error)] transition-colors duration-150"
                  aria-label={`${folder.name} 폴더 삭제`}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="mt-auto w-full px-3 py-2 rounded-[6px] text-sm text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--error)] transition-colors duration-150 text-left"
        >
          로그아웃
        </button>
      </aside>
      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
        />
      )}
      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
        />
      )}
    </>
  )
}
