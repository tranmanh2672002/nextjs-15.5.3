'use client'

import { MultiLanguage } from '@/modules/layout/MultiLanguage'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('navigate')
  return (
    <div>
      <MultiLanguage />
      <div className="flex gap-4">
        <Link href="/login">{t('login')}</Link>
        <Link href="/sign-up">{t('sign-up')}</Link>
        <Link href="/dashboard">{t('dashboard')}</Link>
        <Link href="/reels">{t('reels')}</Link>
      </div>
    </div>
  )
}
