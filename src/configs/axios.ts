/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next/client'
import queryString from 'query-string'
import * as rax from 'retry-axios'

import { ErrorCode } from '@/client'
import { COOKIES } from '@/configs/constants'
import { removeLoginCookie, setLoginCookie } from '@/hooks/cookies'
import { isTokenExpired } from '@/lib/helpers'
import { routes } from '@/routes'

const defaultConfig: CreateAxiosDefaults<any> = {
  timeout: 30 * 1000,
  raxConfig: {
    retry: 3,
    noResponseRetries: 2,
    retryDelay: 100,
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
    statusCodesToRetry: [
      [100, 199],
      [429, 429],
      [500, 599],
    ],
    backoffType: 'exponential',
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: {
    serialize: (params) =>
      queryString.stringify(params, {
        arrayFormat: 'comma',
        skipNull: true,
        skipEmptyString: true,
      }),
  },
}

export function isAuthError(error: any) {
  return (
    error.response?.data?.statusCode === 401 &&
    error.response?.data?.error === ErrorCode.INVALID_TOKEN
  )
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

function addRequestInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async (config) => {
      const token = getCookie(COOKIES.ACCESS_TOKEN)

      if (!token) {
        return config
      }

      const isSoonExpired = isTokenExpired(token as string)
      if (isSoonExpired) {
        if (!isRefreshing) {
          isRefreshing = true
          try {
            const baseUrl = instance.defaults.baseURL
            const refreshToken = getCookie(COOKIES.REFRESH_TOKEN)
            // TODO: change to the correct url
            const refreshTokenUrl = `${baseUrl}/api/v1/auth/refresh-token`
            const rs = await axios.post(
              refreshTokenUrl,
              {
                accessToken: token,
                refreshToken,
              },
              {
                headers: {},
              },
            )
            const { accessToken: newAccessToken, refreshToken: newRefreshToken, user } = rs.data
            setLoginCookie({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              role: user.role,
            })
            onRefreshed(newAccessToken)
            config.headers['Authorization'] = `Bearer ${newAccessToken}`
          } catch (error) {
            return Promise.reject(error)
          } finally {
            isRefreshing = false
          }
        } else {
          return new Promise((resolve) => {
            refreshSubscribers.push((newToken: string) => {
              config.headers['Authorization'] = `Bearer ${newToken}`
              resolve(config)
            })
          })
        }
      } else {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },
    (error) => Promise.reject(error),
  )
}

function addResponseInterceptor(instance: AxiosInstance) {
  const handleResponse = (response: any) => response

  const handleError = async (error: any) => {
    if (isAuthError(error)) {
      removeLoginCookie()
      window.location.href = routes.login.path
    }

    if (!(error instanceof AxiosError && error.response && isAuthError(error))) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }

  instance.interceptors.response.use(handleResponse, handleError)
}

function createAxiosInstance(config: CreateAxiosDefaults<any> = defaultConfig) {
  const instance = axios.create(config)

  addRequestInterceptor(instance)
  addResponseInterceptor(instance)

  rax.attach(instance)

  return instance
}

const axiosInstance = createAxiosInstance()

export * from 'axios'
export default axiosInstance
