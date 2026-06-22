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
        <label className="text-sm font-medium text-gray-700">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">폴더</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-white"
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
        className="mt-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold disabled:opacity-40 hover:bg-blue-700 active:scale-95 transition-all duration-150"
      >
        저장
      </button>
    </form>
  )
}
