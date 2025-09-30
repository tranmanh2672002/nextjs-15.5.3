import { customToast } from '@/components/custom/custom-toast'
import { ROLE } from '@/configs/constants'
import { useLogin } from '@/hooks/auth/use-login'
import { setLoginCookie } from '@/hooks/cookies'
import { routes } from '@/routes'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const useLoginController = () => {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { login, isLoading } = useLogin()

  const onSubmit = form.handleSubmit(async (data) => {
    login(data, {
      onSuccess: (res) => {
        customToast.success('Login successful')
        const data = res?.data as unknown as {
          accessToken: string
          refreshToken: string
        }
        setLoginCookie({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          role: ROLE.ADMIN,
        })
        router.push(routes.home.path)
      },
      onError: () => {
        customToast.error('Login failed')
      },
    })
  })

  return { form, onSubmit, isLoading }
}
