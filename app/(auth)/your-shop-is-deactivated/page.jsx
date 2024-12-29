'use client'

import { signOut } from 'next-auth/react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const YouAreNotAShopkeeperPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Cửa hàng của bạn đã bị đình chỉ</CardTitle>
          <CardDescription>Đăng nhập bị từ chối</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <p>Liên hệ quản trị viên để biết thêm thông tin.</p>

          <Button
            onClick={() => signOut({ callbackUrl: '/logout' })}
            variant='destructive'
          >
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default YouAreNotAShopkeeperPage
