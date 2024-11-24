import { getServerSession } from 'next-auth'
import authOptions from '@lib/auth-options'
import { redirect } from 'next/navigation'

import { LoginForm } from '@components/login-form'

const LoginPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams

  const session = await getServerSession(authOptions)

  if (!!session) {
    redirect(callbackUrl || '/')
  }

  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
