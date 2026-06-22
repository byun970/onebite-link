import { Link } from '@/lib/link-context'

export default function LinkCard({ title, url, description, folder, color, thumbnail }: Link) {
  return (
    <div className="card-hover flex flex-col rounded-[8px] border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden cursor-pointer transition-colors duration-150 group">
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
          className="mt-2 text-xs text-[var(--text-sub)] truncate hover:text-[var(--accent)] transition-colors duration-150"
        >
          {url}
        </a>
      </div>
    </div>
  )
}
