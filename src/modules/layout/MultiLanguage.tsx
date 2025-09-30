'use client'

import { useCookiesNext } from 'cookies-next'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SelectCustom } from '@/components/custom/select-custom'
import { COOKIES } from '@/configs/constants'

export const MultiLanguage = () => {
  const cookies = useCookiesNext()
  const locale = useLocale()
  const router = useRouter()

  const [currentLocale, setCurrentLocale] = useState(locale)

  const options = [
    { label: 'English', value: 'en' },
    { label: 'Vietnamese', value: 'vi' },
  ]

  const switchLocalePath = (newLocale: string) => {
    setCurrentLocale(newLocale)
    cookies.setCookie(COOKIES.LOCALE, newLocale)
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <SelectCustom
        options={options}
        onChange={(value) => switchLocalePath(value as string)}
        value={currentLocale}
        placeholder="Select language"
        clearable={false}
      />
    </div>
  )
}
