import type { Metadata } from 'next'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import NewLinkForm from '@/components/NewLinkForm'

export const metadata: Metadata = {
  title: '새 링크 추가',
}

export default function NewPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <Sidebar />
      <main className="ml-52 pt-12 p-8">
        <h2 className="text-xl font-semibold text-[var(--text)] mb-6">새 링크 추가</h2>
        <NewLinkForm />
      </main>
    </div>
  )
}
