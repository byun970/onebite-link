import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <Sidebar />
      <LinkGrid title="전체 링크" />
    </div>
  )
}
