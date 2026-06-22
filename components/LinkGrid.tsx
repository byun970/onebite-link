'use client'

import LinkCard from '@/components/LinkCard'
import { useLinks } from '@/lib/link-context'

export default function LinkGrid({ title, folder }: { title: string; folder?: string }) {
  const { links } = useLinks()
  const filtered = folder ? links.filter((l) => l.folder === folder) : links

  return (
    <main className="ml-52 pt-12 p-8">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-6">
        {title}{' '}
        <span className="text-sm font-normal text-[var(--text-sub)]">({filtered.length})</span>
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((link, i) => (
          <LinkCard key={i} {...link} />
        ))}
      </div>
    </main>
  )
}
