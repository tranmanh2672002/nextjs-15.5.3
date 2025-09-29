import { deleteCookie, setCookie } from 'cookies-next'

import { COOKIES } from '@/configs/constants'

type Props = {
  accessToken: string
  refreshToken: string
  role?: string
  configs?: { maxAge?: number; path?: string; domain?: string }
}

export const setLoginCookie = ({ accessToken, refreshToken, role, configs }: Props) => {
  setCookie(COOKIES.ACCESS_TOKEN, accessToken, configs)
  setCookie(COOKIES.REFRESH_TOKEN, refreshToken, configs)
  if (role) {
    setCookie(COOKIES.ROLE, role, configs)
  }
}

export const removeLoginCookie = () => {
  deleteCookie(COOKIES.ACCESS_TOKEN)
  deleteCookie(COOKIES.REFRESH_TOKEN)
  deleteCookie(COOKIES.ROLE)
}
