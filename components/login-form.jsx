'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Loader } from 'lucide-react'

import Link from 'next/link'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = () => {
    if (!email) {
      return toast.error('Vui lòng điền email của bạn.')
    }

    if (!password) {
      return toast.error('Vui lòng điền mật khẩu của bạn.')
    }

    setLoading(true)
    signIn('credentials', {
      email,
      password,
    })
  }

  console.log(loading)

  return (
    <Card className='mx-auto max-w-sm border-transparent shadow-none drop-shadow-none'>
      <CardHeader>
        <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
        <CardDescription>Nhập email và mật khẩu bên dưới để đăng nhập</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='admin@marketnest.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <Link
                href='#'
                className='ml-auto inline-block text-sm underline'
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id='password'
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type='submit'
            className='w-full'
            disabled={loading}
            onClick={handleSignIn}
          >
            {loading ? <Loader className='animate-spin' /> : 'Đăng nhập'}
          </Button>
          <Button
            variant='outline'
            className='w-full'
            onClick={() => {
              toast.info('Chưa triển khai')
            }}
          >
            Đăng nhập bằng Google
          </Button>
        </div>
        <div className='mt-4 text-center text-sm'>
          Chưa có tài khoản?{' '}
          <Link
            href='#'
            className='underline'
          >
            Đăng ký
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
