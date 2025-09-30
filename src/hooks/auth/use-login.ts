import type { ManagerSignInDto } from '@/client'
import { AuthService } from '@/client'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ManagerSignInDto) => AuthService.authControllerSignInV1({ body: data }),
  })

  return {
    login: mutate,
    isLoading: isPending,
  }
}
