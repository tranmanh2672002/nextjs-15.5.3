'use client'
import { Button } from '@/components/ui'
import type { ROLE } from '@/configs/constants'
import { removeLoginCookie } from '@/hooks/cookies'
import { MultiLanguage } from '@/modules/layout/MultiLanguage'
import { routes } from '@/routes'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const LandingTemplate = ({ role, isAuth }: { role: ROLE; isAuth: boolean }) => {
  const t = useTranslations()
  const router = useRouter()

  const handleLogout = () => {
    removeLoginCookie()
    router.push(routes.home.path)
  }

  const handleLogin = () => {
    router.push(routes.login.path)
  }

  return (
    <div className="gap10 flex flex-col">
      <div className="flex items-center justify-end gap-10">
        <MultiLanguage />
        {isAuth ? (
          <div className="flex items-center gap-2">
            <span>{role}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{t('header.guest')}</span>
            <Button onClick={handleLogin}>{t('header.login')}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
