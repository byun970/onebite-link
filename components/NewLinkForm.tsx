'use client'

import { useState } from 'react'

const folders = ['개발', '디자인', '마케팅', '기획', '아티클']

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folder, setFolder] = useState('')

  const isValid = url.trim() !== '' && folder !== ''

  return (
    <form className="flex flex-col gap-5 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
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
          <option value="">폴더 선택</option>
          {folders.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 px-6 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] transition-colors duration-150"
      >
        저장
      </button>
    </form>
  )
}
