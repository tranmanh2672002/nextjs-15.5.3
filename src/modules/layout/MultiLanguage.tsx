'use client'

import { useCookiesNext } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui'
import { COOKIES } from '@/configs/constants'

export const MultiLanguage = () => {
  const cookies = useCookiesNext()
  const locale = useLocale()
  const router = useRouter()

  const [currentLocale, setCurrentLocale] = useState(locale)

  const switchLocalePath = (newLocale: string) => {
    setCurrentLocale(newLocale)
    cookies.setCookie(COOKIES.LOCALE, newLocale)
    router.refresh()
  }

  return (
    <div>
      <div>{currentLocale}</div>
      <div className="flex gap-2">
        <Button onClick={() => switchLocalePath('vi')}>Switch to Vietnamese</Button>
        <Button onClick={() => switchLocalePath('en')}>Switch to English</Button>
      </div>
    </div>
  )
}
