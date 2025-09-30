import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { COOKIES } from '@/configs/constants'

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get(COOKIES.LOCALE)?.value || 'en'
  return {
    locale: locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
