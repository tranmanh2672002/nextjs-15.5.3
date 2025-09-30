'use client'

import { Button } from '@/components/ui'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginController } from '../controller/login.controller'

export default function LoginTemplate() {
  const { form, onSubmit, isLoading } = useLoginController()

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl className="">
                  <Input type="email" placeholder={'Email'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl className="">
                  <Input type="password" placeholder={'Password'} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Form>
      </form>
    </div>
  )
}
