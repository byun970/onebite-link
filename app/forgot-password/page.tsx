'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null)

  function showToast(msg: string, success = false) {
    setToast({ msg, success })
    setTimeout(() => setToast(null), 4000)
  }

  async function handleSend() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })
    setLoading(false)

    if (error) {
      showToast('이메일 발송에 실패했습니다. 다시 시도해 주세요.')
      return
    }

    showToast('비밀번호 재설정 링크가 이메일로 발송되었습니다.', true)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      {toast && (
        <div
          className={`toast-enter fixed top-6 left-1/2 z-50 text-white text-sm font-medium px-4 py-3 rounded-[6px] whitespace-nowrap ${
            toast.success ? 'bg-[var(--accent)]' : 'bg-[var(--error)]'
          }`}
        >
          {toast.msg}
        </div>
      )}
      <div className="w-full max-w-sm">
        <h1 className="text-[30px] font-bold text-[var(--text)] leading-[1.2] text-center mb-8">
          한입 링크
        </h1>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text)]" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-base text-[var(--text)] placeholder-[var(--placeholder)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!email || loading}
            className="mt-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[6px] py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '비밀번호 재설정 링크 발송'}
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              로그인으로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
