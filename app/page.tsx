import type { Metadata } from 'next'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'

export const metadata: Metadata = {
  title: '전체 링크',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <Sidebar />
      <LinkGrid title="전체 링크" />
    </div>
  )
}
