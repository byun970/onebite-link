'use client'

import { useState } from 'react'
import { Link } from '@/lib/link-context'
import DeleteLinkModal from '@/components/DeleteLinkModal'
import EditLinkModal from '@/components/EditLinkModal'

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

export default function LinkCard({ title, url, description, folder, color, thumbnail }: Link) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <div className="card-hover relative flex flex-col rounded-[8px] border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden cursor-pointer transition-colors duration-150 group">
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all duration-150">
          <button
            onClick={(e) => { e.stopPropagation(); setShowEditModal(true) }}
            className="p-1.5 rounded-[6px] bg-black/40 text-white hover:bg-black/60 transition-colors duration-150"
            aria-label="링크 수정"
          >
            <PencilIcon />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowDeleteModal(true) }}
            className="p-1.5 rounded-[6px] bg-black/40 text-white hover:bg-black/60 transition-colors duration-150"
            aria-label="링크 삭제"
          >
            <TrashIcon />
          </button>
        </div>

        {thumbnail ? (
          <div className="h-28 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        ) : (
          <div className={`h-28 ${color} flex items-center justify-center`}>
            <span className="text-3xl font-bold text-white/80 select-none transition-transform duration-200 group-hover:scale-110">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="p-4 flex flex-col gap-1">
          <span className="text-xs font-medium text-[var(--accent)]">{folder}</span>
          <h3 className="text-sm font-semibold text-[var(--text)] truncate">{title}</h3>
          <p className="text-xs text-[var(--text-sub)] truncate">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 text-xs text-[var(--text-sub)] truncate hover:text-[var(--accent)] transition-colors duration-150"
          >
            {url}
          </a>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteLinkModal
          title={title}
          url={url}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showEditModal && (
        <EditLinkModal
          url={url}
          initialTitle={title}
          initialDescription={description}
          initialFolder={folder}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  )
}
