import type { NextRequest } from 'next/server'
import { NextResponse, URLPattern } from 'next/server'
import { COOKIES, ROLE } from './configs/constants'
import { ROUTE_ROLES, routes, valueRoutes } from './routes'

const urlPatterns: Record<string, URLPattern> = {}
valueRoutes.forEach((route) => {
  urlPatterns[route.path] = new URLPattern({ pathname: route.path })
})

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const cookies = request.cookies

  const accessToken = cookies.get(COOKIES.ACCESS_TOKEN)?.value
  const role = cookies.get(COOKIES.ROLE)?.value
  const isAuth = !!accessToken && (role === ROLE.ADMIN || role === ROLE.MEMBER)

  const route = valueRoutes.find((route) => {
    const pattern = urlPatterns[route.path]
    return pattern.test(url)
  })

  // check if the route is valid, if not, redirect to next middleware
  const isHasRoute = !!route

  if (!isHasRoute) {
    return NextResponse.next()
  }

  const routeRoles = (route?.roles as string[]) || []

  // check if the route is public, if so, redirect to the route
  const isPublicRoute = routeRoles.includes(ROUTE_ROLES.PUBLIC)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // check role of the route
  const isAuthRedirectRoute = routeRoles.includes(ROUTE_ROLES.AUTH_REDIRECT)
  const isAdminProtectedRoute = routeRoles.includes(ROUTE_ROLES.ADMIN)
  const isMemberProtectedRoute = routeRoles.includes(ROUTE_ROLES.MEMBER)

  if (!isAuth && (isAdminProtectedRoute || isMemberProtectedRoute)) {
    // redirect to login page
    const redirectUrl = new URL(routes.login.path, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuth && isAuthRedirectRoute) {
    // redirect to dashboard page
    if (role === ROLE.ADMIN) {
      const redirectUrl = new URL(routes.home.path, request.url)
      return NextResponse.redirect(redirectUrl)
    } else if (role === ROLE.MEMBER) {
      const redirectUrl = new URL(routes.home.path, request.url)
      return NextResponse.redirect(redirectUrl)
    } else {
      const redirectUrl = new URL(routes.home.path, request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (isAuth && !isAdminProtectedRoute && role === ROLE.ADMIN) {
    // redirect to manager dashboard page
    const redirectUrl = new URL(routes.home.path, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (isAuth && !isMemberProtectedRoute && role === ROLE.MEMBER) {
    // redirect to staff dashboard page
    const redirectUrl = new URL(routes.home.path, request.url)
    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)', '/'],
}
