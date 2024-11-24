'use client'

import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'

import { AppSidebar } from '@components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

const MainLayout = ({ children }) => {
  const pathname = usePathname()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?callbackUrl=${pathname}`)
    },
  })

  if (status == 'loading') {
    return <main className='flex h-screen w-screen items-center justify-center'>loading ...</main>
  }

  return (
    <div className='h-full w-full overflow-auto'>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </div>
  )
}

export default MainLayout
