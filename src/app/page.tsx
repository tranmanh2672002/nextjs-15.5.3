import type { ROLE } from '@/configs/constants'
import { COOKIES } from '@/configs/constants'
import { LandingTemplate } from '@/modules/landing/template/LandingTemplate'
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const role = cookieStore.get(COOKIES.ROLE)?.value as unknown as ROLE
  const isAuth = !!cookieStore.get(COOKIES.ACCESS_TOKEN)?.value
  return <LandingTemplate role={role} isAuth={isAuth} />
}
