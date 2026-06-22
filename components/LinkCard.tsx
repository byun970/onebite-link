interface LinkCardProps {
  title: string
  url: string
  description: string
  folder: string
  color: string
}

export default function LinkCard({ title, url, description, folder, color }: LinkCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      <div className={`h-32 ${color} flex items-center justify-center`}>
        <span className="text-4xl font-bold text-white/80 select-none group-hover:scale-110 transition-transform duration-200">
          {title.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-blue-500">{folder}</span>
        <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-xs text-gray-400 truncate">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-xs text-gray-400 truncate hover:text-blue-500 transition-colors"
        >
          {url}
        </a>
      </div>
    </div>
  )
}
