'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function toKoreanError(message: string): string {
  if (message.includes('already registered') || message.includes('already been registered')) {
    return '이미 가입된 이메일입니다.'
  }
  if (message.includes('Password should be at least')) {
    return '비밀번호는 6자 이상이어야 합니다.'
  }
  if (message.includes('Invalid email') || message.includes('invalid email')) {
    return '유효하지 않은 이메일 형식입니다.'
  }
  return '회원가입에 실패했습니다. 다시 시도해 주세요.'
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const isDisabled = !email || !password || !passwordConfirm || loading

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSignup() {
    if (password !== passwordConfirm) {
      showToast('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
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
        <div className="toast-enter fixed top-6 left-1/2 z-50 bg-[var(--error)] text-white text-sm font-medium px-4 py-3 rounded-[6px] border border-[var(--error)] whitespace-nowrap">
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
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text)]" htmlFor="password-confirm">
              비밀번호 확인
            </label>
            <input
              id="password-confirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-base text-[var(--text)] placeholder-[var(--placeholder)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
            />
          </div>
          <button
            onClick={handleSignup}
            disabled={isDisabled}
            className="mt-2 w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[6px] py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '회원가입'}
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
