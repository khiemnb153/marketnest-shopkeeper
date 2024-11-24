import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SignOutPage = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <Card className='mx-auto w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Tạm biệt</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <p>Hẹn gặp lại!</p>
          <Button asChild>
            <Link href='/login'>Đăng nhập</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignOutPage
