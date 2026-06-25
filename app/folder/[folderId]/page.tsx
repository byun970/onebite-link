import type { Metadata } from 'next'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'

export async function generateMetadata(
  { params }: { params: Promise<{ folderId: string }> }
): Promise<Metadata> {
  const { folderId } = await params
  const folderName = decodeURIComponent(folderId)
  return { title: `📁 ${folderName}` }
}

export default async function FolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params
  const folderName = decodeURIComponent(folderId)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <Sidebar />
      <LinkGrid title={`📁 ${folderName}`} folder={folderName} />
    </div>
  )
}
