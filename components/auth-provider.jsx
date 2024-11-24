'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

const AuthProvider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ accessToken: session?.accessToken }}>{children}</SWRConfig>
    </SessionProvider>
  )
}

export default AuthProvider
