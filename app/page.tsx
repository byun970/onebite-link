import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'
import { links } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <LinkGrid title="전체 링크" links={links} />
    </div>
  )
}
