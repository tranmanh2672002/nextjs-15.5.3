'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div>
      Landing Page
      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/reels">Reels</Link>
      </div>
    </div>
  )
}
