import Link from 'next/link'
import { folders } from '@/lib/data'

export default function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 w-52 h-[calc(100vh-3.5rem)] border-r border-gray-200 bg-white px-3 py-4 flex flex-col gap-1">
      <Link
        href="/"
        className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
      >
        All
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => (
          <Link
            key={folder}
            href={`/folder/${folder}`}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            📁 {folder}
          </Link>
        ))}
      </div>
    </aside>
  )
}
