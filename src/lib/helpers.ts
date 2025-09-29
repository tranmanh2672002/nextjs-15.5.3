import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (accessToken: string) => {
  const decoded = jwtDecode(accessToken)
  if (!decoded.exp || !decoded.iat) {
    return false
  }
  const now = Date.now() / 1000
  return now > decoded.exp - 5
}
