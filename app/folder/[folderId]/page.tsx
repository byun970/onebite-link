import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'
import { links } from '@/lib/data'

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params
  const folderName = decodeURIComponent(folderId)
  const filtered = links.filter((link) => link.folder === folderName)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <Sidebar />
      <LinkGrid title={`📁 ${folderName}`} links={filtered} />
    </div>
  )
}
