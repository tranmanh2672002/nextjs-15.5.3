'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { client } from '@/client/client.gen'
import axiosInstance, { type AxiosStatic } from '@/configs/axios'
import { queryClient } from '@/configs/query-client'

interface Props {
  children: ReactNode
}

export default function QueryProvider({ children }: Props) {
  client.setConfig({
    axios: axiosInstance as AxiosStatic,
    throwOnError: true,
  })

  return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
}
