import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { cn } from '@lib/utils'

import { getServerSession } from 'next-auth'
import authOptions from '@lib/auth-options'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import AuthProvider from '@components/auth-provider'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese'],
  style: ['italic', 'normal'],
})

export const metadata = {
  title: 'Market Nest | Shopkeeper',
  description: 'A digital marketplace for everything',
  icons: {
    icon: '/assets/logo.svg',
  },
}

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <html
      lang='vi'
      suppressHydrationWarning
    >
      <body className={cn('h-screen w-screen overflow-hidden antialiased', plusJakartaSans.className)}>
        <NextThemesProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session}>{children}</AuthProvider>
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  )
}

export default RootLayout
