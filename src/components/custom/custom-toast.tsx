import { CheckCircle, CircleAlert, CircleX } from 'lucide-react'
import { toast } from 'sonner'

export const customToast = {
  success: (message?: string, options = {}) => {
    toast.success(message, {
      ...options,
      icon: <CheckCircle className="size-6 text-green-500" />,
      className: 'whitespace-pre-line',
    })
  },
  error: (message: string, options = {}) => {
    toast.error(message, {
      ...options,
      icon: <CircleX className="size-6 text-red-500" />,
      className: 'whitespace-pre-line',
    })
  },
  warning: (message: string, options = {}) => {
    toast.warning(message, {
      ...options,
      icon: <CircleAlert className="size-6 text-yellow-500" />,
      className: 'whitespace-pre-line',
    })
  },
}
