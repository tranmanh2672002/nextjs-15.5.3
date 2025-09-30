import { ROLE } from './configs/constants'

export const ROUTE_ROLES = {
  PUBLIC: 'PUBLIC',
  AUTH_REDIRECT: 'AUTH_REDIRECT',
  ADMIN: ROLE.ADMIN,
  MEMBER: ROLE.MEMBER,
}

export const routes = {
  home: {
    path: '/',
    roles: [ROUTE_ROLES.PUBLIC],
  },
  login: {
    path: '/login',
    roles: [ROUTE_ROLES.AUTH_REDIRECT],
  },
  signUp: {
    path: '/sign-up',
    roles: [ROUTE_ROLES.AUTH_REDIRECT],
  },
  // common
  dashboard: {
    path: '/dashboard',
    roles: [ROUTE_ROLES.ADMIN, ROUTE_ROLES.MEMBER],
  },
  // admin
  user: {
    path: '/user',
    roles: [ROUTE_ROLES.ADMIN],
  },
  admin: {
    path: '/admin',
    roles: [ROUTE_ROLES.ADMIN],
  },
  // member
  member: {
    path: '/member',
    roles: [ROUTE_ROLES.MEMBER],
  },
}

export const valueRoutes = Object.values(routes)
