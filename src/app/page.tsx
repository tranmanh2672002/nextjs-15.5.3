'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { customToast } from '@/components/custom/custom-toast'
import { Icon } from '@/components/custom/icon'
import { Button } from '@/components/ui'
import { MultiLanguage } from '@/modules/layout/MultiLanguage'

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
        <div className="flex items-center justify-center">
          <Icon.File className="size-8" />
        </div>
        <Button onClick={() => customToast.success('Hello')}>Alert</Button>
        <Button onClick={() => customToast.error('Hello')}>Alert</Button>
        <Button onClick={() => customToast.warning('Hello')}>Alert</Button>
      </div>
    </div>
  )
}
