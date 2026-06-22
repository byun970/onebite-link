import LinkCard from '@/components/LinkCard'

interface Link {
  title: string
  url: string
  description: string
  folder: string
  color: string
}

interface LinkGridProps {
  title: string
  links: Link[]
}

export default function LinkGrid({ title, links }: LinkGridProps) {
  return (
    <main className="ml-52 pt-14 p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{title} ({links.length})</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link, i) => (
          <LinkCard key={i} {...link} />
        ))}
      </div>
    </main>
  )
}
