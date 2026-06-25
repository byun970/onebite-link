'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function toKoreanError(message: string): string {
  if (message.includes('Invalid login credentials') || message.includes('invalid_credentials')) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.'
  }
  if (message.includes('Email not confirmed')) {
    return '이메일 인증이 완료되지 않았습니다. 이메일을 확인해 주세요.'
  }
  if (message.includes('Too many requests') || message.includes('over_email_send_rate_limit')) {
    return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.'
  }
  return '로그인에 실패했습니다. 다시 시도해 주세요.'
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isDisabled = !email || !password || loading

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  async function handleLogin() {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      showToast(toKoreanError(error.message))
      return
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      {toast && (
        <div className="toast-enter fixed top-6 left-1/2 z-50 bg-[var(--error)] text-white text-sm font-medium px-4 py-3 rounded-[6px] whitespace-nowrap">
          {toast}
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
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text)]" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-base text-[var(--text)] placeholder-[var(--placeholder)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={isDisabled}
            className="mt-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[6px] py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '로그인'}
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-[var(--accent)] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
