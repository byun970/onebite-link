'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLinks } from '@/lib/link-context'
import { useFolders } from '@/lib/folder-context'

const COLORS = [
  'bg-sky-500', 'bg-indigo-600', 'bg-purple-500', 'bg-pink-500',
  'bg-orange-500', 'bg-teal-500', 'bg-green-500', 'bg-gray-700',
]

function pickColor(folder: string) {
  let hash = 0
  for (const c of folder) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(hash) % COLORS.length]
}

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folder, setFolder] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { addLink } = useLinks()
  const { folders } = useFolders()
  const router = useRouter()

  const isValid = url.trim() !== '' && folder !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url.trim())}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || '링크 정보를 가져올 수 없습니다')

      addLink({
        title: data.title || url.trim(),
        url: data.url || url.trim(),
        description: data.description || '',
        folder,
        color: pickColor(folder),
        thumbnail: data.image || null,
      })

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-5 w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={loading}
          className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)] disabled:opacity-50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">폴더</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          disabled={loading}
          className="px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150 bg-[var(--card-bg)] disabled:opacity-50"
        >
          <option value="">폴더 선택</option>
          {folders.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}
      <button
        type="submit"
        disabled={!isValid || loading}
        className="mt-2 px-6 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] transition-colors duration-150"
      >
        {loading ? '링크 정보 가져오는 중…' : '저장'}
      </button>
    </form>
  )
}
